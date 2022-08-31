var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web"
});


const fs = require("fs");
fs.readFile("../../specific_3.json", "utf8", (err,data) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  const data1 = JSON.parse(data);
  con.connect(function(err) {
    if (err) throw err;
    for(let i = 0; i<data1.length; i++){
    con.query('INSERT INTO POI (id,name,address,lat,lng) VALUES (?,?,?,?,?)', [data1[i].id,data1[i].name,data1[i].address,data1[i].coordinates.lat,data1[i].coordinates.lng], function (err, result) {
      if (err) throw err;
    });
    }
    console.log("rows inserted:"+data1.length);
  });
});





