function Focusout(){
	this.rename = function(event){
		this.va["selectedData"] = [{"name":this.tag["html"].children[0].innerHTML,"type":this.tag["html"].children[2].innerHTML}];
		this.tag["jQuery"].first().removeAttr("contenteditable");
		if(JSON.stringify(this.va["selectedData"][0]) != JSON.stringify(this.va["prevData"][0])){
			this.fbm.send.rename();
		}
	}
}
