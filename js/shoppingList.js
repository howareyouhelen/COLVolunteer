console.log("hi");

$(document).ready(function() {
    $("#addToList").on("click", function() {
        let item = $("#listForm").serializeArray();
        $(".current-list-group").append('<li class="list-group-item">' + item[0].value + '</li>');
        removeListItem();
    })



const Url = 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDWZlirfSaOCuugkdvcQplrl0t6J2IFou8'
$.ajax({
    url: Url,
    type: "GET",
    success: function(response) {
        console.log(response);
        console.log(response.results[0].address_components[1].short_name);
        console.log(response.results[0].geometry.location.lat);
        console.log(response.results[0].geometry.location.lng);
    }
})

})


function removeListItem() {
    $(".list-group-item").on("click", function() {
        this.remove();
    })

}


// const googleMaps = require('@google/maps').createClient({
//     key: 'AIzaSyDWZlirfSaOCuugkdvcQplrl0t6J2IFou8'
// });


// lat 37.4236586802915,"lng" : -122.0832755197085
// console.log(https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDWZlirfSaOCuugkdvcQplrl0t6J2IFou8)
// findStreet(37.4236586802915, -122.0832755197085 );

// function findStreet(input) {
//     var latlng = input.split(',', 2);
//     var newlat = latlng[1] + ',' + latlng[0];
//   googleMaps.reverseGeocode({
//     latlng: newlat,
//     result_type: 'street_address',
//   }, function(err, response) {
//     if (!err) {
//       var streetName = response.json.results[0].address_components[1].short_name;
//       var streetNum = streetNum = response.json.results[0].address_components[0].short_name;
//       streetNum = streetNum.replace(/\D/g,'');
//       if(streetNum.includes("-")) {
//           let splitNum = streetNum.split("-");
//           streetNum = splitNum[0];
//       }
//       var roundedStreetNum = Math.floor(streetNum / 100) * 100;
//       console.log(streetName + "/" + roundedStreetNum);
//       console.log(streetName);
      
//     }
//   });
// }
