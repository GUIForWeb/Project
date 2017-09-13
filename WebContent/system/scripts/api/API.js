function API(){
	//api value array
	this.va = [];
	this.bottom = function() {
		console.log(this.va["s"])
		this.complement = new Bottom();
		this.complName = "Bottom";
		this.complement.__proto__ = this;
		this.complement.init();
	}
	this.sort = function(col) {
		if(this.complName == "Sort" && this.complement.col == col){
			this.complement.work();
		}
		else {
			this.complement = new Sort();
			this.complName = "Sort";
			this.complement.setCol(col);
			this.complement.__proto__ = this;
			this.complement.work();
		}
	}
	this.set = function(value){
		this.settlor = new Set();
		this.settlor.__proto__ = this;
		this.settlor.setValue(value);
		this.va["w"] = gui.nodeArray["winAndBar"].lastWin.win;
		return this;
	}
}
