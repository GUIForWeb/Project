function Drop(){
	this.fileItem = function(event){
		console.log(this.va["dropable"]);
		if(!this.ds.isWorking && this.va["dropable"]){
			this.fbm.send.paste();
			this.va["dropable"] = false;
			//event.preventDefault();
		}
		/*
		event.preventDefault();
		if(event.dataTransfer.files.length != 0){
			var form = $("#fileBrowserForm1");
			var input = $(form[0]).children("input");
			input[1].value = this.id;
			$(input[2]).prop("files",event.dataTransfer.files);
		}
		else {
			this.clipboard = this.id;
			this.submit("drop",this.clipboard);
		}
		*/
	}
}