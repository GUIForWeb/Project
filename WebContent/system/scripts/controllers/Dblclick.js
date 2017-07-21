	function Dblclick(){
		this.icon = function(tag){
			var iconObj = this.iconArray[tag.id];
			var winObj = this.wme.newWindow(iconObj);
			var barObj = this.bme.newBar(iconObj);
			this.wpe.newPositioning(winObj);
			this.bind.windowAndBar(winObj,barObj);
			this.barListener.call("newBar",barObj);
			this.windowListener.call("newWindow",winObj);
		}
		this.yo = function(tag){
			var iconObj = this.iconArray["icon3"];
			var winNode = this.wm.newWindow(iconObj);
			var barNode = this.bm.newBar(iconObj);
			this.wpe.newPositioning(winNode);
			this.bind.windowAndBar(winNode,barNode);
			//winNode.win.view.done();
		}
	}
	