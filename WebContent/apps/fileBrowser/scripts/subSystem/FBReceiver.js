function FBReceiver() {
	this.byteCount = function(json) {
		var bLen = this.fs.byteLength;
		var bCnt = json.byteCount;
		console.log(bCnt/bLen*100);
	}
	this.reload = function(json) {
		this.data = json;
		this.display();
		this.appendFunction();
	}
	this.multiReloadForUpload = function(json){
		var id = json.id;
		var data = json.data;
		for(ii=0; ii<id.length; ii++){
			taskArray["fileBrowser"][id[ii]].data = data;
			taskArray["fileBrowser"][id[ii]].display();
			taskArray["fileBrowser"][id[ii]].appendFunction();
		}
		console.log(100);
	}
	this.multiReload = function(json){
		var id = json.id;
		var data = json.data;
		for(ii=0; ii<id.length; ii++){
			taskArray["fileBrowser"][id[ii]].data = data;
			taskArray["fileBrowser"][id[ii]].display();
			taskArray["fileBrowser"][id[ii]].appendFunction();
		}
	}
	this.multiplexReload = function(json){
		for(ji=0; ji<json.length; ji++){
			var id = json[ji].id;
			var data = json[ji].data;
			for(ii=0; ii<id.length; ii++){
				taskArray["fileBrowser"][id[ii]].data = data;
				taskArray["fileBrowser"][id[ii]].display();
				taskArray["fileBrowser"][id[ii]].appendFunction();
			}
		}
	}
	this.download = function(json) {
		//event.stopPropagation();
		var uri = "";
		var a = [];
		var ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/);
		for(di=0; di<json.length; di++){
			if(ie11 == null){
				uri = "data:application/octet-stream;base64," + json[di].data;
				a[di] = document.createElement('A');
				a[di].href = uri;
				a[di].download = json[di].name;
				a[di].target="_blank"
				document.body.appendChild(a[di]);
				a[di].click();
				document.body.removeChild(a[di]);
			}
			else{
				var byteCharacters = atob(json[di].data);
				var byteNumbers = new Array(byteCharacters.length);
				for (var i = 0; i < byteCharacters.length; i++) {
			        byteNumbers[i] = byteCharacters.charCodeAt(i);
			    }
				var byteArray = new Uint8Array(byteNumbers);
				var dataAsBlob = new Blob([byteArray],{type:"application/octet-stream"});
				window.navigator.msSaveBlob(dataAsBlob,json[di].name);
			}
		}
		
	}
	this.saveAs = function(uri, filename) {
	    var link = document.createElement('a');
	    if (typeof link.download === 'string') {
	        document.body.appendChild(link); // Firefox requires the link to be in the body
	        link.download = filename;
	        link.href = uri;
	        link.click();
	        document.body.removeChild(link); // remove the link when done
	    } else {
	        location.replace(uri);
	    }
	}
}