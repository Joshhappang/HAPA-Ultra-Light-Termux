const fs = require('fs');
const nacl = require('tweetnacl');

// Load DER private key
const der = fs.readFileSync('hapa_private.der');

// Ambil 32-byte seed terakhir dari DER (ED25519)
const seed = der.slice(-32);

// Generate key pair dari seed
const keyPair = nacl.sign.keyPair.fromSeed(seed);

// Pesan contoh untuk sign
const message = "Hello HAPA from Termux!";

// Generate signature
const signature = nacl.sign.detached(Buffer.from(message), keyPair.secretKey);

console.log("Message:", message);
console.log("Signature (base64):", Buffer.from(signature).toString('base64'));
