var validUserUrl;

function checkURL(userURL){

    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"); 
    var without_regex = new RegExp("^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    var str = userURL;
    if (regex.test(str) || without_regex.test(str)) {
        validUserUrl = userURL;
        return true;
    } else {
        return false;
    }
}

function shortenURL(){
    var userURL = document.getElementById("userURL").value;

    if (!checkURL(userURL)){
        alert("Please enter a valid URL.");
        return;
    } else {
        document.getElementById("result").textContent = "temp success";
    }
}
