	function GUIManager(){
		this.newWinAndBar = function(iconObj){
			var node = this.bm.newBar(iconObj);
			node = this.wm.newWindow(iconObj,node);
			this.wpe.newPositioning(node);
			/*
			var tmpNode = this.nodeArray["winAndBar"];
			console.log(tmpNode.winCount);
			while(tmpNode.nextWin instanceof Node){
				tmpNode = tmpNode.nextWin;
				console.log(tmpNode.win.tagId);
			}
			tmpNode = this.nodeArray["winAndBar"];
			console.log(tmpNode.barCount);			
			while(tmpNode.nextBar instanceof Node){
				tmpNode = tmpNode.nextBar;
				console.log(tmpNode.bar.tagId);
			}
			*/
		}
		this.xWinAndBar = function(node){
			this.bm.disappear(node);
			this.wm.disappear(node);
			this.wpe.disappear(node);
		}
	}