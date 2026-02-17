const fs = require('fs');
const nacl = require('tweetnacl');

// ======== Ambil seed dari private key (32-byte raw) ========
const seedRaw = fs.readFileSync('hapa_private.key');
const seed32 = new Uint8Array(seedRaw);

// Buat key pair Ed25519
const keyPair = nacl.sign.keyPair.fromSeed(seed32);
const publicKey = keyPair.publicKey;

// Pesan yang ingin diverifikasi
const message = Buffer.from("HapaCoin Block 1");

// Signature dari hasil signing sebelumnya (sign_key1_final.js)
const signatureBase64 = "ENgbPRHO2RmjLjR+7KWBc0RBU+yksJHnZcu6leuh5zuTjoOBntZz//XIIqWIUhvlgKm4OuvJGgMl5Jkg05GuCQ==";
const signature = Uint8Array.from(Buffer.from(signatureBase64, 'base64'));

// Verifikasi signature
const valid = nacl.sign.detached.verify(message, signature, publicKey);

// Output
console.log("=== HapaCoin Block Verification ===");
console.log("Message:", message.toString());
console.log("Signature (base64):", signatureBase64);
console.log("Signature valid?", valid);
