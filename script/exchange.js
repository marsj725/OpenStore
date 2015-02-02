function exchange(system){
	this.currencySymbol = system.settings.valueSign;
	this.values = system.settings.values;
	this.exchange = [];
}
exchange.prototype.calculateChange = function(system,money){
	var pengar = money;
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
		outelement.innerHTML = "";
	var element = document.createElement("div");
		element.setAttribute("id", "valueCalculator");
		element.setAttribute("class", "valueCalculator");
	for(var key in system.exchange.values){
		(function(that){
			if(counter)
			var obj = system.exchange.values[key];
			var tmpElement = document.createElement("div");
				tmpElement.setAttribute("id", "excBtn#"+obj);
				tmpElement.setAttribute("class", "valueButton");
				tmpElement.addEventListener("click", function(){

				});
			element.appendChild(tmpElement);
			counter++;
		}(system));
	}
	outelement.appendChild(element);
}

function removeExchange(input,remove){
	if((input - remove)>=0){
		return true;
	}else{
		return false;
	}
}