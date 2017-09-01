function Dragend(){
	this.selection = function(){
		this.ds.end();
		this.va["selectedData"] = this.ds.list;
	}
}