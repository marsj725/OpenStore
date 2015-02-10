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
		localStorage.account = {"user":system.account.user,"token":system.account.token};
	}
};

login.prototype.logout = function(system){
	system.user = "";
	system.name = "";
	system.token = "";
	document.body.innerHTML = "";
	generatePage(system);
}
