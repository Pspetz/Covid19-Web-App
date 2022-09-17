var message = document.getElementById('conf-message');
var sub_but = document.getElementById("sub");


function signup()
{

    message.style.display = 'none';

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var passFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var username = document.getElementById('new_username').value
    var email = document.getElementById('new_email').value;
    var password = document.getElementById('modal-password').value ;
    var conf_password = document.getElementById('modal_conf_password').value ;

    if(filter.test(email) && passFormat.test(password) && conf_password === password && username.length >=7){

        formInfo = {

            "username" : username,
            "email"    : email,
            "password" : password,
            "conf_password" : conf_password
        }
        //sunartisi tou backend-frontend
        fetch('/signup', 
            {
                method: 'POST',
                headers: {
                            'Content-Type': 'application/json'
                        },
                body: JSON.stringify(formInfo)
            })
        .then(res => res.text())
        .then(data => {
            if ( data === 'success')
            {
                message.innerHTML= "Successful Signup";
                message.style.display = 'block'
            }
            else if ( data === 'unsucc')
            {
                message.innerHTML ="Username Already Exists";
                message.style.display = 'block'
            }
        })

    }
    else {
        
        message.innerHTML = "Invalid email address format or password!";
        message.style.display = 'block'
    }

}

sub_but.onclick=signup;