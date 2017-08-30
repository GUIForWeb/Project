function FileBrowserContextMenuView(contextMenuModel){
	this.__proto__ = contextMenuModel;
	this.outerLayerTagClass = "fbContextMenuOuterLayer";
	this.contentLayerTagClass = "fbContextMenuContentLayer";
	this.contentPath = "";
	this.contextMenuLayer = function(){
		this.outerTag.append(this.contentTag);
		this.contextMenuTag = this.outerTag;
	}
	this.outerLayer = function(){
		var tmpTag = $("<div></div>");
		tmpTag.attr("id","fbContextMenu"+this.fb.id);
		tmpTag.css("z-index", this.zIndex);
		tmpTag.css("position","absolute");
		if(this.isInWindow)
			tmpTag.offset({
				left:event.clientX - this.bgTag.offset().left,
				top:event.clientY - this.bgTag.offset().top
			});
		else
			tmpTag.offset({
				left:event.clientX,
				top:event.clientY
			});
		tmpTag.addClass(this.outerLayerTagClass);
		this.outerTag = tmpTag;
	}
	this.contentLayer = function(){
		//var form = new Form();
		//form.submit("contextMenu",this.contentPath);
		//form.getData(this.contextPath+"/"+this.contentPath);
		var tmpTag = $("<div></div>");
		var ulTag = $("<ul></ul>");
		var newFolderTag = $("<li>New Folder</li>");
		var renameTag = $("<li>Rename</li>");
		var copyTag = $("<li>Copy</li>");
		var cutTag = $("<li>Cut</li>");
		var pasteTag = $("<li>Paste</li>");
		var deleteTag = $("<li>Delete</li>");
		var downloadTag = $("<li>Download</li>");
		newFolderTag.click({"id":this.fb.id},function(event){
			taskArray["fileBrowser"][event.data.id].click.newFolder(event);
		});
		renameTag.click({"id":this.fb.id},function(event){
			taskArray["fileBrowser"][event.data.id].click.rename(event);
		});
		deleteTag.click({"id":this.fb.id},function(event){
			taskArray["fileBrowser"][event.data.id].click.del(event);
		});
		downloadTag.click({"id":this.fb.id},function(event){
			taskArray["fileBrowser"][event.data.id].click.downlaod(event);
		});
		//rename.attr("onclick","system['fileBrowser']["+this.fb.id+"].click.rename(this)");
		//newFolderTag.attr("onclick","system['fileBrowser']["+this.fb.id+"].click.newFolder()");
		//copyTag.attr("onclick","system['fileBrowser']["+this.fb.id+"].click.copy()");
		//cutTag.attr("onclick","system['fileBrowser']["+this.fb.id+"].click.cut()");
		//pasteTag.attr("onclick","system['fileBrowser']["+this.fb.id+"].click.paste()");
		//deleteTag.attr("onclick","system['fileBrowser']["+this.fb.id+"].click.del()");
		//downloadTag.attr("onclick","system['fileBrowser']["+this.fb.id+"].click.downlaod()");
		
		tmpTag.append(ulTag);
		ulTag.append(newFolderTag);
		ulTag.append(renameTag);
		ulTag.append(copyTag);
		ulTag.append(cutTag);
		ulTag.append(pasteTag);
		ulTag.append(deleteTag);
		ulTag.append(downloadTag);
		tmpTag.addClass(this.contentLayerTagClass);
		this.contentTag = tmpTag;
	}
	this.getView = function(){
		this.contentLayer();
		this.outerLayer();
		this.contextMenuLayer();
	}
}
