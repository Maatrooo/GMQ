function mu(){
    videoSource.style = "display : block;";
    document.getElementById('videoSource').play();
    videoSource.muted = false;
    startBtn.style = "display :none";
} 

function muted(){
    videoSource.style = "display : none;";
    document.getElementById('videoSource').pause();
    videoSource.muted = true;
}

function clearAnswerInput() {
  document.getElementById("answer-input").value = "";
}


var currentManche = 0;
var nombreDeManches = 10;

function change_valeur(){
  select = document.getElementById('genre-select');
  genre = select.selectedIndex;
  console.log(genre);
  video = select.options[genre].value;
  console.log(video);
  return (video);
}

function startGame(){
  console.log('startGame called');
    currentManche++;
    document.getElementById("parametreGame").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
    clearAnswerInput()
    manchevalue.innerText = currentManche;
    maxmanchevalue.innerText = nombreDeManches;
    chooseRandomVideo();
    mu()
    cache()
    // Tu met juste la musique ici
    timer()
      setTimeout(() => {
      affiche() // Tu affiche la réponse
      checkAnswer()
      setTimeout(() => {
        if(currentManche < nombreDeManches){
          startGame() // Tu relance un cylce
        }
        else{
            // ici ecran de fin ou autre si jamais 
            cache()
            muted()
        }
      }, 11000)
    }, 10000)
}






