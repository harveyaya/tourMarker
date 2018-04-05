  var map;
  var dates = [];
  var geoData;
  var slideIndex;
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lng: -87.629, lat: 41.878},
      mapTypeId: 'terrain'
    });


    $.ajax({
      method: 'GET',
      url: '/api/map/add/record/',
      success: function(data) {
//        console.log(data);
        geoData = prepareGeoJson(JSON.parse(data));
        map.data.addGeoJson(geoData);

          var maxDate=new Date(Math.max.apply(Math, dates));
        	// var maxDate=Math.max.apply(Math, dates);
        	var minDate=new Date(Math.min.apply(Math, dates));
          console.log(maxDate);
          console.log(minDate);
        		$("#ex1").slider({
        					min:minDate.getTime(),
        					max:maxDate.getTime(),
        					value:maxDate.getTime(),
        					step:1
        		});

        makeDropdown(data);

        map.data.setStyle(function(feature) {
          return ({
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: feature.getProperty('duration')*7,
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
      // infowindow.setContent('<div>' +
      // '<image src=\"'+ event.feature.getProperty('name') +'\" width=\"100\" height=\"100\">' +
      // '</div>');
      var tempList = [{"photo_url":"http://dylan-space.s3.amazonaws.com/background.jpg"},{"photo_url":"http://dylan-space.s3.amazonaws.com/background.jpg"},{"photo_url":"http://dylan-space.s3.amazonaws.com/background.jpg"}]
      infowindow.setContent(buildInfowindow(tempList));


    infowindow.open(map);
    slideIndex = 1;
    showSlides(slideIndex);



    });

    // google.maps.event.addListener(infowindow,'domready',function(){
    //     $('#myInfoWinDiv').click(function() {
    //         //Do your thing
    //
    //     });
    // })

    map.data.addListener('mouseover', function(event) {
      event.feature.setProperty('color',"#0f0")
    });

    map.data.addListener('mouseout', function(event) {
      event.feature.setProperty('color',"#f00")
    });

    map.addListener('zoom_changed', function() {
      console.log(map.getZoom());
      freshGeo(map, map.getZoom(), geoData, setWrappedGeo);

    });
  }

  // TODO: add data to the map, using json file, see https://developers.google.com/maps/documentation/javascript/earthquakes#try-it-yourself_1
  // Update mao every time slide the slider

function prepareGeoJson(response){
  var tempFeatures = [];
  for (var i in response) {
    resi = response[i][0];

    var temp = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [resi["longitude"], resi["latitude"]]
      },
      properties: {
        duration: resi["duration"],
        color: "#f00",
        // name: resi["duration"].toString(),
        name: "http://dylan-space.s3.amazonaws.com/background.jpg",
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

function buildInfowindow(photoList) {
  var html = "<div class=\"slideshow-container\">";
  for(var i=1; i<=photoList.length; i++) {
    // var c = i+1;
    html+="<div class=\"mySlides\"><div class=\"numbertext\">"+ i + "/ 3"+"</div><img src=\"" + photoList[i-1].photo_url + "\"" + " style=\"width:100%\"><div class=\"text\"></div></div>"
  }
  html+="<a class=\"prev\" onclick=\"plusSlides(-1)\">&#10094;</a><a class=\"next\" onclick=\"plusSlides(1)\">&#10095;</a></div><br><div style=\"text-align:center\">"
  for(var i=1; i<=photoList.length; i++) {
    html+= "<span class=\"dot\" onclick=\"currentSlide(" + i + ")\"></span>"
  }
  html+="</div>"
  return html;
}

function makeDropdown(data) {
    data = JSON.parse(data);
    for (var i in data) {
        username = data[i][2][0]["name"];
        console.log(username);
        $("#example-getting-started").append("<option value="+username+">"+username+"</option>");
    }
}
