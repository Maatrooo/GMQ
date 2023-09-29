import os
from pytube import YouTube

lien_youtube = input("Entrez le lien YouTube : ")
chemin_acces = "../Video/"

try:
    if not os.path.exists(chemin_acces):
        os.makedirs(chemin_acces)
        
    video = YouTube(lien_youtube)
    stream = video.streams.get_highest_resolution()
    chemin_complet = os.path.join(chemin_acces, stream.default_filename)
    stream.download(output_path=chemin_acces, filename=stream.default_filename)
    print("La conversion en .mp4 est terminée. La vidéo a été enregistrée dans le dossier 'Video'.")
except Exception as e:
    print("Une erreur s'est produite :", str(e))