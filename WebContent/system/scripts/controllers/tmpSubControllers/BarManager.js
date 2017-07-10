	function BarManager(){
		this.newBar = function(iconObj){
			var barNode = this.nodeArray["bar"];
			while(barNode.next instanceof BarNode){
				barNode = barNode.next;
				console.log("Yo2");
			}
			barNode.next = new BarNode();
			barNode = barNode.next;
			barNode.bar = new Bar();
			return barNode; 
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
		
		this.disappear = function(winObj){
			var bNumId = winObj.bNumId;
			var barObj = this.barArray[bNumId];
			var barLen = this.barLen();
			for(bi=parseInt(bNumId)+1; bi<barLen; bi++){
				this.barArray[bi].view.barTag.css("left",(bi-1)*this.barArray[bi].view.oWidth);
				this.barArray[bi].view.barTag.attr("id",this.barArray[bi].tagIdRule +(bi-1));
				this.barArray[bi].init(bi-1);
				this.barArray[bi-1] = this.barArray[bi];
				this.bind.again(this.barArray[bi-1]);
				this.windowInBarArray[bi-1] = this.windowInBarArray[bi];
			}
			barObj.view.barTag.remove();
			if(this.barArray[barLen-1] !== null){
				delete this.barArray[barLen-1];
			}
			if(this.windowInBarArray[barLen-1] !== null)
				delete this.windowInBarArray[barLen-1]
			return barObj
		}
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
		this.barLen = function(){
			return this.barArray.filter(function( element ) {
				   return element !== undefined;
				}).length;
		}
	}