	function WebGUIWS(ip){
		this.socket = new WebSocket("ws://"+ip+"/WebGUI/ws");
		this.socket.onopen = function(message){ 
			console.log("ws-open");
		};
		this.onmessage = function(message){
			this.socket.onmessage(message);
		}
		this.socket.onmessage = function(message){
			if(message.isTrusted){
				if(message.data == "ws-error"){
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
		this.socket.onclose = function(message){ 
			console.log("ws-close");
		};
		this.socket.onerror = function(message){
			console.log("ws-error");
		};
		this.send = function(data) {
			var be = {};
			if(data != "object"){
				be.sending = data;
				this.socket.send(JSON.stringify(be));
			}
		}
		this.connect = function(){
			gui.ws = new WebGUIWS(ip);
		}
		this.close = function(){
			this.socket.onclose();
			this.socket.onclose = null;
			this.socket.close();
		}
	}