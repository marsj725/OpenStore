//#############################################
// OpenStore v0.1 by Martin Sjödin Jonsson
// 2015-01-22
//#############################################

function setSettings(){
	this.name = "OpenStore 0.1";
	this.serverAdress = "none";
	this.base = "basePage";
	this.startStore = 0;
	this.valueSign = "kr";
}

function initBarSystem(){
	this.barBase;
	this.settings = new setSettings();
	this.navigation = new navigation(this,0);
	this.sections = new sections(this);
	this.pageStructure = new pageStructure(this);
	this.webElements = [];
	this.exchange = new exchange(this);
	this.recipeList = new recipeList();
	this.basketItem = new basketItem();
	this.sells = [];

	this.exchange.calculateChange(this,2678);
	document.title = this.settings.name;

	this.dataRequests = function(){
		var temp = {"operation":"requestStores"};
		requestData(temp,0,this);
	};
	this.dataRequests();
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