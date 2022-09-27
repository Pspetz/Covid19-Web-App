
var k = document.getElementById("eisagwgh");
let uploadValues = {};
data=new Array();


function uploadfile() {

    let uploadValues = {};
    var jsonFile = document.getElementById("formFileLg").files[0];
    if (jsonFile) {
        var reader = new FileReader();
        reader.readAsText(jsonFile, "UTF-8");
        reader.onload = function () {
            JsonEnt = JSON.parse(reader.result);

            for (var key in JsonEnt) {
       

                valueArr = {
                    "type":JsonEnt[key]['types'][0],
                    "id": JsonEnt[key]["id"],
                    "name": JsonEnt[key]["name"],
                    "address": JsonEnt[key]["address"],
                    "lat": JsonEnt[key].coordinates.lat,
                    "lng": JsonEnt[key].coordinates.lng,
                };

                
                uploadValues[key] = valueArr;
            }
            fetch("/upload",
            {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(uploadValues)
            })
            .then(res => res.json())
            .then(data =>{
                if(data.status==='The .json file is damaged')
                {
                 alert("something went wrong!")
                }
                   
                else 
                {
               alert("successfull upload!")
                }
            })
        }

    }
}

k.onclick = uploadfile; 