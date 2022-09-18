
var showbut2 = document.getElementById("showbut2");
var k2 = window.localStorage.getItem('username');
async function epafi() {

    var mssg1 = {
        "username": k2
        };

    var options = {
        method : 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(mssg1)
    };
 
    var db_response = await fetch('/epafi', options);
    var db_data = await db_response.json();
    console.log(db_data);
    if(db_data.status===undefined) {
    alert('exete erthei se epafi me krousma')
    for(i in db_data){
        $("<tr><td>" + i +"</td><td>" +  db_data[i].username+  "</td><td>"+ db_data[i].magazi + "</td><td>"+ new Date(db_data[i].pote).toISOString().replace("T", " ").slice(0, 19)+ "</td></tr>").appendTo("#myepafi");
       }
    }else{
        alert(db_data.status)
    }
    
}



showbut2.onclick=epafi;