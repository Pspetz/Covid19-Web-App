var myInput = document.getElementById("modal-password");
var myInput2 = document.getElementById("passconfirm-modal");
var letter = document.getElementById("letter"); //
var capital = document.getElementById("capital"); //
var number = document.getElementById("number"); //
var length = document.getElementById("length");
var special_char = document.getElementById("special_char"); //

// otan patiseis panw sto password kanei trigger thn sunartisi me to event auto opote emfanizete to hidden message
myInput.onfocus = function() {
document.getElementById("message").style.display = "block";
}
// otan patiseis opoudipote allou panw stin othoni kruvei to minima
myInput.onblur = function() {
document.getElementById("message").style.display = "none";
  letter.classList.add("invalid");
  capital.classList.add("invalid");
  number.classList.add("invalid");
  length.classList.add("invalid");
  special_char.classList.add("invalid");
}

myInput2.onfocus =function() {
  document.getElementById("conf-message").style.display = "block";
}
myInput2.onblur=function() {
  document.getElementById("conf-message").style.display = "none";
}


function RegPass(input,input2) 
{ 
var pw = document.getElementById("modal-password").value;  
var caps = /[A-Z]/g ;
var lowerletter=/[a-z]/g;
var numbers = /[0-9]/g;
var special = /[ `!@#$%^&*()_+\-={};':"|,.<>?~]/ ;
if(input.value.match(caps) && input.value.match(numbers) && input.value.match(special) && input.value.match(lowerletter) && (pw.length>8) && (input.value === input2.value))
{ 
  document.getElementById("message").innerHTML = "Accepted"; 
  document.getElementById("conf-message").innerHTML ="welcome!";
return true;
}
else if(input.value.match(caps) && input.value.match(numbers) && input.value.match(special) && input.value.match(lowerletter) && (pw.length>8) && (input.value !== input2.value))
{ 
  document.getElementById("message").innerHTML = "correct pass"; 
  document.getElementById("conf-message").innerHTML ="not the same pass!";
} 
else if(!(input.value.match(caps) && input.value.match(numbers) && input.value.match(special) && input.value.match(lowerletter) && (pw.length>8)) && (input.value === input2.value))
 { 
  document.getElementById("message").innerHTML = "wrong pass"; 
  document.getElementById("conf-message").innerHTML ="same pass!";
}
else {
  document.getElementById("message").innerHTML = "wrong pass"; 
  document.getElementById("conf-message").innerHTML ="not the same pass";
}

}
