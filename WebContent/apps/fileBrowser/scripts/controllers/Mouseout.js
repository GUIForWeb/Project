function Mouseout(){
	this.row = function(event){
		if(!this.ds.isWorking){
			this.va["tagArray"].css("background-color", "white");
		}
	}
}
