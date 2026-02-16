#!/data/data/com.termux/files/usr/bin/bash

echo "🔒 Locking HAPA dan menghentikan proses..."

# Backup crontab
crontab -l > ~/crontab_backup.txt

# Nonaktifkan semua cron job
crontab -l | sed 's/^/#/' | crontab -

# Hentikan semua proses HAPA
for pid in $(ps aux | grep '[H]APA' | awk '{print $2}'); do
    kill $pid
done

echo "🧹 Membersihkan file/folder HAPA yang tidak penting..."

# Buat folder Important untuk menyimpan file penting
mkdir -p ~/Important

# Simpan backup crontab
mv ~/crontab_backup.txt ~/Important/

# Simpan ARCHIVE jika ada
if [ -d ~/HAPA_SYSTEM/ARCHIVE ]; then
    mv ~/HAPA_SYSTEM/ARCHIVE ~/Important/ARCHIVE
fi

# Hapus semua folder / file HAPA lain
rm -rf ~/HAPA_MAINNET
rm -f ~/HAPA_SYSTEM/cek_saldo_testnet.py
rm -f ~/HAPA_SYSTEM/auto_backup_loop.sh
rm -f ~/HAPA_SYSTEM/move_backup.sh

echo "✅ Termux rapi, hanya file penting tersimpan di ~/Important."
