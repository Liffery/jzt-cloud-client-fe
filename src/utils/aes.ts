import CryptoJS from "crypto-js";
const AES_KEY = "SICS-AIREC-AUTHE";

export function encrypt(ctn: string) {
  const key = CryptoJS.enc.Utf8.parse(AES_KEY);
  const srcs = CryptoJS.enc.Utf8.parse(ctn);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

export function decrypt(ctn: string) {
  const key = CryptoJS.enc.Utf8.parse(AES_KEY);
  const res = CryptoJS.AES.decrypt(ctn, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(res).toString();
}

export default encrypt;
