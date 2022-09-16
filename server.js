var path= require('path');
const express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser'); //all http requests ta opoia eksagonte sto body.request
var login= require('./backend/login.js');
var signup =require('./backend/signup.js');
var changeSettings = require('./backend/usersettings.js');
const e = require('express');
const app = express();
app.use(express.json());
var createError = require('http-errors');
//var deg2rad = require('deg2rad');
var cors = require('cors')
var http = require('http');
var util = require('util');
const url = require('url');
var formidable = require('formidable');
var haversine = require("haversine-distance");

//var login =require('./backend/login.js');
app.use(express.static(path.join(__dirname,"public")))



if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

//var login = require('./backend/login.js')
//var user_settings = require('./backend/user_settings.js')
// var geoloc = require('./backend/geoloc.js')


// const exphbs = require('express-handbars')


app.set('view-engine', 'html')
app.use(express.urlencoded({
  extended: false
}))

//app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json({limit:"500mb" , extended:true , parameterLimit:50000}));
app.use(bodyParser.urlencoded({limit:"500mb" , extended:true,parameterLimit:50000}));

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web",
  multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("SQL Connected");
});


var PORT = 3000;
 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

app.use(cors({
  credentials: true,
  preflightContinue: true,
  methods: "GET, POST, PUT, PATCH , DELETE, OPTIONS",
  origin: true
}));



//ISTORIKO USER KROUSMA
app.all('/visithistory',(request,response) =>{
  var new_name = request.body['username'];
  console.log(new_name);
  connection.query('SElECT magazi,pote from krousma where username =(?)',[new_name],(err,result) =>{
    connection.query('SElECT id_user from User where username =(?)',[new_name],(err1,result1) =>{
    if(result1.length>0){
    response.json(result)
    }else {
      response.json({"status":"den uparxei kapoia kataxwrisi"});
    }
  });
});
});

//ISTORIKO USER EKTIMISI
app.all('/historyektimisi',(request,response) =>{
  var new_name = request.body['username'];
  console.log(new_name);
  connection.query('SElECT username,magazi,pote,ektimhsh from placetovisit where username =(?)',[new_name],(err,result) =>{
    connection.query('SElECT id_user from User where username =(?)',[new_name],(err1,result1) =>{
    if(result1.length>0){
    response.json(result)
    console.log(result)
    }else {
      response.json({"status":"den uparxei kapoia kataxwrisi"});
    }
  });
});
});


// DILWSI KROUSMATOS// 
app.post('/krousma',(request, response) => {
  var magazi = request.body['magazi'];
  //var body = [];
  //var mmsg = {};
  var username = request.body['username'];
  var dateval = request.body['datval'];
  var timeval = request.body['timeval'];
  var magazi = request.body['magazi'];
  
  var mmsg = { "name" :username,
                "number":1,
                "dat" : dateval + " " + timeval,
                "magazi" :magazi
                
  };
  
    connection.query('SELECT pote FROM krousma WHERE username = ? ', [mmsg.name], (error, result) =>{
      connection.query('SELECT name FROM POI WHERE name = ? ', [mmsg.magazi], (error1, result1) => {
        console.log(result.length);
        console.log(result1.length);
           if (result.length ===0 && result1.length>0) {
             connection.query('INSERT INTO krousma (username,magazi,pote) VALUES (?, ?,?)', [mmsg.name, mmsg.magazi,mmsg.dat])
             response.json({"status":"epityxia"})
            }
            else if (result.length >0 && result1.length > 0) {
              
                var d1 = mmsg.dat;
                d1 = new Date(d1);
                var d2=result[result.length-1].pote;
                var diafora_xronou = d1.getTime()-d2.getTime();
                var diafora_imeras = diafora_xronou /(1000 * 3600 * 24);
                console.log(diafora_imeras);
                console.log(d1);
                console.log(d2);

                if(diafora_imeras >=14){
                connection.query('insert into krousma (username,magazi,pote) VALUES (?,?,?)', [mmsg.name,mmsg.magazi,mmsg.dat]);
                 response.json({"status":"deksth allagh"})
                }
                else{
                  response.json({"status":"exeis valei idi hmeromhnia"})
                }
              

            }
            else if(result1.length===0){
              response.json({"status":"den yparxei magazi me ayto to onoma"})
            }
         
            //res.write(JSON.stringify(mmsg));
            //res.end();

       
   }); 
  });
  
 
});

//SEARCH MAGAZIOU GIA KATAXWRISI

app.all('/kataxwrisi',(request,response) =>{
  //var lat1 = request.body['lat'];
  //var lng2 = request.body['lng'];
  var search_position = request.body['search_pos'];
  var emptytime=[];
  var without_ektimhsh=[];
  var lat1=38.246639;
  var lng2= 21.734573;
  connection.query('Select name,lat,lng from POI where name=(?)',[search_position],(err,result1) =>{
  connection.query('SElECT POI.name,POI.lat,POI.lng,placetovisit.pote,placetovisit.ektimhsh from placetovisit INNER JOIN POI where POI.name =(?) and placetovisit.magazi=(?)',[search_position,search_position],(err,result) =>{
    console.log(result)
   if(result1.length ===0) {
    response.json({"status":"den yparxei magazi"})
   }
   else {
    for(i in result){
      var l=new Date();
      var n=l.getTime();
      var d2=result[i].pote;
      var diffInMillis = n - d2.getTime()
      var isLessThan2Hour = diffInMillis < 60 * 120 * 1000;
      console.log(isLessThan2Hour)
      if(isLessThan2Hour){
        emptytime.push(result[i])
      }
     else{
  without_ektimhsh.push(result[i])
    without_ektimhsh.forEach(object => {
      delete object['ektimhsh'];
    });
      }
    }
   //console.log(emptytime)
  //console.log(without_ektimhsh)
   var sum=0;
  for(i in emptytime){
    sum=sum+emptytime[i].ektimhsh
  }
  emptytime.forEach(userObj => {
    userObj.sum = sum;
  });

  if(isLessThan2Hour){
    response.json(emptytime)
  }
 else{
response.json(result1)
  }
  
   }
  });
}); 

  });


  //EPISKEPSEI 
  app.post('/episkepsh',(request,response) =>{

    var username = request.body['username'];
    var magazi = request.body['onomamagaziou'];
    var ektimhsh = request.body['ektimhsh'];
    var timestamp = request.body['timestamp'];

    var lat1=38.246639;
    var lng2= 21.734573; 
    var place_in =[];
    var outofrange = [] ; 

    connection.query('select name,lat,lng from POI where name = (?) ',[magazi],(err,result) =>{
      for (i in result){
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(result[i].lat-lat1);  // deg2rad below
        var dLon = deg2rad(result[i].lng-lng2); 
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(result[i].lat)) *  Math.sin(dLon/2) * Math.sin(dLon/2) ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = (R * c); // Distance in km
        if(d <= 0.2) {
        place_in.push(result[i])
        outofrange.length = 0;
        }
        else {
          while(place_in.length > 0) {
            place_in.pop();
        }
        outofrange.push(result[i])
        }
      }

      //console.log(place_in.length && place_in[0].name===magazi)
      if(place_in.length > 0) {
        connection.query('INSERT INTO placetovisit (username,magazi,pote,ektimhsh) VALUES (?,?,?,?)',[username,magazi,timestamp,ektimhsh],(err,result) =>{
          response.json({"status":"epityxhs dhlwsh"})
        });
      }
      else {
        response.json({"status":"ektos emveleias"})
      }
        });


    });




function deg2rad(deg) {
  return deg * (Math.PI/180)
}



// EAN HRTHE SE EPAFI// 
app.post('/epafi',(request, response) => {

  var username = request.body['username'];


  
    connection.query("SELECT pote,username FROM krousma WHERE username like '"+username+"' ", (error2, result2) =>{
      connection.query("SELECT pote,magazi FROM placetovisit WHERE username like '"+username+"' ", (error1, result1) =>{
      
//EAN EINAI KROUSMA KAI EXEI PAEI SE MAGAZIA
        if( result1.length >0 && result2.length>0) {
        //var magazi =result1[0].magazi;
        //var krousma_name = result2[0].username;
        var arr=[];
          var y;
          for (var i in result1) {
            y=result1[i].magazi;
            arr.push(y)
        }
        var magazi =result1[0].magazi;
        console.log(arr)

     
      var apotelesma =result2[0].pote.toISOString().replace("T", " ").slice(0, 11)
      console.log(apotelesma);
      const apo =new Date(apotelesma);
      const myDate = new Date(apotelesma);
      const nextDayOfMonth = myDate.getDate()-7;
      myDate.setDate(nextDayOfMonth);
      const newDate = myDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')
      console.log(newDate)

      //UPOLOGISE +-2
      var n=myDate.getTime();
      var d2=result2[0].pote;
      var diffInMillis = n - d2.getTime()
      var isLessThan2Hour = diffInMillis < 60 * 120 * 1000;
      console.log(isLessThan2Hour)

      const onedayletter = myDate.getDate()+9;
      myDate.setDate(onedayletter);
      const x= myDate.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,11);
console.log(x)


      if(isLessThan2Hour)
      {
     //SWSTA QUERY
      var myquery ="select krousma.username, krousma.pote,placetovisit.username,placetovisit.pote,placetovisit.magazi from placetovisit INNER Join krousma where  krousma.pote BETWEEN ? AND ? AND placetovisit.pote BETWEEN ? AND ? AND placetovisit.username not like \'"+username+"\' and krousma.username=placetovisit.username and placetovisit.magazi in (?);";

        connection.query(myquery,[newDate,x,newDate,x,arr],(error, result) => {  
          if (error) {
            console.log(error);
        }                                      

           if (result.length >0 ) {
             console.log(result)
              response.json(result)
        
            }
                else{
                  response.json({"status":"den uparxei epafi me krousma "})
                }
        
            //res.write(JSON.stringify(mmsg));
            //res.end();

  
});
      }
      else{
        response.json({"status":"den uparxei epafi me krousma entos 2 wrwn"})
      }
//O XRISTIS DEN EINAI KROUSMA ALLA EXEI PAEI SE MAGAZI
    } else if(result1.length >0){
      var mquery2 = "select pote,magazi from krousma where username not like '"+username+"' ;";
      var mquery3 = "select pote,magazi from placetovisit where username  like '"+username+"' ;";

      connection.query(mquery2, (error4, result4) => {  
        connection.query(mquery3, (error5, result5) => {  
          var arr=[];
          var y;
          for (var i in result5) {
            y=result5[i].magazi;
            arr.push(y)
        }
        var magazi =result5[0].magazi;
        console.log(arr)

        

    
    
      var apotelesma =result4[0].pote.toISOString().replace("T", " ").slice(0, 11)
      console.log(apotelesma);
      const apo =new Date(apotelesma);
      const myDate = new Date(apotelesma);
      const nextDayOfMonth = myDate.getDate()-7;
      myDate.setDate(nextDayOfMonth);
      const newDate = myDate.toISOString().replace(/T/, ' ').replace(/\..+/, '')
      console.log(newDate)

      //UPOLOGISE +-2
      var n=myDate.getTime();
      var d2=result4[0].pote;
      var diffInMillis = n - d2.getTime()
      var isLessThan2Hour = diffInMillis < 60 * 120 * 1000;
      console.log(isLessThan2Hour)

      const onedayletter = myDate.getDate()+9;
      myDate.setDate(onedayletter);
      const x= myDate.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,11);
console.log(x)

    
      //SWSTA QUERY
      if(isLessThan2Hour)
      {
       var truequery ="select placetovisit.username,placetovisit.magazi,placetovisit.pote,krousma.username,krousma.pote from placetovisit INNER join krousma WHERE krousma.pote BETWEEN ? AND ? AND placetovisit.pote BETWEEN ? AND ? AND placetovisit.username not like \'"+username+"\' and placetovisit.magazi IN (?);";

      //var truequery ="select placetovisit.username,placetovisit.magazi,placetovisit.pote,krousma.username,krousma.pote from placetovisit INNER join krousma WHERE krousma.pote BETWEEN ? AND ? AND placetovisit.pote BETWEEN ? AND ? AND placetovisit.username not like \'%"+username+"%\'  and krousma.username =placetovisit.username; ";
                     //select placetovisit.username,placetovisit.magazi,placetovisit.pote,krousma.username,krousma.pote from placetovisit INNER join krousma where krousma.pote BETWEEN '2022-09-06' AND '2022-09-14' AND  placetovisit.username not like '%kostas123' and krousma.username=placetovisit.username;

        const values = [newDate, apotelesma];  


        connection.query(truequery,[newDate,x,newDate,x,arr],(error, result) => {  
          console.log(result)
          if (error) {
            console.log(error);
        }                                      

           if (result.length >0 ) {
             console.log(result)
              response.json(result)
        
            }
                else{
                  response.json({"status":"den uparxei epafi me krousma "})
                }
                
        


      
    });
  } //if
  else{
    response.json({"status":"den uparxei epafi me krousma entws 2 wrwn"})

  }
});
  });
      
    }else{
      response.json({"status":"den uparxei epafi me krousma"})
    }
   
});
    });
});






// ADMIN // 


//ISTORIKO USER EKTIMISI
app.all('/deletestatistika',(request,response) =>{
  connection.query('DELETE  from POI ');

    response.json({"status":"epituxis diagrafi dedwmenwn"});
    
});



// ADMIN STATISTIKA
app.all('/statistikaadmin',(request,response) =>{

      const myDate = new Date();
      const myDate1 = new Date();
      today=myDate.toISOString().replace("T", " ").slice(0, 11)
      const sevendaysago = myDate.getDate()-7;
      const fdaysletter = myDate1.getDate()+14; 
      myDate.setDate(sevendaysago);
      myDate1.setDate(fdaysletter);
      const newDate = myDate.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,11)
      const newDate1 = myDate1.toISOString().replace(/T/, ' ').replace(/\..+/, '').slice(0,11)
      console.log(today)
      console.log(newDate)
      console.log(newDate1) 

  connection.query('Select count(username) as count from placetovisit; select count(username) as count1 from krousma; select count(username) as count2 from krousma where pote between ? AND ?; select POI.type as magazi,sum(DISTINCT ektimhsh) as count4 from POI inner join placetovisit where POI.name=placetovisit.magazi group by type;',[newDate,newDate1],(error, result) => {  
    response.json(result)
    
});
});


//STATISTIKA MAGAZIWN:
// select magazi,SUM(ektimhsh) from placetovisit GROUP BY magazi;





login.login(app,connection,path);

signup.signup(app,connection);

changeSettings.changeSettings(app,connection);

//user_settings.user_settings(app, express, connection);
// geoloc.geoloc()


app.use(express.static('login-signup')); // includes bootstrap


//x=app.use("/settings" , require("./backend/usersettings"))

//app.use("/usersettings" , require("./login-signup/scripts/usersettings"))





function getDifferenceInHours(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}