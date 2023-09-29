let usedVideoIndexes = [];


// Tableau contenant les chemins d'accès des vidéos
let videoPaths = [
"https://files.catbox.moe/4af1yu.mp4",
"https://files.catbox.moe/s49m0k.mp4",
"https://files.catbox.moe/gjm8lk.mp4",  
"https://files.catbox.moe/3izuss.mp4",
"https://files.catbox.moe/ihj88x.mp4",
"https://files.catbox.moe/0rqccn.mp4",
"https://files.catbox.moe/nyiugv.mp4",
"https://files.catbox.moe/zlp54c.mp4",
"https://files.catbox.moe/or0ksc.mp4",
"https://files.catbox.moe/g9lggy.mp4",
"https://files.catbox.moe/hcse25.mp4",
"https://files.catbox.moe/wg8qw5.mp4",
"https://files.catbox.moe/kay5lt.mp4",
"https://files.catbox.moe/7i05fv.mp4",
"https://files.catbox.moe/ycei6l.mp4",
"https://files.catbox.moe/6wx48c.mp4",
"https://files.catbox.moe/rza9f9.mp4",
"https://files.catbox.moe/uaujcy.mp4",
"https://files.catbox.moe/9sammx.mp4",
"https://files.catbox.moe/9bpt3y.mp4",
"https://files.catbox.moe/ww5tku.mp4",
"https://files.catbox.moe/twaq8p.mp4",
"https://files.catbox.moe/12te9h.mp4"


];

// Tableau contenant les noms des vidéos 
let videoNames = [
"Undertale",
"Super Mario 64",
"Black Ops 2",
"Zelda Ocarina of Time",
"Super Smash Bros: Brawl",
"Angry Birds",
"Minecraft",
"Mortal Kombat",
"Diddy Kong Racing",
"Mario Kart Wii",
"Animal Crossing New Horizons",
"Elder Scrolls V Skyrim",
"Halo",
"Inazuma Eleven",
"Fortnite",
"PacMan",
"Pokemon Noir et Blanc",
"Sea Of Thieves",
"Sonic",
"Star Wars Battlefront",
"Super Mario Odyssey",
"Super Mario Galaxy",
"Wii Sport"


];


function chooseRandomVideo() {
      let randomIndex;
      do {
          randomIndex = Math.floor(Math.random() * videoPaths.length);
      } while (usedVideoIndexes.indexOf(randomIndex) !== -1);
  
      usedVideoIndexes.push(randomIndex);
      let selectedVideoPath = videoPaths[randomIndex];
      let selectedVideoName = videoNames[randomIndex];
  
      document.getElementById("videoName").innerHTML = selectedVideoName;
      document.getElementById("videoSource").src = selectedVideoPath;
  }
  

function searchVideos() {
    
        // Récupère la valeur de l'entrée de recherche
        let searchValue = document.getElementById("answer-input").value.toLowerCase();

        // Récupère les résultats de la recherche
        let searchResults = document.getElementById("searchresults");
        searchResults.style = "display: block" ; 
        // Réinitialise les résultats de la recherche
        searchResults.innerHTML = "";
        

        // Parcours le tableau de vidéos
        for (let i = 0; i < videoNames.length; i++) {
            // Récupère le nom de la vidéo en cours
            let videoName = videoNames[i].toLowerCase();

            // Vérifie si le nom de la vidéo contient la chaîne de recherche
            if (videoName.indexOf(searchValue) !== -1) {
                // Ajoute la vidéo aux résultats de la recherche en tant qu'élément cliquable
                searchResults.innerHTML += "<ul onclick='insertSearchResult(this)' onmouseover='highlightSearchResult(this)' onmouseout='removeHighlight(this)'>" + videoNames[i] + "</ul>";
            }
        }

    }

    function insertSearchResult(result) {
        // Récupère la valeur de l'élément cliqué
        let selectedValue = result.innerHTML;

        // Insère la valeur dans la zone de réponse
        document.getElementById("answer-input").value = selectedValue;
        searchresults.style = "display: none" ; 
    }

    function highlightSearchResult(result) {
        // Ajoute la classe "highlight" à l'élément passé en paramètre
        result.classList.add("highlight");
    }
    

    function removeHighlight(result) {
        // Enlève la classe "highlight" à l'élément passé en paramètre
        result.classList.remove("highlight");
    }
     
    

function createVideoList() {
    let videoList = document.getElementById("video-list");
    for (let i = 0; i < videoNames.length; i++) {
        let videoName = videoNames[i];
        let videoPath = videoPaths[i];
        let listItem = document.createElement("li");
        listItem.innerHTML = videoName;
        listItem.onmouseover = function() {
            highlightSearchResult(this);
        };
        listItem.onmouseout = function() {
            removeHighlight(this);
        };
        
        listItem.onclick = function() {
            selectVideo(this);
        };
        videoList.appendChild(listItem);
        }
    }


    function selectVideo(listItem) {
        let videoSelec = document.getElementById("VideoSelec");
        let selectedVideoIndex = videoNames.indexOf(listItem.innerHTML);
        let selectedVideoPath = videoPaths[selectedVideoIndex];
        videoSelec.src = selectedVideoPath;
        videoSelec.load();
        
    }
    
