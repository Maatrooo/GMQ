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
var nombreDeManches = 2;

function change_valeur(){
  select = document.getElementById('genre-select');
  genre = select.selectedIndex;
  console.log(genre);

  // Écoutez l'événement de changement de valeur du <select>
  select.addEventListener('change', function() {
      // Récupérez la valeur sélectionnée
      const selectedGenre = select.value;

      // Appliquez la police correspondante en fonction de la valeur sélectionnée
      switch (selectedGenre) {
          case 'Game':
              document.body.style.fontFamily = "'Press Start 2P', sans-serif";
              break;
          case 'Film':
              document.body.style.fontFamily = 'Cinzel', sans-serif;
              break;
          case '80':
              document.body.style.fontFamily = 'Amatic SC', cursive;
              break;
          case 'AJap':
              document.body.style.fontFamily = 'Orbitron', sans-serif;
              break;
          case 'Disney':
              document.body.style.fontFamily = 'Bangers', sans-serif;
              break;
          case 'DessinA':
              document.body.style.fontFamily = 'Caveat', sans-serif;
              break;
          
          default:
              document.body.style.fontFamily = 'larsseitregular', sans-serif;
              break;
      }
  });

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
            document.getElementById("gameContainer").style.display = "none"; 
            cache()
            muted()
            document.getElementById("gameResult").style.display = "block";
        }
      }, 11000)
    }, 10000)
}






