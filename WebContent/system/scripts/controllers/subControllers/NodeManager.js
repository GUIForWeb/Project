function NodeManager(){
		this.removeLastNode = function(){
			this.nodeArray["winAndBar"].lastWin = this.nodeArray["winAndBar"].lastWin.prevWin;
			this.nodeArray["winAndBar"].lastBar = this.nodeArray["winAndBar"].lastBar.prevBar;
			this.nodeArray["winAndBar"].lastWin.nextWin = null;
			this.nodeArray["winAndBar"].lastBar.nextBar = null;
		}
		this.getNodeWithWinTag = function(winTag){
			var tmpNode = this.nodeArray["winAndBar"];
			while(tmpNode.nextBar instanceof WinAndBarNode){
				tmpNode = tmpNode.nextBar;
				if(tmpNode.win.tag == winTag){
					break;
				}
			}
			return tmpNode;
		}
		this.getNodeWithBarTag = function(barTag){
			var tmpNode = this.nodeArray["winAndBar"];
			while(tmpNode.nextBar instanceof WinAndBarNode){
				tmpNode = tmpNode.nextBar;
				if(tmpNode.bar.tag == barTag){
					break;
				}
			}
			return tmpNode;
		}
		this.add = function(winAndBarNode){
			var tmpNode = this.nodeArray["winAndBar"];
			if(tmpNode.lastBar == null){
				tmpNode.nextBar = winAndBarNode;
				winAndBarNode.prevBar = tmpNode;
				tmpNode.nextWin = winAndBarNode;
				winAndBarNode.prevWin = tmpNode;
			}
			else {
				tmpNode.lastBar.nextBar = winAndBarNode;
				winAndBarNode.prevBar = tmpNode.lastBar;
				tmpNode.lastWin.nextWin = winAndBarNode;
				winAndBarNode.prevWin = tmpNode.lastWin;
			}
			tmpNode.lastBar = winAndBarNode;
			tmpNode.lastWin = winAndBarNode;
		}
		this.addBarNode = function(winAndBarNode) {
			var tmpNode = this.nodeArray["winAndBar"];
			tmpNode.lastBar.nextBar = winAndBarNode;
			winAndBarNode.prevBar = tmpNode.lastBar;
			tmpNode.lastBar = winAndBarNode;
			return tmpNode.lastBar; 
		}
}