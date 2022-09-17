

var showbut = document.getElementById("showbut");
var k = window.localStorage.getItem('username');

async function visithistory(){
    var mssg = {
        "username": k
        };

    var options = {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(mssg)
    };
 
    var db_response = await fetch('/visithistory', options);
    var db_data = await db_response.json();
    console.log(db_data);
    if(db_data.status === 'den uparxei kapoia kataxwrisi') {
    alert(db_data.status)
}
   
   for(i in db_data){
    $("<tr><td>" + i + "</td><td>" +  k +"</td><td>" + db_data[i].magazi + "</td><td>"+ new Date(db_data[i].pote).toISOString().replace("T", " ").slice(0, 19)+ "</td></tr>").appendTo("#mykrousma");
   }
   
 
}
showbut.onclick=visithistory;


