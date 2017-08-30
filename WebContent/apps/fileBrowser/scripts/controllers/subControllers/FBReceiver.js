function FBReceiver() {
	this.reload = function(json) {
		this.data = json;
		this.display();
		this.appendFunction();
	}
}