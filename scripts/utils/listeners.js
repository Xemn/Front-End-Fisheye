function handleKeyPress(event, photographerMedias, index) {
	switch (event.key) {
		case "ArrowLeft":
			nextMedia(photographerMedias, index);
			break;
		case "ArrowRight":
			previousMedia(photographerMedias, index);
			break;
		case "Escape":
			closeLightbox();
			break;
	}
}
