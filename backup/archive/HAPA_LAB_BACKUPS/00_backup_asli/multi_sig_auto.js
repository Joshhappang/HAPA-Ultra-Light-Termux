const fs = require('fs');
const { execSync } = require('child_process');
const nacl = require('tweetnacl');

const keys = ['key1', 'key2', 'key3'];
const basePath = '/data/data/com.termux/files/home/HAPA_BACKUP/HAPA_LAB_BACKUPS/00_backup_asli';

function ensureDER(keyFolder) {
    const pemPath = `${basePath}/${keyFolder}/hapa${keyFolder.slice(-1)}_private.key`;
    const derPath = `${basePath}/${keyFolder}/hapa_private.der`;

    if (!fs.existsSync(derPath)) {
        console.log(`${keyFolder}: DER tidak ada, membuat dari PEM...`);
        execSync(`openssl pkey -in ${pemPath} -outform DER -out ${derPath}`);
        console.log(`${keyFolder}: DER berhasil dibuat.`);
    }
}

function loadKey(keyFolder) {
    const derPath = `${basePath}/${keyFolder}/hapa_private.der`;
    const der = fs.readFileSync(derPath);
    const seed = der.slice(-32);
    return nacl.sign.keyPair.fromSeed(seed);
}

// Pesan / transaksi contoh
const message = "HAPA multi-signature automatic test from Termux";
console.log("Message:", message);

// Proses setiap key
keys.forEach(keyFolder => {
    ensureDER(keyFolder);
    const keyPair = loadKey(keyFolder);

    // Sign pesan
    const signature = nacl.sign.detached(Buffer.from(message), keyPair.secretKey);
    const sigBase64 = Buffer.from(signature).toString('base64');

    // Verifikasi
    const valid = nacl.sign.detached.verify(Buffer.from(message), signature, keyPair.publicKey);

    console.log(`${keyFolder} Signature: ${sigBase64}`);
    console.log(`${keyFolder} valid?`, valid);
});
