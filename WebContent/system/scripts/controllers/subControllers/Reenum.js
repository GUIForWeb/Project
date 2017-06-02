	function Reenum(){
		this.window = function(tag){
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
		}
	}