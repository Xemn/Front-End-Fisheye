//Mettre le code JavaScript lié à la page photographer.html
const params = new URL(document.location).searchParams;
// console.log(params);
const id = params.get("id");
// console.log(id);
async function getDatasPhotographersById() {
	const response = await fetch("../data/photographers.json");
	const datas = await response.json();
	// console.log(datas);
	/* Récupération des informations concernant le photographe
	possédant l'id présent dans l'URL : */
	const currentPhotographer = datas.photographers.find(
		(photographer) => photographer.id == id
	);
	console.log(currentPhotographer);
	// Récupération des médias :
	const medias = datas.media;
	// console.log(medias);
	// Récupération des médias concernant le dit photographe :
	const photographerMedias = medias
		.map((media) => new MediaFactory(media, currentPhotographer.name))
		.filter((media) => media.photographerId == currentPhotographer.id);
	console.log(photographerMedias);

	return { currentPhotographer, photographerMedias };
}

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
