const fs = require('fs');
const nacl = require('tweetnacl');

// Baca seed private key Ed25519 (32 byte) langsung
const seedRaw = fs.readFileSync('hapa_private.key');
const seed32 = new Uint8Array(seedRaw); // pastikan isinya 32 byte

// Buat key pair
const keyPair = nacl.sign.keyPair.fromSeed(seed32);
const secretKey = keyPair.secretKey;

// Pesan untuk ditandatangani
const message = Buffer.from("HapaCoin Block 1");

// Sign pesan
const signature = nacl.sign.detached(message, secretKey);
const signatureBase64 = Buffer.from(signature).toString('base64');

console.log("=== HapaCoin Block Signing ===");
console.log("Message:", message.toString());
console.log("Signature (base64):", signatureBase64);
console.log("Key loaded successfully. Ready to create block.");
