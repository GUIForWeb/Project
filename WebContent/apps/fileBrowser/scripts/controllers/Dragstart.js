function Dragstart(){
	this.fileItem = function(tag,event){
		if(this.ds.select == true){
			this.clipboard = this.ds.list;
		}
		else{
			this.clipboard = this.id+"&"+tag.children[2].innerHTML+"&"+tag.children[0].innerHTML;
		}
		
		if(tag.children[0].innerHTML != "..")
			this.validation = true;
		if(this.validation){
			this.submit("cut",this.clipboard);
			this.validation = false;
		}
	}
	this.selection = function(tag, event){
		this.ds.start(tag, event);
	}
}