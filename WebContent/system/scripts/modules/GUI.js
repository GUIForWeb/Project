	function GUI(guiVariableName) {
		/*
		this.oWidth = 400;
		this.oHeight = 400;
		*/
		
		this.winCount = 0;
		this.nodeArray = {};
		this.valueArray = {};
		this.barArray = [];
		this.iconArray = [];
		this.iconIdArray = [];
		this.windowArray = [];
		this.windowCoordinate = [];
		this.windowInBarArray = [];
		this.iconTdValueArray = [];
		this.iconTableValueArray = [];
		this.iconCoordinate = [];
		this.winDefaultValueArray = [];
		this.contextPath = "";
		this.oLeft = 0;
		this.oTop = 0;
		this.guiName = guiVariableName;
		this.iconDataList = null;
		this.barTagIdRule = new Bar().tagIdRule;
		this.winTagIdRule = new Window().tagIdRule;
		this.start = function(){
			this.valueArray["newId"] = 0;
			this.valueArray["onScrCount"] = 0;
			this.nodeArray["winAndBar"] = new WinAndBarNode();
			this.nodeArray["winAndBar"].lastWin = this.nodeArray["winAndBar"];
			this.nodeArray["winAndBar"].lastBar = this.nodeArray["winAndBar"];
			/*
			this.nodeArray["win"] = new WinNode();
			this.nodeArray["bar"] = new BarNode();
			*/
			this.controller = new Controller();
			this.controller.__proto__ = this;
			this.gm = new GUIManager();
			this.gm.__proto__ = this.controller;
			this.gr = new GUIRepository();
			this.gr.__proto__ = this.controller;
			this.wm = new WindowManager();
			this.wm.__proto__ = this.controller; 
			this.bm = new BarManager();
			this.bm.__proto__ = this.controller;
			this.ee = new EnumEngine();
			this.ee.__proto__ = this.controller;
			this.wse = new WindowSizingEngine();
			this.wse.__proto__ = this.controller;
			this.pe = new PositioningEngine();
			this.pe.__proto__ = this.controller;
			this.nm = new NodeManager();
			this.nm.__proto__ = this.controller;
			
			this.windowListener = new WindowListener();
			this.windowListener.__proto__ = this.controller;
			this.barListener = new BarListener();
			this.barListener.__proto__ = this.controller;
			this.windowInBarListener = new WindowInBarListener();
			this.windowInBarListener.__proto__ = this.controller;
			this.eventListener = new EventListener();
			this.eventListener.__proto__ = this.controller;
			this.model = new Model();
			this.model.__proto__ = this;
			this.dblclick = new Dblclick();
			this.dblclick.__proto__ = this.controller;
			this.change = new Change();
			this.change.__proto__ = this.controller;
			this.click = new Click();
			this.click.__proto__ = this.controller;
			this.drag = new Drag();
			this.drag.__proto__ = this.controller;
			this.dragend = new Dragend();
			this.dragend.__proto__ = this.controller;
			this.dragstart = new Dragstart();
			this.dragstart.__proto__ = this.controller;
			this.mouseover = new Mouseover();
			this.mouseover.__proto__ = this.controller;
			this.mouseout = new Mouseout();
			this.mouseout.__proto__ = this.controller;
			this.resize = new Resize();
			this.resize.__proto__ = this.controller;
			this.resizeend = new Resizeend();
			this.resizeend.__proto__ = this.controller;
			this.form = new Form();
			this.form.__proto__ = this.controller;
			this.initBackground();
			this.initBgContextMenu();
			this.initIcon();
			this.initTaskbar();
		}
		this.initBackground = function(){
			this.background = new Background();
			//this.bgTagId = this.background.tagId;
			this.background.guiName = this.guiName;
			this.background.setTaskbarValues(this.taskbarValueArray);
			this.background.setIconTdValues(this.iconTdValueArray);
			this.background.setIconTableValues(this.iconTableValueArray);
			this.background.appendBackgroundView();
			this.bgTagArray = this.background.view.backgroundTagArray;
			this.tableWrapTagArray = this.background.view.tableWrapTagArray;
			this.background.appendIconTd();
		}
		this.initBgContextMenu = function(){
			var contextMenuObj = new ContextMenu();
			contextMenuObj.bgTagArray = this.bgTagArray;
			contextMenuObj.tagId = "bgContextMenu";
			this.bgContextMenuObj = contextMenuObj;
		}
		this.initIcon = function(){
			for(ci=0; ci<this.iconDataList.length; ci++){
				var tmpIcon = new Icon();
				tmpIcon.contextPath = this.contextPath;
				tmpIcon.guiName = this.guiName;
				tmpIcon.tableWrapTag = this.tableWrapTagArray;
				tmpIcon.init(this.iconDataList[ci]);
				this.iconCoordinate[tmpIcon.iconX+","+tmpIcon.iconY]=true;
				tmpIcon.view.iconTdBorderWidth = this.iconTdValueArray["iconTdBorderWidth"];
				tmpIcon.view.iconTdBorderHeight = this.iconTdValueArray["iconTdBorderHeight"];
				tmpIcon.view.getView();
				tmpIcon.appendIcon();
				this.iconArray[tmpIcon.tagId] = tmpIcon;
				this.iconArray[tmpIcon.name] = this.iconArray[tmpIcon.tagId];
				this.iconIdArray[this.iconIdArray.length] = tmpIcon.tagId;
			}
			this.iconTagIdRule = tmpIcon.tagIdRule;
		}
		this.reinitIcon = function(iconTdBorderWidth,iconTdBorderHeight){
			for(ci=0; ci<this.iconDataList.length; ci++){
				var tmpIcon = new Icon();
				tmpIcon.contextPath = this.contextPath;
				tmpIcon.guiName = this.guiName;
				tmpIcon.tableWrapTag = this.tableWrapTag;
				tmpIcon.init(this.iconDataList[ci]);
				tmpIcon.view.getView();
				tmpIcon.view.iconTdBorderWidth = iconTdBorderWidth;
				tmpIcon.view.iconTdBorderHeight = iconTdBorderHeight;
				tmpIcon.appendIcon();
			}
		}
		this.setIconTdValues = function(iconTdValueArray){
			this.iconTdValueArray = iconTdValueArray;
		}
		this.initTaskbar = function(){
			this.taskbar = new Taskbar();
			this.taskbar.contextPath = this.contextPath;
			this.taskbarTagId = "taskbar";
			this.taskbar.tagId = this.taskbarTagId;
			this.taskbar.bgTagArray = this.bgTagArray;
			this.taskbar.view.setTaskbarValues(this.taskbarValueArray);
			this.taskbar.appendTaskbar();
			this.taskbarTagArray = this.taskbar.view.taskbarTagArray;
		}
		this.setIconDataList = function(iconDataList){
			this.iconDataList = iconDataList;
		}
		this.setIconTableValues = function(iconTableValueArray){
			this.iconTableValueArray = iconTableValueArray;
		}
		this.setContextPath = function(contextPath){
			this.contextPath = contextPath;
		}
		this.setTaskbarValues = function(taskbarValueArray){
			this.taskbarValueArray = taskbarValueArray;
		}
		this.setWinCount = function(wincount){
			if(wincount != "")
				this.winCount = parseInt(winCount)
		}
		this.restoreWinAndBar = function(winAndBarJSON) {//windowList,barList,windowInBarList)
			if(winAndBarJSON != ""){
				winAndBarJSON = JSON.parse(winAndBarJSON);
				var winAndBarArray = winAndBarJSON["winAndBar"];
				if(winAndBarArray.length > 0){
					this.nodeArray["winAndBar"].winCount = this.winCount;
					this.nodeArray["winAndBar"].barCount = winAndBarArray.length;
					var tmpNode = new WinAndBarNode();
					this.gr.restoreNodes(winAndBarArray);
					this.gr.restoreWinOrder();
				}
				if(this.nodeArray["winAndBar"].barCount != 0)
					this.valueArray["newId"] = this.nodeArray["winAndBar"].lastBar.bar.numId+1;
				else
					this.valueArray["newId"] = 0;
			}
			/*
			var tmpNode = this.nodeArray["winAndBar"];
			
			while(tmpNode.nextBar instanceof WinAndBarNode){
				tmpNode = tmpNode.nextBar;
				console.log(tmpNode);
			}
			*/
			/*
			if(windowList[0] !== undefined && windowList[0]["numId"] !== undefined){
				var winLen = windowList.length;
				for(wi=0; wi<winLen; wi++){
					var winObj = this.wme.restoreWindow(windowList[wi]);
					this.wpe.restorePositioning(winObj);
				}
			}
			if(barList[0] !== undefined && barList[0]["wNumId"] !== undefined){
				var barLen = barList.length;
				for(bi=0; bi<barLen; bi++){
					var barObj = this.bme.restoreBar(barList[bi]);
				}
			}
			if(windowInBarList[0] !== undefined && windowInBarList[0]["numId"] !== undefined){
				var wBarLen = windowInBarList.length;
				for(wbi=0; wbi<wBarLen; wbi++){
					var winObj  = new Window();
					winObj.guiName = this.guiName;
					winObj.bgTag = this.bgTag;
					winObj.view.setDefaultValues(this.winDefaultValueArray);
					winObj.restoreModel(windowInBarList[wbi]);
					winObj.view.restoreView(windowInBarList[wbi]);
					if(winObj.numId >= this.winLastNumId){
						this.winLastNumId =  winObj.numId + 1;
					}
					this.windowInBarArray[winObj.bNumId] = winObj;
				}
			}
			*/
		}
		this.restoreForms = function(forms){
			if(forms != ""){
				$("#forms").html(decodeURIComponent(forms));
			}
		}
		this.iconTheme = function(iconThemeVals){
			var view = this.background.view; 
			var cls = new Icon().tagClass
			var imgCls = new Icon().imgClass
			var tmpWidth =  iconThemeVals["iconTdWidth"];
			var tmpHeight = iconThemeVals["iconTdHeight"];
			var tmpBWidth =  iconThemeVals["iconTdBorderWidth"];
			var tmpBHeight = iconThemeVals["iconTdBorderHeight"];
			var tmpColor = iconThemeVals["iconTdBorderColor"];
			
			view.tableTag.css("width",$(window).width()-view.iconTableLeftPadding);
			view.tableTag.css("height",(view.guiHeight-view.iconTableTopPadding)+"px");
			view.iconTdWidth = parseInt(tmpWidth);
			view.iconTdHeight = parseInt(tmpHeight);
			view.iconTdBorderWidth = parseInt(tmpBWidth);
			view.iconTdBorderHeight = parseInt(tmpBHeight);
			gui.background.resizeIconTd();
			$(".iconTd").css("border-left",(tmpBWidth)+"px solid "+tmpColor);
			$(".iconTd").css("border-right",(tmpBWidth)+"px solid "+tmpColor);
			$(".iconTd").css("border-top",(tmpBHeight)+"px solid "+tmpColor);
			$(".iconTd").css("border-bottom",(tmpBHeight)+"px solid "+tmpColor);
			
			for(ii=0; ii<gui.iconIdArray.length; ii++){
				$("#"+gui.iconIdArray[ii]).remove();
			}
			gui.reinitIcon(tmpBWidth,tmpBHeight);
			$("."+cls).css("width",tmpWidth);
			$("."+cls).css("height",tmpHeight);
			$("."+imgCls).css("width",tmpWidth);
			$("."+imgCls).css("height",tmpHeight);
		}
		this.changeIconTheme = function(tag){
			if (event.keyCode == 13 || event.type =="blur") {
				var iconThemeVals = [];	
				var input = $(tag).parent().find("input")
				iconThemeVals["iconTdWidth"] =  $(input[1]).val();
				iconThemeVals["iconTdHeight"] = $(input[2]).val();
				iconThemeVals["iconTdBorderWidth"] = $(input[3]).val();
				iconThemeVals["iconTdBorderHeight"] = $(input[4]).val();
				iconThemeVals["iconTdBorderColor"] = $(input[5]).val();
				this.iconTheme(iconThemeVals);
			}
		}
		this.restoreIconTheme = function(){
			this.iconTheme(this.iconTdValueArray);
		}
		this.resetIconTheme = function(){
			var input = $("#iconThemeForm0").parent().find("input");
			this.iconTdValueArray["iconTdWidth"] =  $(input[1]).val();
			this.iconTdValueArray["iconTdHeight"] = $(input[2]).val();
			this.iconTdValueArray["iconTdBorderWidth"] = $(input[3]).val();
			this.iconTdValueArray["iconTdBorderHeight"] = $(input[4]).val();
			this.iconTdValueArray["iconTdBorderColor"] = $(input[5]).val();
		}
	}
