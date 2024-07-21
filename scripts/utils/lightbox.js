let keyPressHandler = null;
/*--- Fonction qui affiche la lightbox : ---*/
function displayLightbox(photographerMedias, index) {
	const lightboxModal = lightboxDom(photographerMedias, index);
	lightboxModal.style.display = "flex";

	// Supprimer l'ancien écouteur s'il existe
	if (keyPressHandler) {
		document.removeEventListener("keydown", keyPressHandler);
	}

	// Définir une nouvelle fonction comme gestionnaire
	keyPressHandler = (event) => handleKeyPress(event, photographerMedias, index);

	// Ajouter l'écouteur
	document.addEventListener("keydown", keyPressHandler);
}
/*--- Fonction qui ferme la lightbox :  ---*/
function closeLightbox() {
	const lightboxWrapper = document.getElementById("lightbox_wrapper");
	if (lightboxWrapper) {
		lightboxWrapper.style.display = "none";
		// Supprimer l'écouteur d'événement pour les touches
		if (keyPressHandler) {
			document.removeEventListener("keydown", keyPressHandler);
			keyPressHandler = null;
		}
	}
}
/*--- Fonction permettant de passer au média suivant : ---*/
function nextMedia(photographerMedias, index) {
	let newIndex = index + 1;
	if (newIndex > photographerMedias.length - 1) {
		newIndex = 0;
	}
	displayLightbox(photographerMedias, newIndex);
}
/*--- Fonction permettant de passer au média précédent : ---*/
function previousMedia(photographerMedias, index) {
	let newIndex = index - 1;
	if (newIndex === -1) {
		newIndex = photographerMedias.length - 1;
	}
	displayLightbox(photographerMedias, newIndex);
}
