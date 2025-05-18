function checkURL(userURL){

    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"); 
    var without_regex = new RegExp("^([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    var str = userURL;

    return (regex.test(str) || without_regex.test(str));
}

async function shortenURL(){
    var userURL = document.getElementById("userURL").value;

    if (!checkURL(userURL)){
        alert("Please enter a valid URL.");
        return;
    } else {
        // Valid URL entered
        //do a post request

        const res = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({url: userURL})
        })

        const data = await res.json()
        console.log(`${data.hash}`);
        document.getElementById("result").textContent = `${location.origin}/${data.hash}`;
        
    
        return;
    }
}
