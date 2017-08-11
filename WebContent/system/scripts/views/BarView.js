	function BarView(BarModel){
		this.__proto__ = BarModel;
		this.position = 0;
		this.outerLayerTagClass = "barOuterLayer";
		this.nameLayerTagClass = "barNameLayer";
		this.oWidth = 100;
		this.oHeight = 30;
		this.oBorderWidth = 5;
		this.nLeft = this.oBorderWidth/2;
		this.nTop = this.oBorderWidth/2;
		this.nWidth = this.oWidth - this.oBorderWidth;
		this.nHeight = this.oHeight - this.oBorderWidth;
		this.setPosition = function(position){
			this.position = position;
			this.setOLeft((this.position)*this.oWidth);
		}
		this.setOLeft = function(value){
			this.oLeft = value;
			this.outerTagArray.css("left",value);
		}
		this.barLayer = function(){
			this.outerTagArray.append(this.nameTagArray);
			this.barTagArray = this.outerTagArray;
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
			this.outerTagArray = tmpTag;
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
			this.nameTagArray = tmpTag;
		}
		this.getView = function(){
			this.nameLayer();
			this.outerLayer();
			this.barLayer();
		}
	}