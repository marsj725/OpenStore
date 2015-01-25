function store(id,name){
	this.id = id;
	this.store = name;
	this.inventory = [];
};

store.prototype.addItem = function(id,name){
	var object = new item(id,name);
	this.inventory.push(object);
};