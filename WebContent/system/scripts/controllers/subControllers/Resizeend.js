function Resizeend(){
	this.window = function(event){
		this.gm.resizeend(event.currentTarget);
		this.gr.resizeend(this.va["winAndBarNode"]);
	}
}