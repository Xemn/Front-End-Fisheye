//Mettre le code JavaScript lié à la page photographer.html
function displayData(photographer, photographerMedias) {
	const photographerHeader = document.querySelector(".photograph-header");
	const photographerModel = photographerTemplate(photographer);
	const currentUserCardDOM = photographerModel.getCurrentPhotographerCardDOM();

	photographerHeader.appendChild(currentUserCardDOM);

	photographerModel.displayFilters(photographerMedias);
	// Afficher la galerie de médias
	photographerModel.getMediasGalleryCardDOM(
		filteredMedias(photographerMedias, "Popularité")
	);

	// Affiche le nombre total de like :
	photographerModel.displayTotalLikes(photographerMedias, photographer);
}

async function init() {
	const { currentPhotographer, photographerMedias } =
		await getDatasPhotographersById();
	displayData(currentPhotographer, photographerMedias);
}

init();
