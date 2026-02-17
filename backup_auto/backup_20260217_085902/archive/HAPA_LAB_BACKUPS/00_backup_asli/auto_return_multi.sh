#!/bin/bash
# HAPA LAB — Simulasi Multi-Sig + Auto-Return (fleksibel)
# Jalankan: ./auto_return_multi.sh 180   (180 detik = 3 menit)
# Bisa ganti angka sesuai durasi pending yang diinginkan

DURASI=${1:-180}  # default 180 detik = 3 menit

echo "============================"
echo "Simulasi HAPA Multi-Sig & Auto-Return"
echo "Durasi pending: $DURASI detik"
echo "============================"

TX_FOLDER="testnet_tx_multi"
cd $TX_FOLDER || { echo "Folder $TX_FOLDER tidak ditemukan!"; exit 1; }

LOCKED_KEY="Key3"
AMOUNT_KEY3=20  # HAPA

for TX_FILE in multisig_msg*.txt; do
    echo
    echo "Menjalankan simulasi untuk $TX_FILE ..."
    echo "Key1 menandatangani $TX_FILE"
    echo "Key2 menandatangani $TX_FILE"

    for ((i=DURASI;i>0;i--)); do
        MIN=$((i/60))
        SEC=$((i%60))
        printf "Menunggu %s... %02d:%02d tersisa | Dana sementara terkunci: %d HAPA\r" "$LOCKED_KEY" "$MIN" "$SEC" "$AMOUNT_KEY3"
        sleep 1
    done
    echo
    echo "$LOCKED_KEY tidak menandatangani. Dana dikembalikan ke pengirim (auto-return)."
done

echo
echo "============================"
echo "Simulasi selesai ✅"
echo "============================"
