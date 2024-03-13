//Mettre le code JavaScript lié à la page photographer.html
const params = new URL(document.location).searchParams;
// console.log(params);
const id = params.get("id");
// console.log(id);

async function getPhotographersById() {
	const response = await fetch("../data/photographers.json");
	const datas = await response.json();
	console.log(datas);
	const currentPhotographer = datas.photographers.find(
		(photographer) => photographer.id == id
	);
	console.log(currentPhotographer);
}

getPhotographersById();
