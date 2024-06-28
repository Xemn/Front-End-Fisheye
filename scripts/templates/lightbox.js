// Template pour la lightbox :
function lightboxDom(figure) {
	const lightboxWrapper = document.getElementById("lightbox_wrapper");
	const lightboxModal = document.getElementById("lightbox_modal");
	const lightboxContent = lightboxModal.querySelector(".lightboxContent");
	const lightboxCaption = lightboxModal.querySelector("#lightboxCaption");

	// Nous vidons le contenu de la figure :
	lightboxContent.innerHTML = "";

	// Extraire l'image/vidéo et le texte de la figure :
	const img = figure.querySelector("img");
	const video = figure.querySelector("video");
	const caption = figure.querySelector("figcaption");

	// Code HTML en fonction du type de média :
	if (img) {
		const lightboxImg = document.createElement("img");
		lightboxImg.src = img.src;
		lightboxImg.alt = img.alt || "";
		lightboxContent.appendChild(lightboxImg);
	} else if (video) {
		const lightboxVideo = document.createElement("video");
		lightboxVideo.controls = true;
		const lightboxVideoSource = document.createElement("source");
		lightboxVideoSource.src = video.src;
		lightboxVideoSource.type = video.type || "video/mp4";
		lightboxVideo.appendChild(lightboxVideoSource);
		lightboxContent.appendChild(lightboxVideo);
		lightboxVideo.load(); // Recharge la vidéo afin d'appliquer la nouvelle source
	} else {
		console.error("Unsupported media type");
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
	//Création des boutons Suivant/Précédent :

	const prevBtn = document.createElement("button");
	const prevIcon = document.createElement("i");
	prevIcon.classList.add("fa-solid", "fa-chevron-left", "chevron");
	prevBtn.appendChild(prevIcon);
	prevBtn.id = "prevBtn";

	const nextBtn = document.createElement("button");
	const nextIcon = document.createElement("i");
	nextIcon.classList.add("fa-solid", "fa-chevron-right", "chevron");
	nextBtn.appendChild(nextIcon);
	nextBtn.id = "nextBtn";

	// Insertions des divers éléments dans le DOM :
	lightboxCaption.innerHTML = caption.innerHTML;
	// Suppresion du span possédant le nombre de like :
	const likeSpan = lightboxCaption.querySelector("span");
	if (likeSpan) {
		likeSpan.remove(); // Supprime le span spécifique
	}

	lightboxContent.appendChild(lightboxCaption);
	lightboxContent.appendChild(nextBtn);
	lightboxContent.appendChild(prevBtn);
	lightboxContent.appendChild(closeBtn);

	lightboxModal.appendChild(lightboxContent);

	lightboxWrapper.appendChild(lightboxModal);

	return lightboxWrapper;
}
