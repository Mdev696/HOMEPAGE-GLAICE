// Servidor estático simples em Node (sem dependências). Uso: npm start
const http = require("http"), fs = require("fs"), path = require("path");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
http.createServer((req, res) => {
    const url = req.url.split("?")[0];
    const file = path.join(__dirname, url === "/" ? "index.html" : path.normalize(url));
    if (!file.startsWith(__dirname)) { res.writeHead(403); return res.end(); }
    fs.readFile(file, (err, data) => {
        if (err) { res.writeHead(404); return res.end("Não encontrado"); }
        res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
        res.end(data);
    });
}).listen(process.env.PORT || 3000, () => console.log("http://localhost:3000"));