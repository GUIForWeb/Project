	function Dblclick(){
		this.icon = function(tag){
			var iconObj = this.iconArray[tag.id];
			var winAndBarNode = this.gm.newWinAndBar(iconObj);
			this.gr.newWinAndBar(winAndBarNode);
			/*
			var winObj = this.wme.newWindow(iconObj);
			var barObj = this.bme.newBar(iconObj);
			this.pe.newPositioning(winObj);
			this.bind.windowAndBar(winObj,barObj);
			this.barListener.call("newBar",barObj);
			this.windowListener.call("newWindow",winObj);
			*/
		}
	}
	