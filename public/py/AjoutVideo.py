import os
import json
from pytube import YouTube
from flask import Flask, request, jsonify

app = Flask(__name__)

# Chemin d'accès pour enregistrer les vidéos
chemin_acces = "../Video/"
chemin_fichier_json = "../json/video.json"

@app.route('/ajouter-video', methods=['POST'])
def ajouter_video():
    # Extraire les données du formulaire
    data = request.json
    lien_youtube = data['lien_youtube']
    nom_video = data['nom_video']
    genre_video = data['genre_video']

    try:
        if not os.path.exists(chemin_acces):
            os.makedirs(chemin_acces)

        video = YouTube(lien_youtube)
        stream = video.streams.get_highest_resolution()
        chemin_complet = os.path.join(chemin_acces, stream.default_filename)
        stream.download(output_path=chemin_acces, filename=stream.default_filename)
        print("La conversion en .mp4 est terminée. La vidéo a été enregistrée dans le dossier 'Video'.")

        # Charger le fichier JSON existant avec l'encodage UTF-8
        with open(chemin_fichier_json, 'r', encoding='utf-8') as json_file:
            data = json.load(json_file)

        # Ajouter la nouvelle vidéo au fichier JSON
        new_video = {
            "name": nom_video,
            "path": chemin_complet,
            "genre": genre_video,
            "selected": False  # Vous pouvez définir la valeur de votre choix
        }

        data["videos"].append(new_video)

        # Réécrire le fichier JSON avec l'encodage UTF-8
        with open(chemin_fichier_json, 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, indent=4)

        return jsonify({"message": "Video ajoutée au fichier JSON !"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
