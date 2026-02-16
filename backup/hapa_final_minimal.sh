#!/data/data/com.termux/files/usr/bin/bash

echo "🔹 Bersihkan Termux, simpan yang penting, siap publik node..."

# 1️⃣ Lock & hentikan semua proses HAPA
if [ -f ~/Important/scripts/lock_hapa.sh ]; then
    ~/Important/scripts/lock_hapa.sh
fi

# 2️⃣ Buat folder penting
mkdir -p ~/Important/ARCHIVE
mkdir -p ~/Important/scripts
mkdir -p ~/HAPA_BACKUP

# 3️⃣ Hapus semua folder/file lama / skrip duplikat
rm -rf ~/HAPA_SYSTEM ~/Trash_HAPA
rm -f ~/hapa_final_clean.sh ~/hapa_public_node.sh ~/hapa_public_node_final.sh ~/rapi_home.sh

# 4️⃣ Pastikan core binary ada
if [ -f ~/Important/ARCHIVE/hapa_core_binary ]; then
    cd ~/Important/ARCHIVE
    chmod +x hapa_core_binary
    ./hapa_core_binary --public-node >> public_node.log 2>&1 &
    echo "✅ Node publik ringan berjalan, log di ~/Important/ARCHIVE/public_node.log"
else
    echo "⚠️ Core binary tidak ditemukan, node publik belum jalan."
fi

echo "✅ Termux rapi, HP ringan, hanya folder penting tersisa."
