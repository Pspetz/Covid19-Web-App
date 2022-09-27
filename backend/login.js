var CryptoJS = require('crypto-js');
var path = require('path');

module.exports.login =  function login(app,connection,path) {
 app.get('/', function (request, response) {
        response.sendFile(path.join(__dirname, '../login-signup', 'AUTO.html'));
    });
    app.post('/AUTH', function(request, response) {
        var username = request.body['username'];
        var password = CryptoJS.SHA1(request.body['password']);
        if (username && password) {
            connection.query('SELECT username,passwd,isAdmin,id_user FROM User WHERE username = ? ', [username], function(error, result) {
                if (result.length > 0 && result[0].passwd === CryptoJS.enc.Hex.stringify(password) && result[0].isAdmin===0) {
                    response.send('/home1.html');
                } else if(result.length > 0 && result[0].passwd === CryptoJS.enc.Hex.stringify(password) && result[0].isAdmin===1) {
                    response.send('/adminpage.html');
                }	
                else {
                    response.send('Incorrect Username and/or Password!');
                }
            });
        } else {
            response.send('Please enter Username and Password!');
        }
    });
    

}


