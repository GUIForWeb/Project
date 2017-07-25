	function EnumEngine(){
		this.window = function(winTag){
			//set Chosen Window To Top
			var zIndex = winTag.style.zIndex
			var tmpNode = this.nodeArray["winAndBar"];
			var winCount = this.nodeArray["winAndBar"].winCount;
			var lastNode = null;
			if(this.nodeArray["winAndBar"].lastWin.win.tag != winTag){
				while(tmpNode.nextWin instanceof WinAndBarNode){
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
		this.appear = function(winAndBarNode){
			winAndBarNode.win.view.setZIndex(this.nodeArray["winAndBar"].winCount);
			var tmpNode = this.nodeArray["winAndBar"].lastWin; 
			tmpNode.nextWin = winAndBarNode;
			winAndBarNode.prevWin = tmpNode;
			this.nodeArray["winAndBar"].lastWin = winAndBarNode;
		}
		this.disappear = function(winAndBarNode){
			var tmpNode = winAndBarNode;
			if(tmpNode.nextWin instanceof WinAndBarNode){
				while(tmpNode.nextWin instanceof WinAndBarNode){
					var tmpZIdx = tmpNode.nextWin.win.view.zIndex
					tmpZIdx--;
					tmpNode.nextWin.win.view.setZIndex(tmpZIdx);
					tmpNode = tmpNode.nextWin;
				}
				winAndBarNode.prevWin.nextWin = winAndBarNode.nextWin;
				winAndBarNode.nextWin.prevWin = winAndBarNode.prevWin;
				winAndBarNode.prevWin = null;
				winAndBarNode.nextWin = null;
			}
			else{
				this.nodeArray["winAndBar"].lastWin = winAndBarNode.prevWin;
				winAndBarNode.prevWin.nextWin = null;
				winAndBarNode.prevWin = null;
			}
		}
	}