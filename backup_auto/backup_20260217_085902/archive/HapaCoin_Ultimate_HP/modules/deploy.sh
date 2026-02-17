#!/bin/bash

# Konfigurasi
SERVER_USER="user"           # ganti dengan username VPS
SERVER_IP="VPS_IP"           # ganti dengan IP publik / domain
REMOTE_DIR="~/HapaCoinDashboard"
LOCAL_DASHBOARD="dashboard"

echo "📦 Mengirim folder dashboard ke server..."
scp -r $LOCAL_DASHBOARD $SERVER_USER@$SERVER_IP:$REMOTE_DIR

echo "🔌 Masuk ke server untuk setup..."
ssh $SERVER_USER@$SERVER_IP << 'EOSSH'
echo "🚀 Masuk folder dashboard..."
cd ~/HapaCoinDashboard/dashboard

echo "📥 Install http-server (jika belum ada)"
npm install -g http-server

echo "🟢 Jalankan server Node di background..."
nohup http-server . -p 8080 &

echo "⚙️ Setup Nginx & HTTPS..."
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx

# Buat konfigurasi Nginx
NGINX_FILE="/etc/nginx/sites-available/hapacoin"
sudo bash -c "cat > $NGINX_FILE" << 'EOF_NGINX'
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF_NGINX

sudo ln -sf /etc/nginx/sites-available/hapacoin /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Pasang HTTPS gratis
sudo certbot --nginx -d yourdomain.com --non-interactive --agree-tos -m your-email@example.com

echo "✅ Dashboard live & HTTPS siap!"
EOSSH

echo "🎉 Deploy selesai!"
