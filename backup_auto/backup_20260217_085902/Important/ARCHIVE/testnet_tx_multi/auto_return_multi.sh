#!/bin/bash

TX_FILES=("tx1.txt" "tx2.txt" "tx3.txt")
KEY3_SIGNED=false
PENDING_TIME=10  # detik, bisa diganti 300 untuk 5 menit

for TX in "${TX_FILES[@]}"; do
  echo "-----------------------------------"
  echo "Transaksi: $TX"
  echo "Key1 + Key2 sudah menandatangani."
  echo "Key3 belum menandatangani. Status: PENDING..."
  for ((i=PENDING_TIME;i>0;i--)); do
      echo "Menunggu Key3... $i detik tersisa"
      sleep 1
  done
  if [ "$KEY3_SIGNED" = false ]; then
      echo "Key3 tidak menandatangani. Dana ke Key3 dikembalikan ke pengirim (auto-return)."
  else
      echo "Key3 menandatangani tepat waktu. Transaksi lengkap Multi-Sig 3 dari 3 valid!"
  fi
done
