	function Click(){
		this.changeBt = function(){
			if(this.__proto__.change != true){
				event.stopPropagation();
				var iconObj = this.gui.iconArray["File Browser"];
				iconObj.option = "/apps/theme/scripts/bgTheme/functions/bgFileBrowser.js";
				var winObj = this.gui.wme.newWindow(iconObj);
				var barObj = this.gui.bme.newBar(iconObj);
				this.gui.wpe.newPositioning(winObj);
				this.gui.bind.windowAndBar(winObj,barObj);
				this.gui.barListener.call("newBar",barObj);
				this.gui.windowListener.call("newWindow",winObj);
				this.__proto__.change = true;
			}
		}
		this.emptyBt = function(){
			this.submit();
		}
	}