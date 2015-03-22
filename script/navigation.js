function navigation(system,x){
	this.position = x;
	this.helpBar = false;

}
navigation.prototype.moveLeft = function(that){
	if(that.navigation.position < that.sections.store.length-1){
		that.navigation.position +=1;
		that.webElements.bar = that.pageStructure.buildStore(that,that.navigation.position);
		that.navigation.updateVisual(that);
	}
};

navigation.prototype.moveRight = function(that){
	if(that.navigation.position >= 1){
		that.navigation.position -=1;
		that.webElements.bar = that.pageStructure.buildStore(that,that.navigation.position);
		that.navigation.updateVisual(that);
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
		system.exchange.drawExchange(system);
	}
};
navigation.prototype.moveDown = function(that){
	if(that.navigation.helpBar){
		var element = document.getElementById("helpBar");
		element.parentNode.removeChild(element);
		that.navigation.helpBar = false;
		that.exchange.payIn = [];
	}
};

navigation.prototype.updateVisual = function(that){
	var baseElement = document.createElement("div");
	var pageBase = that.webElements.page.navigationField;
	var base = document.getElementById(that.settings.base);
	pageBase.innerHTML = "";
	for(var key in (that.sections.store)){
		(function(that){
			var pageSize = 100/that.sections.store.length;
			var obj = that.sections.store[key];
			var tmpElement = document.createElement("div");
				tmpElement.setAttribute("id","visualStore#"+obj.id);
			if(that.navigation.position === obj.id){
				tmpElement.setAttribute("class", "activeField");
				tmpElement.style.backgroundColor = "#F0F0F0";
				tmpElement.innerHTML = obj.store;
				base.style.backgroundColor = obj.color;
			}else{
				tmpElement.setAttribute("class", "inactiveField");
				tmpElement.style.backgroundColor = obj.color;
				tmpElement.innerHTML = obj.store;
			}
			tmpElement.addEventListener("click", function(){
				that.navigation.position = obj.id;
				that.webElements.bar = that.pageStructure.buildStore(that,obj.id);
			});
			pageBase.appendChild(tmpElement);
			var tmp = document.getElementById("visualStore#"+obj.id);
			tmp.style.width = pageSize+"%";
			tmp.style.opacity
		}(that));
	}
}