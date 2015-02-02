function pageStructure(has){
	this.pageRaw = [
		{"type":"div","parent":has.settings.base,"id":"recipe","class":"recipe","action":false},
		{"type":"div","parent":has.settings.base,"id":"buy","class":"buy","action":false},
		{"type":"div","parent":has.settings.base,"id":"checkout","class":"checkout","action":false},
		{"type":"div","parent":"checkout","id":"sumfield","class":"sumfield","action":false},
		{"type":"div","parent":"checkout","id":"checkoutBtn","class":"checkoutButton","action":false},
		{"type":"div","parent":"checkout","id":"clearBtn","class":"clearButton","action":"clearLocal"},
		{"type":"div","parent":"buy","id":"contentLine0","class":"contentLine0","action":false},
		{"type":"div","parent":"buy","id":"contentLine1","class":"contentLine1","action":false},
		{"type":"div","parent":"recipe","id":"x","class":"x","action":false}
		];
	this.loginRaw = [
		{"type":"div","parent":has.settings.base,"id":"none","class":"none","action":false}
		];
}

pageStructure.prototype.buildLogin = function(system){
	var bodyElement = document.createElement("div");
		bodyElement.setAttribute("id",system.settings.base);
		bodyElement.setAttribute("class","page");
	document.body.appendChild(bodyElement);
	var structure = [];
	for(var key in system.pageStructure.loginRaw){
		(function(that){
			var tmpObj = that.pageStructure.loginRaw[key];
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

pageStructure.prototype.buildPage = function(system){
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
	var structure = [];
	var storeObj = system.sections.store[store];
	document.getElementById("contentLine0").innerHTML = "";
	document.getElementById("contentLine1").innerHTML = "";
	for(var key in system.sections.store[store].inventory){
		(function(that) {
			var obj = system.sections.store[store].inventory[key];
			var modulo = key % 2;
			var tmpElement = document.createElement("div");
			var tmpInput = document.createTextNode(obj.name);
			var outelement = document.getElementById("contentLine"+modulo);
			tmpElement.appendChild(tmpInput);
			tmpElement.setAttribute("id", "item#"+obj.id);
			tmpElement.setAttribute("class", "cart");
			tmpElement.addEventListener("click", function(){
				var tmpobj = document.getElementById("item#"+obj.id);
				$(tmpobj).finish()
				$(tmpobj).hide();
				$(tmpobj).fadeIn("medium");
				that.recipeList.addToList(system,obj.id,obj.name,obj.price);
				that.recipeList.updateList(that);
			});
			outelement.appendChild(tmpElement);
			structure[key] = document.getElementById("item#"+obj.id);
		}(system));
	}
	$(document.getElementById("contentLine0")).fadeIn("slow");
	$(document.getElementById("contentLine1")).fadeIn("slow");
	return structure;
};

function clearLocal(system){
	system.recipeList.clearAll(system);
}