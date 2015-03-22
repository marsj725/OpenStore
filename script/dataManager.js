function xmlHTTPConnection(system,ticket,data){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var answer = JSON.parse(xmlhttp.responseText);
			var funkt = window[answer.operation];
			if (typeof funkt === "function") {
				funkt(system,answer);
			}
		}
	}
	xmlhttp.open("GET", system.settings.serverAdress, true);
	xmlhttp.send();
}

function setStores(system,data){

	addStore(system,data.stores);
	addItem(system,data.items);
	generateStore(system);
}

function requestData(system,temp){
	if(temp.operation === "requestStore"){
		xmlHTTPConnection(system,"hej","korv");
	}
	if(temp.operation === "usrvf"){
		var name = "Pontus Person"
		var toReturn = {"status":true,"token":temp.data,"name":name};
		return toReturn;
	}
}

function sendBasket(system){
	//Todo will send content of recipte list to server!
}

function addStore(system,input){
	for(var key in input){
		var obj = input[key];
		system.sections.addStore(obj.id,obj.name,obj.color);		
	}
}
function addItem(system,input){
	for(var key in input){
		var obj = input[key];
		system.sections.store[obj.storeID].addItem(obj.id,obj.name,obj.price);
	}
}