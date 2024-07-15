function handleKeyPress(event, photographerMedias, index) {
	switch (event.key) {
		case "ArrowLeft":
			previousMedia(photographerMedias, index);
			break;
		case "ArrowRight":
			nextMedia(photographerMedias, index);
			break;
		case "Escape":
			closeLightbox();
			break;
	}
}
