const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = 8888;
const PUBLIC_DIRECTORY = path.join(__dirname, '../public');

http.createServer(function (req, res) {
    console.log(`${req.method} ${req.url}`);

    let reqUrl = req.url;

    switch(reqUrl) {
        case "/":
            reqUrl = 'index.html';
            break;
        case "/cars":
            reqUrl = 'carimobil.html';
            break;
        default:
            reqUrl = req.url;
            break;
    }

    const parseUrl = url.parse(req.url);
    let pathname = '.${parseUrl.pathname}';
    const ext = path.parse(pathname).ext;

    const map = {
        '.ico' : 'image/x-icon',
        '.html' : 'text/html',
        '.js' : 'text/javascript',
        '.json' : 'application/json',
        '.css' : 'text/css',
        '.png' : 'image/png',
        '.jpg' : 'image/jpeg',
        '.wav' : 'audio/wav',
        '.mp3' : 'audio/mpeg',
        '.svg' : 'image/svg+xml',
        '.pdf' : 'application/pdf',
        '.doc' : 'application/msword'
    };

    fs.exists(pathname, function(exist) {
        if (!exist){
            res.statusCode = 404;
            res.end('File $(pathname) not found!');
            return;
        }

        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
        }

        fs.readFile(pathname, function(err,data) {
            if(err) {
                res.statusCode = 500;
                res.end('Error getting the file : ${err}.');
            } else {
                res.setHeader('Content-type', map[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
}).listen(parseInt(port));
console.log('Server listening on port ${port}');