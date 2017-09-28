system.winsAndBars.controllers.mouses.Mouseover = function() {
	this.li = function(tag) {
		var width = $(tag).width();
		var height = $(tag).height();
		if (tag.childNodes.length > 0) {
			var li = $(tag).find("li");
			li.css("visibility", "visible");
			li.css("height", height);
			li.css("position", "relative");
			li.css("left", width);
			li.css("top", -height);
		}
	}
}