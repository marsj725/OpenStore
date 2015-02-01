function requestData(temp,key,has){
	if(temp.operation === "requestStores"){
		var temp = [{"name":"Öl","id":0},{"name":"Vin","id":1},{"name":"Sprit","id":2}];
		answerStores(temp,has);
	}
	if(temp.operation === "requestStoreItems"){
		if(key == 0){
			var temp = [
				{"id":1,"type":0,"subType":0,"name":"Norrlands Guld Export","alcohol":5.3,"systemB":"1412","price":17},
				{"id":2,"type":0,"subType":0,"name":"MarieStad","alcohol":5.3,"systemB":"1412","price":17},
				{"id":3,"type":0,"subType":0,"name":"Norrlands Guld Export","alcohol":5.3,"systemB":"1412","price":17},
				{"id":4,"type":0,"subType":0,"name":"Objekt 4:a","alcohol":5.3,"systemB":"1412","price":17}
			];
		}else if(key == 1){
			var temp = [
				{"id":5,"type":1,"subType":0,"name":"RödTjutet","alcohol":15.3,"systemB":"1412","price":57},
				{"id":6,"type":1,"subType":0,"name":"BagnBoxen","alcohol":17.1,"systemB":"1412","price":157}
			];
		}else{
			var temp = [];
		}
		this.answ = answerInventory(temp,key,has);
	}
}

function sendData(ticket,data){

}