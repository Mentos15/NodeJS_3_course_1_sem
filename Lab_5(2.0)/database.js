var util = require('util');
var ee = require('events');

var db_data =[
{id:1, name: 'Иванов И.И.', bday:'2000-01-01'},
{id:2, name: 'Петров П.П.', bday:'2000-01-02'},
{id:3, name: 'Сидоров С.С.', bday:'2000-01-03'},
{id:4, name: 'Павлов П.И.', bday:'2000-01-04'},
{id:5, name: 'Семенов С.М.', bday:'2000-01-05'}
];



function DB(){
    this.active = false;
    this.count = 0;
    this.comm = 0;
    this.startStatisticTime = new Date();
    this.stopStatisticTime = new Date();
    this.select = ()=>{
        if(this.active === true){
            this.count++;
        }
        return db_data;
    };
    this.insert = (r)=>{
        if(this.active === true){
            this.count++;
        }
        db_data.push(r);
    };
    this.update = (r)=>{
        if(this.active === true){
            this.count++;
        }

        var index = db_data.findIndex(function(item, i){
            return item.id == r.id;
        });
        if(index!=-1){
            db_data[index].name = r.name;
            db_data[index].dbay = r.dbay;
            return db_data[index];
        }
        else
            return 'not found';
    };
    this.delete = (id)=>{
        if(this.active === true){
            this.count++;
        }

        var index = db_data.findIndex(function(item, i){
            return item.id === id;
        });
        if(index!=-1)
            return db_data.splice(index, 1);
        else
            return 'not found';
    };
    this.commit = ()=>{
        if(this.active === true){
            this.comm++;
        }

        console.log('commit');
    };
    this.getStatistics = ()=>{
        let stat;
        if(this.active === true){
             stat =[
                {start: "", finish: "", request:this.count, commit:this.comm}
            ];
            return stat;
        }else{
            var x = this.startStatisticTime;
            var strX= String(x.getMonth()+1) +'/'+ String(x.getDate()) + '/' + x.getFullYear();
            var y = this.stopStatisticTime;
            var strY=String(y.getMonth()+1) +'/'+ String(y.getDate()) + '/' + y.getFullYear();
             stat =[
                {start: strX, finish: strY , request:this.count, commit:this.comm}
            ];
            return stat;
        }

    }
}

util.inherits(DB, ee.EventEmitter);

exports.DB = DB;