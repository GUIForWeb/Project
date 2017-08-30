function Mouseover(){
	this.row = function(event){
		if(!this.ds.isWorking){
			this.tag(event.currentTarget);
			this.va["tagArray"].css("background-color", "dimgray");
		}
	}
}
