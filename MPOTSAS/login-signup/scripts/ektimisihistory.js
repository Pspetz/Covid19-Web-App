
var showbut1 = document.getElementById("showbut1");
var k1 = window.localStorage.getItem('username');
async function ektimisihistory() {

    var mssg1 = {
        "username": k1
        };

    var options = {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(mssg1)
    };
 
    var db_response = await fetch('/historyektimisi', options);
    var db_data = await db_response.json();
    console.log(db_data);
    if(db_data.status === 'den uparxei kapoia kataxwrisi') {
    alert(db_data.status)
}
   
for(i in db_data){
    $("<tr><td>" + i + "</td><td>" + db_data[i].magazi  + "</td><td>" + db_data[i].ektimhsh +"</td><td>"+ new Date(db_data[i].pote)+ "</td></tr>").appendTo("#myvisits");
   }
   

}



showbut1.onclick=ektimisihistory;