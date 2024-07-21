/*--- Fonction qui nous renvoie les médias filtrés en fonction du filtre :  ---*/
function filteredMedias(photographerMedias, filterType) {
	let sortedMedias = [...photographerMedias];
	switch (filterType) {
		case "Popularité":
			sortedMedias.sort((a, b) => b.likes - a.likes);
			break;
		case "Titre":
			sortedMedias.sort((a, b) => a.title.localeCompare(b.title));
			break;
		case "Date":
			sortedMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
			break;
	}
	return sortedMedias;
}
