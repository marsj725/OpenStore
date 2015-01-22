function store(id,name){
	this.id = 0;
	this.store = name;
	this.inventory = [];
};

store.prototype.addItem = function(data){
	var object = new items(data);
	this.inventory.push(object);
};