
var deletebutton = document.getElementById("myButton");

async function deletehistory() {

 
 
    var db_response = await fetch('/deletestatistika');
    var db_data = await db_response.json();
    if(db_data.status === 'epituxis diagrafi dedwmenwn') {
    alert(db_data.status)
}
   

}

deletebutton.onclick=deletehistory;