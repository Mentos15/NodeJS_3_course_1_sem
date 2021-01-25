const http = require('http');
const url = require('url');
const fs = require('fs');

function factorial(n) {
  return (n > 1) ? n * factorial(n - 1) : 1;
  }

let handler = (req, res) => {
    
    if(req.method == 'GET'){

      if (String(req.url).substr(0,5) == "/fact")
      {
        
        let result;
        let q = url.parse(req.url,true).query;
        for(key in q){
          result = q[key];  
        
          
        }
        
        process.nextTick( () => {res.end(JSON.stringify({
          "k": result,
          "fact": factorial( result)  
          }))});
          
      }
      else if(req.url == '/fetch')
      {
        res.setHeader('Content-Type','text/html; charset=UTF-8')
        res.end(fs.readFileSync('fetch.html')); 
      }
             
    }  
}
const server = http.createServer((req, res) => {
  res.statusCode = 200;   
});

server.listen(5000, (v)=>{console.log('server.listen(5000)')})
        .on('error', (e)=>{console.log('server.listen(5000): error:', e.code)})
        .on('request', handler)