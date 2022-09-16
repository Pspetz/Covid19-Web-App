
var deletebutton = document.getElementById("myButton");
var kataxwrisibut = document.getElementById("eisagwgi");


async function deletehistory() {

 
 
    var db_response = await fetch('/deletestatistika');
    var db_data = await db_response.json();
    if(db_data.status === 'epituxis diagrafi dedwmenwn') {
    alert(db_data.status)
}
   
}

deletebutton.onclick=deletehistory;

async function kataxwrisi() {


    var harFile = document.getElementById("formFileLg").files[0];
        if (harFile) {
            var reader = new FileReader();
            reader.readAsText(harFile, "UTF-8");
    }
    console.log(reader)
    
    var db_response = await fetch('/deletestatistika');
    var db_data = await db_response.json();
    if(db_data.status === 'epituxis diagrafi dedwmenwn') {
    alert(db_data.status)
    }
    
    }
    
    kataxwrisibut.onclick=kataxwrisi;
    