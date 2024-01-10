document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  let isRoomCreator = false; // Variable pour savoir si l'utilisateur est le créateur de la salle

  

  function createRoom() {
    const roomNameInput = document.querySelector('#room-name-input');
    const roomName = roomNameInput.value.trim();
  
    if (roomName) {
      socket.emit('createRoom', roomName, (roomId) => {
        // Redirigez l'utilisateur vers la salle nouvellement créée en utilisant son identifiant
        window.location.href = `/room/${roomId}`;
        isRoomCreator = true; // L'utilisateur est le créateur de la salle
      });
      roomNameInput.value = ''; // Effacez le champ de saisie après la création
    } else {
      alert('Veuillez entrer un nom de salle valide.');
    }
  }



function joinRoom(roomId) {
  console.log(roomId);
  // Par exemple, rediriger l'utilisateur vers la salle spécifique
  window.location.href = `/room/${roomId}`;
  isRoomCreator = false;
}
  
  // Écoutez l'événement "listRooms" pour afficher la liste des salles
  socket.on('listRooms', (rooms) => {
    const roomsList = document.querySelector('#rooms-list');
    roomsList.innerHTML = ''; // Effacez la liste actuelle des salles
  
    rooms.forEach((room) => {
      const listItem = document.createElement('li');
      const button = document.createElement('button');
      button.textContent = room.name;
      button.addEventListener('click', () => {
        joinRoom(room.id);
      });
      listItem.appendChild(button);
      roomsList.appendChild(listItem);    
    });
  });
  
  

  // Gestionnaire d'événement lorsque le bouton "Créer" est cliqué
  const createRoomButton = document.querySelector('#create-room-button');
  createRoomButton.addEventListener('click', createRoom);

});
