function Drop(){
	this.fileItem = function(tag,event){
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
	}
}