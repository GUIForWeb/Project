function Mouseout(){
	this.row = function(event){
		if(!this.ds.isWorking){
			this.cssTag["jQuery"].css("background-color", "white");
		}
	}
}
