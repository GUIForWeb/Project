function FBReceiver() {
	this.reload = function(json) {
		this.data = json;
		this.display();
		this.appendFunction();
	}
	this.download = function(json) {
		//event.stopPropagation();
		var uri = "";
		var a = [];
		var ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/);
		console.log(ie11);
		console.log(navigator.userAgent);
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