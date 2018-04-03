$(document).ready(function(){
	var maxDate=new Date(Math.max.apply(null, dates));
	var minDate=new Date(Math.min.apply(null, dates));
		$("#ex1").slider({
					min:0,
					max:3,
					value:3,
					step:1
		});

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
