#!/data/data/com.termux/files/usr/bin/bash

# ================================
# HAPA Setup & Node Launcher
# ================================

# 1️⃣ Buat folder jika belum ada
mkdir -p ~/Important/ARCHIVE ~/Important/scripts ~/HAPA_BACKUP ~/Trash_HAPA

# 2️⃣ Restore GENESIS_RULES dari backup (pilih backup terbaru)
GENESIS_BACKUP=GENESIS_RULES_MASTER_backup_20260130_0701.txt
if [ -f ~/HAPA_ZERO_RESTORE_NEW/genesis/_archive/$GENESIS_BACKUP ]; then
    cp ~/HAPA_ZERO_RESTORE_NEW/genesis/_archive/$GENESIS_BACKUP ~/Important/ARCHIVE/GENESIS_RULES_MASTER.txt
    echo "✅ GENESIS_RULES master restored."
else
    echo "⚠️ Backup GENESIS_RULES tidak ditemukan, pastikan file tersedia."
fi

# 3️⃣ Cek binary core
BINARY=~/Important/ARCHIVE/hapa_core_binary
if [ -f "$BINARY" ]; then
    chmod +x "$BINARY"
    echo "✅ Binary HAPA ditemukan dan izin eksekusi sudah diberikan."
else
    echo "⚠️ Binary HAPA belum ada! Letakkan 'hapa_core_binary' di ~/Important/ARCHIVE."
    exit 1
fi

# 4️⃣ Lock file untuk mencegah double-run
LOCKFILE=~/Important/scripts/hapa.lock
if [ -f "$LOCKFILE" ]; then
    echo "⚠️ Node sedang berjalan, exit."
    exit 1
fi
touch "$LOCKFILE"

# 5️⃣ Jalankan node publik
cd ~/Important/ARCHIVE
./hapa_core_binary --public-node >> public_node.log 2>&1 &
echo "✅ Node publik HAPA berjalan"

# 6️⃣ Backup otomatis
rsync -avh ~/Important/ARCHIVE/ ~/HAPA_BACKUP/

# 7️⃣ Rotasi log supaya storage HP tetap lega
> ~/Important/ARCHIVE/public_node.log

# 8️⃣ Hapus lock setelah 5 detik (agar node tetap jalan di background)
sleep 5
rm -f "$LOCKFILE"
