function FBReceiver() {
	this.byteCount = function(json) {
		var bLen = this.fws.byteLength;
		var bCnt = json.byteCount;
		this.status.infoHtml("Upload");
		var gLen = bCnt/bLen*100
		this.status.detailGraph(gLen,parseInt(gLen)+"%");
	}
	this.reload = function(json) {
		this.fs.data = json;
		this.fs.reference();
		this.appendFunction();
	}
	this.multiReloadForUpload = function(json){
		var id = json.id;
		var data = json.data;
		for(ii=0; ii<id.length; ii++){
			taskArray["fileBrowser"][id[ii]].fs.data = data;
			taskArray["fileBrowser"][id[ii]].fs.reference();
			taskArray["fileBrowser"][id[ii]].appendFunction();
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
		var id = json.id;
		var data = json.data;
		for(ii=0; ii<id.length; ii++){
			taskArray["fileBrowser"][id[ii]].fs.data = data;
			taskArray["fileBrowser"][id[ii]].fs.reference();
			taskArray["fileBrowser"][id[ii]].appendFunction();
		}
	}
	this.multiplexReload = function(json){
		for(ji=0; ji<json.length; ji++){
			var id = json[ji].id;
			var data = json[ji].data;
			for(ii=0; ii<id.length; ii++){
				taskArray["fileBrowser"][id[ii]].fs.data = data;
				taskArray["fileBrowser"][id[ii]].fs.reference();
				taskArray["fileBrowser"][id[ii]].appendFunction();
			}
		}
	}
	this.download = function(json) {
		console.log(json);
		console.log(json.data.byteLength);
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