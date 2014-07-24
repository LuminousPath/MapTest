function Map(viewingBox){
	var m = this;
	m.viewingBox = viewingBox;
	m.viewingBox.css("overflow", "hidden");
	m.mouseDown = false;
	m.lastPosition = new Point();
	
	m.viewingBox.append('<div class="innerMap"></div>');
	m.outerMap = $("div.viewingBox");
	m.innerMap = $("div.innerMap");
	
	m.innerMap.append('<img id="image" src=page0001.jpg />');
	
	var img = document.getElementById('image');
	
	var totalWidth = 0;
	var totalHeight = 0;
	
	img.onload = function() {
		var height = img.clientHeight;
		var width = img.clientWidth;
		totalWidth = width;
		totalHeight = height;
	}
	
	/*for(var i = 0; i < height; i++) {
		m.innerMap.append('<div class="mapRow"></div>');
		var currentRow = $("div.mapRow:last");
		for(var j = 0; j < width; j++) {
			currentRow.append('<span class="mapTile"></span>');
		}
	}*/
	
	//$("div.mapRow").css({"width" : totalWidth + "px"});
	
	m.viewingBox.mousedown(function(event) {
		m.mouseDown = true;
		m.lastPosition.x = event.pageX;
		m.lastPosition.y = event.pageY;
	});
	m.viewingBox.mouseup( function(event) {
		m.mouseDown = false;
	});
	m.viewingBox.mouseleave( function(event) {
		m.mouseDown = false;
	});
	
	m.viewingBox.mousemove( function(event) {
		if(m.mouseDown) {
			var dx = event.pageX - m.lastPosition.x;
			var dy = event.pageY - m.lastPosition.y;
			
			var pos = m.innerMap.position();
			var pos2 = m.outerMap.position();
			pos.right = pos.left + totalWidth;
			pos.bottom = pos.top + totalHeight;
			pos2.right = m.outerMap.innerWidth();
			pos2.bottom = m.outerMap.innerHeight();
			
			if(pos.left <= 0 && pos.right >= pos2.right){
				pos.left += dx;
			}
			else if(pos.left > 0){
				pos.left = 0;
			}
			else if(pos.right < pos2.right){
				pos.left = pos2.right - totalWidth;
			}
			
			if(pos.top <= 0 && pos.bottom >= pos2.bottom){
				pos.top += dy;
			}
			else if(pos.top > 0){
				pos.top = 0;
			}
			else if(pos.bottom < pos2.bottom){
				pos.top = pos2.bottom - totalHeight
			}
			
			m.innerMap.css({
				"left" : (pos.left) + "px",
				"top" : (pos.top) + "px"
			});
			
			m.lastPosition.x = event.pageX;
			m.lastPosition.y = event.pageY;
			
			event.preventDefault();
		}
	});
	
	m.viewingBox.mousewheel( function(event, delta) {
		var posey = m.innerMap.position();
		
		var newWidth = totalWidth * (1 + (0.1 * delta));
		var newHeight = totalHeight * (1 + (0.1 * delta));
		
		var movx = totalWidth - newWidth;
		var movy = totalHeight - newHeight;
		
		posey.left += (0.5 * movx);
		posey.top += (0.5 * movy);
		
		totalWidth = newWidth;
		totalHeight = newHeight;
		
		m.innerMap.css({
			"left": (posey.left) + "px",
			"top" : (posey.top) + "px"
		});
		$("img#image").css({
			"height" : (totalHeight) + "px",
			"width" : (totalWidth) + "px"
		});
	});
}

$(document).ready(function() {
	var map = new Map($("div.viewingBox"));
});

function Point() {
	this.x = 0;
	this.y = 0;
}

