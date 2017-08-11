	function Resizeend(){
		this.window = function(tag){
			this.wse.setSize(tag);
			/*
			var winObj = this.wse.setSize(tag);
			this.windowListener.call("resize",winObj);
			*/
		}
	}