$(document).ready(function(){

		$("#ex1").on('change', function(event) {
			var currentDate = new Date(event.value.newValue);
			var year = currentDate.getUTCFullYear();
			var month = currentDate.getUTCMonth()+1;
			var day = currentDate.getUTCDate();
			$("#slideValue").text(year+"-"+month+"-"+day)
			map.data.setStyle(function(feature) {
				var tempScale;
				var num = feature.getProperty('date')+feature.getProperty('duration');
				if(num<=event.value.newValue) {
					tempScale=feature.getProperty('duration')*7;
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
