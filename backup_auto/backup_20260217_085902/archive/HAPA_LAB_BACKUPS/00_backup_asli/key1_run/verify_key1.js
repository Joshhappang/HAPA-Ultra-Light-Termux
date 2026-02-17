const fs = require('fs');
const nacl = require('tweetnacl');

// Load DER private key (untuk derive public key)
const der = fs.readFileSync('hapa_private.der');
const seed = der.slice(-32);
const keyPair = nacl.sign.keyPair.fromSeed(seed);

// Pesan dan signature yang ingin diverifikasi
const message = "Hello HAPA from Termux!";
const signatureBase64 = "Bpg5bTUai+L2uXSkTVmQZmt0125a6kPVpDD/RvD9ptsilRpmt01QXN/dKy/Faa5lM9+21k3poRFmMUJKFUosBA=="; // ganti jika beda
const signature = Buffer.from(signatureBase64, 'base64');

// Ambil public key
const publicKey = keyPair.publicKey;

// Verifikasi
const valid = nacl.sign.detached.verify(Buffer.from(message), signature, publicKey);

console.log("Message:", message);
console.log("Signature (base64):", signatureBase64);
console.log("Signature valid?", valid);
