#!/bin/bash
# HAPA LAB — Restore backup & jalankan simulasi Multi-Sig + Auto-Return

BACKUP_FILE="HAPA_LAB_FINAL_SUPER_BACKUP.tar.gz"

echo "============================"
echo "Restore HAPA_LAB dari backup"
echo "============================"

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Backup $BACKUP_FILE tidak ditemukan!"
    exit 1
fi

# Extract backup
tar -xzf "$BACKUP_FILE"
echo "Backup berhasil di-restore ✅"

# Pastikan skrip auto_return_multi.sh executable
if [ -f "auto_return_multi.sh" ]; then
    chmod +x auto_return_multi.sh
    echo "Menjalankan simulasi Multi-Sig + Auto-Return..."
    ./auto_return_multi.sh
else
    echo "File auto_return_multi.sh tidak ditemukan!"
fi

echo
echo "============================"
echo "Restore & Simulasi selesai ✅"
echo "============================"
