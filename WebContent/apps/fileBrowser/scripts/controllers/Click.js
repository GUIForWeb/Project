function Click(){
	this.eButton = function(tag){
		event.stopPropagation();
		if(this.contextMenu.isOnTheScreen){
			this.contextMenu.remove();
			this.contextMenu.isOnTheScreen = false;
			this.clipboard = null;
			this.tag = null;
		}
		if(this.ds.select == true){
			this.ds.cancle();
		}
	}
	this.cButton = function(tag){
		event.stopPropagation();
		if(!this.contextMenu.isOnTheScreen){
			this.contextMenu.isInWindow = true;
			this.tag = tag;
			this.contextMenu.bgTag = $(tag.parentNode.parentNode.parentNode);
			this.contextMenu.appendContextMenu();
			if(this.ds.select == false){
				this.clipboard = this.id+"&"+tag.children[2].innerHTML+"&"+tag.children[0].innerHTML;
				if(tag.children[0].innerHTML != "..")
					this.validation = true;
			}
			else if(this.ds.select == true){
				this.clipboard = this.ds.list;
				this.validation = true;
			}
		}
	}
	this.downlaod = function(){
		if(this.validation){
			this.submitForDl("download",this.clipboard);
			this.validation = false;
		}
	}
	this.copy = function(){
		if(this.validation){
			this.submit("copy",this.clipboard);
			this.validation = false;
		}
	}
	this.cut = function(){
		if(this.validation){
			this.submit("cut",this.clipboard);
			this.validation = false;
		}	
	}
	this.paste = function(){
		this.submit("paste",this.clipboard);
	}
	this.del = function(){
		if(this.validation && confirm('Delete it?')){
			this.submit("del",this.clipboard);
			this.validation = false;
		}
	}
	this.newFolder = function(){
			this.submit("newFolder",this.clipboard);
	}
	this.rename = function(tag){
		if(this.clipboard.split("&").length == 3){
			$(this.tag).first().attr("contenteditable",true);
			$(this.tag).first().attr("onfocusout","system['fileBrowser']["+this.id+"].focusout.rename(this)");
			$(this.tag).first().attr("onkeydown","system['fileBrowser']["+this.id+"].keydown.rename(this)");
			this.__proto__.originalValue = this.clipboard;
			$(this.tag).focus();
			this.validation = false;
		}
	}
}
