fileBrowser.subsystems.FBReceiver = function() {
	this.byteCount = function(json) {
		var bLen = this.ws.byteLength;
		var bCnt = json;
		this.status.infoHtml("Upload");
		var gLen = bCnt/bLen*100
		this.status.detailGraph(gLen,parseInt(gLen)+"%");
	}
	this.reload = function(json) {
		this.va["data"] = json;
		this.fs.display();
		this.appendFunctionForTable();
	}
	this.displayData = function(idx, ids, data){
		taskArray["fileBrowser"][ids[idx]].controller.va["data"] = data;
		taskArray["fileBrowser"][ids[idx]].fs.display();
		taskArray["fileBrowser"][ids[idx]].appendFunctionForTable();
	}
	this.multiReloadForUpload = function(json){
		for(ii=0; ii<json.id.length; ii++){
			this.displayData(ii, json.id, json.data);
		}
		var status = this.status;
		this.status.detailGraph(100,100+"%");
		setTimeout(function() {
			status.infoHtml("Status");
			status.detailHtml("Upload done");
        }, 500 );
		setTimeout(function() {
			status.detailHtml("");
        }, 1000 );
	}
	this.multiReload = function(json){
		for(ii=0; ii<json.id.length; ii++){
			this.displayData(ii, json.id, json.data);
		}
	}
	this.multiplexReload = function(json){
		for(ji=0; ji<json.length; ji++){
			var id = json[ji].id;
			var data = json[ji].data;
			for(ii=0; ii<id.length; ii++){
				this.displayData(ii, id, data);
			}
		}
	}
	this.download = function(json) {
		var a = document.createElement('A');
		//"attachment/file"
		var blob = new Blob([new Uint8Array(json.data)],{type: "attachment/file"});
		var reader = new FileReader();
		var view = document;
		var name = json.name;
		reader.onloadend = function(){
			window.location.href = this.result;
		};
		reader.readAsDataURL(blob);
	}
}