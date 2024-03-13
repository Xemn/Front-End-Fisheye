// Classe pour constuire une Video :
class Video extends Media {
	constructor(data) {
		// Hérite des propriétés de la classe Media :
		super(data);
		this._type = "video";
		this._src = `assets/photographerGallery/${data.video}`;
	}

	// Getters :

	get type() {
		return this._type;
	}

	get src() {
		return this._src;
	}
}
