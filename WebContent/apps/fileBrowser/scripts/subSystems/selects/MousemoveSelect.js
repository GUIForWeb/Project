fileBrowser.subsystems.selects.MousemoveSelect = function() {
	this.stdX = 0;
	this.stdY = 0;
	this.isOnGoing = false;
	this.isWorking = false;
	this.ctrlKey = false;
	this.isWiding = false;
	this.preWidth = 0;
	this.preHeight = 0;
	this.cancle = function(){
		this.mousemove.isWorking = false;
	}
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
		for(fi=0; fi<this.dataItemArray.length; fi++){
			var dataItem = $(this.dataItemArray[fi]);
			var data = this.va["data"][fi];
			var isChosen = this.va["data"][fi].isChosen = true;
			if(event.clientY != 0)
			if(data.isChangeable) {
				if(this.case == 0){
					var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
					var con1 = event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2)
					if(con0 && con1){
						data.isChosen = true;
						this.hover(true, dataItem);
					}
					else{
						data.isChosen = false;
						this.hover(false, dataItem);
					} 
				}
				else if(this.case == 1){
					var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
					var con1 = event.clientX > this.stdX
					var con2 = event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2);
					if((con0 || con1) && con2){
						data.isChosen = true;
						this.hover(true, dataItem);
					}
					else{
						data.isChosen = false;
						this.hover(false, dataItem);
					} 
				}
				else if(this.case == 2){
					var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
					var con1 = event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2);
					var con2 = ((dataItem.offset().top*2 + dataItem.height())/2) < this.stdY;
					var con3 = event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2);
					var con4 = ((dataItem.offset().top*2 + dataItem.height())/2) > this.stdY;
					if(con0 && con1 && con2){
						data.isChosen = true;
						this.hover(true, dataItem);
					}
					else if(con0 && con3 && con4){
						data.isChosen = true;
						this.hover(true, dataItem);
					}
					else{
						data.isChosen = false;
						this.hover(false, dataItem);
					}
				}
			}
			else if(!data.isChangeable){
				if(this.case == 0){
					var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
					var con1 = event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2)
					if(con0 && con1){
						data.isChosen = false;
						this.hover(false, dataItem);
					}
				}
				else if(this.case == 1){
					var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
					var con1 = event.clientX > this.stdX
					var con2 = event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2);
					if((con0 || con1) && con2){
						data.isChosen = false;
						this.hover(false, dataItem);
					}
				}
				else if(this.case == 2){
					var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
					var con1 = event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2);
					var con2 = ((dataItem.offset().top*2 + dataItem.height())/2) < this.stdY;
					var con3 = event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2);
					var con4 = ((dataItem.offset().top*2 + dataItem.height())/2) > this.stdY;
					if(con0 && con1 && con2){
						data.isChosen = false;
						this.hover(false, dataItem);
					}
					else if(con0 && con3 && con4){
						data.isChosen = false;
						this.hover(false, dataItem);
					}
				}
			}
		}		
	}
	this.end = function(event){
		var flag = false
		var data = null;
		for(di=0; di<this.va["data"].length; di++) {
			data = this.va["data"][di];
			if(data.isChosen == true){
				flag = true;
				data.isChangeable = false;
			}
			else {
				data.isChangeable = true;
			}
		}
		$("#selection").remove();
		this.isOnGoing = false;
		if(!flag)
			this.isWorking = false;
		
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
			var data = this.va["data"][fi];
			if(event.clientY != 0) 
			if(this.case == 0){
				var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
				var con1 = event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2)
				if(con0 && con1){
					data.isChosen = true;
					this.hover(true, dataItem);
				}
				else{
					data.isChosen = false;
					this.hover(false, dataItem);
				} 
			}
			else if(this.case == 1){
				var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
				var con1 = event.clientX > this.stdX
				var con2 = event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2);
				if((con0 || con1) && con2){
					data.isChosen = true;
					this.hover(true, dataItem);
				}
				else{
					data.isChosen = false;
					this.hover(false, dataItem);
				} 
			}
			else if(this.case == 2){
				var con0 = (event.clientX - dataItem.offset().left) < dataItem.width();
				var con1 = event.clientY < ((dataItem.offset().top*2 + dataItem.height())/2);
				var con2 = ((dataItem.offset().top*2 + dataItem.height())/2) < this.stdY;
				var con3 = event.clientY > ((dataItem.offset().top*2 + dataItem.height())/2);
				var con4 = ((dataItem.offset().top*2 + dataItem.height())/2) > this.stdY;
				if(con0 && con1 && con2){
					data.isChosen = true;
					this.hover(true, dataItem);
				}
				else if(con0 && con3 && con4){
					data.isChosen = true;
					this.hover(true, dataItem);
				}
				else{
					data.isChosen = false;
					this.hover(false, dataItem);
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
}