// import CryptoES from 'crypto-es';
// import { setCallbackFunction } from './GetError';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import i18n from 'i18next';

// var key = "asdc354fhfghd33";

// getLanguage
// export var getLanguage = async () => {
//   let userLang = "";
//   userLang = i18n.language
//   console.log("userLang", userLang)

//   switch (userLang) {
//     case "en":
//       return "en_US"
//     case "zh":
//       return "zh_CN" 
//     default:
//       return "en_US"
//   }
// }

// export var decryptByAES = (ciphertext) => {
//   let message = ciphertext.trim();
//   let keyHex = encryptBySHA(CryptoES.enc.Utf8.parse(key));

//   let decrypted = CryptoES.AES.decrypt(message, keyHex, {
//     mode: CryptoES.mode.ECB,
//     padding: CryptoES.pad.Pkcs7
//   });

//   return decrypted.toString(CryptoES.enc.Utf8);
// }

// // encrypt for data passing import in session
// export var encryptByAES = (message) => {
//   var keyHex = encryptBySHA(CryptoES.enc.Utf8.parse(key));
//   var encrypted = CryptoES.AES.encrypt(message, keyHex, {
//     mode: CryptoES.mode.ECB,
//     padding: CryptoES.pad.Pkcs7
//   });

//   return encrypted.toString();
// }

// var encryptBySHA = (message) => {
//   // encrypted with SHA-1;
//   var hash = CryptoES.SHA1(message);

//   // convert encrypted text to byte array (20 bits);
//   var byteArray = [];
//   hash.words.forEach((i) => {
//     var k;
//     for (var j = 3; j >= 0; j--) {
//       k = (i >> (j * 8)) & 0xFF;
//       k = k < 128 ? k : -(256 - k);
//       byteArray.push(k);
//     }
//   });

//   // use the first 16 bits (128-bit)
//   byteArray = byteArray.slice(0, 16)

//   // convert to hex string and using hex parse to crypto object
//   return CryptoES.enc.Hex.parse(toHexString(byteArray))
// }

// var toHexString = (byteArray) => {
//   return Array.from(byteArray, (byte) => {
//     return ('0' + (byte & 0xFF).toString(16)).slice(-2);
//   }).join('')
// }

// // copy params
// export var copyObject = (newObj, currentObj) => {
//   try {
//     for (var key in newObj) {
//       if (currentObj.hasOwnProperty(key)) {
//         newObj[key] = (currentObj[key] == null) ? "" : currentObj[key]
//       }
//     }
//   } catch (err) { console.log(err) }

//   return newObj;
// }

// export let getCallbackFunction = (setFunc) => {
//   let action = setCallbackFunction()
//   action = setFunc;
//   return action
// }

export var removeItemValue = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  }
  catch (exception) {
    return false;
  }
}

export var isArray = (arr) => {
  return !!arr && arr.constructor === Array;
}


