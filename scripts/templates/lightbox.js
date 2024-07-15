function lightboxDom(photographerMedias, index) {
	const lightboxWrapper = document.getElementById("lightbox_wrapper");
	const lightboxModal = document.getElementById("lightbox_modal");
	const lightboxContent = lightboxModal.querySelector(".lightboxContent");
	const lightboxCaption = lightboxModal.querySelector("#lightboxCaption");

	// Nous vidons le contenu de la figure :
	lightboxContent.innerHTML = "";

	// Extraire le média actuel :
	const media = photographerMedias[index];

	console.log(media);

	// Code HTML en fonction du type de média :
	let mediaElement;
	if (media instanceof Image) {
		mediaElement = document.createElement("img");
		mediaElement.src = media._src;
		mediaElement.alt = media._title;
	} else if (media instanceof Video) {
		mediaElement = document.createElement("video");
		mediaElement.controls = true;
		const mediaSource = document.createElement("source");
		mediaSource.src = media.src;
		mediaSource.type = media.mimeType || "video/mp4";
		mediaElement.appendChild(mediaSource);
		mediaElement.load(); // Recharge la vidéo pour appliquer la nouvelle source
	} else {
		console.error("Unsupported media type");
		return;
	}

	// Création du bouton de fermeture de la modale :
	const closeBtn = document.createElement("button");
	const closeIcon = document.createElement("i");
	closeIcon.classList.add("fa-solid", "fa-xmark");
	closeBtn.appendChild(closeIcon);
	closeBtn.id = "closeBtn";
	closeBtn.addEventListener("click", () => {
		closeLightbox();
	});
	closeBtn.setAttribute("aria-label", "Fermer la fenêtre modale");
	closeBtn.setAttribute("role", "button"); // Ajout de l'attribut role

	// Création des boutons Suivant/Précédent :
	const prevBtn = document.createElement("button");
	const prevIcon = document.createElement("i");
	prevIcon.classList.add("fa-solid", "fa-chevron-left", "chevron");
	prevBtn.appendChild(prevIcon);
	prevBtn.id = "prevBtn";
	prevBtn.addEventListener("click", () => {
		previousMedia(photographerMedias, index);
	});
	prevBtn.setAttribute("aria-label", "Média précédent");
	prevBtn.setAttribute("role", "button"); // Ajout de l'attribut role

	const nextBtn = document.createElement("button");
	const nextIcon = document.createElement("i");
	nextIcon.classList.add("fa-solid", "fa-chevron-right", "chevron");
	nextBtn.appendChild(nextIcon);
	nextBtn.id = "nextBtn";
	nextBtn.addEventListener("click", () => {
		nextMedia(photographerMedias, index);
	});
	nextBtn.setAttribute("aria-label", "Média suivant");
	nextBtn.setAttribute("role", "button"); // Ajout de l'attribut role

	// Insertions des divers éléments dans le DOM :
	lightboxCaption.textContent = media.title;

	lightboxContent.appendChild(mediaElement);
	lightboxContent.appendChild(lightboxCaption);
	lightboxContent.appendChild(nextBtn);
	lightboxContent.appendChild(prevBtn);
	lightboxContent.appendChild(closeBtn);

	lightboxModal.appendChild(lightboxContent);

	lightboxWrapper.appendChild(lightboxModal);

	lightboxWrapper.addEventListener("click", () => closeLightbox());

	return lightboxWrapper;
}
