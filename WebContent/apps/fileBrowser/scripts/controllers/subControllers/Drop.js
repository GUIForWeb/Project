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
						var json = {"id":id,"name":file.name};
						fs.send(JSON.stringify(json));
						console.log("Yo");
						fs.send(this.result);
						fs.send("?end");
					}
				})(files[i],this.fs,this.id);
				reader.readAsArrayBuffer(files[i],this.fs,this.id);
			}
			this.va["dropable"] = false;
		}
	}
}