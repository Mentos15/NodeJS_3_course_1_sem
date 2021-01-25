var util = require('util');
var ee = require('events');

var db_data =[
    {id:653643, name: 'Иванов И.И.', bday:'2000-01-01'},
    {id:265433, name: 'Петров П.П.', bday:'2000-01-03'},
    {id:973052, name: 'Сидоренко С.А.', bday:'2003-12-03'},
    {id:964295, name: 'Павлов П.И.', bday:'2000-01-04'},
    {id:659742, name: 'Семенов С.М.', bday:'2000-01-12'}
];

function DB(){
    this.get =()=>{return db_data;};
    this.post = (r)=>{db_data.push(r);};
    this.delete = (s)=>{
        let Index=db_data.findIndex(item=>item.id==s);
        let data=db_data[Index];
        db_data.splice(Index,1);
        return data;};
    this.put = (r,s)=>{
        console.log(r);
        let Index=db_data.findIndex(item=>item.id==r.id); 
        db_data.splice(Index,1,r);};  
    this.commit = ()=>{console.log("zjfsjgsog")}; 
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;