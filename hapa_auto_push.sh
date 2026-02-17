#!/data/data/com.termux/files/usr/bin/bash

# --- 1️⃣ Aktifkan ssh-agent dan tambahkan key ---
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# --- 2️⃣ Masuk ke folder HAPA ---
cd ~/HAPA || exit

# --- 3️⃣ Backup lokal (opsional) ---
# Salin folder backup ke folder backup_timestamp
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
mkdir -p ~/HAPA/backup_auto
cp -r ~/HAPA/backup ~/HAPA/backup_auto/backup_$TIMESTAMP

# --- 4️⃣ Cek status git ---
git status

# --- 5️⃣ Tambahkan file baru/diubah ---
git add .

# --- 6️⃣ Commit perubahan ---
COMMIT_MSG="Auto commit HAPA update $(date '+%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"

# --- 7️⃣ Push ke GitHub ---
git push origin main

# --- 8️⃣ Selesai ---
echo "✅ HAPA updated and pushed to GitHub successfully!"
