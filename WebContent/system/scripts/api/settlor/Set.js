function Set(){
	this.setValue = function(value){
		if(value instanceof jQuery){
			this.va["t"] = value[0];
			this.va["s"] = value;
		}
	}
}