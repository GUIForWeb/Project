	function Click(){
		this.head = function(tag){
			event.stopPropagation();
			this.ee.window(tag.parentNode.parentNode);
			//console.log(this.nodeArray["win"]);
			/*
			if(winObj !== undefined)
				this.windowListener.call("changeWinVal",winObj);
			*/
		}
		this.xButton = function(tag){
			tag = tag.parentNode.parentNode;
			var node = this.ee.window(tag);
			this.gm.xWinAndBar(node);
			
			/*
			tag = tag.parentNode.parentNode;
			var winObj = this.windowArray[tag.style.zIndex];
			this.wme.disappear(winObj);
			this.wpe.disappearPositioning(winObj);
			var barObj = this.bme.disappear(winObj);
			this.barListener.call("x",barObj);
			*/
		}
		this.content = function(tag){
			event.stopPropagation();
			var winObj = this.reenum.window(tag.parentNode);
			if(winObj !== undefined){
				this.windowListener.call("changeWinVal",winObj);
			}
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
			tag = tag.parentNode.parentNode;
			var winObj = this.windowArray[tag.style.zIndex];
			this.wse.fullScreen(tag);
			this.wpe.changePositioning(winObj);
			this.windowListener.call("resize",winObj);
		}
		this.hButton = function(tag){
			tag = tag.parentNode.parentNode;
			var winObj = this.windowArray[tag.style.zIndex];
			winObj.tag = tag;
			this.windowInBarArray[winObj.bNumId] = winObj;
			this.barArray[winObj.bNumId].windowOnScreen = false;
			var barObj = this.barArray[winObj.bNumId];
			this.wme.disappear(winObj);
			this.wpe.disappearPositioning(winObj);
			this.barListener.call("hide",barObj);
		}
		this.bar = function(tag){
			tag = tag.parentNode;
			console.log(tag);
			var barNode = this.nodeArray["bar"];
			while(barNode.next instanceof BarNode){
				barNode = barNode.next;
				if(barNode.bar.tag == tag){
					console.log("Yo");
				}
			}
			/*
			var bNumId = this.getBarNumId(tag);
			var barObj = this.barArray[bNumId];
			if(this.barArray[bNumId].windowOnScreen){
				var wNumId = this.barArray[bNumId].wNumId;
				var wZIdx = $("#"+this.winTagIdRule+wNumId).css("z-index");
				var winObj  = this.windowArray[wZIdx];
				this.windowInBarArray[bNumId] = winObj;
				this.barArray[bNumId].windowOnScreen = false;
				this.wme.disappear(winObj);
				this.wpe.disappearPositioning(winObj);
				this.barListener.call("hide",barObj);
			}else{
				var winObj = this.windowInBarArray[bNumId];
				winObj = this.wme.addWindowObj(winObj);
				this.bind.windowAndBar(winObj, barObj);
				winObj.appendWindow();
				this.barArray[bNumId].windowOnScreen = true;
				delete this.windowInBarArray[bNumId];
				this.wpe.changePositioning(winObj);
				//this.windowListener.call("screenOn",winObj);
				this.barListener.call("screenOn",barObj);
			}
			*/
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
			var menuText = "";
			var winObj = this.wme.newWindow(iconObj);
			var barObj = this.bme.newBar(iconObj);
			this.wpe.newPositioning(winObj);
			this.bind.windowAndBar(winObj,barObj);
			this.barListener.call("newBar",barObj);
			this.windowListener.call("newWindow",winObj);
		}
	}