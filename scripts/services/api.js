// Fonction qui récupère les différents photographes et leurs informations :
async function getPhotographers() {
	// Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet,
	// mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
	/*let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
            */

	const response = await fetch("./data/photographers.json");
	const datas = await response.json();
	// console.log(datas);
	const photographers = await datas.photographers;
	// console.log(photographers);
	return photographers;
}
// Fonction qui récupère les médias d'un photographe donné :
async function getDatasPhotographersById() {
	/*--- Récupération de l'identifiant du photographe ----*/
	const params = new URL(document.location).searchParams;
	// console.log(params);
	const id = params.get("id");
	// console.log(id);

	const response = await fetch("./data/photographers.json");
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
