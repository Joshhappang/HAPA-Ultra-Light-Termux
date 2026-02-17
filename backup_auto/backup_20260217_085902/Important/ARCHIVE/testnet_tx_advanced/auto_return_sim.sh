#!/bin/bash

# File transaksi & tanda tangan
TX_FILE="tx_adv.txt"
SIG_KEY1="tx_adv_sig_key1.bin"
SIG_KEY2="tx_adv_sig_key2.bin"
SIG_KEY3="tx_adv_sig_key3.bin"

# Status Key3
KEY3_SIGNED=false
PENDING_TIME=10   # 10 detik untuk simulasi (ganti 300 untuk 5 menit)

echo "Simulasi Multi-Sig 2 dari 3 + Pending/Auto-Return"
echo "Transaksi: $TX_FILE"
echo "Key1 + Key2 sudah menandatangani."
echo "Key3 belum menandatangani. Status: PENDING..."

# Hitung mundur pending
for ((i=PENDING_TIME;i>0;i--)); do
    echo "Menunggu Key3... $i detik tersisa"
    sleep 1
done

# Simulasi auto-return
if [ "$KEY3_SIGNED" = false ]; then
    echo "Key3 tidak menandatangani. Dana ke Key3 dikembalikan ke Key1 (auto-return)."
else
    echo "Key3 menandatangani tepat waktu. Transaksi lengkap Multi-Sig 3 dari 3 valid!"
fi
