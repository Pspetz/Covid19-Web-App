
//var statsbutton = document.getElementById("Stats");

async function statistika() {

    
    var db_response = await fetch('/statistikaadmin');
    var db_data = await db_response.json();
    console.log(db_data);
    if(db_data.status === 'den uparxoun statistika') {
    alert(db_data.status)
}
   console.log(db_data);
for(i in db_data){
    $("<tr><td>"  + db_data + "</td><td>").appendTo("#krousmata");
   }
   

}



//statsbutton.onclick=statistika;