function navigation(barsystem,x){
	this.position = x;
	this.helpBar = false;

}
navigation.prototype.moveLeft = function(that){
	if(that.navigation.position>=1){
		that.navigation.position -=1;
		that.webElements.bar = that.pageStructure.buildStore(that,that.navigation.position);
		console.log("movingLeft to store " + that.navigation.position);
	}
};

navigation.prototype.moveRight = function(that){
	if(that.navigation.position < that.sections.store.length-1){
		that.navigation.position +=1;
		that.webElements.bar = that.pageStructure.buildStore(that,that.navigation.position);
		console.log("movingRight to store " + that.navigation.position);
	}
};

navigation.prototype.moveUp = function(that){
	if(that.navigation.helpBar){
		console.log("showing exchange helpBar");
	}else{
		console.log("showing *(hidden) exchange helpBar");
		var tmpElement = document.createElement("div");
		var pageBase = document.getElementById(that.settings.base);
		tmpElement.setAttribute("id", "helpBar");
		tmpElement.setAttribute("class", "helpBar");
		tmpElement.setAttribute("zIndex", "3");
		pageBase.appendChild(tmpElement);
		that.navigation.helpBar = true;
	}
};
navigation.prototype.moveDown = function(that){
	if(that.navigation.helpBar){
		var element = document.getElementById("helpBar");
		element.parentNode.removeChild(element);
		that.navigation.helpBar = false;
	}
};