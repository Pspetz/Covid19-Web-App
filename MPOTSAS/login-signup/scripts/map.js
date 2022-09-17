var enterbut = document.getElementById("enterbut");
// Map initialization
var map = L.map('map').setView([38.2462420,21.7350847],16);
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
var orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
//osm layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

if (!navigator.geolocation) {
  console.log("Your browser doesn't support geolocation feature!")
} else {
    navigator.geolocation.getCurrentPosition(getPosition)
  
}
var marker, circle;
var lat=38.246639;
var lng= 21.734573;
function getPosition(position) {
  // console.log(position)
  //var lat = position.coords.latitude
 // var long = position.coords.longitude
  var accuracy = position.coords.accuracy

  if (marker) {
    map.removeLayer(marker)
  }

  if (circle) {
    map.removeLayer(circle)
  }
//suntetagmenes gia testing
  marker = L.marker(([lat, lng ]),);
  circle = L.circle([lat, lng
  ], {
    radius: 200 //APOSTASI KUKLOU
  })
  var featureGroup = L.featureGroup([marker, circle]).addTo(map)

  map.fitBounds(featureGroup.getBounds())

  console.log("Your coordinate is: Lat: " + lat + " Long: " + lng + " Accuracy: " + accuracy)
  
  
}



function deg2rad(deg) {
  return deg * (Math.PI/180)
}


async function kataxwrisi() {
  var lat1=38.246639;
  var lng2= 21.734573; 
  var search_pos =document.getElementById('search').value;

  var fields = {
      "search_pos" : search_pos
      
  };

  const options = {
      method : 'POST',
      headers: {
          'Content-Type' : 'application/json'
      },
      body : JSON.stringify(fields)
  };
 
  const db_response = await fetch('/kataxwrisi',options);
  const db_data = await db_response.json();
  if(db_data.status==="den yparxei magazi"){
    alert("Den yparxei magazi")
  }
  console.log
      var outofrange=[];
      var inrange=[];
  for(i in db_data){
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(db_data[i].lat-lat1);  // deg2rad below
      var dLon = deg2rad(db_data[i].lng-lng2); 
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(db_data[i].lat)) *  Math.sin(dLon/2) * Math.sin(dLon/2) ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = (R * c); // Distance in km
    
    if(d <= 0.2){ //200metra distace
      inrange.push(db_data[i]);
    }
    else{
      outofrange.push(db_data[i]);
    }
  }
  console.log(inrange);
  console.log(outofrange);

  //---------------gia ta shmeia pou einai ektos tou kyklou:---------------

    
    if(outofrange.length!=0){
      for(i in outofrange){
        let markersLayer = new L.LayerGroup();
        let title = outofrange[i].name;
        map.addLayer(markersLayer);
        let marker1 = L.marker(L.latLng([outofrange[i].lat,outofrange[i].lng])); 
        marker1.bindPopup('name:'+title);   
        marker1.addTo(markersLayer)
      }
    }
    //------------------------------edws kyklou-------------------------------------------
    else{
      for(i in inrange){
        let markersLayer = new L.LayerGroup();
        let title = inrange[i].name;
        map.addLayer(markersLayer);
        if(inrange[i].sum<32){
          let marker1 = L.marker(L.latLng([inrange[i].lat,inrange[i].lng]),{icon : greenIcon});
          marker1.bindPopup("name"+inrange[i].name+"<br>Ektimhsh:"+inrange[i].sum);   
          marker1.addTo(markersLayer)
        }
        else if(inrange[i].sum>=33 && inrange[i].sum<=65){
          let marker1 = L.marker(L.latLng([inrange[i].lat,inrange[i].lng]),{icon : orangeIcon});
          marker1.bindPopup("name"+inrange[i].name+"<br>Ektimhsh:"+inrange[i].sum);   
          marker1.addTo(markersLayer)
        }
        else if(inrange[i].sum > 66){
          let marker1 = L.marker(L.latLng([inrange[i].lat,inrange[i].lng]),{icon : redIcon});
          marker1.bindPopup("name"+inrange[i].name+"<br>Ektimhsh:"+inrange[i].sum);   
          marker1.addTo(markersLayer)
        }
        else {
          let marker1 = L.marker(L.latLng([inrange[i].lat,inrange[i].lng]));
          marker1.bindPopup("name"+inrange[i].name+"<br>Ektimhsh:"+inrange[i].sum);   
          marker1.addTo(markersLayer)
        }
        var mycontent = '<h5>type the name of the shop you would like to visit:</h5><br><input type="text" id="myText"<br><h5>type an estimation of the number of people inside the shop:</h5><br><input type="number" id="myText1" min="1" max="100"><br><button onclick="myFunction()">Submit</button>';
        marker.bindPopup(mycontent);
        var name=window.localStorage.getItem('username');
 
      }
    }
    //-----------------------------------------------------------------------------------------------------

    //marker1.bindPopup("Name:"+title);
      //marker1.addTo(markersLayer);
      //var mycontent = "<div class='input-group input-group-sm mb-3'><span class='input-group-text' id='inputGroup-sizing-sm'>Please type the name of your disired location</span><input id='curinput' type='text' class='form-control' aria-label='Sizing example input' aria-describedby='inputGroup-sizing-sm'></div><br> <button id='submit' type='button class='btn btn-secondary'>Submit </button> </br>";
      //marker.bindPopup(mycontent);
      

}


 // marker.bindPopup("<div class='col order-first'><div><div class='form-row'><div class='form-row'><div class='form-group col-md-15'><label for='pass'>Location</label><input type='text' class='form-control' id='tiegrapsa' placeholder=''></div><button id='sub' class='btn btn-primary mb-3'>Confirm</button></div></div>");   
 // var location = document.getElementById('tiegrapsa').value;


  //document.getElementById("sub").onclick = function() {myFunction()};

 // function myFunction() {
 //     console.log(location)
 //   }


enterbut.onclick=kataxwrisi;
//enterbut.onclick=ektimhshep;



function ConvertNumberToTwoDigitString(n) {
  return n > 9 ? "" + n : "0" + n;
}

function CurrentTimestamp() {
    var today = new Date();
    var date = today.getFullYear()+'-'+ConvertNumberToTwoDigitString(today.getMonth()+1)+'-'+ConvertNumberToTwoDigitString(today.getDate());
    var time = ConvertNumberToTwoDigitString(today.getHours()) + ":" + ConvertNumberToTwoDigitString(today.getMinutes());
    var myParam = date+ ' ' + time;
  return myParam;
}

async function myFunction() {
  var name=window.localStorage.getItem("username");
  var x = document.getElementById("myText").value;// meros
  var y=  document.getElementById("myText1").value;//mia ektimish
  var k=CurrentTimestamp()
  
  
  var fields = {
    "username" : name,
    "onomamagaziou" : x,
    "ektimhsh" : y,
    "timestamp":k
};

const options = {
    method : 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify(fields)
};

const db_response = await fetch('/episkepsh',options);
const db_data = await db_response.json();
  if(x.length===0 || y.length===0 ){
    alert("prepei na syblhrwsete kai ta 2 forms")
  }
  else{
    alert(db_data.status)
  }
}


