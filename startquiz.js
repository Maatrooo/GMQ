
function startGame(){
    document.getElementById("gameContainer").style.display = "block";
    document.getElementById("btnP").style.display = "block";
    document.getElementById('videoSource').play();
    setTimeout(pause,3000)
    
    
}

function pause(){
    document.getElementById("videoSource").style.visibility ="visible";
}