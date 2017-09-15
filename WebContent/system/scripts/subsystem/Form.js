guiLib.subsystem.Form = function() {
	this.submit = function(status, param) {
		var input = $("#backgroundForm").find("input");
		input[1].value = status;
		input[2].value = param;
		input[3].click();
	}
	this.getData = function(address) {
		var xhr = new XMLHttpRequest();
		xhr.open("POST", address, false);
		xhr.send();
		return xhr.responseText;
	}
	this.setFunction = function(innerHTML, topic) {
		var tag = $(innerHTML);
		tag.find("button").attr("onclick", this.guiName + ".wListener.call();");
		tag.find("input[type='text']").attr(
				"onkeydown",
				this.guiName + ".change" + this.nameStandart(topic)
						+ "Theme(this)").attr(
				"onfocusout",
				this.guiName + ".change" + this.nameStandart(topic)
						+ "Theme(this)");
		return tag;
	}
	this.nameStandart = function(name) {
		return name.charAt(0).toUpperCase() + name.slice(1);
	}
}