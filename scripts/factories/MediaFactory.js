class MediaFactory {
	// Constructeur permettant de créer le bon objet media en fonction de son type :
	constructor(data, name) {
		if (data.image) {
			return new Image(data, name);
		} else if (data.video) {
			return new Video(data, name);
		} else {
			throw new Error("Type de média non reconnu");
		}
	}
}
