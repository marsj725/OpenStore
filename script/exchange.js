function exchange(system){
	this.currencySymbol = system.settings.valuePrefix;
	this.values = system.settings.values;
	this.exchange = [];
	this.payIn = {};
	this.sum = 0;
}
exchange.prototype.calculateChange = function(system,money){
	var pengar = money;
	system.exchange.exchange = [];
	for(var key in system.exchange.values){
		var tmp = system.exchange.values[key];
		if(pengar % tmp >= 0 && !(pengar % tmp >= pengar)){
			while(removeExchange(pengar,tmp)){
				pengar = pengar - tmp;
				this.exchange.push(tmp);
			}
		}
	}
};

exchange.prototype.drawExchange = function(system){
	var outelement = document.getElementById("helpBar");
	var counter = 0;
	var value = 0;
		outelement.innerHTML = "";
	var element = document.createElement("div");
		element.setAttribute("id", "valueCalculator");
		element.setAttribute("class", "valueCalculator");
	for(var key in system.exchange.values){
		(function(that){
			var obj = system.exchange.values[key];
			var tmpElement = document.createElement("div");
				tmpElement.setAttribute("id", "excBtn#"+obj);
				tmpElement.setAttribute("class", "valueButton");
				if(!system.exchange.payIn[obj]){
					system.exchange.payIn[obj] = 0;
				}
				var tmpInput = document.createTextNode(system.exchange.payIn[obj] + system.settings.amountPrefix + " " + obj);
				tmpElement.addEventListener("click", function(){
				if(system.exchange.payIn[obj]){
					system.exchange.payIn[obj] += 1;
				}else{
					system.exchange.payIn[obj] = 1;
				}
				system.exchange.sum += obj;
					system.exchange.calculateChange(system,(system.exchange.sum-system.recipeList.sum));
					system.exchange.drawExchange(system);
				});
				tmpElement.appendChild(tmpInput);
			element.appendChild(tmpElement);
			counter++;
		}(system));
	}
	console.log("values "+ system.exchange.sum + " " + (system.exchange.sum-system.recipeList.sum));
	outelement.appendChild(element);
}

function removeExchange(input,remove){
	if((input - remove)>=0){
		return true;
	}else{
		return false;
	}
}