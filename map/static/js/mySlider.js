$(document).ready(function(){

		$("#ex1").on('change', function(event) {
			$("#slideValue").text(event.value.newValue)
			map.data.setStyle(function(feature) {
				var tempScale;
				var num = feature.getProperty('date');
				if(num<=event.value.newValue) {
					tempScale=feature.getProperty('duration')*10;
				} else {
					tempScale=0;
				}
	      return ({
	        icon: {
	          path: google.maps.SymbolPath.CIRCLE,
	          scale: tempScale,
	          fillColor: feature.getProperty('color'),
	          fillOpacity: 0.35,
	          strokeWeight: 0
	        }
	      });
	    });
			});
})
