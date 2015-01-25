function store(id,name){
	this.id = id;
	this.store = name;
	this.inventory = [];
};

store.prototype.addItem = function(id,name,price){
	var object = new item(id,name,price);
	this.inventory.push(object);
};