function Mouseout(){
	this.row = function(event){
		if(!this.ds.isWorking){
			console.log("Yo1");
			this.va["tagArray"].css("background-color", "white");
		}
	}
}
