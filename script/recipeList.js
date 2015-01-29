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
			tmpElement.setAttribute("id", "itexm#"+keyx);
			tmpElement.setAttribute("class", "cartItem");
			var tmpAdd = document.createElement("div");
				tmpAdd.setAttribute("id", "add#"+obj.id);
				tmpAdd.setAttribute("class", "cartAdd minus");
				tmpElement.appendChild(tmpAdd);
			var tmpText = document.createElement("div");
				tmpText.setAttribute("id", "add#"+obj.id);
				tmpText.setAttribute("class", "cartText");
				tmpText.appendChild(tmpInput);
				tmpElement.appendChild(tmpText);
			var tmpRmv = document.createElement("div");
				tmpRmv.setAttribute("id", "remove#"+obj.id);
				tmpRmv.setAttribute("class", "cartRemove");
				tmpElement.appendChild(tmpRmv);
			tmpElement.addEventListener("click", function(){
			var tmpobj = document.getElementById("itexm#"+keyx);
				$(tmpobj).finish()
				$(tmpobj).fadeOut("fast");
				$(tmpobj).fadeIn("fast");
				that.recipeList.removeFromList(barSystem,obj.id,obj.name,obj.price);
				that.recipeList.updateList(that);
			});
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

recipeList.prototype.checkout = function(barSystem){
	var sum = 0;
	for(var key in barSystem.recipeList.list){
		var tmpobj = barSystem.recipeList.list[key];
		sum += tmpobj.price * tmpobj.amount;
	}
	console.log(sum);
	barSystem.webElements.page.sumfield.innerHTML = sum;
};