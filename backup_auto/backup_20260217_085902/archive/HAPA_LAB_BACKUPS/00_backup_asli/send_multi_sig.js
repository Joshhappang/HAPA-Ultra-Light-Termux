const fs = require('fs');
const fetch = require('node-fetch'); // pastikan sudah install: npm install node-fetch

// Path signature dan key folder
const basePath = '/data/data/com.termux/files/home/HAPA_BACKUP/HAPA_LAB_BACKUPS/00_backup_asli';
const keys = ['key1', 'key2', 'key3'];

// Pesan / transaksi contoh
const message = "HAPA multi-signature transaction example";

// Load signature dari multi_sig_auto.js (atau bisa buat baru)
function loadSignature(keyFolder) {
    const sigFile = `${basePath}/${keyFolder}/last_signature.txt`;
    return fs.readFileSync(sigFile, 'utf8').trim(); // harus berupa base64
}

// Build payload multi-signature
let signatures = [];
keys.forEach(k => {
    signatures.push(loadSignature(k));
});

const payload = {
    message,
    signatures
};

// Endpoint node HAPA lokal
const NODE_URL = 'http://127.0.0.1:8000/multi_sig_tx'; // ganti sesuai node

// Kirim transaksi
async function sendTx() {
    try {
        const res = await fetch(NODE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const json = await res.json();
        console.log("Node response:", json);
    } catch (err) {
        console.error("Error sending transaction:", err);
    }
}

sendTx();
