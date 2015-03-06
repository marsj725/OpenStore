function setStores(){
	var temp = [{"name":"Öl","id":0},{"name":"Vin","id":1},{"name":"Sprit","id":2}];
	return temp;
}

function xmlHTTPConnection(system,ticket,data){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var answer = JSON.parse(xmlhttp.responseText);
			var funkt = window[answer.operation];
			if (typeof funkt === "function") {
				funkt(system,data)
			}
			console.log(answer);
		}
	}
	xmlhttp.open("GET", system.settings.serverAdress, true);
	xmlhttp.send();
}

function setStores(system,data){
	//addStore(system,data.stores);
	//addItem(system,data.items);

}

function requestData(system,temp){
	if(temp.operation === "requestStore"){
	console.log("requesting data");
		xmlHTTPConnection(system,"hej","korv");
	//	addStore(system,data.stores);
	//	addItem(system,data.items);
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