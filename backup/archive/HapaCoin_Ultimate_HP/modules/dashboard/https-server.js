const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();
const PORT = 8443; // port HTTPS

app.use(express.static(__dirname));

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`HapaCoin Dashboard HTTPS live at https://127.0.0.1:${PORT}`);
});
