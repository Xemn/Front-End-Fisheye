// Classe pour constuire une Image :
class Image extends Media {
	constructor(data, name) {
		// Hérite des propriétés de la classe Media :
		super(data);
		const path = name.replace(/\s/g, "_");
		this._src = `assets/photographerGallery/${path}/${data.image}`;
	}

	// Getters :
	get src() {
		return this._src;
	}
}
