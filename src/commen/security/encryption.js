import CryptoJS from "crypto-js";
import { ENCRYPT_KEY } from "../../config/config.js";

export function encryptValue(value, key = ENCRYPT_KEY) {
  return CryptoJS.AES.encrypt(value, key).toString();
}
