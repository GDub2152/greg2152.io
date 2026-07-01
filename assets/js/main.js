function updateClock(){

    const now = new Date();

    // Local Time
    document.getElementById("localTime").innerHTML =
        now.toLocaleTimeString([],{
            hour:'2-digit',
            minute:'2-digit',
            second:'2-digit'
        });

    // UTC Time
    document.getElementById("utcTime").innerHTML =
        now.toUTCString().split(" ")[4] + " UTC";

}

updateClock();

setInterval(updateClock,1000);
