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
		photographerLink.title = `Voir le profil de ${name}`;
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

	function displayFilters(photographerMedias) {
		const filterDiv = document.querySelector(".filter-div");
		const label = document.createElement("p");
		label.textContent = "Trier par : ";
		const dropDown = document.createElement("div");
		dropDown.classList.add("dropdown");
		const activeButton = document.createElement("button");
		const filter = document.createElement("span");
		filter.textContent = "Popularité";
		activeButton.classList.add("dropbtn");
		activeButton.setAttribute("aria-haspopup", "listbox");
		activeButton.setAttribute("aria-expanded", "false");

		const chevron = document.createElement("span");
		chevron.classList.add("fa-solid", "fa-chevron-up", "arrow");
		chevron.tabIndex = "0";
		chevron.addEventListener("click", () => {
			chevron.classList.toggle("rotate");
			dropDown.classList.toggle("visible");
			const isExpanded = activeButton.getAttribute("aria-expanded") === "true";
			activeButton.setAttribute("aria-expanded", !isExpanded);
		});
		const list = document.createElement("ul");
		list.setAttribute("role", "listbox");
		const listItems = ["Titre", "Date"];
		listItems.forEach((item) => {
			const listItem = document.createElement("li");
			const buttonItem = document.createElement("button");
			buttonItem.textContent = item;
			buttonItem.classList.add("dropbtn");
			buttonItem.setAttribute("role", "option");

			buttonItem.addEventListener("click", () => {
				const tempText = filter.textContent;
				filter.textContent = buttonItem.textContent;
				buttonItem.textContent = tempText;
				const sortedMedias = filteredMedias(
					photographerMedias,
					filter.textContent
				);
				console.log(sortedMedias);
				const gallery = document.querySelector(".gallery");
				gallery.innerHTML = "";
				const likes = document.querySelector(".likes");
				likes.innerHTML = "";
				getMediasGalleryCardDOM(sortedMedias);
				likes.innerHTML = updateTotalLikes(sortedMedias);

				dropDown.classList.remove("visible");
				chevron.classList.remove("rotate");
				activeButton.setAttribute("aria-expanded", "false");
			});

			listItem.appendChild(buttonItem);
			list.appendChild(listItem);
		});
		activeButton.appendChild(filter);
		activeButton.appendChild(chevron);
		dropDown.appendChild(activeButton);
		dropDown.appendChild(list);

		filterDiv.appendChild(label);
		filterDiv.appendChild(dropDown);

		addDropdownListeners(chevron, dropDown, activeButton);
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

		photographerMedias.forEach((media, index) => {
			const figure = document.createElement("figure");
			figure.tabIndex = "0";
			let mediaElement;
			if (media instanceof Image) {
				mediaElement = document.createElement("img");
				mediaElement.src = media.src;
				mediaElement.alt = media.title;
			} else if (media instanceof Video) {
				mediaElement = document.createElement("video");
				mediaElement.src = media.src;
				mediaElement.setAttribute("aria-label", media.title);
			} else {
				console.log("Type de média non reconnu");
			}
			const mediaInfos = document.createElement("figcaption");
			const name = document.createElement("h3");
			name.textContent = media.title;
			const span = document.createElement("span");
			const heart = document.createElement("i");
			heart.classList.add("fas", "fa-heart", "like-button");
			heart.tabIndex = "0";
			heart.setAttribute("role", "button");
			heart.setAttribute("aria-label", "Like");

			heart.addEventListener("click", like);

			const likes = document.createElement("p");
			likes.textContent = media.likes;
			span.appendChild(likes);
			span.appendChild(heart);
			mediaInfos.appendChild(name);
			mediaInfos.appendChild(span);
			figure.appendChild(mediaElement);
			figure.appendChild(mediaInfos);
			gallery.appendChild(figure);

			mediaElement.addEventListener("click", () => {
				displayLightbox(photographerMedias, index);
			});
		});
		return gallery;
	}

	function displayTotalLikes(photographerMedias, photographer) {
		let totalLikes = updateTotalLikes(photographerMedias);

		const aside = document.createElement("aside");
		const paragraph = document.createElement("p");
		const likesSpan = document.createElement("span");
		likesSpan.classList.add("likes");
		likesSpan.setAttribute("aria-label", "Total likes");
		const heartSpan = document.createElement("span");
		heartSpan.classList.add("fas", "fa-heart");
		const priceSpan = document.createElement("span");

		likesSpan.textContent = totalLikes;
		priceSpan.textContent = photographer.price + " / jour";

		paragraph.appendChild(likesSpan);
		paragraph.appendChild(heartSpan);

		aside.appendChild(paragraph);
		aside.appendChild(priceSpan);

		const main = document.querySelector("main");
		main.appendChild(aside);
	}

	return {
		picture,
		getUserCardDOM,
		displayFilters,
		getCurrentPhotographerCardDOM,
		getMediasGalleryCardDOM,
		displayTotalLikes,
	};
}
