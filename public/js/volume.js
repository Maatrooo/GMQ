document.addEventListener("DOMContentLoaded", function () {
					var video = document.getElementById("videoSource");
					const volumeSlider = document.getElementById('volume');
					const muteButton = document.getElementById('muteButton');
					muteButton.addEventListener('click', toggleMute);
					volumeSlider.addEventListener('input', setVolume);
	
                    // Appel initial pour régler le volume à 50
                    setVolume();

					function setVolume() {
						video.volume = volumeSlider.value / 100;
						updateMuteIcon();
					}

			
					function toggleMute() {
						if (volumeSlider.value == 0) {
							volumeSlider.value = 50;
						} else {
							volumeSlider.value = 0;
						}
						setVolume();
					}
			
					function updateMuteIcon() {
						if (volumeSlider.value == 0) {
							muteButton.classList.remove('fa-volume-up');
							muteButton.classList.add('fa-volume-mute');
						} else {
							muteButton.classList.remove('fa-volume-mute');
							muteButton.classList.add('fa-volume-up');
						}
					}
			
					toggleMute();
				});
	