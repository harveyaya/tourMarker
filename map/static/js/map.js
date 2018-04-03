  var map;
  var dates = [];
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lng: -87.629, lat: 41.878},
      mapTypeId: 'terrain'
    });


    $.ajax({
      method: 'GET',
      url: '/api/map/add/record/',
      success: function(data) {
        console.log(data);
        map.data.addGeoJson(prepareGeoJson(JSON.parse(data)));
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
      },
    });


    // map.data.loadGeoJson('/static/js/geo.json');


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

  // TODO: add data to the map, using json file, see https://developers.google.com/maps/documentation/javascript/earthquakes#try-it-yourself_1
  // Update mao every time slide the slider

function prepareGeoJson(response){
  var tempFeatures = [];
  for (var i in response) {
    resi = response[i];

    var temp = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [resi["longitude"], resi["latitude"]]
      },
      properties: {
        duration: resi["duration"],
        color: "#f00",
        name: new Date(resi["begin_time"]),
        date: new Date(resi["begin_time"])
      }
    };
    tempFeatures.push(temp);
    dates.push(new Date(resi["begin_time"]));
  }


  var result = {
    type:"FeatureCollection",
    features: tempFeatures
  };
  return result;
}
