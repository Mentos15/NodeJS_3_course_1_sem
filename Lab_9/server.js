var http = require('http');
var url = require('url');
var fs = require('fs');
const {parse} = require('querystring');
let parseString= require('xml2js').parseString;
let xmlbuilder= require('xmlbuilder');
let mp=require('multiparty');


let writeHTTP405=(res)=>{
	res.statusCode = 405;
	res.statusMessage = 'Use another method';
	res.end('Use another method');
}


let http_handler=(req,res)=>
{
    if(req.method=='GET'){
      
        //1 задание
      if(url.parse(req.url).pathname === '/task1'){
        res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
        res.end("1 Task");
      }
      //2 задание
      if(url.parse(req.url).pathname === '/task2'){
        res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
        res.end("2 Task");
      }
    }
    else if(req.method=='POST')
    {
    //3 задание
        if(url.parse(req.url).pathname === '/task3'){
            let body='';
            req.on('data',chunk=>{body+=chunk.toString();});
            req.on('end',()=>{
                let o = parse(body);
                res.writeHead(200,{'Content-Type': 'text/html;charset=utf-8'});
        res.end(`x+y+s=${o['x']+o['y']+o['s']}`);
            });
            
        }
        //4 задание
        else if(url.parse(req.url).pathname=== '/task4')
        {
          let result='';
          let body='';
          req.on('data',chunk=>{body+=chunk.toString();});
          req.on('end',()=>{
            console.log(body);
            let os = JSON.parse(body);
            result={
              __comment:"Ответ.Лабораторная работа 9",
              x_plus_y:os.x+os.y,
              Concatination_s_o:os.s+'.'+os.o.surname+","+os.o.name,
              Length_m:os.m.length
            };
            res.writeHead(200,{'Content-Type': 'application/json'});
            console.log(result);
            res.end(JSON.stringify(result));}
            ,function(err,reply){
              console.log(err && err.stack);
              console.dir(reply);
                    });
          }
          //5 задание
          else if(url.parse(req.url).pathname=== '/task5')
          {
            let sumx=0;
            let resultm='';
            let id='';
            let body='';
            req.on('data',chunk=>{body+=chunk.toString();});
            req.on('end',()=>{
              console.log(body);
              parseString(body,function(err,result)
              {
                id=result.request.$.id;
                console.log(id);
                result.request.m.map((e,i)=>{
                  resultm+=e.$.value;
                          });
                          result.request.x.map((e,i)=>{
                  console.log(e.$.value);
                  sumx+=(+e.$.value);
                });
              });
              let result=xmlbuilder.create('response').att('id',id);
              result.ele('sum',{element:"x",result:sumx});
              result.ele('concat',{element:"m",result:resultm});
              res.writeHead(200,{'Content-Type': 'application/xml'});
              res.end(result.toString());}
              ,function(err,reply){
                console.log(err && err.stack);
                console.dir(reply);
              });        
            }
            // 6 задание
            else if(url.parse(req.url).pathname=== '/task6')
            {
              let result='';
              let form =new mp.Form({uploadDir:'./static'});
              form.on('field',(name,value)=>{
                console.log('------------field-------------');
                console.log(name,value);
                result+=`<br/>---${name}= ${value}`;
              });
              form.on('file', (name, file)=>{
                console.log('-----file ------------');
                console.log(name,file);
                result+=`<br/>---${name}= ${file.originalFilename}: ${file.path}`;
              });
                      form.parse(req);
            }

    }
}
var server=http.createServer(function (req, res){
    http_handler(req,res);
}).listen(5000);