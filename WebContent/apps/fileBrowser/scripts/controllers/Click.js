function Click(){
	this.eButton = function(event){
		if(this.contextMenu.isOnTheScreen){
			this.contextMenu.remove();
			this.contextMenu.isOnTheScreen = false;
			this.va["selectedData"] = null;
		}
		if(this.ds.isWorking == true){
			this.ds.cancle();
		}
	}
	this.cButton = function(event){
		if(!this.contextMenu.isOnTheScreen){
			this.contextMenu.isInWindow = true;
			this.setScriptTag(event.currentTarget);
			this.contextMenu.appendContextMenu();
			if(this.ds.isWorking == false){
				this.va["selectedData"] =[{"name":this.tag["html"].children[0].innerHTML,"type":this.tag["html"].children[2].innerHTML}];
				if(this.tag["html"].children[0].innerHTML != "..")
					this.validation = true;
				else
					this.validation = false;
			}
			else if(this.ds.isWorking == true){
				this.va["selectedData"] = this.ds.list;
				this.validation = true;
			}
		}
	}
	this.newFolder = function(event){
		this.fbm.send.newFolder();
		this.contextMenu.removeContextMenu();
	}
	this.rename = function(event){
		if(this.validation && !this.ds.isWorking && Object.keys(this.va["selectedData"][0]).length == 2){
			this.tag["jQuery"].first().attr("contenteditable",true);
			this.tag["jQuery"].first().focusout({"id":this.id},function(event){
				taskArray["fileBrowser"][event.data.id].focusout.rename(event);
			});
			this.tag["jQuery"].first().keydown({"id":this.id},function(event){
				taskArray["fileBrowser"][event.data.id].keydown.rename(event);
			});
			this.va["prevData"] = this.va["selectedData"];
			this.tag["jQuery"].focus();
			this.contextMenu.removeContextMenu();
		}
	}
	this.del = function(){
		if(this.validation && confirm('Delete it?')){
			this.fbm.send.del();
			this.contextMenu.removeContextMenu();
		}
	}
	this.downlaod = function(event){
		if(this.ds.isWorking)
			this.va["selectedData"] = this.ds.fileList();
		if(this.validation && this.va["selectedData"].length > 0 && this.va["selectedData"][0].type != "directory"){
			this.fbm.send.download();
		}
	}
	this.copy = function(){
		if(this.validation){
			this.fbm.send.copy();
			this.contextMenu.removeContextMenu();
		}
	}
	this.cut = function(){
		if(this.validation){
			this.fbm.send.cut();
			this.contextMenu.removeContextMenu();
		}
	}
	this.paste = function(){
		this.fbm.send.paste();
	}
	/*
	this.copy = function(){
		if(this.validation){
			this.submit("copy",this.selectedData);
			this.validation = false;
		}
	}
	this.cut = function(){
		if(this.validation){
			this.submit("cut",this.selectedData);
			this.validation = false;
		}	
	}
	this.paste = function(){
		this.submit("paste",this.selectedData);
	}
	
	this.newFolder = function(){
			this.submit("newFolder",this.selectedData);
	}
	this.rename = function(tag){
		if(this.selectedData.split("&").length == 3){
			$(this.tag).first().attr("contenteditable",true);
			$(this.tag).first().attr("onfocusout","system['fileBrowser']["+this.id+"].focusout.rename(this)");
			$(this.tag).first().attr("onkeydown","system['fileBrowser']["+this.id+"].keydown.rename(this)");
			this.__proto__.originalValue = this.selectedData;
			$(this.tag).focus();
			this.validation = false;
		}
	}
	*/
}
