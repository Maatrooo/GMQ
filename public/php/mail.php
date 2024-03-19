<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $lien_youtube = $_POST["lien_youtube"];
    $nom_video = $_POST["nom_video"];
    $genre_video = $_POST["genre_video"];

    // Adresse e-mail où vous voulez recevoir les messages
    $to = "support@gmq.lol";
    $subject = "Nouvelle demande d'ajout de vidéo";
    $body = "Lien youtube: $lien_youtube\n nom de la video: $nom_video\n genre de la video: $genre_video";

    // Envoi de l'e-mail
    mail($to, $subject, $body);

    // Redirection vers une page de confirmation ou autre
    header("Location: ../index.html");
    exit;
}
?>