const url = require('url');

const http = require('http'),
  fs = require('fs');

http.createServer((request, response) => {
  let addr = request.url,
  q = url.parse(addr, true),
  filePath = '';

  let qdata = q.query;
  console.log(qdata.month);

  if (q.pathname.includes('documentation')) {
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
  if (err) {
    console.log(err);
  }
  else {
    console.log('Added to log.');
  }});

}).listen(8080);
