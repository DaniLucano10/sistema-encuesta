import CryptoJS from 'crypto-js';
// Función para desencriptar un ID
export const decryptId = (encryptedId: string) => {

const key = 'inscripcionITS';
console.log("ID encriptado:", encryptedId); 
const decryptedMessage = CryptoJS.AES.decrypt(encryptedId, key).toString(CryptoJS.enc.Utf8);

return decryptedMessage;
};

export default decryptId;
