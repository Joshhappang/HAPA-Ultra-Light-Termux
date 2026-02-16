const fs = require('fs');
const { execSync } = require('child_process');
const nacl = require('tweetnacl');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const basePath = '/data/data/com.termux/files/home/HAPA_BACKUP/HAPA_LAB_BACKUPS/00_backup_asli';
const keys = ['key1', 'key2', 'key3'];

const message = "HAPA multi-signature direct send from Termux";

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

let signatures = [];
keys.forEach(k => {
    ensureDER(k);
    const keyPair = loadKey(k);
    const sig = nacl.sign.detached(Buffer.from(message), keyPair.secretKey);
    signatures.push(Buffer.from(sig).toString('base64'));
});

const payload = { message, signatures };
const NODE_URL = 'http://127.0.0.1:8000/multi_sig_tx';

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
