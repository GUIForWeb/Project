function Click(){
	this.eButton = function(event){
		if(this.contextMenu.isOnTheScreen){
			this.contextMenu.remove();
			this.contextMenu.isOnTheScreen = false;
			this.clipboard("","");
		}
		if(this.ds.isWorking == true){
			this.ds.cancle();
		}
	}
	this.cButton = function(event){
		if(!this.contextMenu.isOnTheScreen){
			this.contextMenu.isInWindow = true;
			this.tag(event.currentTarget);
			this.contextMenu.appendContextMenu();
			if(this.ds.isWorking == false){
				this.clipboard([{"name":this.va["tag"].children[0].innerHTML,"type":this.va["tag"].children[2].innerHTML}])
				if(this.va["tag"].children[0].innerHTML != "..")
					this.validation = true;
			}
			else if(this.ds.isWorking == true){
				this.clipboard(this.ds.list);
				this.validation = true;
			}
		}
	}
	this.newFolder = function(event){
		this.fbm.send.newFolder();
		this.contextMenu.removeContextMenu();
	}
	this.rename = function(event){
		if(!this.ds.isWorking && Object.keys(this.va["clipboard"][0]).length == 2){
			this.va["tagArray"].first().attr("contenteditable",true);
			this.va["tagArray"].first().focusout({"id":this.id},function(event){
				taskArray["fileBrowser"][event.data.id].focusout.rename(event);
			});
			this.va["tagArray"].first().keydown({"id":this.id},function(event){
				taskArray["fileBrowser"][event.data.id].keydown.rename(event);
			});
			this.va["prevValue"] = this.va["clipboard"];
			this.va["tagArray"].focus();
			this.contextMenu.removeContextMenu();
			this.validation = false;
		}
	}
	this.del = function(){
		/*
		if(this.validation && confirm('Delete it?')){
			this.fbm.send.del();
			this.validation = false;
		}
		*/
	}
	/*
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
	*/
}
