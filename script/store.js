function Store(){
	this.id;
	this.store;
	this.inventory = [];
}

Store.prototype.addItem = function(id,name,price){
	var object = new item(id,name,price);
	this.inventory.push(object);
};