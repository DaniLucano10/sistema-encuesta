import CryptoJS from 'crypto-js';

// Función de encriptación utilizando CryptoJS con codificación URL segura
export const encryptId = (id: string) =>  {

  const clave = "inscripcionITS";
  var iv = CryptoJS.lib.WordArray.random(16);
	const encrypted = CryptoJS.AES.encrypt(id, clave, {iv:iv}).toString();

  return encrypted;
};

 