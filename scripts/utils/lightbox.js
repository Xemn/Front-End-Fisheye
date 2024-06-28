function displayLightbox(figure) {
	const lightboxModal = lightboxDom(figure);
	lightboxModal.style.display = "flex";
}

function closeLightbox() {
	const lightboxWrapper = document.getElementById("lightbox_wrapper");
	if (lightboxWrapper) {
		lightboxWrapper.style.display = "none";
	}
}
