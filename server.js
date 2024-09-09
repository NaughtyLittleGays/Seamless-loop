const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
	const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
	const extname = String(path.extname(filePath)).toLowerCase();
	const mimeTypes = {
		'.html': 'text/html',
		'.js': 'application/javascript',
		'.css': 'text/css',
		'.json': 'application/json',
		'.png': 'image/png',
		'.jpg': 'image/jpg',
		'.gif': 'image/gif',
		'.wav': 'audio/wav',
		'.mp4': 'video/mp4',
		'.woff': 'application/font-woff',
		'.ttf': 'application/font-ttf',
		'.eot': 'application/vnd.ms-fontobject',
		'.otf': 'application/font-otf',
		'.wasm': 'application/wasm'
	};

	const contentType = mimeTypes[extname] || 'application/octet-stream';

	fs.readFile(filePath, (error, content) => {
		if (error) {
			if (error.code == 'ENOENT') {
				res.writeHead(404, { 'Content-Type': 'text/html' });
				res.end('404 Not Found', 'utf-8');
			} else {
				res.writeHead(500);
				res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
			}
		} else {
			res.writeHead(200, {
				'Content-Type': contentType,
				'Cross-Origin-Opener-Policy': 'same-origin',
				'Cross-Origin-Embedder-Policy': 'require-corp'
			});
			res.end(content, 'utf-8');
		}
	});
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});