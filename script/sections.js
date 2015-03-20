function sections(){
	this.store = [];
}

sections.prototype.addStore = function(id,name){
	var object = new Store(id,name);
	this.store.push(object);
};