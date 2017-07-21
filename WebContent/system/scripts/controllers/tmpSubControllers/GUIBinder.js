	function GUIBinder(){
		this.windowAndBar = function(winNode,barNode){
			winNode.barNode = barNode;
			/*
			this.windowArray[parseInt(winObj.view.zIndex)].bNumId = barObj.numId;
			this.barArray[parseInt(barObj.numId)].wNumId = winObj.numId;
			this.barArray[parseInt(barObj.numId)].wZIndex = winObj.view.zIndex;
			*/
		}
		this.again = function(barObj){
			/*
			if(barObj.windowOnScreen){
				var wZIdx = $("#"+this.winTagIdRule+barObj.wNumId).css("z-index");
				this.windowArray[wZIdx].bNumId = barObj.numId;
			}
			*/
		}
	}