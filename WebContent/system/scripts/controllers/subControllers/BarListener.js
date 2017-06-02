	function BarListener(){
		var bar = [];
		this.call = function(status,barObj){
			var bLen =  this.bme.barLen(); //  this.barArray.length;
			var param = "";
			param += "windowOnScreen="+barObj.windowOnScreen+"&";
			param += "numId="+barObj.numId+"&";
			param += "wNumId="+barObj.wNumId+"&";
			param += "name="+barObj.name+"&";
			param = param.substring(0, param.length-1);
			this.form.submit(status,param);
		}
	}