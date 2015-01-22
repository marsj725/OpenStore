function navigation(barsystem,x){
	this.position = x;

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