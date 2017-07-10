	function EnumEngine(){
		this.setChosenWindowToTop = function(tag){
			/*
			var cnt = 0;
			cnt++;
			*/
			var zIndex = tag.style.zIndex
			var winNode = this.nodeArray["win"];
			var size = this.nodeArray["win"].size;
			var tmpNode = null;
			//tag.style.zIndex = 3;
			//console.log(zIdx);
			
			
			if(winNode.size != zIndex)
			while(winNode.next instanceof WinNode){
				var tmpZIdx = winNode.next.win.view.zIndex;
				console.log(zIndex);
				console.log(tmpZIdx);
				if(tmpZIdx == zIndex){
					tmpNode = winNode.next;
					tmpNode.win.view.setZIndex(size);
					winNode.next = winNode.next.next;
					tmpNode.next = null;
				}
				else if(tmpZIdx > zIndex){
					console.log("Yo");
					tmpZIdx--;
					console.log(tmpZIdx);
					winNode.next.win.view.setZIndex(tmpZIdx);
					winNode = winNode.next;
				}
				else
					winNode = winNode.next;
				
				/*
				console.log(winNode);
				console.log(winNode.win.view.zIndex);
				console.log(winNode.win.view.outerTag[0]);
				*/
			}
			winNode.next = tmpNode;
			//if(winNode.next !==)
		}
		this.window = function(tag){
			// change ll order with size.
			//var winNode = this.nodeArray["win"];
			this.setChosenWindowToTop(tag);
			/*
			var winLen = this.windowArray.filter(function( element ) {
				   return element !== undefined;
				}).length;
			var tagZIdx = tag.style.zIndex;
			if(winLen-1 != tagZIdx){
				var chosenWin = this.windowArray[tagZIdx];
				chosenWin.view.zIndex = winLen-1;
				$("#"+chosenWin.tagId).css("z-index",winLen-1);
				for(i=parseInt(tagZIdx)+1; i<winLen; i++){
					var newZIdx = i - 1;
					this.windowArray[i].view.zIndex = newZIdx;
					$("#"+this.windowArray[i].tagId).css("z-index",newZIdx);
					this.windowArray[newZIdx] = this.windowArray[i];
				}
				this.windowArray[winLen-1] = chosenWin;
				return chosenWin;
			}
			*/
		}
	}