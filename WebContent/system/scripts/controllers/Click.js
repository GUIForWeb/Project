	function Click(){
		this.xButton = function(tag){
			var winTag = tag.parentNode.parentNode;
			var winAndBarNode = this.gm.xWinAndBar(winTag);
			this.gr.xWinAndBar(winAndBarNode);
		}
		this.hButton = function(tag){
			var winTag = tag.parentNode.parentNode;
			var zIndex = winTag.style.zIndex
			this.gm.disappear(winTag);
			this.gr.disappear(zIndex);
		}
		this.bar = function(tag){
			var barTag = tag.parentNode;
			var winTagId = this.winTagIdRule+this.getBarNumId(barTag);
			var winTag = $("#"+winTagId)[0];
			if(winTag){
				var zIndex = winTag.style.zIndex;
				this.gm.disappear(winTag);
				this.gr.disappear(zIndex);
			}
			else{
				this.gm.appear(barTag);
				this.gr.appear(this.getBarNumId(barTag));
			}
		}
		this.head = function(tag){
			event.stopPropagation();
			var winTag = tag.parentNode.parentNode;
			var zIndex = winTag.style.zIndex;
			this.gm.moveWinToTop(winTag);
			this.gr.moveWinToTop(zIndex);
		}
		this.content = function(tag){
			event.stopPropagation();
			var winTag = tag.parentNode;
			var zIndex = winTag.style.zIndex;
			this.gm.moveWinToTop(winTag);
			this.gr.moveWinToTop(zIndex);
		}
		
		
		this.rButton = function(tag){
			if(!this.bgContextMenuObj.isOnTheScreen){
				this.bgContextMenuObj.guiName = this.guiName;
				this.bgContextMenuObj.view.contextPath = this.contextPath; 
				this.bgContextMenuObj.view.contentPath = "background";
				this.bgContextMenuObj.view.zIndex = this.wme.winLastNumId;
				this.bgContextMenuObj.appendContextMenu();
			}
		}
		this.lButton = function(tag){
			if(this.bgContextMenuObj.isOnTheScreen){
				this.bgContextMenuObj.remove();
				this.bgContextMenuObj.isOnTheScreen = false;
			}
		}
		
		this.fButton = function(tag){
			var winTag = tag.parentNode.parentNode;
			var winAndBarNode = this.gm.fullScreen(winTag);
			this.gr.fullScreen(winAndBarNode);
		}
		
		
		this.theme = function(tag){
			var iconObj = new Icon();
			if(tag.innerHTML == "Icon"){
				iconObj.name = "Icon Theme";
				iconObj.contentURL = "/apps/theme/comps/views/iconTheme.jsf";
				
			}
			else if(tag.innerHTML == "Window"){
				iconObj.name = "Window Theme";
				iconObj.contentURL = "/apps/theme/comps/views/windowTheme.jsf";
			}
			else if(tag.innerHTML == "Background"){
				iconObj.name = "Background Theme";
				iconObj.contentURL = "/apps/theme/comps/views/backgroundTheme.jsf";
			}
			var winObj = this.wme.newWindow(iconObj);
			var barObj = this.bme.newBar(iconObj);
			this.wpe.newPositioning(winObj);
			this.bind.windowAndBar(winObj,barObj);
			this.barListener.call("newBar",barObj);
			this.windowListener.call("newWindow",winObj);
		}
	}