if(this.va["data"][i]["type"] == "image/jpeg"){
	tmpTr.css("color","green");
	this.isDisplayed = true;
}
else if(this.va["data"][i]["type"] != "inode/directory"){
	this.isDisplayed = false;
    delete this.va["data"][i];
}
