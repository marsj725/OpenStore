function recipeList(id,name,amount){
	this.list = [];
}
recipeList.prototype.updateList = function(barSystem){
	barSystem.webElements.page.recipe.innerHTML="";
	for(var keyx in barSystem.recipeList.list){
		(function(that) {
			var obj = barSystem.recipeList.list[keyx];
			var tmpElement = document.createElement("div");
			var tmpInput = document.createTextNode(obj.name + " " + obj.amount+ "st.");
			tmpElement.setAttribute("id", "listItem#"+obj.id);
			tmpElement.setAttribute("class", "cartItem");
			var tmpAdd = document.createElement("div");
				tmpAdd.setAttribute("id", "add#"+obj.id);
				tmpAdd.setAttribute("class", "cartAdd minus");
				tmpAdd.addEventListener("click", function(){
					that.recipeList.addToList(barSystem,obj.id,obj.name,obj.price);
					that.recipeList.updateList(that);
					var tmpobj = document.getElementById("add#"+obj.id);
						$(tmpobj).finish()
						$(tmpobj).hide();
						$(tmpobj).fadeIn("medium");
				});
				tmpElement.appendChild(tmpAdd);
			var tmpText = document.createElement("div");
				tmpText.setAttribute("id", "add#"+obj.id);
				tmpText.setAttribute("class", "cartText");
				tmpText.appendChild(tmpInput);
				tmpText.addEventListener("click", function(){
					that.recipeList.addToList(barSystem,obj.id,obj.name,obj.price);
					that.recipeList.updateList(that);
					var tmpobj = document.getElementById("add#"+obj.id);
						$(tmpobj).finish()
						$(tmpobj).hide();
						$(tmpobj).fadeIn("medium");
				});
				tmpElement.appendChild(tmpText);
			var tmpRmv = document.createElement("div");
				tmpRmv.setAttribute("id", "remove#"+obj.id);
				tmpRmv.setAttribute("class", "cartRemove");
				tmpRmv.addEventListener("click", function(){
					that.recipeList.removeFromList(barSystem,obj.id,obj.name,obj.price);
					that.recipeList.updateList(that);
					var tmpobj = document.getElementById("remove#"+obj.id);
						$(tmpobj).finish()
						$(tmpobj).hide();
						$(tmpobj).fadeIn("medium");
					});
			tmpElement.appendChild(tmpRmv);
			barSystem.webElements.page.recipe.appendChild(tmpElement);
		}(barSystem));
	}
};

recipeList.prototype.addToList = function(barSystem,id,name,price){
	var antal = 0;
	var cost = 0;
	for(var key in barSystem.recipeList.list){
		var tempObj = barSystem.recipeList.list[key];
		if(tempObj.id === id){
			antal = tempObj.amount + 1;
			tempObj.amount = antal;
		}
	}
	if(antal === 0){
		barSystem.recipeList.list.push(new basketItem(id,name,1,price));
	}
	barSystem.recipeList.checkout(barSystem);
};

recipeList.prototype.removeFromList = function(barSystem,id,name,price){
	var antal = 0;
	var cost = 0;
	for(var key in barSystem.recipeList.list){
		var tempObj = barSystem.recipeList.list[key];
		if(tempObj.id === id){
			antal = tempObj.amount - 1;
			if(antal === 0){
				barSystem.recipeList.list.splice(key, 1);
			}else{
				tempObj.amount = antal;
			}
		}
	}
	barSystem.recipeList.checkout(barSystem);
};

recipeList.prototype.clearAll = function(barSystem){
	barSystem.recipeList.list = [];
	barSystem.recipeList.updateList(barSystem);
	barSystem.recipeList.checkout(barSystem);
};

recipeList.prototype.checkout = function(system){
	var sum = 0;
	for(var key in system.recipeList.list){
		var tmpobj = system.recipeList.list[key];
		sum += tmpobj.price * tmpobj.amount;
	}
	system.webElements.page.sumfield.innerHTML = sum + " " + system.settings.valueSign;
};