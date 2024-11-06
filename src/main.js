import EventEmitter from './event-emitter.js';
import { Aim } from '@point-of-sale/barcode-parser';


const DeviceIds = [
	{ vendorId: 0x0c2e },	/* Honeywell Barcode Scanner */
    { vendorId: 0x23d0 },   /* Youjie */
    { vendorId: 0x05e0 },   /* Symbol */
    { vendorId: 0x05f9 },   /* Datalogic */
]

class WebHIDBarcodeScanner {

    #options;
    #internal;

	constructor(options) {
        this.#options = Object.assign({
            allowedSymbologies:	[]
        }, options || {})

        this.#internal = {
            emitter:        new EventEmitter(),
            inputreport:    this.inputreport.bind(this),
            buffer:         '',
            reports:        [],
            device:         null,
        };

		navigator.hid.addEventListener('connect', async (e) => {
			if (!this.#internal.device) {
				this.reconnect();
			}
		});

		navigator.hid.addEventListener('disconnect', async (e) => {
			if (e.device === this.#internal.device) {
				this.#internal.device = null;
				this.#internal.emitter.emit('disconnected');
			}
		});
	}

	async connect() {
		try {
			const devices = await navigator.hid.requestDevice({ 
				filters: DeviceIds
			});

			/* Find a device that acts as a barcode scanner */

            let found = false;

            for (let device of devices) {
                let collection = device.collections.some(c => c.usage == 2 && c.usagePage == 140);

                if (collection) {
                    await this.open(device);
                    found = true;
                }
            }

            if (!found) {
                console.log('The barcode scanner is not in HID POS mode');

                this.#internal.emitter.emit('unsupported', {
                    devices: devices
                });
            }
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
		if (!this.#internal.device) {
			return;
		}

        this.#internal.device.removeEventListener('inputreport', this.#internal.inputreport);
		await this.#internal.device.close();
		this.#internal.device = null;

		this.#internal.emitter.emit('disconnected');
	}

	async open(device) {
		await device.open();

		/* Honeywell devices need to be put into HID mode */

		if (device.vendorId == 0x0c2e || device.vendorId == 0x23d0) {
            console.log('Sending feature report to device to enable HID mode');
			await device.sendFeatureReport(254, new Uint8Array([ 0x01 ]));
		}

		/* Add listener for receiving barcode events */

		this.#internal.device = device;
        this.#internal.buffer = '';

		this.#internal.emitter.emit('connected', {
			type:		  'hid',
			vendorId:     device.vendorId,
			productId:    device.productId,
			productName:  device.productName
		});

		this.#internal.device.addEventListener('inputreport', this.#internal.inputreport);
    }

    inputreport(event) {
        const { data, device, reportId } = event;
	
        if (reportId === 0x02) {
            /* Determine offset for the data */

            let offset = -1;

            if (data.getUint8(1) == 0x5d) {
                offset = 0;
            }

            if (data.getUint8(2) == 0x5d) {
                offset = 1;
            }

            if (offset == -1) {
                return;
            }

            /* Extract the barcode data */

            for (let i = 0; i < data.getUint8(0); i++) {
                this.#internal.buffer += String.fromCharCode(data.getUint8(i + offset + 4));
            }

            this.#internal.reports.push(new Uint8Array(data.buffer));


            /* If this is the last report, process the barcode */

            if (!data.getUint8(62)) {
                let result = {
                    value: this.#internal.buffer,
                    bytes: this.#internal.reports
                };

           		/* If the last character of value is a new line, remove it */

                if (result.value.endsWith('\r')) {
                    result.value = result.value.slice(0, -1);
                }

                /* Decode AIM identifier */

                let aim = String.fromCharCode(data.getUint8(1 + offset), data.getUint8(2 + offset), data.getUint8(3 + offset));
                if (aim) {
                    let decoded = Aim.decode(aim, result.value);
                    if (decoded) {
                        result = Object.assign(result, decoded);
                    }

                    result.aim = aim;
                }

                /* Or even more accurate, if we have a Honeywell device, we can use the symbology identifier */

                if (device.vendorId == 0x0c2e || device.vendorId == 0x23d0) {
                    let id = data.getUint8(60);
                    let symbology = null;

                    switch (id) {
                        case 0x2c: symbology = 'info-mail'; break;
                        case 0x3c: symbology = 'code32'; break;
                        case 0x3f: symbology = 'korea-post'; break;
                        
                        case 0x41: symbology = 'australian-post'; break;
                        case 0x42: symbology = 'british-post'; break;
                        case 0x43: symbology = 'canadian-post'; break;
                        case 0x44: symbology = 'ean8'; break;
                        case 0x45: symbology = 'upce'; break;
                        case 0x48: symbology = 'chinese-sensible-code'; break;
                        case 0x4a: symbology = 'japanese-post'; break;
                        case 0x4b: symbology = 'kix'; break;
                        case 0x4c: symbology = 'planet-code'; break;
                        case 0x4d: symbology = 'imbc'; break;
                        case 0x4e: symbology = 'postal-4i'; break;

                        case 0x50: symbology = 'postnet'; break;
                        case 0x51: symbology = 'china-post'; break;
                        case 0x52: symbology = 'pdf417-micro'; break;
                        case 0x54: symbology = 'code39-tcif'; break;
                        case 0x56: symbology = 'codablock-a'; break;
                        case 0x59: symbology = 'nec-2-of-5'; break;

                        case 0x61: symbology = 'codabar'; break;
                        case 0x62: symbology = 'code39'; break;
                        case 0x63: symbology = 'upca'; break;
                        case 0x64: symbology = 'ean13'; break;
                        case 0x65: symbology = 'interleaved-2-of-5'; break;
                        case 0x66: symbology = 'straight-2-of-5'; break;
                        case 0x67: symbology = 'msi'; break;
                        case 0x68: symbology = 'code11'; break;
                        case 0x69: symbology = 'code93'; break;
                        case 0x6a: symbology = 'code128'; break;
                        case 0x6c: symbology = 'code49'; break;
                        case 0x6d: symbology = 'matrix-2-of-5'; break;

                        case 0x71: symbology = 'codablock-f'; break;
                        case 0x72: symbology = 'pdf417'; break;
                        case 0x73: symbology = 'qr-code'; break;
                        case 0x74: symbology = 'telepen'; break;
                        case 0x77: symbology = 'data-matrix'; break;
                        case 0x78: symbology = 'maxicode'; break;
                        case 0x79: symbology = 'gs1-databar-omni'; break;
                        case 0x7a: symbology = 'aztec-code'; break;
                        case 0x7b: symbology = 'gs1-databar-limited'; break;
                        case 0x7c: symbology = 'gs1-128'; break;
                        case 0x7d: symbology = 'gs1-databar-expanded'; break;                        
                    }

                    if (symbology) {
                        result.symbology = symbology;
                    }
                }

                /* Emit the barcode if it is allowed */

                if (this.#options.allowedSymbologies.length === 0 ||
                    this.#options.allowedSymbologies.includes(result.symbology)) 
                {
                    this.#internal.emitter.emit('barcode', result);
                }

                this.#internal.buffer = '';
                this.#internal.reports = [];
            }
        }
    }

	addEventListener(n, f) {
		this.#internal.emitter.on(n, f);
	}
}

export default WebHIDBarcodeScanner;