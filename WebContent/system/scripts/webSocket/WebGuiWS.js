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
				this.ws.send(JSON.stringify(be));
			}
		}
	}