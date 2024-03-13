// Classe pour constuire une Image :
class Image extends Media {
	constructor(data) {
		// Hérite des propriétés de la classe Media :
		super(data);
		this._type = "image";
		this._src = `assets/photographerGallery/${data.image}`;
	}

	// Getters :
	get type() {
		return this._type;
	}

	get src() {
		return this._src;
	}
}
