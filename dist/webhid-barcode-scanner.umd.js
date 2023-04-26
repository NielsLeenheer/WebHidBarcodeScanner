!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).WebHIDBarcodeScanner=t()}(this,(function(){"use strict";class e{constructor(e){this._events={}}on(e,t){this._events[e]=this._events[e]||[],this._events[e].push(t)}emit(e,...t){let a=this._events[e];a&&a.forEach((e=>{e(...t)}))}}const t=[{vendorId:3118}];return class{constructor(){this._internal={emitter:new e,device:null},navigator.hid.addEventListener("connect",(async e=>{this._internal.device||this.reconnect()})),navigator.hid.addEventListener("disconnect",(async e=>{e.device===this._internal.device&&(this._internal.device=null,this._internal.emitter.emit("disconnected"))}))}async connect(){try{(await navigator.hid.requestDevice({filters:t})).forEach((async e=>{e.collections.some((e=>2==e.usage&&140==e.usagePage))&&await this.open(e)}))}catch(e){console.log("Could not connect! "+e)}}async reconnect(e){let a=await navigator.hid.getDevices();a=e.vendorId&&e.productId?a.filter((t=>t.vendorId==e.vendorId&&t.productId==e.productId)):a.filter((e=>t.some((t=>t.vendorId==e.vendorId&&(!t.productId||t.productId==e.productId))))),a.forEach((async e=>{e.collections.some((e=>2==e.usage&&140==e.usagePage))&&await this.open(e)}))}async disconnect(){this._internal.device&&(await this._internal.device.close(),this._internal.device=null,this._internal.emitter.emit("disconnected"))}async open(e){await e.open(),3118==e.vendorId&&await e.sendFeatureReport(254,new Uint8Array([1]));let t="";e.addEventListener("inputreport",(e=>{const{data:a,device:n,reportId:c}=e;if(2===c){let e=null,c=a.getUint8(0),r=String.fromCharCode(a.getUint8(1))+String.fromCharCode(a.getUint8(2))+String.fromCharCode(a.getUint8(3));if(3118==n.vendorId){switch(a.getUint8(60)){case 97:e="codabar";break;case 104:e="code11";break;case 106:e="code128";break;case 60:e="code32";break;case 98:e="code39";break;case 84:e="code39-tcif";break;case 105:e="code93";break;case 100:e="ean13";break;case 68:e="ean8";break;case 121:e="gs1-databar-omni";break;case 123:e="gs1-databar-limited";break;case 125:e="gs1-databar-expanded";break;case 73:e="gs1-128";break;case 81:e="china-post";break;case 101:e="interleaved-2-of-5";break;case 109:e="matrix-2-of-5";break;case 89:e="nec-2-of-5";break;case 102:e="straight-2-of-5";break;case 103:e="msi";break;case 99:e="upca";break;case 69:e="upce";break;case 122:e="aztec-code";break;case 72:e="chinese-sensible-code";break;case 86:e="codablock-a";break;case 113:e="codablock-f";break;case 108:e="code-49";break;case 119:e="data-matrix";break;case 121:e="gs1";break;case 120:e="maxicode";break;case 114:e="pdf417";break;case 82:e="pdf417-micro";break;case 115:e="qr-code"}}for(let e=0;e<c;e++){13!=a.getUint8(e+4)&&(t+=String.fromCharCode(a.getUint8(e+4)))}!a.getUint8(62)&&(this._internal.emitter.emit("barcode",{aim:r,symbology:e,value:t}),t="")}})),this._internal.device=e,this._internal.emitter.emit("connected",{type:"hid",vendorId:e.vendorId,productId:e.productId,productName:e.productName})}addEventListener(e,t){this._internal.emitter.on(e,t)}}}));
