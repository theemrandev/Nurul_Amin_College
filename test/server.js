/**
 * Lightweight Local Development & Preview Server
 * Nurul Amin Degree College
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.eot': 'application/vnd.ms-fontobject'
};

const server = http.createServer(async (req, res) => {
    let reqUrl = decodeURI(req.url.split('?')[0]);

    // API: Live Official Notices Endpoint
    if (reqUrl === '/api/live-notices') {
        const noticesFile = path.join(ROOT_DIR, 'data', 'official-notices.json');
        if (fs.existsSync(noticesFile)) {
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            });
            fs.createReadStream(noticesFile).pipe(res);
            return;
        } else {
            try {
                const { syncAllNotices } = require('../scripts/fetch_official_notices.js');
                const freshData = await syncAllNotices({ force: false });
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify(freshData));
                return;
            } catch (err) {
                res.writeHead(500, {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                });
                res.end(JSON.stringify({ error: err.message }));
                return;
            }
        }
    }

    // API: Trigger Fresh Sync Endpoint
    if (reqUrl === '/api/sync-notices') {
        try {
            const isForce = req.url.includes('force=true');
            const { syncAllNotices } = require('../scripts/fetch_official_notices.js');
            const freshData = await syncAllNotices({ force: isForce });
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify(freshData));
            return;
        } catch (err) {
            res.writeHead(500, {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({ error: err.message }));
            return;
        }
    }

    if (reqUrl === '/' || reqUrl === '') {
        reqUrl = '/index.html';
    }

    let filePath = path.join(ROOT_DIR, reqUrl);

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // Check 404
            const notFoundPath = path.join(ROOT_DIR, '404.html');
            if (fs.existsSync(notFoundPath)) {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                fs.createReadStream(notFoundPath).pipe(res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('404 Not Found');
            }
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`Nurul Amin Degree College Website Server Running`);
    console.log(`Local URL: http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to terminate`);
    console.log(`=======================================================`);
});
