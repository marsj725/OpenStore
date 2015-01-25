//#############################################
// OpenStore v0.1 by Martin Sjödin Jonsson
// 2015-01-22
//#############################################

function setSettings(){
	this.name = "barClient";
	this.serverAdress = "none";
	this.Height = 600;
	this.Width = 800;
	this.base = "basePage";
	this.startStore = 0;
	this.valueSign = ":-";
}

function initBarSystem(){
	this.barBase;
	this.settings = new setSettings();
	this.navigation = new navigation(this,0);
	this.sections = new sections(this);
	this.pageStructure = new pageStructure(this);
	this.webElements = [];
	this.recipeList = new recipeList();
	this.basketItem = new basketItem();
	this.sells = [];

	this.dataRequests = function(){
		var temp = {"operation":"requestStores"};
		requestData(temp,0,this);
	};
	this.dataRequests();
}

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

this.answerStores = function (retrivedData,has){
	for(var key in retrivedData){
		var obj = retrivedData[key];
		has.sections.addStore(obj.id,obj.name);
		this.inventoryRequeset = function(){
			var temp = {"operation":"requestStoreItems","input":key};
			requestData(temp,key,has);
		};
		this.inventoryRequeset();
	}
};
this.answerInventory = function (retrivedData,store,has){
	for(var keys in retrivedData){
		var obj = retrivedData[keys];
		has.sections.store[store].addItem(obj.id,obj.name,obj.price);
	}
}

function generatePage(barSystem){
	barSystem.webElements.page = new barSystem.pageStructure.buildPage(barSystem);
	barSystem.webElements.bar = new barSystem.pageStructure.buildStore(barSystem,0);
}