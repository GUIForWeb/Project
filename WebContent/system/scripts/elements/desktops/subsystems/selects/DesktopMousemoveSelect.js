system.elements.desktops.subsystems.selects.DesktopMousemoveSelect = function() {
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
		for(fi=0; fi<this.iconDivArray.length; fi++){
			var iconDiv = $(this.iconDivArray[fi]);
			var data = this.manager.jsonArray[fi];
			var isChosen = data.isChosen = true;
			if(event.clientY != 0)
			if(data.isChangeable) {
				if(this.case == 0){
					var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
					var con1 = event.clientY > ((iconDiv.offset().top*2 + iconDiv.height())/2)
					if(con0 && con1){
						data.isChosen = true;
						this.hover(true, iconDiv);
					}
					else{
						data.isChosen = false;
						this.hover(false, iconDiv);
					} 
				}
				else if(this.case == 1){
					var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
					var con1 = event.clientX > this.stdX
					var con2 = event.clientY < ((iconDiv.offset().top*2 + iconDiv.height())/2);
					if((con0 || con1) && con2){
						data.isChosen = true;
						this.hover(true, iconDiv);
					}
					else{
						data.isChosen = false;
						this.hover(false, iconDiv);
					} 
				}
				else if(this.case == 2){
					var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
					var con1 = event.clientY < ((iconDiv.offset().top*2 + iconDiv.height())/2);
					var con2 = ((iconDiv.offset().top*2 + iconDiv.height())/2) < this.stdY;
					var con3 = event.clientY > ((iconDiv.offset().top*2 + iconDiv.height())/2);
					var con4 = ((iconDiv.offset().top*2 + iconDiv.height())/2) > this.stdY;
					if(con0 && con1 && con2){
						data.isChosen = true;
						this.hover(true, iconDiv);
					}
					else if(con0 && con3 && con4){
						data.isChosen = true;
						this.hover(true, iconDiv);
					}
					else{
						data.isChosen = false;
						this.hover(false, iconDiv);
					}
				}
			}
			else if(!data.isChangeable){
				if(this.case == 0){
					var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
					var con1 = event.clientY > ((iconDiv.offset().top*2 + iconDiv.height())/2)
					if(con0 && con1){
						data.isChosen = false;
						this.hover(false, iconDiv);
					}
				}
				else if(this.case == 1){
					var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
					var con1 = event.clientX > this.stdX
					var con2 = event.clientY < ((iconDiv.offset().top*2 + iconDiv.height())/2);
					if((con0 || con1) && con2){
						data.isChosen = false;
						this.hover(false, iconDiv);
					}
				}
				else if(this.case == 2){
					var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
					var con1 = event.clientY < ((iconDiv.offset().top*2 + iconDiv.height())/2);
					var con2 = ((iconDiv.offset().top*2 + iconDiv.height())/2) < this.stdY;
					var con3 = event.clientY > ((iconDiv.offset().top*2 + iconDiv.height())/2);
					var con4 = ((iconDiv.offset().top*2 + iconDiv.height())/2) > this.stdY;
					if(con0 && con1 && con2){
						data.isChosen = false;
						this.hover(false, iconDiv);
					}
					else if(con0 && con3 && con4){
						data.isChosen = false;
						this.hover(false, iconDiv);
					}
				}
			}
		}		
	}
	this.end = function(event){
		var flag = false
		var data = null;
		for(di=0; di<this.manager.jsonArray.length; di++) {
			data = this.manager.jsonArray[di];
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
		for(fi=0; fi<this.iconDivArray.length; fi++){
			var iconDiv = $(this.iconDivArray[fi]);
			var data = this.manager.jsonArray[fi];
			if(event.clientY != 0) 
			if(this.case == 0){
				var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
				var con1 = event.clientY > ((iconDiv.offset().top*2 + iconDiv.height())/2)
				if(con0 && con1){
					data.isChosen = true;
					this.hover(true, iconDiv);
				}
				else{
					data.isChosen = false;
					this.hover(false, iconDiv);
				} 
			}
			else if(this.case == 1){
				var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
				var con1 = event.clientX > this.stdX
				var con2 = event.clientY < ((iconDiv.offset().top*2 + iconDiv.height())/2);
				if((con0 || con1) && con2){
					data.isChosen = true;
					this.hover(true, iconDiv);
				}
				else{
					data.isChosen = false;
					this.hover(false, iconDiv);
				} 
			}
			else if(this.case == 2){
				var con0 = (event.clientX - iconDiv.offset().left) < iconDiv.width();
				var con1 = event.clientY < ((iconDiv.offset().top*2 + iconDiv.height())/2);
				var con2 = ((iconDiv.offset().top*2 + iconDiv.height())/2) < this.stdY;
				var con3 = event.clientY > ((iconDiv.offset().top*2 + iconDiv.height())/2);
				var con4 = ((iconDiv.offset().top*2 + iconDiv.height())/2) > this.stdY;
				if(con0 && con1 && con2){
					data.isChosen = true;
					this.hover(true, iconDiv);
				}
				else if(con0 && con3 && con4){
					data.isChosen = true;
					this.hover(true, iconDiv);
				}
				else{
					data.isChosen = false;
					this.hover(false, iconDiv);
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
		var x = event.clientX - this.background.selector.offset().left;
		var y = event.clientY - this.background.selector.offset().top;
		div.css({
			position:"absolute",
			left:x,
			top:y
		});
		this.background.selector.append(div);
		this.iconDivArray = this.background.view.tableSelector.find(".iconDiv");
		if(this.stdX == 0 && this.stdY == 0){
			var offset = $("#selection").offset();
			this.stdX = offset.left;
			this.stdY = offset.top;
		}
		if(this.iconDivArray.length > 0)
		if($(this.iconDivArray[0]).offset().top > this.stdY){
			this.case = 0;
		}
		else if($(this.iconDivArray[this.iconDivArray.length-1]).offset().top < this.stdY){
			this.case = 1;
		}
		else {
			this.case = 2;
		}
	}
	this.hover = function(hover, iconDiv){
		if(hover){
			iconDiv.css("background-color","dimgray");
		}
		else {
			iconDiv.css("background-color","white");
		}
	}
}