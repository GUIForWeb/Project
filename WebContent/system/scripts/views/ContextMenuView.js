function ContextMenuView(contextMenuModel){
		this.__proto__ = contextMenuModel;
		this.outerLayerTagClass = "contextMenuOuterLayer";
		this.contentLayerTagClass = "contextMenuContentLayer";
		this.contentPath = "";
		this.contextMenuLayer = function(){
			this.outerTagArray.append(this.contentTagArray);
			this.contextMenuTagArray = this.outerTagArray;
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
			this.outerTagArray = tmpTag;
		}
		this.contentLayer = function(){
			var tmpTag = $("<div></div>");
			var ulTag = $("<ul></ul>");
			var theme = $("<li>Theme</li>");
			var themeUlTag = $("<ul></ul>");
			var window = $("<li>Window</li>");
			var background = $("<li>Background</li>");
			var icon = $("<li>Icon</li>");
			theme.attr("onmouseover","gui.mouseover.li(this)");
			theme.attr("onmouseout","gui.mouseout.li(this)");
			window.attr("onclick","gui.click.theme(this)");
			background.attr("onclick","gui.click.theme(this)");
			icon.attr("onclick","gui.click.theme(this)");
			tmpTag.append(ulTag);
			ulTag.append(theme);
			theme.append(themeUlTag);
			themeUlTag.append(window);
			themeUlTag.append(background);
			themeUlTag.append(icon);
			tmpTag.addClass(this.contentLayerTagClass);
			this.contentTagArray = tmpTag;
		}
		this.getView = function(){
			this.contentLayer();
			this.outerLayer();
			this.contextMenuLayer();
		}
}