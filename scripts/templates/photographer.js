function photographerTemplate(data) {
	const { name, portrait, id, city, country, tagline, price } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		article.setAttribute("data-id", id);
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		img.alt = `Photo de profil de notre photographe : ${name}`;
		const photographerLink = document.createElement("a");
		photographerLink.href = `photographer.html?id=${id}`;
		const h2 = document.createElement("h2");
		h2.textContent = name;
		const h3 = document.createElement("h3");
		h3.textContent = `${city}, ${country}`;
		const quote = document.createElement("p");
		quote.textContent = tagline;
		const priceContent = document.createElement("p");
		priceContent.textContent = price + "€/jour";
		priceContent.className = "price";
		photographerLink.appendChild(article);
		article.appendChild(img);
		article.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(quote);
		article.appendChild(priceContent);
		return photographerLink;
	}

	function getCurrentPhotographerCardDOM() {
		const infosPhotographer = document.querySelector(".photograph-infos");
		const h1 = document.createElement("h1");
		const h2 = document.createElement("h2");
		const quote = document.createElement("p");
		const img = document.createElement("img");

		h1.textContent = name;
		h2.textContent = `${city}, ${country}`;
		quote.textContent = tagline;
		img.src = picture;
		img.alt = `Photo de profil de notre photographe : ${name}`;

		infosPhotographer.appendChild(h1);
		infosPhotographer.appendChild(h2);
		infosPhotographer.appendChild(quote);

		return img;
	}

	function getMediasGalleryCardDOM(photographerMedias) {
		const gallery = document.querySelector(".gallery");

		photographerMedias.forEach((media) => {
			const figure = document.createElement("figure");
			let mediaElement;
			if (media instanceof Image) {
				mediaElement = document.createElement("img");
				mediaElement.src = media.src;
			} else if (media instanceof Video) {
				mediaElement = document.createElement("video");
				mediaElement.src = media.src;
				mediaElement.controls = true;
			} else {
				console.log("Type de média non reconnu");
			}
			const mediaInfos = document.createElement("figcaption");
			const name = document.createElement("h3");
			name.textContent = media.title;
			const span = document.createElement("span");
			const heart = document.createElement("i");
			heart.classList.add("fas", "fa-heart");
			const likes = document.createElement("p");
			likes.textContent = media.likes;
			span.appendChild(likes);
			span.appendChild(heart);
			mediaInfos.appendChild(name);
			mediaInfos.appendChild(span);
			figure.appendChild(mediaElement);
			figure.appendChild(mediaInfos);
			gallery.appendChild(figure);

			figure.addEventListener("click", () => {
				displayLightbox(figure);
			});
		});

		return gallery;
	}

	return {
		picture,
		getUserCardDOM,
		getCurrentPhotographerCardDOM,
		getMediasGalleryCardDOM,
	};
}
