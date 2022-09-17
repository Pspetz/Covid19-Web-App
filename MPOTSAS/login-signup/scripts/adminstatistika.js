
var statsbutton = document.getElementById("sub");

async function statistika() {

    
    var db_response = await fetch('/statistikaadmin');
    var db_data = await db_response.json();
    console.log(db_data);
   
       
    for(i in db_data){
        $("<tr><td>" + db_data[0][i].count  + "</td><td>").appendTo("#episkepseis");
        $("<tr><td>" + db_data[1][i].count1  + "</td><td>").appendTo("#krousmata");
        $("<tr><td>" + db_data[2][i].count2  + "</td><td>").appendTo("#energakrousmata");
        $("<tr><td>" + db_data[3][0].magazi  + "</td><td>"+ db_data[3][0].count4  + "</td><td>" ).appendTo("#magazia");
        $("<tr><td>" + db_data[3][1].magazi  + "</td><td>"+ db_data[3][1].count4  + "</td><td>" ).appendTo("#magazia");


       }



}


statsbutton.onclick=statistika;

