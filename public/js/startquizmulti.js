const socket = io();
const roomId = window.location.pathname.split('/').pop();
console.log('Attempting to start game in room:', roomId);


document.addEventListener('DOMContentLoaded', function () {  
    socket.emit('joinRoom', roomId);
    socket.on('updateRoomUsers', function (users) {
      console.log('Users in the room updated:', users);
      // Mettez à jour votre interface utilisateur pour refléter les utilisateurs dans la salle
    });

    window.requestStartGame = function () {  
        // Émettez un événement au serveur pour signaler la demande de démarrage de la partie
        const socketId = socket.id;  // Obtenez le socket ID correct
        socket.emit('requestStartGame', { roomId, socketId });
    };

    // Ajoutez une écoute pour l'événement de confirmation côté client
    socket.on('requestStartGameConfirmed', function () {
    console.log('Server confirmed receipt of requestStartGame');
    });

    // Sélectionnez l'élément 'select'
    const genreSelect = document.getElementById('genre-select');


    // Ajoutez un écouteur d'événement 'change' au 'select'
    genreSelect.addEventListener('change', function () {
      // Obtenez la nouvelle valeur sélectionnée
      const selectedValue = genreSelect.value;
      console.log(selectedValue);

      // Émettez un événement socket avec la nouvelle valeur
      socket.emit('updateGenre', { roomId, selectedValue });
    });

    // Lorsque le client reçoit une mise à jour du genre
    socket.on('updateGenre', ({ selectedValue }) => {
      console.log('Genre Updated event received on the client:', { selectedValue });

      // Mettez à jour l'interface utilisateur avec la nouvelle valeur du genre
      // Par exemple, mettez à jour le sélecteur avec la nouvelle valeur
      genreSelect.value = selectedValue;
    });

    // Écoutez l'événement pour démarrer la partie côté client
    socket.on('startGameMulti', function () {
      const selectedValue = genreSelect.value;
      console.log('Game Start');
      startGameMulti(selectedValue);
    });


});


function startGameMulti(selectedValue) {
  currentManche++;
  document.getElementById("parametreGame").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
  clearAnswerInput();
  manchevalue.innerText = currentManche;
  maxmanchevalue.innerText = nombreDeManches;
  console.log('Manche: ', currentManche, "sur : ", nombreDeManches);
  socket.emit('ChooseVideo', { roomId, selectedValue });

  // Écouter l'événement 'newRoundVideo' côté client
  socket.on('newRoundVideo', ({ videoUrl, videoName }) => {
    /*console.log('Nouvelle vidéo reçue:', videoUrl, videoName);*/
    
    // Mettez à jour l'élément vidéo dans votre interface utilisateur avec la nouvelle vidéo
    const videoElement = document.getElementById("videoSource");
    videoElement.src = videoUrl;
    document.getElementById("videoName").innerHTML = videoName;

    // Show loading animation.
    const playPromise = videoElement.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Show playing UI.
      })
      .catch(error => {
        // Auto-play was prevented
        // Show paused UI.
      });
    }
  });

  mu();
  cache();
  // Tu met juste la musique ici
  timer();
  setTimeout(() => {
    affiche(); // Tu affiche la réponse
    checkAnswer();
    setTimeout(() => {
      if (currentManche < nombreDeManches) {
        startGameMulti(selectedValue); // Tu relance un cylce
      } else {
        document.getElementById("gameContainer").style.display = "none"; 
        cache();
        muted();
        document.getElementById("gameResult").style.display = "block";
      }
    }, 11000)
  }, 10000);
}
