let usedVideoIndexes = [];
let videos;

// Charger les vidéos depuis le fichier JSON
fetch("./../json/video.json")
.then(response => response.json())
.then(data => {
  // Maintenant, vous avez accès aux données JSON dans la variable "data".
  videos = data.videos; // Assurez-vous que la structure du fichier JSON correspond à ce que vous attendez.
  createVideoList();
})
.catch(error => console.error('Erreur lors du chargement des vidéos :', error));


function chooseRandomVideo() {
    option = change_valeur();
    console.log(option);
    // Filtrer les vidéos non sélectionnées
    const filteredVideos = videos.filter(video => !video.selected &&  video.genre === option);
    
    
    // Vérifier s'il reste des vidéos non sélectionnées
    if (filteredVideos.length === 0) {
      // Toutes les vidéos ont été sélectionnées, réinitialiser le statut "selected"
      videos.forEach(video => {
        video.selected = false;
      });
    } else {
      // Sélectionner une vidéo aléatoire parmi les vidéos non sélectionnées
      const randomIndex = Math.floor(Math.random() * filteredVideos.length);
      const selectedVideo = filteredVideos[randomIndex];
  
      // Mettre à jour le statut "selected" de la vidéo
      selectedVideo.selected = true;
  
      // Mettre à jour l'interface utilisateur avec la vidéo sélectionnée
      document.getElementById("videoName").innerHTML = selectedVideo.name;
      document.getElementById("videoSource").src = selectedVideo.path;
    }
  }
  



  function searchVideos() {
    let searchValue = document.getElementById("answer-input").value.toLowerCase();
    let searchResults = document.getElementById("searchresults");
    searchResults.style = "display: block";
    searchResults.innerHTML = "";

    for (let i = 0; i < videos.length; i++) {
        let videoName = videos[i].name.toLowerCase();

        if (videoName.indexOf(searchValue) !== -1) {
            searchResults.innerHTML += "<ul onclick='insertSearchResult(this)' onmouseover='highlightSearchResult(this)' onmouseout='removeHighlight(this)'>" + videos[i].name + "</ul>";
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
        let selectedCategory = document.getElementById("genre-select").value;
    
        // Vider la liste existante
        videoList.innerHTML = "";
    
        let uniqueVideoNames = [];
    
        for (let i = 0; i < videos.length; i++) {
            let video = videos[i];
            let videoName = video.name;
            let videoCategory = video.genre;
    
            // Vérifier si le nom de la vidéo n'est pas déjà présent dans la liste
            // et si la catégorie correspond à celle sélectionnée
            if (!uniqueVideoNames.includes(videoName) && (selectedCategory === "" || videoCategory === selectedCategory)) {
                uniqueVideoNames.push(videoName);
    
                let listItem = document.createElement("li");
                listItem.innerHTML = videoName;
    
                listItem.onmouseover = function () {
                    highlightSearchResult(this);
                };
                listItem.onmouseout = function () {
                    removeHighlight(this);
                };
                listItem.onclick = function () {
                    selectVideo(this);
                };
    
                videoList.appendChild(listItem);
            }
        }
    
        sortVideoListAlphabetically(videoList);
    }
    
    
    function selectVideo(listItem) {
        let videoSelec = document.getElementById("VideoSelec");
        let selectedVideoName = listItem.innerHTML;
        let background_video = document.getElementById("background-video");
        
        let selectedVideo = videos.find(video => video.name === selectedVideoName);
        if (selectedVideo) {
            videoSelec.src = selectedVideo.path;
            videoSelec.load();
            background_video.src = selectedVideo.path;
            background_video.load();

            let videoNameDisplay = document.getElementById("videoNameDisplay");
            videoNameDisplay.textContent = selectedVideoName;
        }
        
    }
    
    function sortVideoListAlphabetically(videoList) {
        // Convertir les éléments de la liste en un tableau
        let videoArray = Array.from(videoList.children);
    
        // Trier le tableau en fonction du texte à l'intérieur des éléments li
        videoArray.sort(function (a, b) {
            let textA = a.innerHTML.toUpperCase();
            let textB = b.innerHTML.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
    
        // Effacer la liste actuelle
        videoList.innerHTML = "";
    
        // Ajouter les éléments triés à la liste
        videoArray.forEach(function (video) {
            videoList.appendChild(video);
        });
    }


    function change_valeurlib() {
        createVideoList();

        selectedCategory = document.getElementById("genre-select");
         // Écoutez l'événement de changement de valeur du <select>
        selectedCategory.addEventListener('change', function() {
        // Récupérez la valeur sélectionnée
        const selectedGenre = selectedCategory.value;
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
    }
    


    