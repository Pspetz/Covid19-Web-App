async function kataxwrisi() {


    var harFile = document.getElementById("formFileLg").files[0];
        if (harFile) {
            var reader = new FileReader();
            reader.readAsText(harFile, "UTF-8");
    }
    console.log(reader)
    
    }
    
    kataxwrisibut.onclick=kataxwrisi;
    