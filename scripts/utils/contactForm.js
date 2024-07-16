function displayModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
	modal.ariaHidden = false;
	modal.ariaExpanded = true;
	// Suppression et mise à niveau du focus :
	const focusableElementsString = document.querySelectorAll(
		"a, button, input, textarea, select, [tabindex]"
	);
	focusableElementsString.forEach((element) => {
		if (!modal.contains(element)) {
			element.setAttribute("tabindex", "-1");
		}
	});

	const photographerName = document.querySelector("h1").innerText;
	const modalHeader = document.querySelector(".modal header h2");

	// Vérifiez si le nom est déjà présent pour éviter la duplication :
	if (!modalHeader.innerHTML.includes(photographerName)) {
		modalHeader.innerHTML += `<br> ${photographerName}`;
	}

	// Ajoutez un écouteur d'événements pour arrêter la propagation sur la modal
	const modalContent = document.querySelector(".modal");
	modalContent.addEventListener("click", (event) => {
		event.stopPropagation();
	});
}

function closeModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
	modal.ariaExpanded = false;
	modal.ariaHidden = true;

	// Restaurer le focus sur tous les éléments :
	const minusTabIndex = document.querySelectorAll('[tabindex="-1"]');
	minusTabIndex.forEach((element) => {
		element.setAttribute("tabindex", "0");
	});
	// Restaurer le focus au bouton d'ouverture :
	document.querySelector(".contact_button").focus();
}

function validateField(field, regex) {
	const fieldValue = field.value.trim();

	let validField = false;

	if (regex.test(fieldValue)) {
		validField = true;
	}

	return validField;
}

function displayErrorMessage() {
	const errorMessages = {
		nom: "Veuillez saisir un nom qui doit contenir au minimum 3 caractères.",
		prenom:
			"Veuillez saisir un prénom qui doit contenir au minimum 3 caractères.",
		email: "Veuillez saisir une adresse mail valide.",
	};
	const fieldsToValidate = document.querySelectorAll("form input");
	let isValidField = false;
	let isValidForm = true;

	// Nous parcourons tous les champs et afficher le message d'erreur si nécéssaire :
	fieldsToValidate.forEach((field) => {
		// On récupère l'id du champ :
		const fieldId = field.id;

		switch (fieldId) {
			case "nom":
				isValidField = validateField(field, /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/);
				break;
			case "prenom":
				isValidField = validateField(field, /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{3,}$/);
				break;
			case "email":
				isValidField = validateField(field, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
				break;
		}
		// Nous vérifions si un élément d'erreur existe déjà pour ce champ :
		let exisitingErrorMessage = document.querySelector(`#${fieldId}-error`);
		if (!isValidField) {
			isValidForm = false;
			// Nous récupérons le message d'erreur spécifique au champ :
			const errorMessage = errorMessages[fieldId];
			/* Nous créeons la balise pour le message d'erreur :
			uniquement s'il n'existe pas déjà :
			*/
			if (!exisitingErrorMessage) {
				const errorMessageElement = document.createElement("div");
				errorMessageElement.textContent = errorMessage;
				errorMessageElement.id = `${fieldId}-error`;
				// Nous affichons le message d'erreur en dessous de l'input correspondant :
				field.after(errorMessageElement);
			}
		} else {
			if (exisitingErrorMessage) {
				exisitingErrorMessage.remove();
			}
		}
		field.classList.toggle("invalid", !isValidField);
		field.classList.toggle("valid", isValidField);
	});

	return isValidForm;
}

function submitForm() {
	const form = document.querySelector("form");

	form.addEventListener("change", () => displayErrorMessage());

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		if (displayErrorMessage()) {
			const formDatas = {};
			document
				.querySelectorAll("form input, form textarea")
				.forEach((input) => {
					formDatas[input.name] = input.value;
				});
			console.log(formDatas);
			document
				.querySelectorAll("form input")
				.forEach((input) => input.classList.remove("valid"));
			form.reset();
			closeModal();
		}
	});
}
document.querySelector("#contact_modal").addEventListener("click", closeModal);
document
	.querySelector("#contact_modal")
	.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			closeModal();
		}
	});

document.querySelector(".modal img").addEventListener("keypress", (event) => {
	if (event.key === "Enter") {
		closeModal();
	}
});

submitForm();
