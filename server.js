const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 3000;

app.use(express.static('public'));

const rooms = [];

io.on('connection', (socket) => {
  console.log(`[connection] ${socket.id}`);
    // Gestionnaire d'événement lorsque l'utilisateur demande la liste des salles
    socket.emit('listRooms', rooms);
});

const roomCreators = {};
let roomId;

io.on('connection', (socket) => {

  // Événement de création de salle
  socket.on('createRoom', (roomName, callback) => {
    const roomId = generateRoomId();
    const room = { id: roomId, name: roomName, players: [] };
    rooms.push(room);

    // Associez le créateur de la salle (socket.id) à la salle qu'il a créée
    roomCreators[roomId] = socket.id;

    // Émettez l'identifiant de la salle nouvellement créée en tant que réponse
    callback(roomId);

    io.emit('listRooms', rooms);
    
  });

  // Liste des salles
  socket.on('getRooms', () => {
    socket.emit('listRooms', rooms);
  });

    // Gérer la connexion d'un socket à une salle
    socket.on('joinRoom', (roomId) => {
      console.log(`[DEBUG:] Socket ${socket.id} a rejoint la salle ${roomId}`);
      // Joindre la salle
      socket.join(roomId);
  
      // Envoyer un événement pour informer les clients de la mise à jour des utilisateurs dans la salle
      updateRoomUsers(roomId);
    });
  
    // Gérer le départ d'un socket d'une salle
    socket.on('leaveRoom', (roomId) => {
      console.log(`[DEBUG:] Socket ${socket.id} a quitté la salle ${roomId}`);
      // Quitter la salle
      socket.leave(roomId);
  
      // Envoyer un événement pour informer les clients de la mise à jour des utilisateurs dans la salle
      updateRoomUsers(roomId);
    });
  
    // Fonction pour mettre à jour les utilisateurs dans la salle
    function updateRoomUsers(roomId) {
      const room = io.sockets.adapter.rooms.get(roomId);
      const usersInRoom = room ? Array.from(room) : [];
      console.log(`[DEBUG:] Utilisateurs dans la salle ${roomId} :`, usersInRoom);
  
      // Émettre un événement aux clients de cette salle pour mettre à jour les utilisateurs
      io.to(roomId).emit('updateRoomUsers', usersInRoom);
    }



  // Événement pour démarrer la partie en multijoueur à la demande de la page
  socket.on('requestStartGame', ({ roomId, socketId }) => {
    console.log(`[DEBUG:] Événement 'requestStartGame' reçu pour la salle ${roomId}`);

    // Rejoignez la salle avant d'émettre l'événement
    socket.join(roomId);
    // Vous pouvez gérer le démarrage du jeu ici
    // Assurez-vous que les actions nécessaires pour synchroniser le jeu sont effectuées

    // Affichez un message côté serveur indiquant quelle page a fait la demande
    console.log(`[DEBUG:] Socket connecté à la salle ${roomId} :`, socketId);

    // Ajoutez des logs de débogage pour vérifier la salle et les utilisateurs dans la salle
    const room = io.sockets.adapter.rooms.get(roomId);
    console.log(`[DEBUG:] Utilisateurs dans la salle ${roomId} :`, room ? Array.from(room) : 'Aucun utilisateur trouvé.');

    // Vérifie si le socket est connecté à la salle
    const connectedToRoom = roomId && socket.rooms.has(roomId);

    // Affiche des informations de débogage
    console.log(`[DEBUG:] Utilisateur ${socket.id} connecté à la salle ${roomId} :`, connectedToRoom);
    console.log(`[DEBUG:] Salle complète :`, io.sockets.adapter.rooms);


    // Par exemple, émettre un événement à tous les clients pour signaler le démarrage du jeu
    console.log(`[IMPORTANT:] La salle ${roomId} a demandé le démarrage du jeu.`);
    io.to(roomId).emit('startGameMulti');
});


  socket.on('genreUpdated', ({ roomId, selectedValue }) => {
    console.log(`Genre Updated event received on the server for room ${roomId}:`, { selectedValue });
    // Mettez à jour le code serveur selon vos besoins

    // Émettre l'événement à tous les utilisateurs de la salle
    io.to(roomId).emit('updateGenre', { selectedValue });
  });
  

    
    // Lorsque le serveur reçoit une mise à jour du genre
    socket.on('updateGenre', ({ roomId, selectedValue }) => {
      console.log('Genre Updated event received on the server:', { selectedValue });

      // Assurez-vous que roomId est défini avant de l'utiliser dans l'émission
      if (roomId) {
        // Émettez la mise à jour du genre à tous les utilisateurs dans la même salle
        io.to(roomId).emit('updateGenre', { selectedValue });
      }
    });

    socket.on('ChooseVideo', ({ roomId, selectedValue }) => {
      chooseRandomVideoMulti(roomId, selectedValue);
    });
  
});

function generateRoomId() {
  return Math.random().toString(36).substring(2, 9);
}

app.get('/room/:roomId', (req, res) => {
  const roomId = req.params.roomId;
  // Vous pouvez ajouter ici la logique pour charger la page de salle spécifique
  // Par exemple, renvoyer un fichier HTML de salle ou un modèle de salle
  // Vous devrez également transmettre des données sur la salle à la page de salle
  // pour que le joueur puisse rejoindre la salle correcte.
  res.sendFile(path.join(__dirname, 'public', 'html/room.html'));
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




let usedVideoIndexes = [];
let videos;

// Charger les vidéos depuis le fichier JSON
fetch("http://localhost:9821/json/video.json")
  .then(response => response.json())
  .then(data => {
    // Maintenant, vous avez accès aux données JSON dans la variable "data".
    videos = data.videos; // Assurez-vous que la structure du fichier JSON correspond à ce que vous attendez.
    createVideoList();
  })
  .catch(error => console.error('Erreur lors du chargement des vidéos :', error));


  function chooseRandomVideoMulti(roomId, selectedGenre) {
    console.log(`[DEBUG:] Chosen genre for room ${roomId}: ${selectedGenre}`);
    if (!videos) {
      console.error('Les vidéos ne sont pas chargées. Assurez-vous que le chargement est terminé avant d\'appeler chooseRandomVideoMulti.');
      return;
    }
  
    const option = selectedGenre;
    console.log(option);
  
    const filteredVideos = videos.filter(video => !video.selected && video.genre === option);
  
    if (filteredVideos.length === 0) {
      videos.forEach(video => {
        video.selected = false;
      });
    } else {
      const randomIndex = Math.floor(Math.random() * filteredVideos.length);
      const selectedVideo = filteredVideos[randomIndex];
  
      selectedVideo.selected = true;
  
      // Émettre un événement à tous les clients pour informer de la nouvelle vidéo
      io.to(roomId).emit('newRoundVideo', { videoUrl: selectedVideo.path, videoName: selectedVideo.name });
    }
  }
  