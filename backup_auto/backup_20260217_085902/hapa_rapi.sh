#!/data/data/com.termux/files/usr/bin/bash

echo "🧹 Membersihkan Termux, simpan yang penting..."

# Buat folder Trash jika belum ada
mkdir -p ~/Trash_HAPA
mkdir -p ~/Important/ARCHIVE
mkdir -p ~/Important/scripts

# Pindahkan semua folder/file lama yang tidak penting ke Trash
mv ~/HAPA_DASHBOARD_PUBLIC ~/Trash_HAPA/ 2>/dev/null
mv ~/HAPA_TEST ~/Trash_HAPA/ 2>/dev/null
mv ~/HAPA_ZERO ~/Trash_HAPA/ 2>/dev/null
mv ~/HAPA_SYSTEM/HAPA_MAINNET/backup ~/Trash_HAPA/ 2>/dev/null
mv ~/HAPA_SYSTEM/HAPA_MAINNET/backups ~/Trash_HAPA/ 2>/dev/null
mv ~/HAPA_SYSTEM/HAPA_MAINNET/Testnet_Active ~/Trash_HAPA/ 2>/dev/null
mv ~/HAPA_SYSTEM/HAPA_MAINNET/logs ~/Trash_HAPA/ 2>/dev/null
mv ~/nohup.out ~/Trash_HAPA/ 2>/dev/null
mv ~/storage ~/Trash_HAPA/ 2>/dev/null

# Simpan core binary jika ada
if [ -f ~/HAPA_SYSTEM/ARCHIVE/hapa_core_binary ]; then
    mv ~/HAPA_SYSTEM/ARCHIVE/hapa_core_binary ~/Important/ARCHIVE/
fi

# Simpan skrip penting jika ada
mv ~/cleanup_final.sh ~/Important/scripts/ 2>/dev/null
mv ~/lock_hapa.sh ~/Important/scripts/ 2>/dev/null
mv ~/disable_hapa_cron.sh ~/Important/scripts/ 2>/dev/null

echo "✅ Termux sudah rapi, hanya folder Important & HAPA_BACKUP tersisa."
