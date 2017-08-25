	function BarManager(){
		this.remove = function(winAndBarNode){
			winAndBarNode.bar.tag.remove();
		}
		
		this.append = function(iconObj){
			var winAndBarNode = new WinAndBarNode();
			var tmpNode = this.nm.addBarNode(winAndBarNode);
			var barCount = this.nodeArray["winAndBar"].barCount;
			tmpNode.bar = new Bar();
			tmpNode.bar.guiName = this.guiName;
			tmpNode.bar.name = iconObj.name;
			tmpNode.bar.taskbarTagArray = this.taskbarTagArray;
			tmpNode.bar.view.taskbarOHeight = this.taskbar.view.oHeight;
			tmpNode.bar.init(this.valueArray["newId"],barCount);
			tmpNode.bar.appendBar();
			this.nodeArray["winAndBar"].barCount += 1;
			return tmpNode;
			
			
			/*
			barNode.next = new BarNode();
			barNode.next.prev = barNode;
			barNode = barNode.next;
			barNode.bar = new Bar();
			barNode.bar.guiName = this.guiName;
			barNode.bar.name = iconObj.name;
			barNode.bar.taskbarTagArray = this.taskbarTagArray
			barNode.bar.init(count);
			barNode.bar.appendBar();
			return barNode;
			*/ 
			/*
			var barLen = this.barLen();
			var barObj  = new Bar();
			barObj.name = iconObj.name;
			barObj.guiName = this.guiName;
			barObj.bgTag = this.bgTag;
			barObj.taskbarTag = this.taskbarTag;
			barObj.view.taskbarOHeight = this.taskbar.view.oHeight;
			barObj.init(barLen);
			barObj.appendBar();
			barObj.windowOnScreen = true;
			this.barArray[barLen] = barObj;
			return barObj;
			*/
		}
		/*
		this.restoreBar = function(barMap){
			var barLen = this.barLen();
			var restoredBar  = new Bar();
			restoredBar.guiName = this.guiName;
			restoredBar.bgTag = this.bgTag;
			restoredBar.taskbarTag = this.taskbarTag;
			restoredBar.view.taskbarOHeight = this.taskbar.view.oHeight;
			restoredBar.init(barLen);
			restoredBar.restoreModel(barMap);
			restoredBar.appendBar();
			this.barArray[barLen] = restoredBar;
		}
		*/
		/*
		this.appear = function(){
			var winLen = this.windowArray.length;
			var barLen = this.barLen();
			var win = this.windowArray[winLen-1];
			var newBar  = new Bar();
			newBar.guiName = this.guiName;
			newBar.bgTag = this.bgTag;
			newBar.init(barLen);
			newBar.appendBar();
			this.barArray[barLen] = newBar;
			//this.windowInBarArray[barLen] = win;
		}
		*/
		this.barLen = function(){
			return this.barArray.filter(function( element ) {
				   return element !== undefined;
				}).length;
		}
	}