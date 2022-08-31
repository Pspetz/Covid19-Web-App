var SHA1 =require( 'crypto-js/sha1.js');

module.exports.signup =  function signup(app, connection) {
    app.get('/', function (request, response) {
        response.sendFile(path.resolve('login-signup/AUTO.html'));
    });

    app.post('/signup', function (request, response) {

        var username = request.body['username'];
        var e_mail = request.body['email'];
        var password = SHA1(request.body['password']).toString();

        connection.query('SELECT * FROM User WHERE username=(?)', [username], (err,result)=>{
            if(result.length > 0 ){
                response.send("unsucc")
            }
            else{

                connection.query('INSERT INTO User (username, e_mail, passwd) VALUES (?, ?, ?)', [username, e_mail, password]);
                response.send("success")
            }
        });

    });
}

/*var person={
    "first_name":"Harry",
    "last_name":"Potter",
    "age":14
};
var personSize = Object.keys(person).length; //gets number of properties (3)  */