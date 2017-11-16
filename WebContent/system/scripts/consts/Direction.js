system.consts.Direction = (function() {
	this._Object = function() {
		Object.defineProperty(this,"HORIZONTAL",{
			get: function() { return 0; }
		});
		Object.defineProperty(this,"VERTICAL",{
			get: function() { return 1; }
		});
		Object.defineProperty(this,"NEWS",{
			get: function() { return 2; }
		});
	}
	return {
		newInstance : function(){
			Direction = new _Object();
		}
	};
})();