const fs = require('fs');
const nacl = require('tweetnacl');

// Load private key key1
const secretKey = Buffer.from(fs.readFileSync('hapa_private.key', 'utf8'), 'base64');

// Pesan contoh untuk di-sign
const message = "Hello HAPA from Termux!";

// Generate signature
const signature = nacl.sign.detached(Buffer.from(message), secretKey);

console.log("Message:", message);
console.log("Signature (base64):", Buffer.from(signature).toString('base64'));
