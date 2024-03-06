function photographerTemplate(data) {
	const { name, portrait, id, city, country, tagline, price } = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		article.setAttribute("data-id", id);
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		const h2 = document.createElement("h2");
		h2.textContent = name;
		const h3 = document.createElement("h3");
		h3.textContent = `${city}, ${country}`;
		const quote = document.createElement("p");
		quote.textContent = tagline;
		const priceContent = document.createElement("p");
		priceContent.textContent = price + "€/jour";
		article.appendChild(img);
		article.appendChild(h2);
		article.appendChild(h3);
		article.appendChild(quote);
		article.appendChild(priceContent);
		return article;
	}
	return { name, picture, getUserCardDOM };
}
