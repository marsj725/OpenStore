function Store(id,name){
	this.id = id;
	this.store = name;
	this.inventory = [];
}

Store.prototype.addItem = function(id,name,price){
	var object = new item(id,name,price);
	this.inventory.push(object);
};