# HapaCoin – Dokumen Final Resmi

## 1. Genesis Block
- Blok pertama ditandatangani dengan Ed25519 32-byte seed.
- Menjadi dasar seluruh blockchain HapaCoin.
- Reward blok pertama otomatis tercatat di ledger.

## 2. Total Supply & Unit
- Total supply maksimal: 1.000.000 HapaCoin
- Unit mikro: 1 HapaCoin = 1.048.756 Josh
- Supply tetap → tidak bisa melebihi 1.000.000 HapaCoin

## 3. Reward Blok Pertama
- Total reward = 10.000 HapaCoin
- Alokasi:
  - PoW – Mining Publik: 54% = 5.400 HapaCoin
  - PoS – Staking Publik: 36% = 3.600 HapaCoin
  - PoA – Validator / Keamanan: 10% = 1.000 HapaCoin

> Publik kecil tetap diutamakan (PoW + PoS = 90%)

## 4. Aturan Staking / PoS
- Maksimal $100.000 USD per akun/device
- Jumlah HapaCoin yang bisa staking menyesuaikan harga saat itu
- Reward dibagi proporsional sesuai staking
- Satu akun – satu device per blok

## 5. Aturan Mining / PoW
- Satu akun – satu device per blok
- Mining hanya diperbolehkan di HP Android
- Reward PoW dibagi proporsional sesuai kontribusi hash rate
- Blok baru muncul setiap 3 menit → stabil dan ringan untuk HP

## 6. PoA – Validator Keamanan
- 10% dari total reward blok
- Validator terbatas dan terpercaya
- Digunakan untuk audit atau emergency → tidak mengurangi reward publik

## 7. Mekanisme Ledger & Distribusi Reward
- Semua reward dicatat otomatis di reward_ledger.json
- Publik dapat memverifikasi secara transparan
- Reward publik kecil = PoW + PoS → 90% langsung dibagi sesuai kontribusi
- PoA 10% → untuk keamanan dan audit

## 8. Alur Blockchain HapaCoin
          Genesis Block
                │
                ▼
      PoW – Mining Publik (HP Android)
                │
                ▼
       Coinbase Reward tercatat
                │
                ▼
      PoS – Staking Publik (max $100.000/account/device)
                │
                ▼
      PoA – Validator Keamanan (10%)
                │
                ▼
      Blok Berikutnya

## 9. Prinsip & Kesimpulan
- Reward publik kecil adil & transparan
- Mekanisme aman & otonom → protokol langsung mengeksekusi reward
- Mining dan staking diatur agar ringan & adil
- Ledger reward otomatis → siap audit publik
- Supply tetap → 1.000.000 HapaCoin
- Unit mikro Josh → memudahkan transaksi publik kecil
