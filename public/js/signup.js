document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const newUsername = document.getElementById("new-username").value;
        const newPassword = document.getElementById("new-password").value;

        // Créez un objet utilisateur
        const newUser = {
            username: newUsername,
            password: newPassword
        };

        // Chargez les utilisateurs existants depuis users.json
        fetch("http://localhost:9821/json/user.json")
            .then(response => response.json())
            .then(existingData => {
                // Ajoutez le nouvel utilisateur à la liste
                existingData.users.push(newUser);

                // Réécrivez le fichier user.json avec le nouvel utilisateur
                return fetch("./../json/user.json", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(existingData)
                });
            })
            .then(response => response.json())
            .then(data => {
                alert("Inscription réussie ! Redirection vers la page de connexion...");
                // Redirigez l'utilisateur vers la page de connexion
                window.location.href = "login.html";
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de user.json :", error);
                alert("Une erreur s'est produite lors de l'inscription. Veuillez réessayer.");
            });
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
