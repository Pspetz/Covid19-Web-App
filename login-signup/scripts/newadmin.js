

async function sendUsername(){

    var mssg1 = {
        "username": document.getElementById("username").value
        };

        var options = {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(mssg1)
        };
     
        var db_response = await fetch('/giveadmin', options);
        var db_data = await db_response.json();
        console.log(db_data.status);
        alert(db_data.status)

    }
document.getElementById('confirm').onclick = sendUsername;