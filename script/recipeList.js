function recipeList(id,name,amount){
	this.list = [];
	this.sum = 0;
}
recipeList.prototype.updateList = function(system){
	system.webElements.page.recipe.innerHTML="";
	for(var keyx in system.recipeList.list){
		(function(that) {
			var obj = system.recipeList.list[keyx];
			var tmpElement = document.createElement("div");
			var tmpInput = document.createTextNode(obj.name + " " + obj.amount + system.settings.amountAffix);
			tmpElement.setAttribute("id", "listItem#"+obj.id);
			tmpElement.setAttribute("class", "cartItem");
			var tmpAdd = document.createElement("div");
				tmpAdd.setAttribute("id", "add#"+obj.id);
				tmpAdd.setAttribute("class", "cartAdd minus");
				tmpAdd.addEventListener("click", function(){
					that.recipeList.addToList(system,obj.id,obj.name,obj.price);
					that.recipeList.updateList(that);
					var tmpobj = document.getElementById("add#"+obj.id);
						$(tmpobj).finish()
						$(tmpobj).hide();
						$(tmpobj).fadeIn("medium");
				});
				var tmpPlus = document.createElement("div");
					tmpPlus.setAttribute("id", "plus#"+obj.id);
					tmpPlus.setAttribute("class", "cartPlus");
					tmpAdd.appendChild(tmpPlus);
				var tmpPlus2 = document.createElement("div");
					tmpPlus2.setAttribute("id", "plus2#"+obj.id);
					tmpPlus2.setAttribute("class", "cartPlus2");
					tmpAdd.appendChild(tmpPlus2);		
			tmpElement.appendChild(tmpAdd);
			var tmpText = document.createElement("div");
				tmpText.setAttribute("id", "add#"+obj.id);
				tmpText.setAttribute("class", "cartContent");
				tmpText.appendChild(tmpInput);
				tmpText.addEventListener("click", function(){
					that.recipeList.addToList(system,obj.id,obj.name,obj.price);
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
					that.recipeList.removeFromList(system,obj.id,obj.name,obj.price);
					that.recipeList.updateList(that);
					var tmpobj = document.getElementById("remove#"+obj.id);
						$(tmpobj).finish()
						$(tmpobj).hide();
						$(tmpobj).fadeIn("medium");
					});
			var tmpMinus = document.createElement("div");
				tmpMinus.setAttribute("id", "minud#"+obj.id);
				tmpMinus.setAttribute("class", "cartMinus");
			tmpRmv.appendChild(tmpMinus);	
			tmpElement.appendChild(tmpRmv);
			system.webElements.page.recipe.appendChild(tmpElement);
		}(system));
	}
};

recipeList.prototype.addToList = function(system,id,name,price){
	var antal = 0;
	var cost = 0;
	for(var key in system.recipeList.list){
		var tempObj = system.recipeList.list[key];
		if(tempObj.id === id){
			antal = tempObj.amount + 1;
			tempObj.amount = antal;
		}
	}
	if(antal === 0){
		system.recipeList.list.push(new basketItem(id,name,1,price));
	}
	system.recipeList.checkout(system);
	if(system.navigation.helpBar){
		system.exchange.drawExchange(system);
	}
};

recipeList.prototype.removeFromList = function(system,id,name,price){
	var antal = 0;
	var cost = 0;
	for(var key in system.recipeList.list){
		var tempObj = system.recipeList.list[key];
		if(tempObj.id === id){
			antal = tempObj.amount - 1;
			if(antal === 0){
				system.recipeList.list.splice(key, 1);
			}else{
				tempObj.amount = antal;
			}
		}
	}
	system.recipeList.checkout(system);
};

recipeList.prototype.clearAll = function(system){
	system.recipeList.list = [];
	system.recipeList.updateList(system);
	system.recipeList.checkout(system);
};

recipeList.prototype.checkout = function(system){
	var sum = 0;
	for(var key in system.recipeList.list){
		var tmpobj = system.recipeList.list[key];
		sum += tmpobj.price * tmpobj.amount;
	}
	if(system.navigation.helpBar){
		system.exchange.drawExchange(system);
	}
	system.recipeList.sum = sum;
	system.webElements.page.sumfield.innerHTML = sum + " " + system.settings.valueAffix;
};