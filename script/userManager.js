function login(){
		this.user = "";
		this.name = "";
		this.token = "";

}

login.prototype.verification = function(system,user,password){
	var key = md5(user) + md5(md5(user) + md5(password));
	var temp = {"operation":"usrvf","data":key};
	var answer = requestData(system,temp);
	if(answer.status){
		system.account.token = answer.token;
		system.account.user = user;
		system.account.name = answer.name;
		document.body.innerHTML = "";
		generatePage(system);
		localStorage.token = system.account.token;
		localStorage.user = system.account.user;
		localStorage.name = system.account.name;
	}
};

login.prototype.logout = function(system){
	system.account.user = "";
	system.account.name = "";
	system.account.token = "";
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	localStorage.removeItem("name");
	document.body.innerHTML = "";
	generatePage(system);
	console.log("page is cleared!");
}

login.prototype.setAccountFromCache = function(system){
	system.account.token = localStorage.token;
	system.account.user = localStorage.user;
	system.account.name = localStorage.name;

}

login.prototype.outputUser = function(system){
	system.webElements.page.status.innerHTML = system.account.name;
	console.log(system.account.name);
}
