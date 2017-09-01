function Mouseover(){
	this.row = function(event){
		if(!this.ds.isWorking){
			this.setCSSTag(event.currentTarget);
			this.cssTag["jQuery"].css("background-color", "dimgray");
		}
	}
}
