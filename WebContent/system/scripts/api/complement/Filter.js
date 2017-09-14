function Filter(){
	this.init = function(){
		return this.va["a"].filter(function( element ) {
			   return element !== undefined;
		});
	}
}
