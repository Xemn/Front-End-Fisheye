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
	const photographerMedia = medias.filter(
		(media) => media.photographerId == id
	);
	// console.log(photographerMedia);

	return { currentPhotographer, photographerMedia };
}

async function displayData(photographer) {
	const photographerHeader = document.querySelector(".photograph-header");
	const photographerModel = photographerTemplate(photographer);
	const currentUserCardDOM = photographerModel.getCurrentPhotographerCardDOM();

	photographerHeader.appendChild(currentUserCardDOM);
}

async function init() {
	const { currentPhotographer } = await getDatasPhotographersById();
	// console.log(currentPhotographer);
	displayData(currentPhotographer);
}

init();
