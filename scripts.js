var validUserUrl;

function checkURL(userURL){
    let url;

    try {
        url = new URL(userURL);
    }
    catch (error){
        return false;
    }
    validUserUrl = userURL;
    return true;
}

function shortenURL(){
    var userURL = document.getElementById("userURL").value;

    if(!checkURL(userURL)){
        alert("Please enter a valid URL.");
        return;
    } else {
        document.getElementById("result").textContent = "temp success";
    }
}