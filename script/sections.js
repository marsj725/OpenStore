function sections(){
	this.store = [];
};

sections.prototype.addStore = function(id,name){
	var object = new store(id,name);
	this.store.push(object);
};