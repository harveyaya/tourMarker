function setWrappedGeo(zoomLevel, geoJsonObject) {
//getNewGeo
  var newGeoJson = jQuery.extend(true, {}, geoJsonObject);
  var centers = [];
  centers.push(0);
  // var threshold = 0.2*(22-zoomLevel);
  var threshold = 5/zoomLevel;
    newGeoJson["features"].forEach(function(feature){
    var distances = [];
    centers.forEach(function(pos){
      distances.push(getDis(feature, newGeoJson["features"][pos]));
    })
    var minValue = Math.min.apply(null, distances);
    if(minValue <= threshold && minValue!=0) {//merge to min distance center
      // console.log(centers[distances.indexOf(minValue)]);
      newGeoJson["features"][centers[distances.indexOf(minValue)]].properties.photos.push(...feature.properties.photos);
      feature.properties.duration=0;
      newGeoJson["features"][centers[distances.indexOf(minValue)]].properties.date=Math.min(newGeoJson["features"][centers[distances.indexOf(minValue)]].properties.date,feature.properties.date);
      feature.properties.names.forEach(function(name1){
        if(newGeoJson["features"][centers[distances.indexOf(minValue)]].properties.names.indexOf(name1)<0) {
          newGeoJson["features"][centers[distances.indexOf(minValue)]].properties.names.push(name1);
        }
      });
    } else if(distances.indexOf(minValue)>=0) {
      centers.push(distances.indexOf(minValue));
    }

  });

//update style
  map.data.addGeoJson(newGeoJson);
}

function getDis(fe1,fe2) {
  var lng1 = fe1.geometry.coordinates[0];
  var lat1 = fe1.geometry.coordinates[1];
  var lng2 = fe2.geometry.coordinates[0];
  var lat2 = fe2.geometry.coordinates[1];
  return Math.sqrt((lng1-lng2)*(lng1-lng2)+(lat1-lat2)*(lat1-lat2));
}


function freshGeo(map, zoomLevel, geoJsonObject, callback) {
  map.data.forEach(function(feature){
    map.data.remove(feature);
  });
  callback(zoomLevel, geoJsonObject);
}
