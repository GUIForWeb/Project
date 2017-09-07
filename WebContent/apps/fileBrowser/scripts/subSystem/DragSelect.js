function DragSelect(){
	this.stdX = 0;
	this.stdY = 0;
	this.isWorking = false;
	this.list = [];
	/*
	this.setList = function(){
		this.list = "";
		for(si=0; si<this.list.length; si++){
			if(this.list[si] != false){
				this.list += this.list[si] + "&";
			}
		}
	}
	*/
	this.start = function(tag, event){
		if(event.target !== tag)
			return;
		this.stdX = 0;
		this.stdY = 0;
		this.isWorking = true;
		var div = $("<div></div>").attr("id","selection");
		div.css({"background-color":"blue"});
		div.css({"opacity":"0.3"});
		div.css({"border":"1px solid black"});
		if($("#forms").length) {
			var offset = this.cOfWindow.offset();
			var x = event.clientX - offset.left;
			var y = event.clientY - offset.top;
		}
		else {
			var x = event.clientX;
			var y = event.clientY;
		}
		div.css({
			position:"absolute",
			top:y+"px",
			left:x+"px"
		});
		this.fileItemArray = $("#fbTable"+this.id).find(".fileItem");
		$("#fbTable"+this.id).parent().append(div);
		if(this.stdX == 0 && this.stdY == 0){
			var offset = $("#selection").offset();
			this.stdX = offset.left;
			this.stdY = offset.top;
		}
		if($(this.fileItemArray[0]).offset().top > this.stdY){
			this.case = 0;
		}
		else if($(this.fileItemArray[this.fileItemArray.length-1]).offset().top < this.stdY){
			this.case = 1;
		}
		else {
			this.case = 2;
		}
	}
	this.onGoing = function(tag, event){
		if(event.target !== tag)
			return;
		var sizeX = this.stdX - event.clientX;
		var sizeY = this.stdY - event.clientY;
		var direction = "";
		var preX = $("#selection").width();
		var preY = $("#selection").height();
		if(sizeX == 0 && sizeY ==0){
			sizeX = preX;
			sizeY = preY;
		}//SE
		else if(sizeX < 0 &&  sizeY <0){
			sizeX = -sizeX;
			sizeY = -sizeY;
		}//NW
		else if(sizeX > 0 &&  sizeY > 0){
			$("#selection").offset({
				left:event.clientX,
				top:event.clientY
			});
		}//SW
		else if(sizeX < 0 &&  sizeY > 0){
			sizeX = -sizeX;
			$("#selection").offset({
				top:event.clientY
			});
		}//NE
		else if(sizeX > 0 &&  sizeY < 0){
			$("#selection").offset({
				left:event.clientX
			});
			sizeY = -sizeY;
		}
		$("#selection").width(sizeX);
		$("#selection").height(sizeY);
		for(fi=0; fi<this.fileItemArray.length; fi++){
			var fileItem = $(this.fileItemArray[fi]);
			if(event.clientY != 0) 
			if(this.case == 0){
				if(event.clientY > ((fileItem.offset().top*2 + fileItem.height())/2)){
					this.list[fi] = {"name":this.fileItemArray[fi].children[0].innerHTML,"type":this.fileItemArray[fi].children[2].innerHTML};
					this.hover(false, fileItem);
				}
				else{
					delete this.list[fi];
					this.hover(true, fileItem);
				} 
			}
			else if(this.case == 1){
				if(event.clientY < ((fileItem.offset().top*2 + fileItem.height())/2)){
					this.list[fi] = {"name":this.fileItemArray[fi].children[0].innerHTML,"type":this.fileItemArray[fi].children[2].innerHTML};
					this.hover(false, fileItem);
				}
				else{
					delete this.list[fi];
					this.hover(true, fileItem);
				} 
			}
			else if(this.case == 2){
				if(event.clientY < this.stdY){
					if(event.clientY < ((fileItem.offset().top*2 + fileItem.height())/2) && ((fileItem.offset().top*2 + fileItem.height())/2) < this.stdY){
						this.list[fi] = {"name":this.fileItemArray[fi].children[0].innerHTML,"type":this.fileItemArray[fi].children[2].innerHTML};
						this.hover(false, fileItem);
					}
					else{
						delete this.list[fi];
						this.hover(true, fileItem);
					}
				}
				else{
					if(event.clientY > ((fileItem.offset().top*2 + fileItem.height())/2) && ((fileItem.offset().top*2 + fileItem.height())/2) > this.stdY){
						this.list[fi] = {"name":this.fileItemArray[fi].children[0].innerHTML,"type":this.fileItemArray[fi].children[2].innerHTML};
						this.hover(false, fileItem);
					}
					else{
						delete this.list[fi];
						this.hover(true, fileItem);
						
					}
				}
			}
		}
		this.list = this.erumSList();
	}
	this.erumSList = function(){
		return this.list.filter(function( element ) {
			   return element !== undefined;
			});
	}
	this.fileList = function(){
		return this.list.filter(function( element ) {
			   return (element !== undefined && element.type != "directory");
			});
	}
	this.hover = function(hover, fileItem){
		if(hover){
			fileItem.css("background-color","white");
		}
		else {
			fileItem.css("background-color","dimgray");
		}
	}
	this.end = function(){
		$("#selection").remove();
	}
	this.cancle = function(){
		for(fi=0; fi<this.fileItemArray.length; fi++){
			var fileItem = $(this.fileItemArray[fi]);
			this.list[fileItem.children().html()] = false;
			fileItem.css("background-color","white");
			fileItem.hover(
				function(){
					$(this).css("background-color","dimgray");
			    }, 
			    function(){
			    	$(this).css("background-color","white");
			});
			this.isWorking = false;
		}
	}
}