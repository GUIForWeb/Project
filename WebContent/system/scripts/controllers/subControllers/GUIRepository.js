	function GUIRepository(ws){
		this.winArray = [];
		this.json = {"app":"system.controller.GUIRepository","data":{}}
		this.ws = ws;
		this.ws.onopen = function(message){ 
			console.log("open");
		};
		this.ws.onmessage = function(message){
			if(message.isTrusted){
				if(message.data == "error"){
					location.reload();
				}
			}
		};
		this.ws.onclose = function(message){ 
			console.log("close");
		};
		this.ws.onerror = function(message){
			console.log("error");
		};
		
		this.appear = function(numId){
			this.json.data = {"status":"appear","numId":numId}
			this.ws.send(JSON.stringify(this.json));
		}
		this.disappear = function(zIndex){
			this.json.data = {"status":"disappear","zIndex":zIndex}
			this.ws.send(JSON.stringify(this.json));
		}
		this.xWinAndBar = function(winAndBarNode){
			this.json.data = {"status":"xWinAndBar","zIndex":winAndBarNode.win.view.zIndex,"position":winAndBarNode.bar.view.position}
			this.ws.send(JSON.stringify(this.json));
		}
		this.newWinAndBar = function(winAndBarNode){
			this.json.data = {"status":"","win":{},"bar":{}}
			this.pack(winAndBarNode);
			this.json.data.status = "newWinAndBar";
			console.log(this.json);
			this.ws.send(JSON.stringify(this.json));
		}
		this.moveWinToTop = function(zIndex){
			this.json.data = {"status":"moveWinToTop","zIndex":zIndex}
			this.ws.send(JSON.stringify(this.json));
		}
		
		this.pack = function(winAndBarNode){
			this.winToJSON(winAndBarNode.win);
			this.barToJSON(winAndBarNode.bar);
			this.json.data.win = this.winJSON;
			this.json.data.bar = this.barJSON;
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
			for(wbi=0; wbi<winAndBarArray.length; wbi++){
				var winAndBarMap = winAndBarArray[wbi]
				var winAndBarNode = new WinAndBarNode();
				winAndBarNode.bar = this.restoreBar(winAndBarMap["bar"]);
				winAndBarNode.win = this.restoreWin(winAndBarMap["win"]);
				if(winAndBarMap["win"]["onScreen"]){
					this.winArray[winAndBarMap["win"]["zIndex"]] = winAndBarNode;
				}
				this.nm.addBarNode(winAndBarNode);
			}
		}
		this.restoreWinOrder = function(){
			var tmpNode = this.nodeArray["winAndBar"];
			console.log(this.winArray);
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