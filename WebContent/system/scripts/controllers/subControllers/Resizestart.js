function Resizestart(){
	this.window = function(event){
		this.va["winAndBarNode"] = this.gm.moveWinToTop(event.currentTarget.parentNode);
	}
}