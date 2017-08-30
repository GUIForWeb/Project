function Controller(){
	//valueArray
	this.tag = function(tag){
		this.va["tagArray"] = $(tag);
		this.va["tag"] = tag;
	}
	this.clipboard = function(jsonArray) {
		this.va["clipboard"] = jsonArray; 
	} 
}

