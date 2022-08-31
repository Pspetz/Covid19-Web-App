
var koumpi = document.getElementById('epivevewsi');

async function covidcase() {
  var date_regex = /^\d{4}-\d{2}-\d{2}$/;
  var time_regex =  /^\s*([01]?\d|2[0-3]):?([0-5]\d).*$/;
  var topothesia =  document.getElementById("topothesia").value;
  var datval1 =document.getElementById("dateval").value;
  var timeval1= document.getElementById("timeval").value;
  var k = window.localStorage.getItem('username')

if (timeval1.length === 0 || datval1.length === 0 || topothesia.length ===0){
  alert("den exete vali wra h hmera");
}
else{
  var mssg = {
  "username": k,
  "datval" : datval1,
  "timeval" :timeval1,
  "magazi":topothesia
  };

 
  const options = {
    method : 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(mssg)
};
const db_response = await fetch('/krousma',options);
const db_data = await db_response.json();
alert(db_data.status)
}

}

koumpi.onclick=covidcase;