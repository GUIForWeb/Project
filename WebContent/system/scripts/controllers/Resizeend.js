	function Resizeend(){
		this.window = function(tag){
			var winObj = this.wse.setSize(tag);
			this.windowListener.call("resize",winObj);
		}
	}