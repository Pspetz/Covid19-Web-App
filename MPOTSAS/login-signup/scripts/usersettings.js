var butt =document.getElementById("sub");


function changeSettings(){
    var error_alert = document.getElementById("alert_error");
    var success_alert = document.getElementById("alert_success");
    //Password format: At least 8 TOTAL characters, at least 1 lower-case char, 
    //at least 1 upper-case char, at least 1 number, at least 1 special character
    var passFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var new_pass = document.getElementById('new_pass').value
    var confirm_pass = document.getElementById('confirm_pass').value
    var namee=document.getElementById('Current_username').value
    //EAN MEINEI EMPTY KAPOIO FIELD ERROR
    if(namee.length ===0 || new_pass.length ===0 || confirm_pass.length===0 || document.getElementById('new_username').value.length === 0 || document.getElementById('old_pass').value.length===0)
    {
        error_alert.innerHTML = "empty field";
        error_alert.style.display="block"
        setTimeout(function(){ error_alert.style.display="none"; }, 3000);   
    }
    //EAN OLA OKAY 
    else 
    {
        var info = {
            "cusername":document.getElementById('Current_username').value,
            "new_name": document.getElementById('new_username').value,
            "new_pass": document.getElementById('new_pass').value,
            "confirm_pass": document.getElementById('confirm_pass').value,
            "old_pass": document.getElementById('old_pass').value,
            }
    }

    //NEES SUNTHIKES GIA ELEGXO TON DEDWMENON POU EVALE O XRISTIS

    if(passFormat.test(info['new_pass']) && info['new_pass'] === info['confirm_pass'] && info['cusername'].length >0 && info['old_pass'].length>0 ){
        fetch('/settings',
        {
        method: 'POST',
        headers: {
      'Content-Type': 'application/json'
    },
        body: JSON.stringify(info)
    })
    .then( res => res.text())
    .then( data => {
        
        if(data === "success"){
            success_alert.innerHTML="Settings changed succesfully";
            //document.cookie = JSON.stringify({"username": fields['new_name']});
            success_alert.style.display="block"
            setTimeout(function(){ success_alert.style.display="none"; }, 3000);
            window.localStorage.setItem('username',info.new_name)

        }
        
        else if (data === "name"){
            error_alert.innerHTML ="Username already exists";
            error_alert.style.display="block"
            setTimeout(function(){ error_alert.style.display="none"; }, 3000);
        }

        else if (data === "password"){
            error_alert.innerHTML ="Incorrect old password";
            error_alert.style.display="block"
            setTimeout(function(){ error_alert.style.display="none"; }, 3000);
        }
    })

    }

    else if(new_pass.length > 0 && (!passFormat.test(info['new_pass']))) {
        error_alert.innerHTML = "incorrect password format";
        error_alert.style.display="block"
        setTimeout(function(){ error_alert.style.display="none"; }, 3000);
    }
    else if(info['new_pass'] !== info['confirm_pass']){

       error_alert.innerHTML = "Confirm password doesn't match the new password";
       error_alert.style.display="block"
       setTimeout(function(){ error_alert.style.display="none"; }, 3000);
    }
    else { 
        error_alert.innerHTML = "something went wrong";
        error_alert.style.display="block"
        setTimeout(function(){ error_alert.style.display="none"; }, 3000);
    }
  
}

butt.onclick = changeSettings;