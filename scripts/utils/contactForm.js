function displayModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	const photographerName = document.querySelector("h1").innerText;
	const modalHeader = document.querySelector(".modal header h2");
	modalHeader.innerHTML += `<br> ${photographerName}`;
}

function closeModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
}
