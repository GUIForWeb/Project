	function EnumEngine(){
		this.window = function(tag){
			//set Chosen Window To Top
			var zIndex = tag.style.zIndex
			var winNode = this.nodeArray["win"];
			var count = this.nodeArray["win"].count;
			var tmpNode = null;
			if(this.nodeArray["win"].end.win.tag != tag){
				while(winNode.next instanceof WinNode){
					var tmpZIdx = winNode.next.win.view.zIndex;
					if(tmpZIdx == zIndex){
						tmpNode = winNode.next;
						tmpNode.win.view.setZIndex(count);
						winNode.next = winNode.next.next;
						winNode.next.prev = winNode; 
						tmpNode.next = null;
					}
					else if(tmpZIdx > zIndex){
						tmpZIdx--;
						winNode.next.win.view.setZIndex(tmpZIdx);
						winNode = winNode.next;
					}
					else
						winNode = winNode.next;
				}
				tmpNode.prev = winNode;
				winNode.next = tmpNode;
				this.nodeArray["win"].end = tmpNode;
			}
			return this.nodeArray["win"].end;
		}
	}