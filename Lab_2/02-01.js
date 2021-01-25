const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  
  if(req.url == '/html')
  {
    
    res.end(fs.readFileSync('index.html'));
    
  }
  else if(req.url == '/png')
  {
    res.end(fs.readFileSync('pic.png')); 
  }
  else if (req.url == '/api/name')
  {
        res.setHeader('Content-Type','text/plain; charset=UTF-8')
      res.end('Ермакович Виталий Сергеевич')
  }
  else if (req.url == '/xmlhttprequest')
  {
    res.end(fs.readFileSync('xmlhttprequest.html')); 
     
  }
  else if(req.url == '/fetch')
  {
    res.end(fs.readFileSync('fetch.html')); 
  }
  else if(req.url == '/jquery')
  {
    res.end(fs.readFileSync('jquery.html')); 
  }
   
});



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});