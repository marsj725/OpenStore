function sections(){
	this.store = [];
}

sections.prototype.addStore = function(id,name,color){
	var object = new Store(id,name,color);
	this.store.push(object);
};