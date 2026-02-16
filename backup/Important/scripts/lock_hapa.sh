#!/data/data/com.termux/files/usr/bin/bash

echo "🔒 Locking HAPA..."

# Backup crontab dulu (opsional)
crontab -l > ~/crontab_backup.txt

# Nonaktifkan semua cron job
crontab -l | sed 's/^/#/' | crontab -

# Hentikan semua proses HAPA yang berjalan
for pid in $(ps aux | grep '[H]APA' | awk '{print $2}'); do
    kill $pid
done

echo "✅ HAPA terkunci. Cron job dinonaktifkan, proses dihentikan."
echo "📝 Backup crontab disimpan di ~/crontab_backup.txt"
