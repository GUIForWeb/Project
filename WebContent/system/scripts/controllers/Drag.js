	function Drag(){
		this.oLeft = 0;
		this.oTop = 0;
		this.forMovement = {
				preX : "noValue",
				preY : "noValue",
				subX : "noValue",
				subY : "noValue"
		}
		this.head = function (tag){
			this.outerLayer(tag.parentNode.parentNode);
		}
		this.icon = function (tag){
			this.outerLayer(tag);
		}
		this.outerLayer = function (tag){
			var gapX;
			var gapY;
			
			oLeft = tag.offsetLeft;
			oTop = tag.offsetTop;
			if (this.forMovement.preX == "noValue") {
				this.forMovement.preX = event.clientX;
				this.forMovement.preY = event.clientY;
				return 0;
			} else {
				this.forMovement.subX = event.clientX;
				this.forMovement.subY = event.clientY;
				gapX = this.forMovement.subX - this.forMovement.preX;
				gapY = this.forMovement.subY - this.forMovement.preY;
				if (gapX > 50 || gapY > 50) {
					gapX = 1;
					gapY = 1;
				} else if (gapX < -50 || gapY < -50) {
					gapX = -1;
					gapY = -1;
				}
		
				window.scrollTo(oLeft, oTop);
				oLeft = oLeft + (parseInt(gapX) * 2);
				oTop = oTop + (parseInt(gapY) * 2);
		
				$(tag).css("left",oLeft + "px");
				$(tag).css("top",oTop + "px");
		
				if (oLeft <= 0) {
					$(tag).css("left","10px");
					oLeft = 10;
				} else if (oTop <= 0) {
					$(tag).css("top","10px");
					oTop = 10;
				}
				this.forMovement = {
					preX : "noValue",
					preY : "noValue",
					subX : "noValue",
					subY : "noValue"
				}
				return 0;
			}
		}
	} 