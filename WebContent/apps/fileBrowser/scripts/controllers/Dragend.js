function Dragend(){
	this.selection = function(){
		this.ds.end();
		this.va["clipboard"] = this.ds.list;
	}
}