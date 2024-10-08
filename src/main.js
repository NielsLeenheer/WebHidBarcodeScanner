import EventEmitter from './event-emitter.js';

const DeviceIds = [
	{ vendorId: 0x0c2e },	/* Honeywell Barcode Scanner */
]


class WebHIDBarcodeScanner {

	constructor(options) {
        this._options = Object.assign({
            debug: false
        }, options || {})

        this._internal = {
            emitter:        new EventEmitter(),
            inputreport:    this.inputreport.bind(this),
            buffer:         '',
            reports:        [],
            device:         null,
        };

		navigator.hid.addEventListener('connect', async (e) => {
			if (!this._internal.device) {
				this.reconnect();
			}
		});

		navigator.hid.addEventListener('disconnect', async (e) => {
			if (e.device === this._internal.device) {
				this._internal.device = null;
				this._internal.emitter.emit('disconnected');
			}
		});
	}

	async connect() {
		try {
			const devices = await navigator.hid.requestDevice({ 
				filters: DeviceIds
			});

			/* Find a device that acts as a barcode scanner */

			devices.forEach(async (device) => {
				let collection = device.collections.some(c => c.usage == 2 && c.usagePage == 140);

				if (collection) {
					await this.open(device);
				}
			});
		}
		catch(error) {
			console.log('Could not connect! ' + error);
		}
	}

	async reconnect(previousDevice) {
		let devices = await navigator.hid.getDevices();
		
		if (previousDevice.vendorId && previousDevice.productId) {
            devices = devices.filter(device => {
                return device.vendorId == previousDevice.vendorId && device.productId == previousDevice.productId;
            });
        }
        else {
            devices = devices.filter(device => {
                return DeviceIds.some(filter => filter.vendorId == device.vendorId && (!filter.productId || filter.productId == device.productId));
            });
        }

		devices.forEach(async (device) => {
            let collection = device.collections.some(c => c.usage == 2 && c.usagePage == 140);

            if (collection) {
                await this.open(device);
            }
		});
	}

	async disconnect() {
		if (!this._internal.device) {
			return;
		}

        this._internal.device.removeEventListener('inputreport', this._internal.inputreport);
		await this._internal.device.close();
		this._internal.device = null;

		this._internal.emitter.emit('disconnected');
	}

	async open(device) {
		await device.open();

		/* Honeywell devices need to be put into HID mode */

		if (device.vendorId == 0x0c2e) {
			await device.sendFeatureReport(254, new Uint8Array([ 0x01 ]));
		}

		/* Add listener for receiving barcode events */

		this._internal.device = device;
        this._internal.buffer = '';

		this._internal.emitter.emit('connected', {
			type:		  'hid',
			vendorId:     device.vendorId,
			productId:    device.productId,
			productName:  device.productName
		});

		this._internal.device.addEventListener('inputreport', this._internal.inputreport);
    }

    inputreport(event) {
        const { data, device, reportId } = event;
	
        if (reportId === 0x02) {
            let symbology = null;

            this._internal.reports.push(new Uint8Array(data.buffer));

            let length = data.getUint8(0);
            let aim = String.fromCharCode(data.getUint8(1)) + String.fromCharCode(data.getUint8(2)) + String.fromCharCode(data.getUint8(3));

            /* The following symbology identifiers are a superset of symbologies defined by ThermalPrinterEncoder */

            if (device.vendorId == 0x0c2e) {
                let id = data.getUint8(60);
                switch (id) {
                    case 0x61: symbology = 'codabar'; break;
                    case 0x68: symbology = 'code11'; break;
                    case 0x6a: symbology = 'code128'; break;
                    case 0x3c: symbology = 'code32'; break;
                    case 0x62: symbology = 'code39'; break;
                    case 0x54: symbology = 'code39-tcif'; break;
                    case 0x69: symbology = 'code93'; break;
                    case 0x64: symbology = 'ean13'; break;
                    case 0x44: symbology = 'ean8'; break;
                    case 0x79: symbology = 'gs1-databar-omni'; break;
                    case 0x7b: symbology = 'gs1-databar-limited'; break;
                    case 0x7d: symbology = 'gs1-databar-expanded'; break;
                    case 0x49: symbology = 'gs1-128'; break;
                    case 0x51: symbology = 'china-post'; break;
                    case 0x65: symbology = 'interleaved-2-of-5'; break;
                    case 0x6d: symbology = 'matrix-2-of-5'; break;
                    case 0x59: symbology = 'nec-2-of-5'; break;
                    case 0x66: symbology = 'straight-2-of-5'; break;
                    case 0x67: symbology = 'msi'; break;
                    case 0x63: symbology = 'upca'; break;
                    case 0x45: symbology = 'upce'; break;

                    case 0x7a: symbology = 'aztec-code'; break;
                    case 0x48: symbology = 'chinese-sensible-code'; break;
                    case 0x56: symbology = 'codablock-a'; break;
                    case 0x71: symbology = 'codablock-f'; break;
                    case 0x6c: symbology = 'code-49'; break;
                    case 0x77: symbology = 'data-matrix'; break;
                    case 0x79: symbology = 'gs1'; break;
                    case 0x78: symbology = 'maxicode'; break;
                    case 0x72: symbology = 'pdf417'; break;
                    case 0x52: symbology = 'pdf417-micro'; break;
                    case 0x73: symbology = 'qr-code'; break;
                }
            }

            for (let i = 0; i < length; i++) {
                let character = data.getUint8(i + 4);

                if (character != 0x0d) {
                    this._internal.buffer += String.fromCharCode(data.getUint8(i + 4));
                }
            }

            let final = ! data.getUint8(62);

            if (final) {
                let result = {
                    aim, symbology, 
                    value:  this._internal.buffer
                };

                if (this._options.debug) {
                    result.reports = this._internal.reports;
                }

                this._internal.emitter.emit('barcode', result);

                this._internal.buffer = '';
                this._internal.reports = [];
            }
        }
    }

	addEventListener(n, f) {
		this._internal.emitter.on(n, f);
	}
}

export default WebHIDBarcodeScanner;