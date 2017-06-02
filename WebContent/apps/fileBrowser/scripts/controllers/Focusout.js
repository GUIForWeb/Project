function Focusout(){
	this.rename = function(tag){
		this.lastValue = this.id+"&"+tag.children[2].innerHTML+"&"+tag.children[0].innerHTML;
		if(this.originalValue != this.lastValue)
			this.submit("rename",this.originalValue + "&" + this.lastValue);
	}
}
