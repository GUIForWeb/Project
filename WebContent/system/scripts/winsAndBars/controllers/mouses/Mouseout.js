system.winsAndBars.controllers.mouses.Mouseout = function() {
	this.li = function(tag) {
		var width = $(tag).width();
		var bgC = $(tag).css("background-color");
		var top = $(tag).offset().top;
		if (tag.childNodes.length > 0) {
			var li = $(tag).find("li");
			li.css("visibility", "hidden");
		}
	}
}