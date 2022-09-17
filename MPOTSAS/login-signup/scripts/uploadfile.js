
var k = document.getElementById("eisagwgh")

async function readHar() {

    
   

    var file = document.getElementById('formFileLg');
    var formData = new FormData();
    formData.append('file', file);
    console.log(formData)

const db_response = await fetch('/upload',{method: "POST", body: formData});
const db_data = await db_response.json();

}

k.onclick=readHar;

