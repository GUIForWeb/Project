function Focusout(){
	this.rename = function(event){
		this.clipboard([{"name":this.va["tag"].children[0].innerHTML,"type":this.va["tag"].children[2].innerHTML}]);
		this.va["tagArray"].first().removeAttr("contenteditable");
		if(JSON.stringify(this.va["clipboard"][0]) != JSON.stringify(this.va["prevValue"][0])){
			this.fbm.send.rename();
		}
	}
}
