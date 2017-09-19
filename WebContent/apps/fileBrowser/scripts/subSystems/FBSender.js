fileBrowser.subsystem.FBSender = function() {
	this.isNotInWindow = function() {
		this.json.data = {"status" : "isNotInWindow"}
		this.json.data.data = {"id" : this.id};
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
			"data" : this.va["selectedData"]
		};
		var req = new XMLHttpRequest();
		req.open("POST", "/WebGUI/fileJSP", true);
		req.setRequestHeader("Content-type",
				"application/x-www-form-urlencoded");
		req.onload = function() {
			if (req.readyState == 4 && req.status == 200) {
				window.open(req.response, "_blank")
			}
		}
		req.send("json=" + JSON.stringify(this.json));
	}
	this.upload = function() {
		this.status.infoHtml("Status");
		this.status.detailHtml("Uploading...");
		var files = this.va["selectedData"];
		for (i = 0; i < files.length; i++) {
			var reader = new FileReader();
			reader.onload = (function(file, fws, id) {
				return function(event) {
					console.log(file)
					var json = {
						"status" : "fileUpload",
						"id" : id,
						"name" : file.name,
						"size" : file.size
					};
					fws.send(JSON.stringify(json));
					fws.byteLength = this.result.byteLength;
					fws.send(this.result);
					json = {
						"status" : "end"
					};
					fws.send(JSON.stringify(json));
				}
			})(files[i], this.fws, this.id);
			reader.readAsArrayBuffer(files[i], this.fws, this.id);
		}
	}
	this.x = function() {
		this.json.data = {
			"status" : "x",
			"data" : {
				"id" : this.id
			}
		};
		this.ws.send(this.json);
	}
	this.open = function() {
		this.json.data = {
			"status" : "open",
			"data" : {
				"id" : this.id,
				"name" : this.va["selectedData"][0].name,
				"type" : this.va["selectedData"][0].type
			}
		};
		this.ws.send(this.json);
	}
	this.newFolder = function() {
		this.json.data = {
			"status" : "newFolder",
			"data" : {
				"id" : this.id
			}
		};
		this.ws.send(this.json);
	}
	this.rename = function() {
		this.json.data = {
			"status" : "rename",
			"data" : {
				"id" : this.id,
				"src" : this.va["prevData"][0].name,
				"dest" : this.va["selectedData"][0].name
			}
		};
		this.ws.send(this.json);
	}
	this.del = function() {
		this.json.data = {
			"status" : "del",
			"data" : {
				"id" : this.id,
				"data" : this.va["selectedData"]
			}
		};
		this.ws.send(this.json);
	}
	this.cut = function() {
		this.json.data = {
			"status" : "cut",
			"data" : {
				"id" : this.id,
				"data" : this.va["selectedData"]
			}
		};
		this.ws.send(this.json);
		this.va["selectedData"] = [];
		this.pasteFlag = true;
	}
	this.copy = function() {
		this.json.data = {
			"status" : "copy",
			"data" : {
				"id" : this.id,
				"data" : this.va["selectedData"]
			}
		};
		this.ws.send(this.json);
		this.va["selectedData"] = [];
		this.pasteFlag = true;
	}
	this.paste = function() {
		if(this.pasteFlag){
			this.json.data = {
				"status" : "paste",
				"data" : {
					"id" : this.id
				}
			};
			this.ws.send(this.json);
			this.pasteFlag = false;
		}
	}
}