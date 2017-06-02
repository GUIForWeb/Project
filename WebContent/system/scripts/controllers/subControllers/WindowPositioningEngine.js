	function WindowPositioningEngine(){
		this.restorePositioning = function(winObj){
			var tagId = winObj.tagId;
			var coordinate = winObj.view.oLeft+","+winObj.view.oTop;
			var subArray = [];
			subArray[0] = winObj.tagId;
			this.windowCoordinate[coordinate] = subArray;
			this.windowCoordinate[tagId] = coordinate;
		}
		this.disappearPositioning = function(winObj){
			var tagId = winObj.tagId;
			var coordinate = this.windowCoordinate[tagId];
			var cLen = this.windowCoordinate[coordinate].length;
			for(ci=0; ci<cLen; ci++){
				if(this.windowCoordinate[coordinate][ci] == tagId){
					delete this.windowCoordinate[coordinate][ci];
				}
			}
			delete this.windowCoordinate[tagId];
		}
		this.changePositioning = function(winObj){
			var tagId = winObj.tagId;
			var coordinate = winObj.view.oLeft+","+winObj.view.oTop;
			var oriCoo = coordinate;
			
			if(null != this.windowCoordinate[coordinate])
			var cLen = this.windowCoordinate[coordinate].length;
			for(ci=0; ci<cLen; ci++){
				if(this.windowCoordinate[coordinate][ci] == tagId){
					delete this.windowCoordinate[coordinate][ci];
				}
			}
			delete this.windowCoordinate[tagId];
			var offsetLeft = winObj.tag.offset().left; 
			var offsetTop = winObj.tag.offset().top;
			coordinate = offsetLeft.toFixed(1)+","+offsetTop.toFixed(1);
			winObj.view.oLeft = offsetLeft;
			winObj.view.oTop = offsetTop;
			if(this.windowCoordinate[coordinate] === undefined || this.windowCoordinate[coordinate][0] === undefined){
				var subArray = [];
				subArray[0] = tagId;
				this.windowCoordinate[coordinate] = subArray;
			}else{
				var flag = true;
				cLen = this.windowCoordinate[coordinate].length;
				for(ci=0; ci<cLen; ci++){
					if(this.windowCoordinate[coordinate][ci] === undefined){
						this.windowCoordinate[coordinate][ci] = tagId;
						var flag = false;
						break;
					}
				}
				if(flag){
					this.windowCoordinate[coordinate][cLen] = tagId;
				}
			}
			this.windowCoordinate[tagId] = coordinate;
		}
		this.newPositioning = function(winObj){
			this.left = winObj.view.oLeft;
			this.top = winObj.view.oTop;
			this.newWindowPositioning(winObj);
			winObj.view.oLeft = this.left;
			winObj.view.oTop = this.top;
			this.windowArray[winObj.view.zIndex] = winObj;
		}
		this.newWindowPositioning = function(winObj){
			var coordinate = this.left.toFixed(1)+","+this.top.toFixed(1);
			var tagId = winObj.tagId;
			if(this.windowCoordinate[coordinate] === undefined || this.windowCoordinate[coordinate][0] === undefined){
				var subArray = [];
				subArray[0] = tagId;
				this.windowCoordinate[coordinate] = subArray;
				this.windowCoordinate[tagId] = coordinate;
				winObj.tag.offset({
					left:this.left,
					top:this.top
				});
			}else{
				this.left += 30;
				this.top += 30;
				this.newWindowPositioning(winObj);
			}
		}
	}