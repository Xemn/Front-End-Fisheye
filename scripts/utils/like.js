/*--- Fonction qui calcul le nombre total de like : ---*/
function updateTotalLikes(photographerMedias) {
	const likes = photographerMedias.map((media) => media.likes);
	// console.log(likes);
	let sumLikes = likes.reduce((accumulator, currentValue) => {
		return accumulator + currentValue;
	}, 0);

	return sumLikes;
}

// Fonction pour gérer le clic sur le bouton de like
function like(event) {
	const likeBtn = event.target;
	const mediaElement = likeBtn.closest("figure").querySelector("span p");
	const totalLikesElement = document.querySelector(".likes");
	let sumLikes = parseInt(totalLikesElement.textContent); // Récupérer la valeur actuelle des likes

	if (!likeBtn.classList.contains("liked")) {
		likeBtn.classList.add("liked");
		mediaElement.textContent = parseInt(mediaElement.textContent) + 1;
		sumLikes++;
	} else {
		likeBtn.classList.remove("liked");
		mediaElement.textContent = parseInt(mediaElement.textContent) - 1;
		sumLikes--;
	}

	// Mettre à jour l'affichage du total des likes
	const likesSpan = document.querySelector(".likes");
	if (likesSpan) {
		likesSpan.textContent = sumLikes;
	}
}
