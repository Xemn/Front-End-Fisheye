function displayModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "flex";
	const photographerName = document.querySelector("h1").innerText;
	const modalHeader = document.querySelector(".modal header h2");
	modalHeader.innerHTML += `<br> ${photographerName}`;
}

function closeModal() {
	const modal = document.getElementById("contact_modal");
	modal.style.display = "none";
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

	// Nous parcourons tous les champs et afficher le message d'erreur si nécéssaire :
	fieldsToValidate.forEach((field) => {
		// On récupère l'id du champ :
		const fieldId = field.id;
		let isValidField = false;

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

		if (!isValidField) {
			// Nous vérifions si un élément d'erreur existe déjà pour ce champ :
			const exisitingErrorMessage = document.querySelector(`#${fieldId}-error`);
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
			} else {
				exisitingErrorMessage.remove();
			}
		}
		field.classList.toggle("invalid", !isValidField);
		field.classList.toggle("valid", isValidField);
	});
}

function submitForm() {
	const form = document.querySelector("form");

	form.addEventListener("input", () => displayErrorMessage());

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		if (form.checkValidity()) {
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
		}
	});
}

submitForm();
