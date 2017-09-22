system.controllers.subControllers.Dragend = function() {
	this.icon = function(event) {
		/*
		var tag = event.currentTarget;
		var tagId = tag.id;
		var numId = this.getIconNumId(tag);
		var view = gui.background.view;
		var iconX = (tag.offsetLeft - view.iconTablePaddingLeft)
				/ (view.iconTdWidth + view.iconTdBorderWidth);
		var iconY = (tag.offsetTop - view.iconTablePaddingTop)
				/ (view.iconTdHeight + view.iconTdBorderHeight);
		iconXUnderPoint = iconX - parseInt(iconX);
		iconYUnderPoint = iconY - parseInt(iconY);
		if (iconXUnderPoint > 0.5) {
			iconX = iconX - iconXUnderPoint + 1;
		} else {
			iconX = iconX - iconXUnderPoint;
		}
		if (iconYUnderPoint > 0.5) {
			iconY = iconY - iconYUnderPoint + 1;
		} else {
			iconY = iconY - iconYUnderPoint;
		}
		if (iconX > (tableColNum - 1))
			iconX = tableColNum - 1;
		if (iconY > (tableRowNum - 1))
			iconY = tableRowNum - 1;
		iconTdLeft = $("#" + this.getIconTdTagId(iconX, iconY)).offset().left;
		iconTdTop = $("#" + this.getIconTdTagId(iconX, iconY)).offset().top;
		iconOLeft = iconTdLeft + (view.iconTdBorderWidth / 2);
		iconOTop = iconTdTop + (view.iconTdBorderHeight / 2);
		var preIconX = gui.iconArray[tagId].iconX;
		var preIconY = gui.iconArray[tagId].iconY;
		var preIconOLeft = gui.iconArray[tagId].iconOLeft;
		var preIconOTop = gui.iconArray[tagId].iconOTop;
		if (gui.iconCoordinate[iconX + "," + iconY]) {
			$("#" + tag.id).offset({
				left : preIconOLeft,
				top : preIconOTop
			})
		} else {
			gui.iconCoordinate[preIconX + "," + preIconY] = null;
			gui.iconCoordinate[iconX + "," + iconY] = true;
			gui.iconArray[tagId].iconX = iconX;
			gui.iconArray[tagId].iconY = iconY;
			gui.iconArray[tagId].iconOLeft = iconOLeft;
			gui.iconArray[tagId].iconOTop = iconOTop;
			$(tag).offset({
				left : iconOLeft,
				top : iconOTop
			});
			var json = {
				"iconNumId" : numId,
				"iconX" : iconX,
				"iconY" : iconY
			};
			this.im.iconXY(json);
		}
		*/
	}
	this.head = function(event) {
		var winTag = event.currentTarget.parentNode.parentNode;
		var tmpNode = this.nm.getNodeWithWinTag(winTag);
		this.pe.changePosition(tmpNode);
		this.gr.changePosition(tmpNode);
	}
}