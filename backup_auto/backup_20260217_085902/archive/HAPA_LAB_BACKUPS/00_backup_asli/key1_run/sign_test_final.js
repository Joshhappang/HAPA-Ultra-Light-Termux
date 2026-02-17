// sign_test_final.js - HapaCoin Android
const fs = require('fs');
const nacl = require('tweetnacl');
const forge = require('node-forge');

// Pesan yang akan ditandatangani (contoh blok pertama)
const message = Buffer.from('HapaCoin Block 1', 'utf8');

// ======= Load Private Key =======
try {
    const pem = fs.readFileSync('hapa_private.key', 'utf8');
    const privateKeyObj = forge.pki.privateKeyFromPem(pem);

    // Ambil 32-byte terakhir sebagai seed Ed25519
    const seed = privateKeyObj.d.toByteArray();
    const seed32 = new Uint8Array(seed.slice(-32));

    // Buat keyPair Ed25519
    const keyPair = nacl.sign.keyPair.fromSeed(seed32);
    const secretKey = keyPair.secretKey; // 64 byte, siap digunakan

    // ======= Sign Message =======
    const signature = nacl.sign.detached(message, secretKey);

    console.log('=== HapaCoin Block Signing ===');
    console.log('Message:', message.toString());
    console.log('Signature (base64):', Buffer.from(signature).toString('base64'));
    console.log('Key loaded successfully. Ready to create block.');
    
} catch (err) {
    console.error('Error loading or signing key:', err);
}
