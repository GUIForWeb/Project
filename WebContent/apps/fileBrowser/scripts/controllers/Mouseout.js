function Mouseout(){
	this.row = function(event){
		if(!this.ds.isWorking){
			var tmpClass = this.cssTag["jQuery"].attr("class");
			if(tmpClass.includes("fileItem")){
				this.cssTag["jQuery"].css("background-color", "white");
			}
		}
	}
}
