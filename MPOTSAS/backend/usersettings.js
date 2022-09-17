var SHA1=require('crypto-js/sha1.js');


module.exports.changeSettings =  function changeSettings(app, connection) {
    
    app.post('/settings', function (request, response) {
        //from fetch 
        var onoma=request.body['cusername']; //torino username
        var username = request.body['new_name']; //new username
        var password = SHA1(request.body['new_pass']).toString(); //new_pass
        var old_pass = SHA1(request.body['old_pass']).toString(); //old pass   

        connection.query('SELECT * FROM User WHERE username=(?)', [username], (err,result)=>{
            if(result.length >0 )
                response.send("name")
            else
            connection.query('SELECT passwd FROM User WHERE username=(?)', [onoma], (err,result)=>{
                    if(result[0]['passwd'] === old_pass){
                        connection.query('UPDATE User SET username=(?), passwd=(?) WHERE username=(?)', [username,password,onoma],function(err,res,fields){
                            connection.query('UPDATE krousma SET username=(?) WHERE username=(?)', [username,onoma],function(err1,res1,fields1){    
                                connection.query('UPDATE placetovisit SET username=(?) WHERE username=(?)', [username,onoma],function(err2,res2,fields2){  
                                if(err) console.log(err);
                            });
                        });
                    });
                            response.send("success")
                    }
                    else {
                        response.send("password")
                    }
                    
                });

            });
        });

}
