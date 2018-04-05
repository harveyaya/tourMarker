function makeDropdown(data, callback) {

    data = JSON.parse(data);
    // console.log("test"+data);
    names = [];
    for (var i in data) {
      data[i][2].forEach(function(person) {
        if(names.indexOf(person.name)<0) {
          names.push(person.name);
        }
      });
    }

    names.forEach(function(name) {
      var username = name;
      $("#example-getting-started").append("<option value="+username+" selected=\"selected\""+">"+username+"</option>");
      console.log(username);


    });
    callback();
}

function selectInit() {
  $('#example-getting-started').multiselect({
    onDropdownHidden: function(event) {
      // alert('Dropdown closed.');
      // console.log("closed");
      // $('#example-getting-started').
      var namelist=[];
      $("select option:selected").each(function() {
        // console.log($(this).attr("value"));
        namelist.push($(this).attr("value"));
      });
      freshPhoto(namelist);
      // console.log($("select each option:selected"));
    }
  });

}

function freshPhoto(nameList) {
  map.data.setStyle(function(feature) {
    var names = feature.getProperty('names');
    var tempScale=0;
    names.forEach(function(name) {
      if(nameList.indexOf(name)>=0) {
        tempScale = feature.getProperty('duration')*7;
      }
    });


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
}
