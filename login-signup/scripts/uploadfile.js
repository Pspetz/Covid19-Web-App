
var k = document.getElementById("eisagwgh");
let uploadValues = {};
data=new Array();

function readJson() {

    let uploadValues = {};
    var jsonFile = document.getElementById("formFileLg").files[0];
    if (jsonFile) {
        var reader = new FileReader();
        reader.readAsText(jsonFile, "UTF-8");
        reader.onload = function () {
            jsonContent = JSON.parse(reader.result);
            console.log(jsonContent)
            jsonEntry = jsonContent.entries;
            console.log(jsonEntry)
            for (var key in jsonEntry) {
        
               var valueArr = {
                    "id": jsonEntry[key]["id"],
                    "name": jsonEntry[key]["name"],
                    "address": jsonEntry[key]["address"],
                    "type": jsonEntry[key]["types"],
                    "lat": jsonEntry[key].coordinates["lat"][0],
                    "lng": jsonEntry[key].coordinates["lng"][1], 
                };

        
                uploadValues[key] = valueArr;
                data.push(valueArr);
                console.log(valueArr)
            }
            fetch("/upload",
            {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(valueArr)
            })
            .then(res => res.json())
            .then(data =>{
                if(Object.keys(data).length >0 )
                {

                alert('sucess')             
   }
                   
               
            })
        }
    }
}
k.onclick=readJson;