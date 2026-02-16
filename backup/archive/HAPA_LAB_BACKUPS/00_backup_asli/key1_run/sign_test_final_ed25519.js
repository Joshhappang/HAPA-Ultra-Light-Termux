const fs = require('fs');
const nacl = require('tweetnacl');

// ======= Load Ed25519 Seed (32-byte raw) =======
try {
    const seed32 = new Uint8Array(fs.readFileSync('hapa_private.key'));

    if (seed32.length !== 32) {
        throw new Error(`Seed harus 32 byte, tapi sekarang ${seed32.length} byte`);
    }

    const keyPair = nacl.sign.keyPair.fromSeed(seed32);
    const secretKey = keyPair.secretKey; // 64 byte

    const message = Buffer.from('HapaCoin Block 1', 'utf8');
    const signature = nacl.sign.detached(message, secretKey);

    console.log('=== HapaCoin Block Signing ===');
    console.log('Message:', message.toString());
    console.log('Signature (base64):', Buffer.from(signature).toString('base64'));
    console.log('Key loaded successfully. Ready to create block.');

} catch (err) {
    console.error('Error loading or signing key:', err);
}
