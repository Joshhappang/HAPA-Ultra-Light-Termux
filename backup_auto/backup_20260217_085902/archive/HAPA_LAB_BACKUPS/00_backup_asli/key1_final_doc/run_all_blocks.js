const fs = require('fs');
const nacl = require('tweetnacl');

// =====================
// 1️⃣ Load seed & buat keyPair
// =====================
const seedRaw = fs.readFileSync('hapa_private.key');
const seed32 = new Uint8Array(seedRaw);
const keyPair = nacl.sign.keyPair.fromSeed(seed32);
const secretKey = keyPair.secretKey;
const publicKey = keyPair.publicKey;

// =====================
// 2️⃣ Sign blok baru
// =====================
const message = Buffer.from("HapaCoin Block 1");
const signature = nacl.sign.detached(message, secretKey);
const signatureBase64 = Buffer.from(signature).toString('base64');

console.log("=== HapaCoin Block Signing ===");
console.log("Message:", message.toString());
console.log("Signature (base64):", signatureBase64);
console.log("Key loaded successfully. Ready to create block.");

// =====================
// 3️⃣ Verifikasi reward publik
// =====================
const valid = nacl.sign.detached.verify(message, signature, publicKey);

console.log("\n=== HapaCoin Block Verification ===");
console.log("Message:", message.toString());
console.log("Signature (base64):", signatureBase64);
console.log("Signature valid?", valid);

// =====================
// 4️⃣ Update ledger (contoh sederhana)
// =====================
const ledgerFile = 'reward_ledger.json';
let ledger = {};
if (fs.existsSync(ledgerFile)) {
    ledger = JSON.parse(fs.readFileSync(ledgerFile, 'utf8'));
}
ledger['last_block'] = {
    message: message.toString(),
    signature: signatureBase64,
    timestamp: new Date().toISOString()
};
fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));
console.log("\nLedger updated:", ledgerFile);
