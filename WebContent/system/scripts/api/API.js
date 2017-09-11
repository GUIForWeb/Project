function API(){
	//api value array
	this.va = [];
	this.bottom = function() {
		this.complement = new Bottom();
		this.complement.__proto__ = this;
		this.complement.init();
	}
	this.set = function(value){
		this.settlor = new Set();
		this.settlor.__proto__ = this;
		this.settlor.setValue(value);
		this.va["w"] = this.nodeArray["winAndBar"].lastWin.win;
		return this;
	}
}
