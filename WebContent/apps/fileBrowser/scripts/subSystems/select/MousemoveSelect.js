fileBrowser.subsystem.select.MousemoveSelect = function() {
	this.stdX = 0;
	this.stdY = 0;
	this.isOnGoing = false;
	this.isWorking = false;
	this.ctrlKey = false;
	this.isChoosing = false;
	this.preWidth = 0;
	this.preHeight = 0;
	this.onGoingWtihCtrl = function(event){
		var sizeX = this.stdX - event.clientX;
		var sizeY = this.stdY - event.clientY;
		var direction = "";
		var preX = $("#selection").width();
		var preY = $("#selection").height();
		if(sizeX == 0 && sizeY ==0){
			sizeX = preX;
			sizeY = preY;
		}// SE
		else if(sizeX < 0 &&  sizeY <0){
			sizeX = -sizeX;
			sizeY = -sizeY;
		}// NW
		else if(sizeX > 0 &&  sizeY > 0){
			$("#selection").offset({
				left:event.clientX,
				top:event.clientY
			});
		}// SW
		else if(sizeX < 0 &&  sizeY > 0){
			sizeX = -sizeX;
			$("#selection").offset({
				top:event.clientY
			});
		}// NE
		else if(sizeX > 0 &&  sizeY < 0){
			$("#selection").offset({
				left:event.clientX
			});
			sizeY = -sizeY;
		}
		this.preHeight = $("#selection").height();
		$("#selection").width(sizeX);
		$("#selection").height(sizeY);
		if(this.fbTable.width() > $("#selection").offset().left)
		if(this.preHeight <= $("#selection").height())
			this.isChoosing = true;
		else
			this.isChoosing = false;
		
		if(this.isChoosing) {
			for(fi=0; fi<this.dataItemArray.length; fi++){
				var dataItem = $(this.dataItemArray[fi]);
				if(event.clientY != 0) 
				if(this.case == 0){
					if(event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2)){
						if(this.va["data"][fi].isChangeable)
						if(this.va["data"][fi].isChosen){
							this.va["data"][fi].isChosen = false;
							this.hover(false, dataItem);
						}
						else{
							this.va["data"][fi].isChosen = true;
							this.hover(true, dataItem);
						}
						this.va["data"][fi].isChangeable = false;
					}
				}
				else if(this.case == 1){
					if(event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2)){
						if(this.va["data"][fi].isChangeable)
						if(this.va["data"][fi].isChosen){
							this.va["data"][fi].isChosen = false;
							this.hover(false, dataItem);
						}
						else{
							this.va["data"][fi].isChosen = true;
							this.hover(true, dataItem);
						}
						this.va["data"][fi].isChangeable = false;
					}
				}
				else if(this.case == 2){
					if(event.clientY < this.stdY){
						if(event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2) && ((dataItem.offset().top*2 + dataItem.height())/2) < this.stdY){
							if(this.va["data"][fi].isChangeable)
							if(this.va["data"][fi].isChosen){
								this.va["data"][fi].isChosen = false;
								this.hover(false, dataItem);
							}
							else{
								this.va["data"][fi].isChosen = true;
								this.hover(true, dataItem);
							}
							this.va["data"][fi].isChangeable = false;
						}
					}
					else{
						if(event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2) && ((dataItem.offset().top*2 + dataItem.height())/2) > this.stdY){
							if(this.va["data"][fi].isChangeable)
							if(this.va["data"][fi].isChosen){
								this.va["data"][fi].isChosen = false;
								this.hover(false, dataItem);
							}
							else{
								this.va["data"][fi].isChosen = true;
								this.hover(true, dataItem);
							}
							this.va["data"][fi].isChangeable = false;
						}
					}
				}
			}
		}
		else {
			for(fi=0; fi<this.dataItemArray.length; fi++){
				var dataItem = $(this.dataItemArray[fi]);
				if(event.clientY != 0) 
				if(this.case == 0){
					if(event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2)){
						if(!this.va["data"][fi].isChangeable)
						if(this.va["data"][fi].isChosen){
							this.va["data"][fi].isChosen = false;
							this.hover(false, dataItem);
						}
						else{
							this.va["data"][fi].isChosen = true;
							this.hover(true, dataItem);
						}
						this.va["data"][fi].isChangeable = true;
					}
				}
				else if(this.case == 1){
					if(event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2)){
						if(!this.va["data"][fi].isChangeable)
						if(this.va["data"][fi].isChosen){
							this.va["data"][fi].isChosen = false;
							this.hover(false, dataItem);
						}
						else{
							this.va["data"][fi].isChosen = true;
							this.hover(true, dataItem);
						}
						this.va["data"][fi].isChangeable = true;
					}
				}
				else if(this.case == 2){
					if(event.clientY > this.stdY){
						if(event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2) && ((dataItem.offset().top*2 + dataItem.height())/2) < this.stdY){
							if(!this.va["data"][fi].isChangeable)
							if(this.va["data"][fi].isChosen){
								this.va["data"][fi].isChosen = false;
								this.hover(false, dataItem);
							}
							else{
								this.va["data"][fi].isChosen = true;
								this.hover(true, dataItem);
							}
							this.va["data"][fi].isChangeable = true;
						}
					}
					else{
						if(event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2) && ((dataItem.offset().top*2 + dataItem.height())/2) > this.stdY){
							if(!this.va["data"][fi].isChangeable)
							if(this.va["data"][fi].isChosen){
								this.va["data"][fi].isChosen = false;
								this.hover(false, dataItem);
							}
							else{
								this.va["data"][fi].isChosen = true;
								this.hover(true, dataItem);
							}
							this.va["data"][fi].isChangeable = true;
						}
					}
				}
			}
		}
		
	}
	this.onGoing = function(event){
		var sizeX = this.stdX - event.clientX;
		var sizeY = this.stdY - event.clientY;
		var direction = "";
		var preX = $("#selection").width();
		var preY = $("#selection").height();
		if(sizeX == 0 && sizeY ==0){
			sizeX = preX;
			sizeY = preY;
		}// SE
		else if(sizeX < 0 &&  sizeY <0){
			sizeX = -sizeX;
			sizeY = -sizeY;
		}// NW
		else if(sizeX > 0 &&  sizeY > 0){
			$("#selection").offset({
				left:event.clientX,
				top:event.clientY
			});
		}// SW
		else if(sizeX < 0 &&  sizeY > 0){
			sizeX = -sizeX;
			$("#selection").offset({
				top:event.clientY
			});
		}// NE
		else if(sizeX > 0 &&  sizeY < 0){
			$("#selection").offset({
				left:event.clientX
			});
			sizeY = -sizeY;
		}
		$("#selection").width(sizeX);
		$("#selection").height(sizeY);
		for(fi=0; fi<this.dataItemArray.length; fi++){
			var dataItem = $(this.dataItemArray[fi]);
			if(event.clientY != 0) 
			if(this.case == 0){
				if(event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2)){
					this.va["data"][fi].isChosen = true;
					this.hover(true, dataItem);
				}
				else{
					this.va["data"][fi].isChosen = false;
					this.hover(false, dataItem);
				} 
			}
			else if(this.case == 1){
				if(event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2)){
					this.va["data"][fi].isChosen = true;
					this.hover(true, dataItem);
				}
				else{
					this.va["data"][fi].isChosen = false;
					this.hover(false, dataItem);
				} 
			}
			else if(this.case == 2){
				if(event.clientY < this.stdY){
					if(event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2) && ((dataItem.offset().top*2 + dataItem.height())/2) < this.stdY){
						this.va["data"][fi].isChosen = true;
						this.hover(true, dataItem);
					}
					else{
						this.va["data"][fi].isChosen = false;
						this.hover(false, dataItem);
					}
				}
				else{
					if(event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2) && ((dataItem.offset().top*2 + dataItem.height())/2) > this.stdY){
						this.va["data"][fi].isChosen = true;
						this.hover(true, dataItem);
					}
					else{
						this.va["data"][fi].isChosen = false;
						this.hover(false, dataItem);
					}
				}
			}
		}
	}
	this.start = function(event){
		this.stdX = 0;
		this.stdY = 0;
		this.isWorking = true;
		this.isOnGoing = true;
		var div = $("<div></div>").attr("id","selection");
		div.css({"background-color":"blue"});
		div.css({"opacity":"0.3"});
		div.css({"border":"1px solid black"});
		var x = event.clientX - this.section.offset().left;
		var y = event.clientY - this.section.offset().top;
		div.css({
			position:"absolute",
			left:x,
			top:y
		});
		this.section.append(div);
		this.dataItemArray = $("#fbTable"+this.id).find(".dataItem");
		if(this.stdX == 0 && this.stdY == 0){
			var offset = $("#selection").offset();
			this.stdX = offset.left;
			this.stdY = offset.top;
		}
		if(this.dataItemArray.length > 0)
		if($(this.dataItemArray[0]).offset().top > this.stdY){
			this.case = 0;
		}
		else if($(this.dataItemArray[this.dataItemArray.length-1]).offset().top < this.stdY){
			this.case = 1;
		}
		else {
			this.case = 2;
		}
	}
	this.hover = function(hover, dataItem){
		if(hover){
			dataItem.css("background-color","dimgray");
		}
		else {
			dataItem.css("background-color","white");
		}
	}
	this.end = function(){
		var flag = false
		for(di=0; di<this.va["data"].length; di++) {
			this.va["data"][di].isChangeable = true;
			if(this.va["data"][di].isChosen == true){
				flag = true;
			}
		}
		$("#selection").remove();
		this.isOnGoing = false;
		if(!flag)
			this.isWorking = false;
	}
}