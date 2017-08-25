function FBReceiver() {
	this.open = function(json) {
		this.data = json;
		this.display();
	}
}