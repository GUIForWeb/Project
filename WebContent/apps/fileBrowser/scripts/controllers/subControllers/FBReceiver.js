function FBReceiver() {
	this.command = function(){
		switch(this.json.status) {
	    case "open":
	        this.open();
	        break;
		}
	}
	this.open = function() {
		this.data = this.json.data;
		this.display();
	}
}