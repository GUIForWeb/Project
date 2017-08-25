	function WindowView(windowModel){
		this.__proto__ = windowModel;
		this.isFullScreen = false;
		this.isOnScreen = true;
		this.outerLayerTagClass = "windowOuterLayer";
		this.headLayerTagClass = "windowHeadLayer";
		this.contentLayerTagClass = "windowContentLayer";
		this.buttonLayerTagClass = "windowButtonLayer";
		this.movementHandleLayerTagClass = "windowMovementHandleLayer";
		this.northLayerTagClass = "windowNorthLayer";
		this.eastLayerTagClass = "windowEastLayer";
		this.southLayerTagClass = "windowSouthLayer";
		this.westLayerTagClass = "windowWestLayer";
		this.northWestLayerTagClass = "windowNorthWestLayer";
		this.northEastLayerTagClass = "windowNorthEastLayer";
		this.southWestLayerTagClass = "windowSouthWestLayer";
		this.southEastLayerTagClass = "windowSouthEastLayer";
		this.prevZIdx = 0;
		this.zIndex = 0;
		this.xBorderWidth = 0;
		this.oBorderWidth = 0;
		this.hHeight = 0;
		this.bWidth = 0;
		this.bHeight = 0;
		this.bTop = 0;
		this.minWidth = 0;
		this.minHeight = 0;
		this.prevOLeft = 0;
		this.prevOTop = 0;
		this.prevOWidth = 0;
		this.prevOHeight = 0;
		this.resizeWidth = 10;
		this.resizeHeight = 10;
		this.nwLeft = 0;
		this.nwTop = 0;
		this.neTop =  0;
		this.swLeft =  0;
		this.nTop = 0;
		this.wLeft = 0;
		this.setZIndex = function(zIndex){
			this.outerTagArray[0].style.zIndex = zIndex;
			this.zIndex = zIndex;
		}
		this.windowLayer = function(){
			this.headTagArray.append(this.hButtonTagArray);
			this.headTagArray.append(this.fButtonTagArray);
			this.headTagArray.append(this.xButtonTagArray);
			this.headTagArray.append(this.movementHandleTagArray);
			//this.outerTagArray.append(this.movementHandleTagArray);
			this.outerTagArray.append(this.contentTagArray);
			this.outerTagArray.append(this.headTagArray);
			this.outerTagArray.append(this.northTagArray);
			this.outerTagArray.append(this.eastTagArray);
			this.outerTagArray.append(this.southTagArray);
			this.outerTagArray.append(this.westTagArray);
			this.outerTagArray.append(this.northWestTagArray);
			this.outerTagArray.append(this.northEastTagArray);
			this.outerTagArray.append(this.southWestTagArray);
			this.outerTagArray.append(this.southEastTagArray);
			this.windowTagArray = this.outerTagArray;
		}
		this.outerLayer = function(){
			//"<div id='" + this.ids["o"] + "' tabindex='0' style='z-index:1; outline:1px solid transparent; position:absolute; left:" + this.oLeft + "px; top:" + this.oTop + "px; width:" + this.oWidth + "px; height:" + this.oHeight + "px; background-color:" + this.oBgC + ";' onfocus='" + this.ids["id"] + ".incZIndex();'>";
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagId);
			tmpTag.attr("draggable","true");
			tmpTag.css("z-index",parseInt(this.zIndex));
			tmpTag.css("position","absolute");
			tmpTag.addClass(this.outerLayerTagClass);
			tmpTag = tmpTag.attr("tabindex","0");
			tmpTag.width(this.oWidth);
			tmpTag.height(this.oHeight);
			tmpTag.offset({
				left:this.oLeft,
				top:this.oTop
			});
			this.outerTagArray = tmpTag;
		}
		this.headLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.html(this.name);
			tmpTag.attr("id",this.tagIds["h"]);
			tmpTag.attr("draggable","true");
			tmpTag.css("position","absolute");
			tmpTag.addClass(this.headLayerTagClass);
			tmpTag.width(this.hWidth);
			tmpTag.height(this.hHeight);
			tmpTag.offset({
				left:this.hLeft,
				top:this.hTop
			});
			this.headTagArray = tmpTag;
		}
		
		this.contentLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["c"]);
			tmpTag.attr("draggable","true");
			tmpTag.html(this.content);
			tmpTag.css("position","absolute");
			tmpTag.css("overflow","auto");
			tmpTag.addClass(this.contentLayerTagClass);
			tmpTag.width(this.cWidth);
			tmpTag.height(this.cHeight);
			tmpTag.offset({
				left:this.cLeft,
				top:this.cTop
			});
			tmpTag.attr("onclick",this.guiName+".click.content(this)");
			this.contentTagArray = tmpTag;
		}
		this.movementHandleLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["m"]);
			tmpTag.css("position","absolute");
			tmpTag.addClass(this.movementHandleLayerTagClass);
			tmpTag.width(this.mWidth);
			tmpTag.height(this.hHeight);
			tmpTag.offset({
				left:0,
				top:0
			});
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondragstart",this.guiName+".drag.start.head(this)");
			tmpTag.attr("ondrag",this.guiName+".drag.ing.head(this)");
			tmpTag.attr("ondragend",this.guiName+".drag.end.head(this)");
			tmpTag.attr("onclick",this.guiName+".click.head(this)");
			this.movementHandleTagArray = tmpTag;
		}
		this.hButtonLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["hB"]);
			tmpTag.attr("draggable","true");
			tmpTag.css("position","absolute");
			tmpTag.html("&lowbar;");
			tmpTag.offset({
				left:this.hBLeft,
				top:this.bTop
			});
			tmpTag.addClass(this.buttonLayerTagClass);
			tmpTag.width(this.bWidth);
			tmpTag.height(this.bHeight);
			tmpTag.attr("onclick",this.guiName+".click.hButton(this)");
			this.hButtonTagArray = tmpTag;
		}
		this.fButtonLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["fB"]);
			tmpTag.attr("draggable","true");
			tmpTag.css("position","absolute");
			tmpTag.html("&squ;");
			tmpTag.offset({
				left:this.fBLeft,
				top:this.bTop
			});
			tmpTag.addClass(this.buttonLayerTagClass);
			tmpTag.width(this.bWidth);
			tmpTag.height(this.bHeight);
			tmpTag.attr("onclick",this.guiName+".click.fButton(this)");
			this.fButtonTagArray = tmpTag;
		}
		this.xButtonLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["xB"]);
			tmpTag.attr("draggable","true");
			tmpTag.css("position","absolute");
			tmpTag.html("&times;");
			tmpTag.offset({
				left:this.xBLeft,
				top:this.bTop
			});
			tmpTag.addClass(this.buttonLayerTagClass);
			tmpTag.width(this.bWidth);
			tmpTag.height(this.bHeight);
			tmpTag.attr("onclick",this.guiName+".click.xButton(this)");
			this.xButtonTagArray = tmpTag;
		}
		this.northWestLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["nw"]);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:this.nwLeft,
				top:this.nwTop
			});
			tmpTag.addClass(this.northWestLayerTagClass);
			tmpTag.width(this.resizeWidth);
			tmpTag.height(this.resizeHeight);
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondragend",this.guiName+".resizeend.window(this)");
			tmpTag.attr("ondrag",this.guiName+".resize.window(this)");
			this.northWestTagArray = tmpTag;
		}
		this.northEastLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["ne"]);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:this.neLeft,
				top:this.neTop
			});
			tmpTag.addClass(this.northEastLayerTagClass);
			tmpTag.width(this.resizeWidth);
			tmpTag.height(this.resizeHeight);
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondragend",this.guiName+".resizeend.window(this)");
			tmpTag.attr("ondrag",this.guiName+".resize.window(this)");
			this.northEastTagArray = tmpTag;
		}
		this.southWestLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["sw"]);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:this.swLeft,
				top:this.swTop
			});
			tmpTag.addClass(this.southWestLayerTagClass);
			tmpTag.width(this.resizeWidth);
			tmpTag.height(this.resizeHeight);
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondragend",this.guiName+".resizeend.window(this)");
			tmpTag.attr("ondrag",this.guiName+".resize.window(this)");
			this.southWestTagArray = tmpTag;
		}
		this.southEastLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["se"]);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:this.seLeft,
				top:this.seTop
			});
			tmpTag.addClass(this.southEastLayerTagClass);
			tmpTag.width(this.resizeWidth);
			tmpTag.height(this.resizeHeight);
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondragend",this.guiName+".resizeend.window(this)");
			tmpTag.attr("ondrag",this.guiName+".resize.window(this)");
			this.southEastTagArray = tmpTag;
		}
		
		this.northLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["n"]);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:this.nLeft,
				top:this.nTop
			});
			tmpTag.addClass(this.northLayerTagClass);
			tmpTag.width(this.nWidth);
			tmpTag.height(this.nHeight);
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondragend",this.guiName+".resizeend.window(this)");
			tmpTag.attr("ondrag",this.guiName+".resize.window(this)");
			this.northTagArray = tmpTag;
		}
		this.eastLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["e"]);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:this.eLeft,
				top:this.eTop
			});
			tmpTag.addClass(this.eastLayerTagClass);
			tmpTag.width(this.eWidth);
			tmpTag.height(this.eHeight);
			tmpTag.attr("ondragend",this.guiName+".resizeend.window(this)");
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondrag",this.guiName+".resize.window(this)");
			this.eastTagArray = tmpTag;
		}
		this.southLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["s"]);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:this.sLeft,
				top:this.sTop
			});
			tmpTag.addClass(this.southLayerTagClass);
			tmpTag.width(this.sWidth);
			tmpTag.height(this.sHeight);
			tmpTag.attr("ondragend",this.guiName+".resizeend.window(this)");
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondrag",this.guiName+".resize.window(this)");
			this.southTagArray = tmpTag;
		}
		this.westLayer = function(){
			var tmpTag = $("<div></div>");
			tmpTag.attr("id",this.tagIds["w"]);
			tmpTag.css("position","absolute");
			tmpTag.offset({
				left:this.wLeft,
				top:this.wTop
			});
			tmpTag.addClass(this.westLayerTagClass);
			tmpTag.width(this.wWidth);
			tmpTag.height(this.wHeight);
			tmpTag.attr("ondragend",this.guiName+".resizeend.window(this)");
			tmpTag.attr("draggable","true");
			tmpTag.attr("ondrag",this.guiName+".resize.window(this)");
			this.westTagArray = tmpTag;
		}
		this.setIds = function () {
			this.tagIds = [];
			this.tagIds["o"] = this.tagId;
			this.tagIds["h"] = "hOf" + this.tagId;
			this.tagIds["c"] = "cOf" + this.tagId;
			this.tagIds["m"] = "mOf" + this.tagId;
			this.tagIds["fB"] = "fBOF" + this.tagId;
			this.tagIds["xB"] = "xBOf" + this.tagId;
			this.tagIds["hB"] = "hBOf" + this.tagId;
			this.tagIds["nw"] = "nwOf" + this.tagId;
			this.tagIds["ne"] = "neOf" + this.tagId;
			this.tagIds["sw"] = "swOf" + this.tagId;
			this.tagIds["se"] = "seOf" + this.tagId;
			this.tagIds["n"] = "nOf" + this.tagId;
			this.tagIds["e"] = "eOf" + this.tagId;
			this.tagIds["s"] = "sOf" + this.tagId;
			this.tagIds["w"] = "wOf" + this.tagId;
		}
		this.setDefaultValues = function (defaultValueArray){
			this.bBorderWidth = defaultValueArray["bBorderWidth"];
			this.oLeft = defaultValueArray["oDefaultLeft"];
			this.oTop = defaultValueArray["oDefaultTop"];
			this.oWidth = defaultValueArray["oDefaultWidth"];
			this.oHeight = defaultValueArray["oDefaultHeight"];
			this.oBorderWidth = defaultValueArray["oBorderWidth"];
			this.hHeight = defaultValueArray["hHeight"];
			this.bWidth = defaultValueArray["bWidth"];
			this.bHeight = defaultValueArray["bHeight"];
			this.bTop = defaultValueArray["bTop"];
			this.minWidth = defaultValueArray["minWidth"];
			this.minHeight = defaultValueArray["minHeight"];
		}
		this.restoreView = function (windowMap){
			this.oLeft = windowMap["oLeft"];
			this.oTop = windowMap["oTop"];
			this.oWidth = windowMap["oWidth"];
			this.oHeight = windowMap["oHeight"];
			this.prevOLeft = windowMap["prevOLeft"];
			this.prevOTop = windowMap["prevOTop"];
			this.prevOWidth = windowMap["prevOWidth"];
			this.prevOHeight = windowMap["prevOHeight"];
			this.zIndex = windowMap["zIndex"];
		}
		this.getView = function(){
			this.hLeft = this.oBorderWidth/2;
			this.hTop = this.hLeft;
			this.bSpace = (this.bBorderWidth*2) + this.bWidth + this.bTop;
			this.xBLeft = this.oWidth - this.bSpace - this.oBorderWidth;
			this.fBLeft = this.oWidth - this.bSpace*2 - this.oBorderWidth;
			this.hBLeft = this.oWidth - this.bSpace*3 - this.oBorderWidth;
			this.hWidth = this.oWidth - (this.oBorderWidth);
			this.mWidth = this.hWidth - this.bSpace*3 - this.oBorderWidth;
			this.cWidth = this.oWidth - (this.oBorderWidth);
			this.cHeight = this.oHeight - this.oBorderWidth - this.hHeight;
			this.cLeft = this.oBorderWidth/2;
			this.cTop = this.hHeight + this.oBorderWidth/2;
			this.neLeft = this.oWidth - this.resizeWidth;
			this.swTop = this.oHeight - this.resizeHeight;
			this.seLeft = this.oWidth - this.resizeWidth; 
			this.seTop = this.oHeight - this.resizeHeight;
			this.nLeft = this.resizeWidth;
			this.nWidth = this.oWidth - this.resizeWidth*2;
			this.nHeight = this.resizeWidth;
			this.eLeft = this.oWidth-this.resizeWidth;
			this.eTop = this.resizeHeight;
			this.eWidth = this.resizeWidth;
			this.eHeight = this.oHeight - this.resizeHeight*2;
			this.sLeft = this.resizeWidth;
			this.sTop = this.oHeight - this.resizeWidth;
			this.sWidth = this.oWidth - this.resizeWidth*2;
			this.sHeight = this.resizeWidth;
			this.wTop = this.resizeHeight;
			this.wWidth = this.resizeWidth;
			this.wHeight = this.oHeight - this.resizeHeight*2;
			this.setIds();
			this.northLayer();
			this.eastLayer();
			this.southLayer();
			this.westLayer();
			this.northWestLayer();
			this.northEastLayer();
			this.southWestLayer();
			this.southEastLayer();
			this.movementHandleLayer();
			this.xButtonLayer();
			this.hButtonLayer();
			this.fButtonLayer();
			this.outerLayer();
			this.headLayer();
			this.contentLayer();
			this.windowLayer();
		}
	}