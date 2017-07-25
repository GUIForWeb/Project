	function GUIManager(){
		this.disappearWin = function(winTag){
			var tmpNode = this.nodeArray["winAndBar"];
			while(tmpNode.nextBar instanceof WinAndBarNode){
				tmpNode = tmpNode.nextBar;
				if(tmpNode.win.tag == winTag){
					tmpNode.win.tag.remove();
					tmpNode.bar.windowOnScreen = false;
					this.nodeArray["winAndBar"].winCounter -= 1;
					this.ee.disappear(tmpNode);
				}
			}
		}
		this.switchWin = function(barTag){
			var tmpNode = this.nodeArray["winAndBar"];
			while(tmpNode.nextBar instanceof WinAndBarNode){
				tmpNode = tmpNode.nextBar;
				if(tmpNode.bar.tag == barTag){
					if(tmpNode.bar.windowOnScreen){
						tmpNode.win.tag.remove();
						tmpNode.bar.windowOnScreen = false;
						this.nodeArray["winAndBar"].winCounter -= 1;
						this.ee.disappear(tmpNode);
					}
					else {
						//node.win.tag.remove();
						tmpNode.win.appendWindow();
						tmpNode.bar.windowOnScreen = true;
						this.nodeArray["winAndBar"].winCounter += 1;
						this.ee.appear(tmpNode);
					}
				}
			}
			/*
			var bNumId = this.getBarNumId(tag);
			var barObj = this.barArray[bNumId];
			if(this.barArray[bNumId].windowOnScreen){
				var wNumId = this.barArray[bNumId].wNumId;
				var wZIdx = $("#"+this.winTagIdRule+wNumId).css("z-index");
				var winObj  = this.windowArray[wZIdx];
				this.windowInBarArray[bNumId] = winObj;
				this.barArray[bNumId].windowOnScreen = false;
				this.wme.disappear(winObj);
				this.wpe.disappearPositioning(winObj);
				this.barListener.call("hide",barObj);
			}else{
				var winObj = this.windowInBarArray[bNumId];
				winObj = this.wme.addWindowObj(winObj);
				this.bind.windowAndBar(winObj, barObj);
				winObj.appendWindow();
				this.barArray[bNumId].windowOnScreen = true;
				delete this.windowInBarArray[bNumId];
				this.wpe.changePositioning(winObj);
				//this.windowListener.call("screenOn",winObj);
				this.barListener.call("screenOn",barObj);
			}
			*/
		}
		this.newWinAndBar = function(iconObj){
			var node = this.bm.appear(iconObj);
			node = this.wm.appear(iconObj,node);
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