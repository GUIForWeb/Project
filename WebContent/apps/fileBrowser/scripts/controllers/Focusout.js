function Focusout(){
	this.rename = function(event){
		this.va["selectedData"] = [{"name":this.tag["html"].children[0].innerHTML,"type":this.tag["html"].children[2].innerHTML}];
		this.tag["jQuery"].children().first().removeAttr("contenteditable");
		if(JSON.stringify(this.va["selectedData"][0]) != JSON.stringify(this.va["prevData"][0])){
			for(di=0; di<this.data.length; di++){
				if(this.data[di].name == this.va["prevData"][0].name) {
					this.data[di].name = this.va["selectedData"][0].name;
					break;
				} 
			}
			this.fbm.send.rename();
		}
	}
}
