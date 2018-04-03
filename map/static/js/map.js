  var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lng: -87.629, lat: 41.878},
      mapTypeId: 'terrain'
    });
    map.data.loadGeoJson('/static/js/geo.json');

    map.data.setStyle(function(feature) {
      return ({
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: feature.getProperty('duration')*10,
          fillColor: feature.getProperty('color'),
          fillOpacity: 0.35,
          strokeWeight: 0
        }
      });
    });


    var infowindow = new google.maps.InfoWindow({
    });

    map.data.addListener('click', function(event) {
      infowindow.setPosition({lng: event.feature.getGeometry().get().lng(), lat: event.feature.getGeometry().get().lat()});
      // TODO: send ajax request to backend to get the information need to display,
      // Remember to use callback to ensure the order
      infowindow.setContent('<div>' +
      '<p>'+ event.feature.getProperty('name') +'</p>' +
      '</div>');
      infowindow.open(map);
    });


    map.data.addListener('mouseover', function(event) {
      event.feature.setProperty('color',"#0f0")
    });

    map.data.addListener('mouseout', function(event) {
      event.feature.setProperty('color',"#f00")
    });
  }

  sendRequest() {
    $.ajax({
      url: url,
      data: data,
      success: success,
      dataType: dataType
    });
  }
}
