var countdown;

function timer(){
    var timeLeft = 10
    countdown = setInterval(function() {
        timeLeft--;
        document.getElementById("timer-display").innerHTML = timeLeft;
        if (timeLeft == 0) {
            clearInterval(countdown);
            console.log("Compte à rebours terminé!");
        }
    }, 1000);
}

function affiche(){
    //enlever l'image
    document.getElementById("videoSource").style.visibility="visible";
    document.getElementById("timer-display").style.display = "none";
    document.getElementById("videoName").style.display = "block";
}

function cache(){
    document.getElementById("videoSource").style.visibility="hidden";
    document.getElementById("timer-display").style.display = "block";
    document.getElementById("videoName").style.display = "none";

}

  
