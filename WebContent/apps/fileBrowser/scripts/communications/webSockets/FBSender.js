apps.fileBrowser.communications.webSockets.FBSender = function() {
	this.isNotInWindow = function() {
		this.json.data = {
				"status" : "isNotInWindow",
				"id" : this.id
		}
		var data = this.json;
		this.ws.onopen(function(){
			var be = {};
			be.sending = data; 
			this.send(JSON.stringify(be));
		});
	}
	this.download = function() {
		this.json = {
			"id" : this.id,
			"subject": 1,
			"data" : this.va["selectedData"]
		}
		var req = new XMLHttpRequest();
		req.open("POST", "/WebGUI/fileJSP", true);
		req.setRequestHeader("Content-type",
				"application/x-www-form-urlencoded");
		req.onload = function() {
			if (req.readyState == 4 && req.status == 200) {
				var json = JSON.parse(req.response);
				var times = json.times;
				var url = json.url;
				var tmpURL = null;
				for(ti=0; ti<times.length; ti++){
					tmpURL = url+"?data="+times[ti].time;
					window.open(tmpURL, "_blank")
				}
			}
		}
		req.send("json=" + JSON.stringify(this.json));
		this.va["selectedData"] = [];
	}
	this.upload = function() {
		this.status.infoHtml("Status");
		this.status.detailHtml("Uploading...");
		var files = this.va["selectedData"];
		for (i = 0; i < files.length; i++) {
			var reader = new FileReader();
			reader.onload = (function(json, file, ws, id) {
				return function(event) {
					json.data = {
						"status" : "uploadStart",
						"id" : id,
						"name" : file.name,
						"size" : file.size
					};
					ws.send(json);
					
					json.data = this.result;
					ws.byteLength = this.result.byteLength;
					ws.send(json);
					json.data = {
						"status" : "uploadDone",
						"id" : id
					};
					ws.send(json);
				}
			})(this.json, files[i], this.ws, this.id);
			reader.readAsArrayBuffer(files[i], this.ws, this.id);
		}
	}
	this.x = function() {
		this.json.data = {
			"status" : "x",
			"id" : this.id
		}
		this.ws.send(this.json);
	}
	this.open = function() {
		this.json.data = {
			"status" : "open",
			"id" : this.id,
			"name" : this.va["selectedData"][0].name,
			"type" : this.va["selectedData"][0].type
		}
		this.ws.send(this.json);
	}
	this.newFolder = function() {
		this.json.data = {
			"status" : "newFolder",
			"id" : this.id
		}
		this.ws.send(this.json);
	}
	this.rename = function() {
		this.json.data = {
			"status" : "rename",
			"id" : this.id,
			"src" : this.va["prevData"][0].name,
			"dest" : this.va["selectedData"][0].name
		}
		this.ws.send(this.json);
	}
	this.del = function() {
		this.json.data = {
			"status" : "del",
			"id" : this.id,
			"data" : this.va["selectedData"]
		}
		this.ws.send(this.json);
	}
	this.cut = function() {
		this.json.data = {
			"status" : "cut",
			"id" : this.id,
			"data" : this.va["selectedData"]
		}
		this.ws.send(this.json);
		this.va["selectedData"] = [];
	}
	this.copy = function() {
		this.json.data = {
			"status" : "copy",
			"id" : this.id,
			"data" : this.va["selectedData"]
		}
		this.ws.send(this.json);
		this.va["selectedData"] = [];
	}
	this.share = function() {
		this.json.data = {
			"status" : "share",
			"id" : this.id,
			"data" : this.va["selectedData"]
		}
		this.ws.send(this.json);
		this.va["selectedData"] = [];
	}
	this.paste = function() {
		this.json.data = {
			"status" : "paste",
			"id" : this.id
		}
		this.ws.send(this.json);
		this.va["pasteFlag"] = false;
	}
	this.pasteToDesktop = function() {
		console.log("Yo")
		this.json.data = {
			"status" : "pasteToDesktop",
			"id" : this.id
		}
		this.ws.send(this.json);
		this.va["pasteFlag"] = false;
	}

}