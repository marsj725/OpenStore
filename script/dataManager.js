function setStores(){
	var temp = [{"name":"Öl","id":0},{"name":"Vin","id":1},{"name":"Sprit","id":2}];
	return temp;
}

function xmlHTTPConnection(ticket,data){

}

function requestData(system,temp){
	if(temp.operation === "requestStore"){
	console.log("requesting data");
		var rawData = {
			"stores":[
				{"name":"Öl","id":0},
				{"name":"Vin","id":1},
				{"name":"Sprit","id":2}
			],
			"items":[
				{"storeID":0,"id":1,"type":0,"subType":0,"name":"Norrlands Guld Export","alcohol":5.3,"price":17},
				{"storeID":0,"id":2,"type":0,"subType":0,"name":"MarieStad","alcohol":5.3,"price":17},
				{"storeID":0,"id":3,"type":0,"subType":0,"name":"Norrlands Guld Export","alcohol":5.3,"price":17},
				{"storeID":0,"id":4,"type":0,"subType":0,"name":"Objekt 4:a","alcohol":5.3,"price":17},
				{"storeID":1,"id":5,"type":1,"subType":0,"name":"RödTjutet","alcohol":15.3,"price":57},
				{"storeID":1,"id":6,"type":1,"subType":0,"name":"BagnBoxen","alcohol":17.1,"price":157}
			]
		};

		addStore(system,rawData.stores);
		addItem(system,rawData.items);
	}
	if(temp.operation === "usrvf"){
		var name = "Hejsan"
		var toReturn = {"status":true,"token":temp.data,"name":name};
		return toReturn;
	}
}

function addStore(system,input){
	console.log("addstore");
	for(var key in input){
		var obj = input[key];
		system.sections.addStore(obj.id,obj.name);		
	}
}
function addItem(system,input){
	console.log("additem");

	for(var key in input){
		var obj = input[key];
		system.sections.store[obj.storeID].addItem(obj.id,obj.name,obj.price);
	}
}