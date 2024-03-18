document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

   

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Créez un objet utilisateur
        const newUser = 
        {
            username: username,
            password: password
        };

        // Chargez les utilisateurs existants depuis users.json
        fetch("http://localhost:9821/json/user.json")
            .then(response => response.json())
            .then(data => {
                // Ajoutez le nouvel utilisateur à la liste
                data.users.push(newUser);

                // Réécrivez le fichier users.json avec le nouvel utilisateur
                fetch("./../json/user.json", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then(data => {
                        alert("Utilisateur ajouté avec succès ! Redirection vers la page d'accueil...");
                        // Redirigez l'utilisateur vers la page d'accueil
                        window.location.href = "index.html";
                    })
                    .catch(error => console.error("Erreur lors de la mise à jour de users.json:", error));
            })
            .catch(error => console.error("Erreur lors du chargement de users.json:", error));
    });
});

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
