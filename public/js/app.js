document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  let isRoomCreator = false; // Variable pour savoir si l'utilisateur est le créateur de la salle

  // Gestionnaire d'événement lorsque la case à cocher est modifiée

  const passwordCheckbox = document.querySelector('#privacyRoom');

  passwordCheckbox.addEventListener('change', () => {
    const passwordInputContainer = document.querySelector('#password-input-container');
    passwordInputContainer.style.display = passwordCheckbox.checked ? 'block' : 'none';
  });


  function createRoom() {
    // Sélection de l'élément input pour le nom de la salle
    const roomNameInput = document.querySelector('#room-name-input');
    // Récupération de la valeur du nom de la salle et suppression des espaces blancs
    const roomName = roomNameInput.value.trim();

    // Vérification si le mot de passe est activé
    const hasPassword = document.querySelector('#privacyRoom').checked;
    console.log(hasPassword);
    let password = ''; // Initialisation du mot de passe
    

    if (hasPassword) {
      const passwordInput = document.querySelector('#password-input');
      password = passwordInput.value.trim();
    }
  
    // Vérification si le nom de la salle est valide
    if (roomName) {

      // Émission d'un événement 'createRoom' au serveur avec les détails de la salle
      socket.emit('createRoom', roomName, hasPassword, password, (roomId) => {
        // Redirection vers la page de la salle nouvellement créée
        window.location.href = `/room/${roomId}`;
        // Définition de la variable isRoomCreator à true pour indiquer que l'utilisateur est le créateur de la salle
        isRoomCreator = true;
      });
      roomNameInput.value = '';
    } else {
      // Affichage d'une alerte si le nom de la salle est vide
      alert('Veuillez entrer un nom de salle valide.');
    }

}

  function joinRoom(roomId) {
    console.log(roomId);
    // Par exemple, rediriger l'utilisateur vers la salle spécifique
      window.location.href = `/room/${roomId}`;
    isRoomCreator = false;
  }
  
  function connexion(roomId){
    socket.emit('hasPassword', { roomId });
    socket.on("passwordTrue", () => {
      const password = prompt('Veuillez entrer le mot de passe de la salle :');
      socket.emit('connexion', { roomId , password});
      // Écouter les réponses du serveur
      socket.on('incorrectPassword', () => {
        alert('Mot de passe incorrect. Veuillez réessayer.');
      });
    
      socket.on('roomNotFound', () => {

        alert("La salle n'existe pas. Veuillez réessayer.");

      });
    
      socket.on('goodPassword', () => {
        joinRoom(roomId);
      });
    });

    socket.on("passwordFalse", () => {    
      joinRoom(roomId);
    });
  }
  
  
  // Écoutez l'événement "listRooms" pour afficher la liste des salles
  socket.on('listRooms', (rooms) => {
    const roomsList = document.querySelector('#roomsList');
    roomsList.innerHTML = ''; // Effacez la liste actuelle des salles
  
    rooms.forEach((room) => {
      const listItem = document.createElement('li');
      const button = document.createElement('button');
      if(room.hasPassword == false){
        button.innerHTML = room.name +"<i class='fa fa-unlock'></i>";
        button.addEventListener('click', () => {
          connexion(room.id);
        });
        listItem.appendChild(button);
        roomsList.appendChild(listItem);
      }
      else{
        button.innerHTML = room.name +"<i class='fa fa-lock'></i>";
        button.addEventListener('click', () => {
          connexion(room.id);
        });
        listItem.appendChild(button);
        roomsList.appendChild(listItem);
      }    
    });
  });
  
  

  // Gestionnaire d'événement lorsque le bouton "Créer" est cliqué
  const createRoomButton = document.querySelector('#create-room-button');
  createRoomButton.addEventListener('click', createRoom);

});
