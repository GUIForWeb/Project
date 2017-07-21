	function IconView(icon){
		this.__proto__ = icon;
		this.zIndex = 0;
		this.outerLayer = "";
		this.iconOLeft = 0;
		this.iconOTop = 0;
		this.iconTdBorderWidth = 0;
		this.iconTdBorderHeight = 0;
		this.iconLayer = function(){
			this.iconTagArray = this.outerTagArray;
		}
		this.outerLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag = tmpTag.attr("id",this.tagIdRule+this.numId);
			tmpTag.css("z-index", this.zIndex);
			tmpTag.addClass(this.tagClass);
			tmpTag.attr("dragable","true");
			tmpTag.attr("ondrag",this.guiName+".drag.icon(this)");
			tmpTag.attr("ondragend",this.guiName+".dragend.icon(this)");
			tmpTag.attr("ondblclick",this.guiName+".dblclick.icon(this)");
			var tmpImg = $("<img>").attr("src",this.contextPath+this.iconURL);
			tmpImg.addClass("iconImg");
			tmpTag.prepend(tmpImg)
			this.outerTagArray = tmpTag;
		}
		this.getView = function(){
			this.outerLayer();
			this.iconLayer();
		}
	}