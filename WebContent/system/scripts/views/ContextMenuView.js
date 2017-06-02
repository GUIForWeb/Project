function ContextMenuView(contextMenuModel){
		this.__proto__ = contextMenuModel;
		this.outerLayerTagClass = "contextMenuOuterLayer";
		this.contentLayerTagClass = "contextMenuContentLayer";
		this.contentPath = "";
		this.contextMenuLayer = function(){
			this.outerTag.append(this.contentTag);
			this.contextMenuTag = this.outerTag;
		}
		this.outerLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag = tmpTag.attr("id",this.tagId);
			tmpTag.css("z-index", this.zIndex);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:event.clientX,
				top:event.clientY
			});
			tmpTag.addClass(this.outerLayerTagClass);
			this.outerTag = tmpTag;
		}
		this.contentLayer = function(){
			var tmpTag = $("<div></div>");
			var ulTag = $("<ul></ul>");
			var theme = $("<li>Theme</li>");
			var themeUlTag = $("<ul></ul>");
			var window = $("<li>Window</li>");
			var background = $("<li>Background</li>");
			theme.attr("onmouseover","gui.mouseover.li(this)");
			theme.attr("onmouseout","gui.mouseout.li(this)");
			window.attr("onclick","gui.click.theme(this)");
			background.attr("onclick","gui.click.theme(this)");
			tmpTag.append(ulTag);
			ulTag.append(theme);
			theme.append(themeUlTag);
			themeUlTag.append(window);
			themeUlTag.append(background);
			tmpTag.addClass(this.contentLayerTagClass);
			this.contentTag = tmpTag;
		}
		this.getView = function(){
			this.contentLayer();
			this.outerLayer();
			this.contextMenuLayer();
		}
}