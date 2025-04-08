class e{constructor(e){this._events={}}on(e,a){this._events[e]=this._events[e]||[],this._events[e].push(a)}emit(e,...a){let t=this._events[e];t&&t.forEach((e=>{setTimeout((()=>e(...a)),0)}))}}class a{static decode(e,a){let t={symbology:null},s=e[1],o=e[2];switch(s){case"A":t.symbology="code39";break;case"B":t.symbology="telepen";break;case"C":t.symbology="code128","1"===o&&(t.symbology="gs1-128",t.fnc1=1);break;case"D":t.symbology="code1";break;case"E":13===a.length?t.symbology="ean13":12===a.length?t.symbology="upca":8===a.length&&(t.symbology="4"===o?"ean8":"upce");break;case"F":t.symbology="codabar";break;case"G":t.symbology="code93";break;case"H":t.symbology="code11";break;case"I":t.symbology="interleaved-2-of-5";break;case"K":t.symbology="code16k";break;case"L":t.symbology="pdf417";break;case"M":t.symbology="msi";break;case"N":t.symbology="anker";break;case"O":"4"!==o&&"5"!==o||(t.symbology="codablock-f"),"6"===o&&(t.symbology="codablock-a");break;case"P":t.symbology="plessey";break;case"R":case"S":t.symbology="straight-2-of-5";break;case"Q":t.symbology="qr-code","0"===o?t.model=1:(t.model=2,"3"!==o&&"4"!==o||(t.fnc1=1),"5"!==o&&"6"!==o||(t.fnc1=2));break;case"U":t.symbology="maxicode";break;case"X":if("0"===o)t.symbology="ean13";else switch(o){case"9":t.symbology="ean13";break;case"C":t.symbology="ean8";break;case"g":t.symbology="upca";break;case"k":t.symbology="upce";break;case"r":t.symbology="gs1-databar-omni";break;case"s":t.symbology="gs1-databar-limited";break;case"t":t.symbology="gs1-databar-expanded";break;case"V":t.symbology="pdf417";break;case"S":t.symbology="qr-code-micro"}break;case"c":t.symbology="channel-code";break;case"d":t.symbology="data-matrix","2"!==o&&"5"!==o||(t.fnc1=1),"3"!==o&&"6"!==o||(t.fnc1=2);break;case"e":t.symbology="gs1-databar-omni";break;case"h":t.symbology="chinese-sensible-code";break;case"o":t.symbology="ocr";break;case"p":t.symbology="posi-code";break;case"s":t.symbology="super-code";break;case"z":t.symbology="aztec-code","1"!==o&&"4"!==o&&"7"!==o&&"A"!==o||(t.fnc1=1),"2"!==o&&"5"!==o&&"8"!==o&&"B"!==o||(t.fnc1=!0)}return t}}const t=Object.fromEntries([["SSCC",["00"]],["GTIN",["01"]],["CONTENT",["02"]],["BATCH/LOT",["10"]],["PROD DATE",["11"]],["DUE DATE",["12"]],["PACK DATE",["13"]],["BEST BEFORE or BEST BY",["15"]],["SELL BY",["16"]],["USE BY OR EXPIRY",["17"]],["VARIANT",["20"]],["SERIAL",["21"]],["CPV",["22"]],["VAR. COUNT",["30"]],["COUNT",["37"]],["INTERNAL",["90","91","92","93","94","95","96","97","98","99"]],["ADDITIONAL ID",["240"]],["CUST. PART NO.",["241"]],["MTO VARIANT",["242"]],["PCN",["243"]],["SECONDARY SERIAL",["250"]],["REF. TO SOURCE ",["251"]],["GDTI",["253"]],["GLN EXTENSION COMPONENT",["254"]],["GCN",["255"]],["ORDER NUMBER",["400"]],["GINC",["401"]],["GSIN",["402"]],["ROUTE",["403"]],["SHIP TO LOC",["410"]],["BILL TO ",["411"]],["PURCHASE FROM",["412"]],["SHIP FOR LOC",["413"]],["LOC No",["414"]],["PAY TO",["415"]],["PROD/SERV LOC",["416"]],["SHIP TO POST",["420","421"]],["ORIGIN",["422"]],["COUNTRY - INITIAL PROCESS.",["423"]],["COUNTRY - PROCESS.",["424"]],["COUNTRY - DISASSEMBLY",["425"]],["COUNTRY - FULL PROCESS",["426"]],["ORIGIN SUBDIVISION",["427"]],["NHRN PZN",["710"]],["NHRN CIP",["711"]],["NHRN CN",["712"]],["NHRN DRN",["713"]],["NHRN AIM",["714"]],["NET WEIGHT (kg)",["3100","3101","3102","3103","3104","3105"]],["LENGTH (m)",["3110","3111","3112","3113","3114","3115"]],["WIDTH (m)",["3120","3121","3122","3123","3124","3125"]],["HEIGHT (m)",["3130","3131","3132","3133","3134","3135"]],["AREA (m^2)",["3140","3141","3142","3143","3144","3145"]],["NET VOLUME (l)",["3150","3151","3152","3153","3154","3155"]],["NET VOLUME (m^3)",["3160","3161","3162","3163","3164","3165"]],["NET WEIGHT (lb)",["3200","3201","3202","3203","3204","3205"]],["LENGTH (in)",["3210","3211","3212","3213","3214","3215"]],["LENGTH (ft)",["3220","3221","3222","3223","3224","3225"]],["LENGTH (yd)",["3230","3231","3232","3233","3234","3235"]],["WIDTH (in)",["3240","3241","3242","3243","3244","3245"]],["WIDTH (ft)",["3250","3251","3252","3253","3254","3255"]],["WIDTH (yd)",["3260","3261","3262","3263","3264","3265"]],["HEIGHT (in)",["3270","3271","3272","3273","3274","3275"]],["HEIGHT (ft)",["3280","3281","3282","3283","3284","3285"]],["HEIGHT (yd)",["3290","3291","3292","3293","3294","3295"]],["GROSS WEIGHT (kg)",["3300","3301","3302","3303","3304","3305"]],["LENGTH (m), log",["3310","3311","3312","3313","3314","3315"]],["WIDTH (m), log",["3320","3321","3322","3323","3324","3325"]],["HEIGHT (m), log",["3330","3331","3332","3333","3334","3335"]],["AREA (m^2), log",["3340","3341","3342","3343","3344","3345"]],["VOLUME (l), log",["3350","3351","3352","3353","3354","3355"]],["VOLUME (m^3), log",["3360","3361","3362","3363","3364","3365"]],["KG PER m^2",["3370","3371","3372","3373","3374","3375"]],["GROSS WEIGHT (lb)",["3400","3401","3402","3403","3404","3405"]],["LENGTH (in), log",["3410","3411","3412","3413","3414","3415"]],["LENGTH (ft), log",["3420","3421","3422","3423","3424","3425"]],["LENGTH (yd), log",["3430","3431","3432","3433","3434","3435"]],["WIDTH (in), log",["3440","3441","3442","3443","3444","3445"]],["WIDTH (ft), log",["3450","3451","3452","3453","3454","3455"]],["WIDTH (yd), log",["3460","3461","3462","3463","3464","3465"]],["HEIGHT (in), log",["3470","3471","3472","3473","3474","3475"]],["HEIGHT (ft), log",["3480","3481","3482","3483","3484","3485"]],["HEIGHT (yd), log",["3490","3491","3492","3493","3494","3495"]],["AREA (in^2)",["3500","3501","3502","3503","3504","3505"]],["AREA (ft^2)",["3510","3511","3512","3513","3514","3515"]],["AREA (yd^2)",["3520","3521","3522","3523","3524","3525"]],["AREA (in^2), log",["3530","3531","3532","3533","3534","3535"]],["AREA (ft^2), log",["3540","3541","3542","3543","3544","3545"]],["AREA (yd^2), log",["3550","3551","3552","3553","3554","3555"]],["NET WEIGHT (t oz)",["3560","3561","3562","3563","3564","3565"]],["NET VOLUME (oz)",["3570","3571","3572","3573","3574","3575"]],["NET VOLUME (qt)",["3600","3601","3602","3603","3604","3605"]],["NET VOLUME (gal.)",["3610","3611","3612","3613","3614","3615"]],["VOLUME (qt), log",["3620","3621","3622","3623","3624","3625"]],["VOLUME (gal.), log",["3630","3631","3632","3633","3634","3635"]],["VOLUME (in^3) ",["3640","3641","3642","3643","3644","3645"]],["VOLUME (ft^3) ",["3650","3651","3652","3653","3654","3655"]],["VOLUME (yd^3) ",["3660","3661","3662","3663","3664","3665"]],["VOLUME (in^3), log",["3670","3671","3672","3673","3674","3675"]],["VOLUME (ft^3), log",["3680","3681","3682","3683","3684","3685"]],["VOLUME (yd^3), log",["3690","3691","3692","3693","3694","3695"]],["AMOUNT",["3900","3901","3902","3903","3904","3905","3906","3907","3908","3909","3910","3911","3912","3913","3914","3915","3916","3917","3918","3919"]],["PRICE",["3920","3921","3922","3923","3924","3925","3926","3927","3928","3929","3930","3931","3932","3933","3934","3935","3936","3937","3938","3939"]],["PRCNT OFF",["3940","3941","3942","3943"]],["NSN",["7001"]],["MEAT CUT",["7002"]],["EXPIRY TIME",["7003"]],["ACTIVE POTENCY",["7004"]],["CATCH AREA",["7005"]],["FIRST FREEZE DATE",["7006"]],["HARVEST DATE",["7007"]],["AQUATIC SPECIES",["7008"]],["FISHING GEAR TYPE",["7009"]],["PROD METHOD",["7010"]],["REFURB LOT",["7020"]],["FUNC STAT",["7021"]],["REV STAT",["7022"]],["GIAI - ASSEMBLY",["7023"]],["PROCESSOR # 0",["7030"]],["PROCESSOR # 1",["7031"]],["PROCESSOR # 2",["7032"]],["PROCESSOR # 3",["7033"]],["PROCESSOR # 4",["7034"]],["PROCESSOR # 5",["7035"]],["PROCESSOR # 6",["7036"]],["PROCESSOR # 7",["7037"]],["PROCESSOR # 8",["7038"]],["PROCESSOR # 9",["7039"]],["CERT # 0",["7230"]],["CERT # 1",["7231"]],["CERT # 2",["7232"]],["CERT # 3",["7233"]],["CERT # 4",["7234"]],["CERT # 5",["7235"]],["CERT # 6",["7236"]],["CERT # 7",["7237"]],["CERT # 8",["7238"]],["CERT # 9",["7239"]],["DIMENSIONS",["8001"]],["CMT No",["8002"]],["GRAI",["8003"]],["GIAI",["8004"]],["PRICE PER UNIT",["8005"]],["ITIP",["8006"]],["IBAN",["8007"]],["PROD TIME",["8008"]],["OPT SEN",["8009"]],["CPID",["8010"]],["CPID SERIAL",["8011"]],["VERSION",["8012"]],["GMN (for medical devices, the default, global data title is BUDI-DI )",["8013"]],["GSRN - PROVIDER",["8017"]],["GSRN - RECIPIENT",["8018"]],["SRIN",["8019"]],["REF No",["8020"]],["ITIP CONTENT",["8026"]],["POINTS",["8111"]],["PRODUCT URL",["8200"]]].map((e=>e[1].map((a=>[a,e[0]])))).reduce(((e,a)=>[...e,...a]),[])),s={"00":20,"01":16,"02":16,"03":16,"04":18,11:8,12:8,13:8,14:8,15:8,16:8,17:8,18:8,19:8,20:4,31:10,32:10,33:10,34:10,35:10,36:10,41:16},o=Object.fromEntries([["(\\d{12,14}|\\d{8})",["01"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,20})",["10","21","22","243","254","420","710","711","712","713","714","7020","7021","7022","8002","8012"]],["(\\d{6})",["11","12","13","15","16","17","3100","3101","3102","3103","3104","3105","3110","3111","3112","3113","3114","3115","3120","3121","3122","3123","3124","3125","3130","3131","3132","3133","3134","3135","3140","3141","3142","3143","3144","3145","3150","3151","3152","3153","3154","3155","3160","3161","3162","3163","3164","3165","3200","3201","3202","3203","3204","3205","3210","3211","3212","3213","3214","3215","3220","3221","3222","3223","3224","3225","3230","3231","3232","3233","3234","3235","3240","3241","3242","3243","3244","3245","3250","3251","3252","3253","3254","3255","3260","3261","3262","3263","3264","3265","3270","3271","3272","3273","3274","3275","3280","3281","3282","3283","3284","3285","3290","3291","3292","3293","3294","3295","3300","3301","3302","3303","3304","3305","3310","3311","3312","3313","3314","3315","3320","3321","3322","3323","3324","3325","3330","3331","3332","3333","3334","3335","3340","3341","3342","3343","3344","3345","3350","3351","3352","3353","3354","3355","3360","3361","3362","3363","3364","3365","3370","3371","3372","3373","3374","3375","3400","3401","3402","3403","3404","3405","3410","3411","3412","3413","3414","3415","3420","3421","3422","3423","3424","3425","3430","3431","3432","3433","3434","3435","3440","3441","3442","3443","3444","3445","3450","3451","3452","3453","3454","3455","3460","3461","3462","3463","3464","3465","3470","3471","3472","3473","3474","3475","3480","3481","3482","3483","3484","3485","3490","3491","3492","3493","3494","3495","3500","3501","3502","3503","3504","3505","3510","3511","3512","3513","3514","3515","3520","3521","3522","3523","3524","3525","3530","3531","3532","3533","3534","3535","3540","3541","3542","3543","3544","3545","3550","3551","3552","3553","3554","3555","3560","3561","3562","3563","3564","3565","3570","3571","3572","3573","3574","3575","3600","3601","3602","3603","3604","3605","3610","3611","3612","3613","3614","3615","3620","3621","3622","3623","3624","3625","3630","3631","3632","3633","3634","3635","3640","3641","3642","3643","3644","3645","3650","3651","3652","3653","3654","3655","3660","3661","3662","3663","3664","3665","3670","3671","3672","3673","3674","3675","3680","3681","3682","3683","3684","3685","3690","3691","3692","3693","3694","3695","7006","8005"]],["(\\d{2})",["20"]],["(\\d{0,8})",["30","37"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,30})",["90","240","241","250","251","400","401","403","7002","7023","8004","8013"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,90})",["91","92","93","94","95","96","97","98","99"]],["(\\d{0,6})",["242"]],["(\\d{13})([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,17})",["253"]],["(\\d{13})(\\d{0,12})",["255"]],["(\\d{17})",["402"]],["(\\d{13})",["410","411","412","413","414","415","416","7001"]],["(\\d{3})([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,9})",["421"]],["(\\d{3})",["422","424","426"]],["(\\d{3})(\\d{0,12})",["423","425"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,3})",["427","7008"]],["(\\d{0,15})",["3900","3901","3902","3903","3904","3905","3906","3907","3908","3909","3920","3921","3922","3923","3924","3925","3926","3927","3928","3929"]],["(\\d{3})(\\d{0,15})",["3910","3911","3912","3913","3914","3915","3916","3917","3918","3919","3930","3931","3932","3933","3934","3935","3936","3937","3938","3939"]],["(\\d{4})",["3940","3941","3942","3943","8111"]],["(\\d{10})",["7003"]],["(\\d{0,4})",["7004"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,12})",["7005"]],["(\\d{6,12})",["7007"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,10})",["7009"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,2})",["7010"]],["(\\d{3})([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,27})",["7030","7031","7032","7033","7034","7035","7036","7037","7038","7039"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{2,30})",["7230","7231","7232","7233","7234","7235","7236","7237","7238","7239"]],["(\\d{14})",["8001","02"]],["(\\d{14})([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,16})",["8003"]],["(\\d{14})(\\d{2})(\\d{2})",["8006","8026"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,34})",["8007"]],["(\\d{8})(\\d{0,4})",["8008"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,50})",["8009"]],["([\\x23\\x2D\\x2F\\x30-\\x39\\x41-\\x5A]{0,30})",["8010"]],["(\\d{0,12})",["8011"]],["(\\d{18})",["8017","8018","00"]],["(\\d{0,10})",["8019"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,25})",["8020"]],["([\\x21-\\x22\\x25-\\x2F\\x30-\\x3F\\x41-\\x5A\\x5F\\x61-\\x7A]{0,70})",["8110","8112","8200"]]].map((e=>e[1].map((a=>[a,e[0]])))).reduce(((e,a)=>[...e,...a]),[])),r={253:13,255:13,402:"L",410:"L",411:"L",412:"L",413:"L",414:"L",415:"L",416:"L",8003:14,8006:14,8017:"L",8018:"L",8026:14,"00":"L","01":"L","02":"L"};class c{static is(e){return console.log("is",e),"string"==typeof e&&(e.match(/^(https?|HTTPS?):(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?([^?#]*)(((\/(01|8006|8013|8010|414|415|417|8017|8018|255|00|253|401|402|8003|8004|240)\/)(\d{4}[^\/]+)(\/[^/]+\/[^/]+)?[/]?(\?([^?\n]*))?(#([^\n]*))?))/)||e.match(/^(https?|HTTPS?):(\/\/((([^\/?#]*)@)?([^\/?#:]*)(:([^\/?#]*))?))?([^?#]*)((\/[0-9A-Za-z_-]{10,}$))/))}static calculateCheckDigit(e,a){let t=0,s=0;for(let o=("L"===r[e]?a.length:r[e])-2;o>=0;o--){let e;e=t%2==0?3:1,s+=a.charAt(o)*e,t++}return(10-s%10)%10}static verifyCheckDigit(e,a){if(!r[e])return!0;let t="L"===r[e]?a.length:r[e],s=parseInt(a.charAt(t-1),10),o=c.calculateCheckDigit(e,a);return s===o||(console.log(`Invalid check digit: An invalid check digit was found for the primary identification key (${e})${a}; the correct check digit should be ${o} at position ${t}`),!1)}static verifySyntax(e,a){return!!new RegExp("^"+o[e]+"$").test(a)||(console.log(`Syntax error: Invalid syntax for value of (${e}): ${a}`),!1)}static parse(e){let a=[],s=new URL(e);if("/"!=s.pathname){let e=s.pathname.substr(1).split("/");for(;e.length>=2;)a.push([e.shift(),decodeURIComponent(e.shift())])}if(""!=s.search){let e=[...new URLSearchParams(s.search.replace(/;/,"&"))];for(let[t,s]of e)a.push([t,s])}let o=[];for(let[e,s]of a){let a=!0;a&=c.verifySyntax(e,s),a&=c.verifyCheckDigit(e,s),a&&("01"!=e&&"02"!=e||(s=s.padStart(14,"0")),o.push({ai:e,value:s,label:t[e]}))}return o.sort(((e,a)=>e.ai.localeCompare(a.ai))),o}}const i=String.fromCharCode(29);class n{static parse(e){let a=[],o=e.split(i);for(let e of o)for(;e.length;){let t=e.substr(0,2);t in s?(a.push({value:e.substr(0,s[t])}),e=e.substr(s[t])):(a.push({value:e}),e="")}for(let e of a){let a;for(let s=2;s<=4;s++)if(e.value.substr(0,s)in t){a=s;break}a&&(e.ai=e.value.substr(0,a),e.value=e.value.substr(a),e.label=t[e.ai])}return a}}var l={UPCA:class{static compress(e){return"string"==typeof e&&12===e.length&&/^\d{12}$/.test(e)?"0000"==e.slice(4,8)&&e[3]>="0"&&e[3]<="2"?e.slice(0,3)+e.slice(8,11)+e[3]+e[11]:"00000"==e.slice(4,9)?e.slice(0,4)+e.slice(9,11)+"3"+e[11]:"00000"==e.slice(5,10)?e.slice(0,5)+e.slice(10,11)+"4"+e[11]:"0000"==e.slice(6,10)&&e[11]>=5&&e[11]<=9?e.slice(0,6)+e[10]+e[11]:e:e}},UPCE:class{static expand(e){const a=e.substring(1,7),t=e.charAt(7);let s=e.charAt(0);switch(a.charAt(5)){case"0":case"1":case"2":s+=a.substring(0,2)+a.charAt(5)+"0000"+a.substring(2,5);break;case"3":s+=a.substring(0,3)+"00000"+a.substring(3,5);break;case"4":s+=a.substring(0,4)+"00000"+a.charAt(4);break;default:s+=a.substring(0,5)+"0000"+ +a.charAt(5)}return s+=t,s}}};class d{static DigitalLink=c;static parse(e){let a=[];if(console.log("result",e),console.log(c.is(e.value)),e.fnc1||e.value.includes(String.fromCharCode(29))?a=n.parse(e.value):c.is(e.value)?a=c.parse(e.value):e.symbology?.startsWith("gs1-databar")?a=n.parse(e.value):"itf"===e.symbology&&14===e.value.length?a=[{ai:"01",label:"GTIN",value:e.value}]:["upca","ean8","ean13"].includes(e.symbology)&&(a=[{ai:"01",label:"GTIN",value:e.value.padStart(14,"0")}]),"upce"===e.symbology&&(a=[{ai:"01",label:"GTIN",value:l.UPCE.expand(e.value).padStart(14,"0")}]),a.length){let e={elements:a},t=a.find((e=>"01"===e.ai));return t&&(e.gtin=t.value),e}}}const x=[{vendorId:3118},{vendorId:9168},{vendorId:1504},{vendorId:1529}];class b{#e;#a;constructor(a){this.#e=Object.assign({allowedSymbologies:[]},a||{}),this.#a={emitter:new e,inputreport:this.inputreport.bind(this),buffer:"",reports:[],device:null},navigator.hid.addEventListener("connect",(async e=>{this.#a.device||this.reconnect()})),navigator.hid.addEventListener("disconnect",(async e=>{e.device===this.#a.device&&(this.#a.device=null,this.#a.emitter.emit("disconnected"))}))}async connect(){try{const e=await navigator.hid.requestDevice({filters:x});let a=!1;for(let t of e){t.collections.some((e=>2==e.usage&&140==e.usagePage))&&(await this.open(t),a=!0)}a||(console.log("The barcode scanner is not in HID POS mode"),this.#a.emitter.emit("unsupported",{devices:e}))}catch(e){console.log("Could not connect! "+e)}}async reconnect(e){let a=await navigator.hid.getDevices();a=e.vendorId&&e.productId?a.filter((a=>a.vendorId==e.vendorId&&a.productId==e.productId)):a.filter((e=>x.some((a=>a.vendorId==e.vendorId&&(!a.productId||a.productId==e.productId))))),a.forEach((async e=>{e.collections.some((e=>2==e.usage&&140==e.usagePage))&&await this.open(e)}))}async disconnect(){this.#a.device&&(this.#a.device.removeEventListener("inputreport",this.#a.inputreport),await this.#a.device.close(),this.#a.device=null,this.#a.emitter.emit("disconnected"))}async open(e){await e.open(),3118!=e.vendorId&&9168!=e.vendorId||(console.log("Sending feature report to device to enable HID mode"),await e.sendFeatureReport(254,new Uint8Array([1]))),this.#a.device=e,this.#a.buffer="",this.#a.emitter.emit("connected",{type:"hid",vendorId:e.vendorId,productId:e.productId,productName:e.productName}),this.#a.device.addEventListener("inputreport",this.#a.inputreport)}inputreport(e){const{data:t,device:s,reportId:o}=e;if(2===o){let e=-1;if(93==t.getUint8(1)&&(e=0),93==t.getUint8(2)&&(e=1),-1==e)return;for(let a=0;a<t.getUint8(0);a++)this.#a.buffer+=String.fromCharCode(t.getUint8(a+e+4));if(this.#a.reports.push(new Uint8Array(t.buffer)),!t.getUint8(62)){let o={value:this.#a.buffer,bytes:this.#a.reports};o.value.endsWith("\r")&&(o.value=o.value.slice(0,-1));let r=String.fromCharCode(t.getUint8(1+e),t.getUint8(2+e),t.getUint8(3+e));if(r){let e=a.decode(r,o.value);e&&(o=Object.assign(o,e)),o.aim=r}if(3118==s.vendorId||9168==s.vendorId){let e=null;switch(t.getUint8(60)){case 44:e="info-mail";break;case 60:e="code32";break;case 63:e="korea-post";break;case 65:e="australian-post";break;case 66:e="british-post";break;case 67:e="canadian-post";break;case 68:e="ean8";break;case 69:e="upce";break;case 72:e="chinese-sensible-code";break;case 74:e="japanese-post";break;case 75:e="kix";break;case 76:e="planet-code";break;case 77:e="imbc";break;case 78:e="postal-4i";break;case 80:e="postnet";break;case 81:e="china-post";break;case 82:e="pdf417-micro";break;case 84:e="code39-tcif";break;case 86:e="codablock-a";break;case 89:e="nec-2-of-5";break;case 97:e="codabar";break;case 98:e="code39";break;case 99:e="upca";break;case 100:e="ean13";break;case 101:e="interleaved-2-of-5";break;case 102:e="straight-2-of-5";break;case 103:e="msi";break;case 104:e="code11";break;case 105:e="code93";break;case 106:e="code128";break;case 108:e="code49";break;case 109:e="matrix-2-of-5";break;case 113:e="codablock-f";break;case 114:e="pdf417";break;case 115:e="qr-code";break;case 116:e="telepen";break;case 119:e="data-matrix";break;case 120:e="maxicode";break;case 121:e="gs1-databar-omni";break;case 122:e="aztec-code";break;case 123:e="gs1-databar-limited";break;case 124:e="gs1-128";break;case 125:e="gs1-databar-expanded"}e&&(o.symbology=e)}console.log("result",o);let c=d.parse(o);c&&(console.log("GS1 parsed",c),o.data=c),(0===this.#e.allowedSymbologies.length||this.#e.allowedSymbologies.includes(o.symbology))&&this.#a.emitter.emit("barcode",o),this.#a.buffer="",this.#a.reports=[]}}}addEventListener(e,a){this.#a.emitter.on(e,a)}}export{b as default};
