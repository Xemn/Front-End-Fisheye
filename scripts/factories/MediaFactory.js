// Factory permettant d'instancier la classe nécéssaire :
class MediaFactory {
	// Méthode permettant de créer un objet media en fonction de son type :
	createMedia(type, data) {
		switch (type) {
			case "image":
				return new Image(data);
			case "video":
				return new Video(data);
			default:
				throw new Error("Type de média non reconnu");
		}
	}
}
