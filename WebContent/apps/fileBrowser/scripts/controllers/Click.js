function Click(){
	this.x = function(event){
		this.fbm.send.x();
	}
	this.eButton = function(event){
		if(this.contextMenu.isOnTheScreen){
			this.contextMenu.remove();
			this.contextMenu.isOnTheScreen = false;
			this.va["selectedData"] = null;
		}
		if(this.ds.isWorking == true){
			this.ds.cancle();
		}
		if(event.ctrlKey) {
			this.cs.isWorking = true;
			this.cs.choose(event);
			this.cs.bgColor(event)
		}
		else {
			this.cs.cancle();
		}
	}
	this.cButton = function(event){
		if(!this.contextMenu.isOnTheScreen){
			this.contextMenu.isInWindow = true;
			this.setScriptTag(event.currentTarget);
			this.contextMenu.appendContextMenu();
			if(this.ds.isWorking == false && this.cs.isWorking == false){
				this.va["selectedData"] =[{"name":this.tag["html"].children[0].innerHTML,"type":this.tag["html"].children[2].innerHTML}];
				if(this.tag["html"].children[0].innerHTML != "..")
					this.va["validation"] = true;
				else
					this.va["validation"] = false;
			}
			else if(this.ds.isWorking == true || this.cs.isWorking == true){
				this.va["validation"] = true;
			}
		}
	}
	this.newFolder = function(event){
		this.fbm.send.newFolder();
		this.contextMenu.removeContextMenu();
	}
	this.rename = function(event){
		if(this.va["validation"] && !this.ds.isWorking && Object.keys(this.va["selectedData"][0]).length == 2){
			var nameTd = this.tag["jQuery"].children().first();
			nameTd.attr("contenteditable",true);
			var id = this.id;
			nameTd.focusout(function(event){
				taskArray["fileBrowser"][id].focusout.rename(event);
			});
			nameTd.keydown(function(event){
				taskArray["fileBrowser"][id].keydown.rename(event);
			});
			this.va["prevData"] = this.va["selectedData"];
			nameTd.focus();
			this.contextMenu.removeContextMenu();
		}
	}
	this.del = function(){
		if(this.va["validation"] && confirm('Delete it?')){
			this.fbm.send.del();
			this.contextMenu.removeContextMenu();
		}
	}
	this.downlaod = function(event){
		
		if(this.ds.isWorking)
			this.va["selectedData"] = this.ds.fileList();
		if(this.va["validation"] && this.va["selectedData"].length > 0 && this.va["selectedData"][0].type != "directory"){
			this.contextMenu.removeContextMenu();
			this.fbm.send.download();
		}
	}
	this.copy = function(){
		if(this.va["validation"]){
			this.fbm.send.copy();
			this.contextMenu.removeContextMenu();
		}
	}
	this.cut = function(){
		if(this.va["validation"]){
			this.fbm.send.cut();
			this.contextMenu.removeContextMenu();
		}
	}
	this.paste = function(){
		this.fbm.send.paste();
		this.contextMenu.removeContextMenu();
	}
}
