const fs = require('fs');
const nacl = require('tweetnacl');

// Helper: load DER & derive key pair
function loadKey(folder) {
    const der = fs.readFileSync(`${folder}/hapa_private.der`);
    const seed = der.slice(-32);
    return nacl.sign.keyPair.fromSeed(seed);
}

// Load key1, key2, key3
const key1 = loadKey('key1');
const key2 = loadKey('key2');
const key3 = loadKey('key3');

// Pesan / transaksi contoh
const message = "HAPA multi-signature test from Termux";

// Sign message dengan semua key
const sig1 = nacl.sign.detached(Buffer.from(message), key1.secretKey);
const sig2 = nacl.sign.detached(Buffer.from(message), key2.secretKey);
const sig3 = nacl.sign.detached(Buffer.from(message), key3.secretKey);

console.log("Message:", message);
console.log("Signature Key1:", Buffer.from(sig1).toString('base64'));
console.log("Signature Key2:", Buffer.from(sig2).toString('base64'));
console.log("Signature Key3:", Buffer.from(sig3).toString('base64'));

// Verifikasi signature masing-masing
const valid1 = nacl.sign.detached.verify(Buffer.from(message), sig1, key1.publicKey);
const valid2 = nacl.sign.detached.verify(Buffer.from(message), sig2, key2.publicKey);
const valid3 = nacl.sign.detached.verify(Buffer.from(message), sig3, key3.publicKey);

console.log("Key1 valid?", valid1);
console.log("Key2 valid?", valid2);
console.log("Key3 valid?", valid3);
