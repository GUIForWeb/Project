	function BackgroundView(background){
		this.__proto__ = background;
		this.zIndex = 0;
		this.guiHeight = $(document).height();
		this.background = function(){
			var tmpTag = $("<div></div>");
			tmpTag.css("z-index", this.zIndex);
			tmpTag.addClass(background.tagClass);
			this.backgroundTagArray = tmpTag;
		}
		this.tableWrap = function(){
			var tmpTag = $("<div></div>");
			tmpTag.css("z-index", this.zIndex);
			tmpTag.addClass(background.iconTableWrapClass);
			tmpTag.attr("oncontextmenu",this.guiName+".click.rButton(this)");
			tmpTag.attr("onclick",this.guiName+".click.lButton(this)");
			this.tableWrapTagArray = tmpTag;
		}
		this.table = function(){
			var tmpTag = $("<table></table>");
			tmpTag.addClass(background.iconTableTagClass);
			this.tableTagArray = tmpTag;
		}
		this.tr = function(){
			var tmpTag = $("<tr></tr>");
			tmpTag.addClass(background.iconTrTagClass);
			return tmpTag;
		}
		this.td = function(x,y){
			var tmpTag = $("<td></td>");
			tmpTag.attr("id",this.getIconTdTagId(x,y));
			tmpTag.addClass(background.iconTdTagClass);
			return tmpTag;
		}
		this.getView = function(){
			this.background();
			this.tableWrap();
			this.table();
		}
	}