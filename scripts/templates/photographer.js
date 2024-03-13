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
		article.appendChild(h2);
		article.appendChild(img);
		article.appendChild(h3);
		article.appendChild(quote);
		article.appendChild(priceContent);
		return photographerLink;
	}
	return { name, picture, getUserCardDOM };
}
