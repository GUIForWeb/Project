function Drop(){
	this.fileItem = function(event){
		if(!this.ds.isWorking && this.va["dropable"] && this.va["fileItem"]){
			this.fbm.send.paste();
			this.va["dropable"] = false;
			this.va["fileItem"] = false;
		}
		else if(this.va["dropable"] && event.originalEvent.dataTransfer.files.length != 0){
			event.preventDefault();
			var files = event.originalEvent.dataTransfer.files;
			for(i=0; i<files.length; i++){
				var reader = new FileReader();
				
				reader.onload = (function(file,fs,id){
					return function(event){
						var json = {"status":"fileUload","id":id,"name":file.name};
						fs.send(JSON.stringify(json));
						fs.byteLength = this.result.byteLength;
						fs.send(this.result);
						json = {"status":"end"};
						fs.send(JSON.stringify(json));
					}
				})(files[i],this.fs,this.id);
				reader.readAsArrayBuffer(files[i],this.fs,this.id);
				
				/*
				var id = this.id;
				var fs = this.fs;
				reader.readAsArrayBuffer(files[i]);
				$(reader).on("loadend",function(){
					console.log(id);
					console.log(fs);
					console.log(reader.result);
				});
				*/
			}
			this.va["dropable"] = false;
		}
	}
}