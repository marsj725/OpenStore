function navigation(system,x){
	this.position = x;
	this.helpBar = false;

}
navigation.prototype.moveLeft = function(that){
	if(that.navigation.position>=1){
		that.navigation.position -=1;
		that.webElements.bar = that.pageStructure.buildStore(that,that.navigation.position);
		console.log("movingLeft to store " + that.navigation.position +md5("hejsan"));
	}
};

navigation.prototype.moveRight = function(that){
	if(that.navigation.position < that.sections.store.length-1){
		that.navigation.position +=1;
		that.webElements.bar = that.pageStructure.buildStore(that,that.navigation.position);
		console.log("movingRight to store " + that.navigation.position);
	}
};

navigation.prototype.moveUp = function(system){
	if(!system.navigation.helpBar){
		var tmpElement = document.createElement("div");
		var pageBase = document.getElementById(system.settings.base);
		tmpElement.setAttribute("id", "helpBar");
		tmpElement.setAttribute("class", "helpBar");
		tmpElement.setAttribute("zIndex", "3");
		pageBase.appendChild(tmpElement);
		system.navigation.helpBar = true;
		system.exchange.calculateChange(system,system.recipeList.sum);
	}
};
navigation.prototype.moveDown = function(that){
	if(that.navigation.helpBar){
		var element = document.getElementById("helpBar");
		element.parentNode.removeChild(element);
		that.navigation.helpBar = false;
	}
};