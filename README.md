# WebHidBarcodeScanner

This is an library that allows you to use a Honeywell, Zebra or DataLogic (and perhaps other manufacturers) barcode scanners in HID POS mode using WebHID. 

<br>

[![npm](https://img.shields.io/npm/v/@point-of-sale/webhid-barcode-scanner)](https://www.npmjs.com/@point-of-sale/webhid-barcode-scanner)
![GitHub License](https://img.shields.io/github/license/NielsLeenheer/WebHidBarcodeScanner)


> This library is part of [@point-of-sale](https://point-of-sale.dev), a collection of libraries for interfacing browsers and Node with Point of Sale devices such as receipt printers, barcode scanners and customer facing displays.

<br>

## What does this library do?

By default most barcode scanners emulate a keyboard meaning all numbers and letters of a barcode will be individually 'typed' by the barscanner. This means you either have to focus an input field before scanning, or you have to use global keyboard events and build some algorithm that can seperate out digits from barcodes from other digits that are being typed on the keyboard. 

This is error-prone and slow, but some barcode scanners can also be used in HID mode.

Depending on the model and manufacturer you might first need to scan a special configuration barcode to enable this mode. See the documentation of your barcode scanner for more information.

This library uses WebHID to connect to the scanner and set the scanner in HID mode, which allows us to receive the barcodes in one event.

<br>

## How to use it?

Load the `webhid-barcode-scanner.umd.js` file in the browser and instantiate a `WebHIDBarcodeScanner` object. 

```html
<script src='webhid-barcode-scanner.umd.js'></script>

<script>

    const barcodeScanner = new WebHIDBarcodeScanner();

</script>
```

Or import the `webhid-barcode-scanner.esm.js` module:

```js
import WebHIDBarcodeScanner from 'webhid-barcode-scanner.esm.js';

const barcodeScanner = new WebHIDBarcodeScanner();
```

<br>

## Connect to a scanner

The first time you have to manually connect to the barcode scanner by calling the `connect()` function. This function must be called as the result of an user action, for example clicking a button. You cannot call this function on page load.

```js
function handleConnectButtonClick() {
    barcodeScanner.connect();
}
```

Subsequent times you can simply call the `reconnect()` function. This will try to find any previously connected barcode scanners and will try to connect again. It is recommended to call this button on page load to prevent having to manually connect to a previously connected device.

```js
barcodeScanner.reconnect();
```

If there are no barcode scanners connected that have been previously connected, this function will do nothing.

If you have multiple barcode scanners connected and want to reconnect with a specific one, you can provide an object with a vendor id and product id. You can get the vendor id and product id by listening to the `connected` event and store it for later use. Unfortunately this will only work for USB HID devices. 

```js
barcodeScanner.reconnect(lastUsedDevice);
```

However, this library will actively look for new devices being connected. So if you connect a previously connected barcode scanner, it will immediately become available.

To find out when a barcode scanner is connected you can listen for the `connected` event using the `addEventListener()` function.

```js
barcodeScanner.addEventListener('connected', device => {
    console.log(`Connected to ${device.productName}`);

    /* Store device for reconnecting */
    lastUsedDevice = device;
});
```

The callback of the `connected` event is passed an object with the following properties:

-   `type`<br>
    Type of the connection that is used, in this case it is always `hid`.
-   `vendorId`<br>
    In case of a USB HID barcode scanner, the USB vendor ID.
-   `productId`<br>
    In case of a USB HID barcode scanner, the USB product ID.
-   `productName`<br>
    The name of the barcode scanner.

To find out when a barcode scanner is disconnected you can listen for the `disconnected` event using the `addEventListener()` function.

```js
barcodeScanner.addEventListener('disconnected', () => {
    console.log(`Disconnected`);
});
```

If the barcode scanner is a supported device, but it is not in HID POS mode, the library will emit a `unsupported` event. That means you need to reconfigure your scanner to change to a different connection mode. Usually you can do this by scanning a configuration barcode from the manual of your barcode scanner. The mode you need for this library is HID POS mode. 

Alternatively you can configure the scanner to use HID Keyboard emulation or Serial emulation, but then you need to use [KeyboardBarcodeScanner](https://github.com/NielsLeenheer/KeyboardBarcodeScanner) or [WebSerialBarcodeScanner](https://github.com/NielsLeenheer/WebSerialBarcodeScanner) instead.

For Honeywell scanners you do not need to do this, they can be automatically switched over to HID POS mode.

<br>

## Events

Once connected you can use listen for the following events to receive data from the barcode scanner.

### Scanning barcodes

Whenever the libary detects a barcode, it will send out a `barcode` event that you can listen for.

```js
barcodeScanner.addEventListener('barcode', e => {
    console.log(`Found barcode ${e.value} with symbology ${e.symbology}`);
});
```

The callback is passed an object with the following properties:

-   `value`<br>
    The value of the barcode as a string
-   `aim`<br>
    The AIM Code ID, which is a 3 character ISO/IEC identifier (originally created by AIM) generated by the decoder of a scanner and gives information about the symbology of the barcode which was scanned.
-   `symbology`<br>
    Optionally a library specific identifier of the symbology. 

<br>

-----

<br>

This library has been created by Niels Leenheer under the [MIT license](LICENSE). Feel free to use it in your products. The  development of this library is sponsored by Salonhub.

<a href="https://salohub.nl"><img src="https://salonhub.nl/assets/images/salonhub.svg" width=140></a>
