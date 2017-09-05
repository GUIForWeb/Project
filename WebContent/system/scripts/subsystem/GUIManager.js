	function GUIManager(){
		this.resizeend = function(tag){
			this.wse.setSize(tag);
		}
		this.resizing = function(tag){
			this.wse.resizing(tag);
		}
		this.fullScreen = function(winTag) {
			var winAndBarNode = this.ee.moveWinToTop(winTag);
			this.pe.remove(winAndBarNode);
			this.wse.fullScreen(winAndBarNode);
			this.pe.append(winAndBarNode);
			return winAndBarNode;
		}
		this.xWinAndBar = function(winTag){
			var zIndex = winTag.style.zIndex;
			var winAndBarNode = this.ee.moveWinToTop(winTag);
			var position = winAndBarNode.bar.view.position;
			winAndBarNode = this.ee.moveBarToTop(winAndBarNode);
			this.bm.remove(winAndBarNode);
			this.wm.remove(winAndBarNode);
			this.pe.remove(winAndBarNode);
			this.nm.removeLastNode();
			winAndBarNode.win.view.zIndex = zIndex;
			winAndBarNode.bar.view.position = position;
			return winAndBarNode;
		}
		this.moveWinToTop = function(winTag) {
			return this.ee.moveWinToTop(winTag);
		}
		this.disappear = function(winTag){
			var winAndBarNode = this.ee.disappear(winTag);
			this.wm.disappear(winAndBarNode);
			this.pe.remove(winAndBarNode);
		}
		this.appear = function(barTag){
			var winAndBarNode = this.ee.recover(barTag);
			this.wm.appear(winAndBarNode);
			this.pe.append(winAndBarNode);
		}
		this.newWinAndBar = function(iconObj){
			var winAndBarNode = this.bm.append(iconObj);
			this.wm.append(iconObj,winAndBarNode);
			this.pe.append(winAndBarNode);
			this.valueArray["newId"]++;
			return winAndBarNode;
		}
		//this.switchWin = function(barTag){
			/*
			var tmpNode = this.nm.getNodeWithBarTag(barTag);
			if(tmpNode.win.onScreen){
				this.ee.disappear(tmpNode);
				this.wm.disappear(tmpNode);
			}
			else {
				this.ee.recover(tmpNode);
				this.wm.recover(tmpNode);
			}
			*/
			/*
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
			*/
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
		//}
		
		
	}