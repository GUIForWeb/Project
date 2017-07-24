	function EnumEngine(){
		this.window = function(tag){
			//set Chosen Window To Top
			var zIndex = tag.style.zIndex
			var tmpNode = this.nodeArray["winAndBar"];
			var winCount = this.nodeArray["winAndBar"].winCount;
			var lastNode = null;
			if(this.nodeArray["winAndBar"].lastWin.win.tag != tag){
				while(tmpNode.nextWin instanceof Node){
					var tmpZIdx = tmpNode.nextWin.win.view.zIndex
					if(tmpZIdx > zIndex){
						tmpZIdx--;
						tmpNode.nextWin.win.view.setZIndex(tmpZIdx);
						tmpNode = tmpNode.nextWin;
					}else if(tmpZIdx == zIndex){
						tmpNode.nextWin.win.view.setZIndex(winCount);
						lastNode = tmpNode.nextWin;
						tmpNode.nextWin.nextWin.prevWin = tmpNode;
						tmpNode.nextWin = lastNode.nextWin;
						lastNode.nextWin = null;
					}
					else
						tmpNode = tmpNode.nextWin;
				}
				lastNode.prevWin = tmpNode;
				tmpNode.nextWin = lastNode;
				this.nodeArray["winAndBar"].lastWin = lastNode;
			}
			return this.nodeArray["winAndBar"].lastWin;
		}
	}