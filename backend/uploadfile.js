module.exports.uploadfile =  function uploadfile(app, connection) {
    app.post("/upload", function (request, response) {

    var data =request.body;
    let nestedArr = new Array()
    var checklist = ["type","id","name","address","lat","lng"]

for (var i in data) {
    for (var j in checklist)
    {
        if(!(Object.keys(data[i]).includes(checklist[j])))
            data[i][checklist[j]] = null
    }
    // Sort the fields and add them to the array
    let unsorted = data[i]
    //let sorted = Object.fromEntries(Object.entries(unsorted).sort())
    let sorted = Object.keys(unsorted).reduce(function (acc, key) { 
                acc[key] = unsorted[key];
                return acc;
            }, {});
    nestedArr.push(Object.values(sorted))
        
        }
    console.log(nestedArr)
    connection.query('INSERT INTO POI (type,id,name,address,lat,lng) VALUES ?', [nestedArr], function(err,result,fields){
        connection.query('delete from POI where id_num NOT in(select * from (select MIN(id_num) FROM POI group by name ) as t  );', function(err1,result1,fields1){

        if(err1){
            console.log(err1)
            response.json({"status":"The .json file is damaged"});
        }
        else {
            response.json({"status":"Upload Successful"});

        }
    });
    }); 
}); 
};
