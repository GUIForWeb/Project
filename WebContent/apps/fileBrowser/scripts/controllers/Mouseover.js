function Mouseover(){
	this.row = function(event){
		if(!this.ds.isWorking){
			this.setCSSTag(event.currentTarget);
			var tmpClass = this.cssTag["jQuery"].attr("class");
			if(tmpClass.includes("fileItem") || tmpClass.includes("parent")){
				this.cssTag["jQuery"].css("background-color", "dimgray");
			}
		}
	}
}
