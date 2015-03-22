function pageStructure(has){
	this.pageRaw = [
		{"type":"div","parent":has.settings.base,"id":"recipe","class":"recipe","action":false},
		{"type":"div","parent":has.settings.base,"id":"buy","class":"buy","action":false},
		{"type":"div","parent":has.settings.base,"id":"checkout","class":"checkout","action":false},
		{"type":"div","parent":has.settings.base,"id":"status","class":"status","action":false},
		{"type":"div","parent":has.settings.base,"id":"navigationField","class":"navigationField","action":false},
		{"type":"div","parent":"checkout","id":"sumfield","class":"sumfield","action":false},
		{"type":"div","parent":"checkout","id":"checkoutBtn","class":"checkoutButton","action":false},
		{"type":"div","parent":"checkout","id":"clearBtn","class":"clearButton","action":"clearLocal"},
		{"type":"div","parent":"status","id":"special","class":"special","action":false},
		{"type":"div","parent":"special","id":"nameField","class":"nameField","action":false},
		{"type":"div","parent":"status","id":"signOut","class":"signOut","action":"logout"},
		{"type":"div","parent":"buy","id":"contentLine0","class":"contentLine0","action":false},
		{"type":"div","parent":"buy","id":"contentLine1","class":"contentLine1","action":false},
		{"type":"div","parent":"recipe","id":"x","class":"x","action":false}
		];
	this.loginRaw = [
		{"type":"div","parent":has.settings.base,"id":"loginField","class":"login","action":false},
		{"type":"div","subType":"input","parent":"loginField","id":"title","class":"title","action":false},
		{"type":"div","subType":"input","parent":"loginField","id":"fieldBox1","class":"fieldUser","action":false},
		{"type":"input","subType":"input","parent":"fieldBox1","id":"user","class":"field","action":false},
		{"type":"div","subType":"input","parent":"loginField","id":"fieldBox2","class":"fieldPassword","action":false},
		{"type":"input","subType":"password","parent":"fieldBox2","id":"paswd","class":"field","action":false},
		{"type":"button","parent":"loginField","id":"submit","class":"button","action":"loginSquence"}
		];
}

pageStructure.prototype.buildLogin = function(system){
	document.body.innerHTML = "";
	var bodyElement = document.createElement("div");
		bodyElement.setAttribute("id",system.settings.base);
		bodyElement.setAttribute("class","page");
	document.body.appendChild(bodyElement);
	var structure = [];
	for(var key in system.pageStructure.loginRaw){
		(function(that){
			var tmpObj = that.pageStructure.loginRaw[key];
			var tmp = document.createElement(tmpObj.type);
			if(tmpObj.type==="input"){
				tmp.setAttribute("type", tmpObj.subType);
			}
			if(tmpObj.id ==="title"){
				var textNode = document.createTextNode(system.settings.name);
				tmp.appendChild(textNode);
			}
			var element = document.getElementById(tmpObj.parent);
			tmp.setAttribute("id", tmpObj.id);
			tmp.setAttribute("class", tmpObj.class);
			if(tmpObj.action){
					tmp.addEventListener("click", function(){
					var funkt = window[tmpObj.action];
					if (typeof funkt === "function") funkt(that);
					});
			}
			element.appendChild(tmp);
			structure[tmpObj.id] = document.getElementById(tmpObj.id);
		}(system));
	}
	return structure;
};

pageStructure.prototype.buildPage = function(system){
	document.body.innerHTML = "";
	var bodyElement = document.createElement("div");
		bodyElement.setAttribute("id",system.settings.base);
		bodyElement.setAttribute("class","page");
	document.body.appendChild(bodyElement);
	var tmpx = document.getElementById(system.settings.base);
	$(tmpx).swipe({
		swipe:function(event, direction, distance, duration, fingerCount){
			if(direction==="left"){
				system.navigation.moveLeft(system);
			}else if(direction === "right"){
				system.navigation.moveRight(system);
			}else if (direction === "up"){
				system.navigation.moveUp(system);
			}else if (direction === "down"){
				system.navigation.moveDown(system);
			}
		}
	});
	var structure = [];
	for(var key in system.pageStructure.pageRaw){
		(function(that){
			var tmpObj = that.pageStructure.pageRaw[key];
			var tmp = document.createElement(tmpObj.type);
			var element = document.getElementById(tmpObj.parent);
			tmp.setAttribute("id", tmpObj.id);
			tmp.setAttribute("class", tmpObj.class);
			if(tmpObj.action){
					tmp.addEventListener("click", function(){
					var funkt = window[tmpObj.action];
					if (typeof funkt === "function") funkt(that);
					});
			}
			element.appendChild(tmp);
			structure[tmpObj.id] = document.getElementById(tmpObj.id);
		}(system));
	}
	return structure;
};

pageStructure.prototype.buildStore = function(system,store){
	$(document.getElementById("contentLine0")).hide();
	$(document.getElementById("contentLine1")).hide();
	document.getElementById("contentLine0").innerHTML = "";
	document.getElementById("contentLine1").innerHTML = "";
	system.webElements.page.sumfield.innerHTML = system.recipeList.sum + " " + system.settings.valuePrefix;
	var structure = [];
	var storeObj = system.sections.store[store];
	for(var key in system.sections.store[store].inventory){
		(function(that) {
			var obj = system.sections.store[store].inventory[key];
			var modulo = key % 2;
			var tmpBase = document.createElement("div");
			var tmpText = document.createElement("div");
			var tmpPrice = document.createElement("div");
			var inputText = document.createTextNode(obj.name);
			var inputPrice = document.createTextNode(obj.price + system.settings.valuePrefix);
			var outelement = document.getElementById("contentLine"+modulo);
			tmpText.appendChild(inputText);
			tmpText.setAttribute("class", "cartLabel");
			tmpBase.appendChild(tmpText);
			tmpPrice.appendChild(inputPrice);
			tmpPrice.setAttribute("class", "cartPrice");
			tmpBase.appendChild(tmpPrice);
			tmpBase.setAttribute("id", "item#"+obj.id);
			tmpBase.setAttribute("class", "cart");
			tmpBase.addEventListener("click", function(){
				var tmpobj = document.getElementById("item#"+obj.id);
				$(tmpobj).finish()
				$(tmpobj).hide();
				$(tmpobj).fadeIn("medium");
				that.recipeList.addToList(system,obj.id,obj.name,obj.price);
				that.recipeList.updateList(that);
			});
			outelement.appendChild(tmpBase);
			structure[key] = document.getElementById("item#"+obj.id);
		}(system));
	}
	system.navigation.updateVisual(system);
	$(document.getElementById("contentLine0")).fadeIn("slow");
	$(document.getElementById("contentLine1")).fadeIn("slow");
	return structure;
};

function loginSquence(system){
	var usr = document.getElementById("user").value;
	var pswd = document.getElementById("paswd").value;
	system.account.verification(system,usr,paswd);
	system.account.outputUser(system);
}

function clearLocal(system){
	system.recipeList.clearAll(system);
}

function logout(system){
	system.account.logout(system);
}