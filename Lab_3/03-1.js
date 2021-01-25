const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 5000;

var status = 'norm'

process.stdin.setEncoding('utf-8');

process.stdin.on('readable', ()=>{
    let chunk = null;
    
    while((chunk = process.stdin.read()) != null){
        
        switch(chunk.trim()){
            case 'exit': process.exit(0);break;
            case 'norm':
            case 'stop':
            case 'test':
            case 'idle':
                changeStatus(chunk.trim());break;

        }
    }
})

changeStatus = function(stat){
  console.log('reg = ' + status + '-->' + stat);
  status = stat;
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  
  if (req.url == "/state")
  {
    res.end(status);
  }
  res.end(fs.readFileSync('index.html'))
  
   
});



server.listen(port, hostname, () => {
  
  console.log(`Server running at http://${hostname}:${port}/`);
  
});