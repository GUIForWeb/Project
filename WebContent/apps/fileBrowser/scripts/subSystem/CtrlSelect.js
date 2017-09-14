function CtrlSelect(){
	this.fileItemArray = [];
	this.isWorking = false;
	this.choose = function(event){
		this.setScriptTag(event.target.parentNode);
		if(this.tag["html"].children[0].innerHTML != ".."){
			this.name = this.tag["html"].children[0].innerHTML;
			var json = {"name":this.name,"type":this.tag["html"].children[2].innerHTML};
			var flag = false;
			for(si=0; si<this.va["selectedData"].length; si++){
				if(JSON.stringify(this.va["selectedData"][si]) == JSON.stringify(json)){
					flag = true;
					delete this.va["selectedData"][si];
					break;
				} 
			}
			if(!flag)
				this.va["selectedData"].push(json);
		}
		this.va["selectedData"] = this.api.has(this.va["selectedData"]).filter();
	}
	this.bgColor = function(){
		this.setCSSTag(event.target.parentNode);
		var tmpClass = this.cssTag["jQuery"].attr("class");
		if(tmpClass.includes("fileItem") && (this.fileItemArray[this.name] === undefined)){
			this.fileItemArray[this.name] = this.cssTag["jQuery"];
			this.cssTag["jQuery"].css("background-color", "dimgray");
		}
		else{
			delete this.fileItemArray[this.name];
			this.cssTag["jQuery"].css("background-color", "white");
		}
	}
	this.cancle = function(){
		var keys = Object.keys(this.fileItemArray)
		for(ki=0; ki<keys.length; ki++){
			var fileItem = this.fileItemArray[keys[ki]];
			fileItem.css("background-color","white");
		}
		this.va["selectedData"] = [];
		this.fileItemArray = [];
		this.isWorking = false;
	}
}