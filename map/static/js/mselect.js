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
      $("#example-getting-started").append("<option value="+username+">"+username+"</option>");
      console.log(username);


    });
    callback();
}

$(document).ready(function(){
    
});
