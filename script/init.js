//#############################################
// OpenStore v0.3 by Martin Sjödin Jonsson
// 2015-03-02
//#############################################

function setSettings(){
	this.name = "OpenStore";
	this.serverAdress = "server.html";
	this.base = "basePage";
	this.startStore = 0;


	this.valueSign = "kr";
	this.values = [1000,500,200,100,50,20,10,5,2,1];
}

function init(){
	this.settings = new setSettings();
	this.account = new login(this);
	this.webElements = [];
	this.sections = new sections(this);
	this.exchange = new exchange(this);
	this.navigation = new navigation(this,0);
	this.pageStructure = new pageStructure(this);
	this.recipeList = new recipeList();
	document.title = this.settings.name;

	this.dataRequests = function(){

	};

	this.dataRequests();
}
function initSystem(){
}

function generatePage(system){
	if(localStorage.getItem("token")){
		system.account.setAccountFromCache(system);
		system.webElements.page = new system.pageStructure.buildPage(system);

		var temp = {"operation":"requestStore"};
		requestData(system,temp);
		system.account.outputUser(system);
	}else{
		system.webElements.login = new system.pageStructure.buildLogin(system);
	}	
}
function generateStore(system){
	system.webElements.store = new system.pageStructure.buildStore(system,system.settings.startStore);
	system.navigation.updateVisual(system);
}