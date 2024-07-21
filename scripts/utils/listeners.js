/*--- Fonction qui gère la touche pressée et la fonction devant être appelée :  ---*/
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

function toggleDropdown(chevron, dropDown, activeButton) {
	chevron.classList.toggle("rotate");
	dropDown.classList.toggle("visible");
	const isExpanded = activeButton.getAttribute("aria-expanded") === "true";
	activeButton.setAttribute("aria-expanded", !isExpanded);
}
/*--- Fonction appelant la fonction précédente mais pour deux types de listeners différents : ---*/
function addDropdownListeners(chevron, dropDown, activeButton) {
	chevron.addEventListener("click", () =>
		toggleDropdown(chevron, dropDown, activeButton)
	);
	chevron.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			toggleDropdown(chevron, dropDown, activeButton);
		}
	});
}
