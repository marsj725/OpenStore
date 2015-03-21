function Store(id,name,color){
	this.id = id;
	this.store = name;
	this.color = color;
	this.inventory = [];
}

Store.prototype.addItem = function(id,name,price){
	var object = new item(id,name,price);
	this.inventory.push(object);
};