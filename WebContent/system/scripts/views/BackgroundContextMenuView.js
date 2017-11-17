system.views.BackgroundContextMenuView = function(backgroundContextMenuView) {
	this.__proto__ = backgroundContextMenuView;
	this.outerLayerTagClass = "contextMenuOuterLayer";
	this.menuLayerTagClass = "contextMenuLayer";
	this.contextMenuLayer = function() {
		this.outerSelector.append(this.contentSelector);
	}
	this.outerLayer = function() {
		var tmpTag = $("<div></div>");
		tmpTag = tmpTag.attr("id", this.tagId);
		tmpTag.css("z-index", this.zIndex);
		tmpTag.css("position", "absolute");
		tmpTag.offset({
			left : this.oLeft,
			top : this.oTop
		});
		tmpTag.addClass(this.outerLayerTagClass);
		this.outerSelector = tmpTag;
	}
	this.contentLayer = function() {
		var tagSelector = $("<div></div>");
		var ulTagSelector = $("<ul></ul>");
		var themeSelector = $("<li>Theme</li>");
		var pasteSelector = $("<li>Paste</li>");
		var themeUlSelector = $("<ul></ul>");
		var iSelector = $("<li>Interface</li>");
		var bgSelector = $("<li>Background</li>");
		var iconSelector = $("<li>Icon</li>");
		themeSelector.mouseover(function(){
			gui.desktop.mouse.over.li(this)
		});
		themeSelector.mouseout(function(){
			gui.desktop.mouse.out.li(this)
		});
		iSelector.click(function(){
			gui.desktop.click.theme(event)
		});
		bgSelector.click(function(){
			gui.desktop.click.theme(event)
		});
		pasteSelector.click(function(){
			gui.desktop.click.paste(event);
		});
		iconSelector.click(function(){
			gui.desktop.click.theme(event)
		});
		tagSelector.append(ulTagSelector);
		ulTagSelector.append(themeSelector);
		ulTagSelector.append(pasteSelector);
		themeSelector.append(themeUlSelector);
		themeUlSelector.append(iSelector);
		themeUlSelector.append(bgSelector);
		themeUlSelector.append(iconSelector);
		tagSelector.addClass(this.menuLayerTagClass);
		this.contentSelector = tagSelector;
	}
	this.init = function() {
		this.contentLayer();
		this.outerLayer();
		this.contextMenuLayer();
	}
}