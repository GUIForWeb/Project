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
		var selection = $("#selection");
		var preX = selection.width();
		var preY = selection.height();
		if(sizeX == 0 && sizeY ==0){
			sizeX = preX;
			sizeY = preY;
		}// SE
		else if(sizeX < 0 &&  sizeY <0){
			sizeX = -sizeX;
			sizeY = -sizeY;
		}// NW
		else if(sizeX > 0 &&  sizeY > 0){
			selection.offset({
				left:event.clientX,
				top:event.clientY
			});
		}// SW
		else if(sizeX < 0 &&  sizeY > 0){
			sizeX = -sizeX;
			selection.offset({
				top:event.clientY
			});
		}// NE
		else if(sizeX > 0 &&  sizeY < 0){
			selection.offset({
				left:event.clientX
			});
			sizeY = -sizeY;
		}
		this.preHeight = selection.height();
		selection.width(sizeX);
		selection.height(sizeY);
		var iconDiv = null;
		var data = null;
		var sLeft = null;
		var sRight = null;
		var sTop = null;
		var sBot = null;
		var con0 = null;
		var con1 = null;
		for(fi=0; fi<this.iconDivArray.length; fi++){
			iconDiv = $(this.iconDivArray[fi]);
			data = this.iconArray[iconDiv.prop("id")].json;
			sLeft = selection.offset().left;
			sRight = sLeft + selection.width(); 
			sTop = selection.offset().top;
			sBot = sTop + selection.height();
			con0 = (iconDiv.offset().left + (iconDiv.width()/2) > sLeft) && (iconDiv.offset().left + (iconDiv.width()/2) < sRight);
			con1 = (iconDiv.offset().top + (iconDiv.height()/2) > sTop) && (iconDiv.offset().top + (iconDiv.height()/2) < sBot);
			if(data.isChangeable){
				if(con0 && con1){
					data.isChosen = true;
					this.hover(true, iconDiv);
				}
				else{
					data.isChosen = false;
					this.hover(false, iconDiv);
				}
			}
			else if(!data.isChangeable){
				if(con0 && con1){
					data.isChosen = false;
					this.hover(false, iconDiv);
				}
			}
		}		
	}
	this.end = function(event){
		var flag = false
		var data = null;
		for(di=0; di<this.iconArray.length; di++) {
			data = this.iconArray[di];
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
		var selection = $("#selection");
		var preX = selection.width();
		var preY = selection.height();
		if(sizeX == 0 && sizeY ==0){
			sizeX = preX;
			sizeY = preY;
		}// SE
		else if(sizeX < 0 &&  sizeY <0){
			sizeX = -sizeX;
			sizeY = -sizeY;
		}// NW
		else if(sizeX > 0 &&  sizeY > 0){
			selection.offset({
				left:event.clientX,
				top:event.clientY
			});
		}// SW
		else if(sizeX < 0 &&  sizeY > 0){
			sizeX = -sizeX;
			selection.offset({
				top:event.clientY
			});
		}// NE
		else if(sizeX > 0 &&  sizeY < 0){
			selection.offset({
				left:event.clientX
			});
			sizeY = -sizeY;
		}
		selection.width(sizeX);
		selection.height(sizeY);
		var iconDiv = null;
		var data = null;
		var sLeft = null;
		var sRight = null;
		var sTop = null;
		var sBot = null;
		var con0 = null;
		var con1 = null;
		for(fi=0; fi<this.iconDivArray.length; fi++){
			iconDiv = $(this.iconDivArray[fi]);
			data = this.iconArray[iconDiv.prop("id")].json;
			sLeft = selection.offset().left;
			sRight = sLeft + selection.width(); 
			sTop = selection.offset().top;
			sBot = sTop + selection.height();
			con0 = (iconDiv.offset().left + (iconDiv.width()/2) > sLeft) && (iconDiv.offset().left + (iconDiv.width()/2) < sRight);
			con1 = (iconDiv.offset().top + (iconDiv.height()/2) > sTop) && (iconDiv.offset().top + (iconDiv.height()/2) < sBot);
			if(con0 && con1){
				data.isChosen = true;
				this.hover(true, iconDiv);
			}
			else {
				data.isChosen = false;
				this.hover(false, iconDiv);
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
	}
}