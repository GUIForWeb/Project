	function GUIRepository(){
		this.winArray = [];
		this.winAndBarJSON = {"win":{},"bar":{}}
		this.xWinAndBar = function(winAndBarNode){
			var data = winAndBarNode.win.view.zIndex+"&"+winAndBarNode.bar.view.position;
			this.form.submit("xWinAndBar",data);
		}
		this.disappear = function(winId){
			this.form.submit("disappear",winId);
		}
		this.appear = function(barId){
			this.form.submit("appear",barId);
		}
		this.pack = function(winAndBarNode){
			this.winToJSON(winAndBarNode.win);
			this.barToJSON(winAndBarNode.bar);
			this.winAndBarJSON.win = this.winJSON;
			this.winAndBarJSON.bar = this.barJSON;
		}
		this.moveWinToTop = function(zIndex){
			this.form.submit("moveWinToTop",zIndex);
		}
		this.newWinAndBar = function(winAndBarNode){
			this.pack(winAndBarNode);
			this.form.submit("newWinAndBar",JSON.stringify(this.winAndBarJSON));
		}
		
		this.winToJSON = function(win){
			var content = win.view.contentTagArray.html();
			content = encodeURIComponent(content);
			content = content.replace(/'/g, "%27");
			this.winJSON = {
				"fullScreen": win.fullScreen,
				"onScreen": win.onScreen,
				"numId": win.numId,
				"name": win.name,
				"content": content,
				"oWidth": parseInt(win.view.oWidth),
				"oHeight": parseInt(win.view.oHeight),
				"oLeft": parseInt(win.view.oLeft),
				"oTop": parseInt(win.view.oTop),
				"preOWidth": parseInt(win.view.preOWidth),
				"preOHeight": parseInt(win.view.preOHeight),
				"preOLeft": parseInt(win.view.preOLeft),
				"preOTop": parseInt(win.view.preOTop),
				"zIndex": win.view.zIndex
			};
		}
		
		this.barToJSON = function(bar){
			this.barJSON = {
				"numId": bar.numId,
				"name": bar.name,
				"position": bar.view.position
			};
		}
		
		this.restoreNodes = function(winAndBarArray){
			for(i=0; i<winAndBarArray.length; i++){
				var winAndBarMap = winAndBarArray[i]
				var winAndBarNode = new WinAndBarNode();
				winAndBarNode.bar = this.restoreBar(winAndBarMap["bar"]);
				winAndBarNode.win = this.restoreWin(winAndBarMap["win"]);
				console.log(this.nodeArray["winAndBar"].winCount)
				if(winAndBarMap["win"]["onScreen"]){
					this.winArray[winAndBarMap["win"]["zIndex"]] = winAndBarNode;
				}
				this.nm.addBarNode(winAndBarNode);
			}
		}
		this.restoreWinOrder = function(){
			var tmpNode = this.nodeArray["winAndBar"];
			for(wi=0; wi<this.winArray.length; wi++){
				tmpNode.nextWin = this.winArray[wi];
				this.winArray[wi].prevWin = tmpNode;
				tmpNode = this.winArray[wi];
				this.pe.append(tmpNode);
			}
			this.nodeArray["winAndBar"].lastWin = tmpNode;
		}
		this.restoreWin = function(winMap){
			var win = new Window();
			win.guiName = this.guiName;
			win.bgTagArray = this.bgTagArray;
			win.view.setDefaultValues(this.winDefaultValueArray);
			win.init(winMap["numId"]);
			win.restoreModel(winMap);
			win.view.restoreView(winMap);
			win.appendWindow();
			return win;
		}
		
		this.restoreBar = function(barMap){
			var bar  = new Bar();
			bar.guiName = this.guiName;
			bar.bgTagArray = this.bgTagArray;
			bar.taskbarTagArray = this.taskbarTagArray;
			bar.view.taskbarOHeight = this.taskbar.view.oHeight;
			bar.init(barMap["numId"],barMap["position"]);
			bar.restoreModel(barMap);
			bar.appendBar();
			return bar;
		}
	}