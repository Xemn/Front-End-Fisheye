function displayLightbox(photographerMedias, index) {
	const lightboxModal = lightboxDom(photographerMedias, index);
	lightboxModal.style.display = "flex";
}

function closeLightbox() {
	const lightboxWrapper = document.getElementById("lightbox_wrapper");
	if (lightboxWrapper) {
		lightboxWrapper.style.display = "none";
	}
}

function nextMedia(photographerMedias, index) {
	let newIndex = index + 1;
	if (newIndex > photographerMedias.length - 1) {
		newIndex = 0;
	}
	displayLightbox(photographerMedias, newIndex);
}

function previousMedia(photographerMedias, index) {
	let newIndex = index - 1;
	if (newIndex === -1) {
		newIndex = photographerMedias.length - 1;
	}
	displayLightbox(photographerMedias, newIndex);
}
