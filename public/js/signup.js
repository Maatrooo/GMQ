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

        // Effectuez une requête POST vers le serveur
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Traitez les données reçues du serveur
            // Par exemple, redirigez l'utilisateur vers une autre page après l'inscription
            window.location.href = "/login.html";
        })
        .catch(error => {
            console.error("Erreur lors de la requête au serveur :", error);
            // Gérez l'erreur de manière appropriée (par exemple, affichez un message d'erreur à l'utilisateur)
            alert("Inscription Reussite.");
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
