#!/data/data/com.termux/files/usr/bin/bash

echo "🔹 Super minimal: bersihkan Termux & jalankan HAPA publik..."

# 1️⃣ Lock & hentikan semua proses HAPA
if [ -f ~/Important/scripts/lock_hapa.sh ]; then
    ~/Important/scripts/lock_hapa.sh
fi

# 2️⃣ Buat folder penting
mkdir -p ~/Important/ARCHIVE
mkdir -p ~/Important/scripts

# 3️⃣ Hapus semua folder/file lama / backup lama
rm -rf ~/HAPA_BACKUP 2>/dev/null
rm -rf ~/HAPA_SYSTEM 2>/dev/null
rm -rf ~/HAPA_DASHBOARD_PUBLIC ~/HAPA_TEST ~/HAPA_ZERO ~/Trash_HAPA ~/nohup.out ~/storage 2>/dev/null

# 4️⃣ Pastikan core binary ada
if [ -f ~/Important/ARCHIVE/hapa_core_binary ]; then
    cd ~/Important/ARCHIVE
    chmod +x hapa_core_binary
    ./hapa_core_binary --public-node >> public_node.log 2>&1 &
    echo "✅ Node publik ringan berjalan, log di ~/Important/ARCHIVE/public_node.log"
else
    echo "⚠️ Core binary tidak ditemukan, node publik belum jalan."
fi

echo "✅ Home Termux super minimal, HP ringan, siap publik node."
