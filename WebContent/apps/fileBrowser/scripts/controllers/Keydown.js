function Keydown(){
	this.rename = function(tag){
		if(event.keyCode == 13){
			this.focusout.rename(tag);
		}
	}
}
