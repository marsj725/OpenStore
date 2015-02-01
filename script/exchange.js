function exchange(system){
	this.currencySymbol = system.settings.valueSign;
	this.values = [
					1000,
					500,
					200,
					100,
					50,
					20,
					10,
					5,
					2,
					1
	];
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

function removeExchange(input,remove){
	if((input - remove)>=0){
		return true;
	}else{
		return false;
	}
}