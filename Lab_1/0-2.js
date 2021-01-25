const http = require('http');
qs = require('querystring');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, "text/panel");

  if (req.method == 'GET'){
    res.write(`${req.url}\n`)
    res.write(`${req.httpVersion}\n`)
    res.end(req.method)
  }
  else if(req.method == 'POST'){
    var str = '';
    req.on('data', function(data){
        str += data
    }

    );
    req.on('end', function(data)
    {
      console.log(data)
        res.end(str)
    })
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});