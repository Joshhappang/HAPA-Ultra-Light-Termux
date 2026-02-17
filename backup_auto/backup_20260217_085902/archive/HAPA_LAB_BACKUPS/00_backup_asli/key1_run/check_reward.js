// check_reward.js - HapaCoin Android
const fs = require('fs');

// ===== Contoh Ledger Reward =====
// Misal kita simpan reward di JSON sederhana
// Format: { "PoW": amount, "PoS": amount, "PoA": amount }
const ledgerFile = 'reward_ledger.json';

// Jika file ledger belum ada, buat default
if (!fs.existsSync(ledgerFile)) {
    const defaultLedger = {
        "PoW": 5400,  // 54% reward publik kecil
        "PoS": 3600,  // 36% staking publik
        "PoA": 1000   // 10% validator
    };
    fs.writeFileSync(ledgerFile, JSON.stringify(defaultLedger, null, 2));
    console.log('Ledger reward dibuat:', ledgerFile);
}

// Baca ledger
const ledger = JSON.parse(fs.readFileSync(ledgerFile, 'utf8'));

// Tampilkan reward publik kecil
console.log('=== HapaCoin Reward Publik Kecil ===');
console.log('PoW (Mining Publik):', ledger.PoW, 'HapaCoin');
console.log('PoS (Staking Publik):', ledger.PoS, 'HapaCoin');
console.log('PoA (Validator - Keamanan):', ledger.PoA, 'HapaCoin');
console.log('Total Reward:', ledger.PoW + ledger.PoS + ledger.PoA, 'HapaCoin');
