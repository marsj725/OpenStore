function pageStructure(has){
	this.pageRaw = [
		{"type":"div","parent":has.settings.base,"id":"recipe","class":"recipe"},
		{"type":"div","parent":has.settings.base,"id":"buy","class":"buy"},
		{"type":"div","parent":"buy","id":"contentLine0","class":"contentLine0"},
		{"type":"div","parent":"buy","id":"contentLine1","class":"contentLine1"},
		{"type":"div","parent":"recipe","id":"x","class":"x"}
		];
}

pageStructure.prototype.buildPage = function(barSystem){
	var structure = [];
	for(var key in barSystem.pageStructure.pageRaw){
		var tmpObj = barSystem.pageStructure.pageRaw[key];
		var tmp = document.createElement(tmpObj.type);
		var element = document.getElementById(tmpObj.parent);
		tmp.setAttribute("id", tmpObj.id);
		tmp.setAttribute("class", tmpObj.class);
		if(tmpObj.id==="buy"){
			$(tmp).swipe({
				swipe:function(event, direction, distance, duration, fingerCount){
					if(direction==="left"){
						barSystem.navigation.moveLeft(barSystem);
					}else{
						barSystem.navigation.moveRight(barSystem);
					}
		        }
			});
		}
		element.appendChild(tmp);
		structure[tmpObj.id] = document.getElementById(tmpObj.id);
	}
	return structure;
};

pageStructure.prototype.buildStore = function(barSystem,store){
	console.log("working on the store!")
	var structure = [];
	storeObj = barSystem.sections.store[store];
	document.getElementById("contentLine0").innerHTML = "";
	document.getElementById("contentLine1").innerHTML = "";
	for(var key in storeObj.inventory){
		(function(that) {
			var obj = barSystem.stockedItems.content[key];
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
				$(tmpobj).fadeOut("fast");
				$(tmpobj).fadeIn("fast");
				that.recipeList.addToList(barSystem,obj.id,obj.name);
				that.recipeList.updateList(that);
			});
			outelement.appendChild(tmpElement);
			structure[key] = document.getElementById("item#"+obj.id);
			console.log(structure[key]);
		}(barSystem));
	}
	return structure;
};