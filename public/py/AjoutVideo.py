import os
import json
from pytube import YouTube



# Chemin d'accès pour enregistrer les vidéos
chemin_acces = "../Video/"
chemin_fichier_json = "../json/video.json"

# Charger le fichier JSON existant avec l'encodage UTF-8
with open(chemin_fichier_json, 'r', encoding='utf-8') as json_file:
    data = json.load(json_file)

lien_youtube = input("Entrez le lien YouTube : ")

try:
    if not os.path.exists(chemin_acces):
        os.makedirs(chemin_acces)

    video = YouTube(lien_youtube)
    stream = video.streams.get_highest_resolution()
    chemin_complet = os.path.join(chemin_acces, stream.default_filename)
    stream.download(output_path=chemin_acces, filename=stream.default_filename)
    print("La conversion en .mp4 est terminée. La vidéo a été enregistrée dans le dossier 'Video'.")

    # Ajouter la nouvelle vidéo au fichier JSON
    new_video = {
        "name": input("Entrez le nom de la vidéo : "),  # Laissez l'utilisateur entrer le nom
        "path": chemin_complet,
        "genre" : input("Entrez le genre de la vidéo : "),
        "selected": False  # Vous pouvez définir la valeur de votre choix
    }

    data["videos"].append(new_video)

    # Réécrire le fichier JSON avec l'encodage UTF-8
    with open(chemin_fichier_json, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4)

    print("Video ajouté au fichier JSON !")
except Exception as e:
    print("Une erreur s'est produite :", str(e))
