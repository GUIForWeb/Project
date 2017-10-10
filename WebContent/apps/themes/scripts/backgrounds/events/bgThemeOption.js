if(this.va["data"][i]["type"] == "image/jpeg"){
	tmpTr.css("color","green");
	tmpTr.dblclick(function(event){
		taskArray["bgTheme"].dblclick.imgFile(event);
	});
	this.isDisplayed = true;
}
else
	this.isDisplayed = false;
