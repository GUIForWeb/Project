	function WebGUIWS(ip){
		this.ws = new WebSocket("ws://"+ip+"/WebGUI/ws");
		this.ws.onopen = function(message){ 
			console.log("open");
		};
		this.ws.onmessage = function(message){
			if(message.isTrusted){
				if(message.data == "error"){
					location.reload();
				}
				else {
					var json = JSON.parse(message.data);
					if(json.receiving !== undefined){
						json = json.receiving;
						eval(json.app+".onMessage("+JSON.stringify(json.data)+")");
						if(gui.ws.prevHTML != gui.ws.contentTagArray.html()){
							gui.gr.updateContent(gui.ws.win);
						}
					}
				}
			}
		};
		this.ws.onclose = function(message){ 
			console.log("close");
		};
		this.ws.onerror = function(message){
			console.log("error");
		};
		this.send = function(json) {
			var be = {};
			if(json !== undefined){
				be.sending = json;
				if(be.sending.app != "system.controller.GUIRepository"){
					this.win = gui.nodeArray.winAndBar.lastWin.win;
					this.contentTagArray = gui.nodeArray.winAndBar.lastWin.win.view.contentTagArray;
					this.prevHTML = this.contentTagArray.html();
				}
				this.ws.send(JSON.stringify(be));
			}
		}
	}