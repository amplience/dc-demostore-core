drawAmpImageMeta = function() {
    var images = document.querySelectorAll("[data-amp-image-actions]");
    for (var i = 0; i < images.length; i++) {
        var image = images[i];
         $.ajax(
         	{
         		url: image.getAttribute("data-amp-image-actions"),
         		context: image,
         		success: function(data){
	         	//data is the JSON string
	            //var data = JSON.parse(data);
	            // Lets find the hotspots first
	            if (data && data.metadata && data.metadata.hotSpots) {
	                if ((data.metadata.hotSpots.hasPoint || data.metadata.hotSpots.hasPolygon) && data.metadata.hotSpots.hotSpots.list) {
	                    var hotspots = data.metadata.hotSpots.hotSpots.list;
	                    // Is there a polygon in the data? If so, create a map container
	                    if (data.metadata.hotSpots.hasPolygon) {
	                        // PUT BACK: $(theimg).append("<map name='" + $(this).data('mapname') + "' id='" + $(this).data('mapname') + "'></map>");
	                    }
	                    // Go through the hotspots
	                    for (var i = 0; i < hotspots.length; i++) {
	                        var hotspot = hotspots[i];
	                        // Check for a type
	                        if (hotspot.points.x && hotspot.points.y) {
	                            // This is a hotspot
	                            var newx = 100 * hotspot.points.x;
	                            var newy = 100 * hotspot.points.y;
	                            // take away the size of the button to center...
	                            //newx = newx - 15;
	                            //newy = newy - 15;
	                            var z = document.createElement('span');
	                            z.setAttribute("class", "amp-ca-spot");
	                            z.setAttribute("style", "left:" + newx + "%; top:" + newy + "%;");
	                            var toolstring = "";
	                            var hstext = "+"
	                            var hsclass = "amp-ca-spot-btn";
	                            if (hotspot.selector == 'info') {
	                                hstext = "i";
	                                hsclass = "amp-ca-spot-btn tooltip-toggle";
	                                toolstring = "data-tooltip='" + hotspot.target + "'";
	                            }
	                            z.innerHTML = "<a class='" + hsclass + "'" + toolstring + " data-amp-data='" + hotspot.selector + "' href='#' onclick='doAmplienceAction(" + JSON.stringify(hotspot) + ")' title='" + hotspot.target + "'>" + hstext + "</a>";
	                            this.appendChild(z);
	                        } else {

	                            if (hotspot.points.length == 4) {
	                                // we have a square image map - get the percentages
	                                var topperc = hotspot.points[0].y * 100;
	                                var leftperc = hotspot.points[0].x * 100;
	                                var wperc = (hotspot.points[1].x - hotspot.points[0].x) * 100;
	                                var hperc = (hotspot.points[2].y - hotspot.points[0].y) * 100;

	                                var p = document.createElement('a');
	                                p.setAttribute("class", "amp-ca-poly");
	                                p.setAttribute("style", "left:" + leftperc + "%; top:" + topperc + "%; width: " + wperc + "%; height: " + hperc + "%;");
	                                p.setAttribute("title", hotspot.target);
	                                p.setAttribute("alt", hotspot.target);
	                                p.setAttribute("href", hotspot.target);
	                                // add to node
	                                this.appendChild(p);
	                            }
	                        }
	                    }
	                }
            	}
        	}
    	});

    }
}
drawAmpImageMeta();