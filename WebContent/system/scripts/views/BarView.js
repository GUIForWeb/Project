	function BarView(BarModel){
		this.__proto__ = BarModel;
		this.outerLayerTagClass = "barOuterLayer";
		this.nameLayerTagClass = "barNameLayer";
		this.oWidth = 100;
		this.oHeight = 30;
		this.oBorderWidth = 5;
		this.nLeft = this.oBorderWidth/2;
		this.nTop = this.oBorderWidth/2;
		this.nWidth = this.oWidth - this.oBorderWidth;
		this.nHeight = this.oHeight - this.oBorderWidth;
		this.barLayer = function(){
			this.outerTag.append(this.nameTag);
			this.barTag = this.outerTag;
		}
		this.outerLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagId);
			tmpTag.css("position","absolute");
			tmpTag.addClass(this.outerLayerTagClass);
			tmpTag.width(this.oWidth);
			tmpTag.height(this.oHeight);
			tmpTag.offset({
				left:this.oLeft,
				top:this.oTop
			});
			this.outerTag = tmpTag;
		}
		this.nameLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.html(this.name);
			tmpTag.css("position","absolute");
			tmpTag.css("overflow","hidden");
			tmpTag.addClass(this.nameLayerTagClass);
			tmpTag.width(this.nWidth);
			tmpTag.height(this.nHeight);
			tmpTag.offset({
				left:this.nLeft,
				top:this.nTop
			});
			tmpTag.attr("onclick",this.guiName+".click.bar(this)");
			this.nameTag = tmpTag;
		}
		this.getView = function(){
			this.nameLayer();
			this.outerLayer();
			this.barLayer();
		}
	}