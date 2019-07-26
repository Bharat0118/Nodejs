var express=require('express');
var app=express();

var path=require('path');
app.set('views',path.join(__dirname,'views'));
app.set('view engine','hbs');
app.listen(3000,()=>{
console.log('server created and started on port 3000');``
});
var bodyParser=require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));

app.get('/',(request,response)=>{
//response.setHeader("Content-Type","text/html");
//response.end("<h1>Hello from node js<h1>");
response.render('index',{'msg':''});

});
app.get('/createEmp',(request,response)=>{
response.render('createEmp')
});

app.get('/viewEmp',(request,response)=>{
  var sql="select * from employee";
  con.query(sql,(err,result)=>{
  if(err) throw err;
  else{
  console.log(result);
  response.render('viewEmp',{'list':result});
      }
  });
});



app.post('/empInsert',(request,response)=>{

var eid=request.body.eid;
var ename=request.body.ename;
var salary=request.body.salary;
console.log(eid+ename+salary);

var sql="insert into employee values('"+eid+"','"+ename+"','"+salary+"')";
con.query(sql,(err,result)=>{
console.log(result);
if(err) throw err;
else
response.render('createEmp',{'msg':'Data inserted successfully...'});

});
});



app.get('/deleteEmp',(request,response)=>{
  var eid=request.query.eid;
  var sql="delete from employee where eid='"+eid+"'";
  console.log(sql);
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else{
  var sql="select * from employee";
    con.query(sql,(err,result)=>{
    if(err) throw err;
    else{
    response.render('viewEmp',{'list':result,'msg':'Data Deleted'});
        }
    });
      }
});
});

app.post('/empUpdateAction',(request,response)=>{
  var eid = request.body.eid;
  var ename = request.body.ename;
  var salary = request.body.salary;
  var sql = "update Employee set ename='"+ename+"', salary='"+salary+"', where eid="+eid;
  con.query(sql,(err,result)=>{
    console.log(result)
      if(err)throw err;
      else {
        var sql = "select * from employee";
        con.query(sql,(err,result)=>{
          if(err)throw err;
          else {
            console.log(result)
            response.render('viewEmp',{'list':result,'msg':'Data updated..'})
          }
        });
      }
  });

});

app.get('/updateEmp',(request,response)=>{
  var eid=request.query.eid;
  var sql="select from employee where eid="+eid;
  console.log(sql);
  con.query(sql,(err,result)=>{
    if(err) throw err;
    else{
      console.log(result);
    response.render('viewEmp',{'list':result,'msg':'Data updated'});
        }
    });
});


var con=require('./db');
app.post('/loginCheck',(request,response)=>{
var uid=request.body.uid;
var pwd=request.body.pwd;

var sql="select * from login where userID='"+uid+"'and password='"+pwd+"'";
con.query(sql,(err,result)=>{
  if(err) throw err;
  else if(result.length>0)
  response.render('home');
  else
  response.render('index',{'msg':'Login Fail'});
});
});
















// var express=require('express');
// var app=express();
//
// var path = require('path');
// app.set('views',path.join(__dirname,'views'));
// app.set('view engine','hbs');
// app.listen(3000,()=>{
//   console.log('Server Created and Started on Port 3000');
// });
// app.get('/',(request,response)=>{
//   //response.setHeader("Content-Type","text/html");
//   //response.end("<h1>Hello from NodeJS</h1>");
// //  response.render('index');
//  response.render('index',{'msg':'Login Form'});
// });
//
// var bodyParser = require('body-parser')
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended:true
// }));
//
// // if(uid=='admin' && pass=='admin')
// // response.render('home')
// // // response.render('index',{'msg':'Login Success'});
// //  else
// //  response.render('index',{'msg':'Login Fail'});
// // });
//
// var con = require('./db');
// app.post('/loginCheck',(request,response)=>{
// var uid = request.body.uid;
// var pass = request.body.pwd;
// var sql = "select * from login where userID='"+uid+"'and password='"+pass+"'";
// con.query(sql,(err,result)=>{
// //  console.log(result);
//   if(err)throw err;
//   else if (result.length>0)
//   response.render('home');
//   else
//   response.render('index',{'msg':'Login Fail'});
// });
//
// app.get('/createEmp',(request,response)=>{
//   response.render('createEmp');
// });
// app.get('/viewEmp',(request,response)=>{
//   var sql = "select * from Employee ";
//   con.query(sql,(err,result)=>{
//     if(err)throw err;
//     else{
//        console.log(result);
//     response.render('viewEmp',{'list':result});
//         }
//   });
//  });
// app.post('/empInsert',(request,response)=>{
// var eid = request.body.eid;
// var ename = request.body.ename;
// var salary = request.body.salary;
// var sql = "insert into Employee values('"+eid+"','"+ename+"','"+salary+"') ";
// con.query(sql,(err,result)=>{
//  console.log(result);
//   if(err)throw err;
//   else
//   response.render('createEmp',{'list':'Data inserted Successfully'});
// });
//
// });
//
// });
