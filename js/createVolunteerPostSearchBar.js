
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
// console.log(user)
function initMap() {
    auth.onAuthStateChanged(function (user) {
        let userMap = db.collection('user').doc(user.uid).collection('metaData').doc('map');
        userMap.get().then(snap => {
            let userGeolocation = snap.data().geolocation;
            initAutocomplete(userGeolocation);
        })
    })
}

// The main Map function. called inside initMap()
function initAutocomplete(geolocation) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: geolocation._lat,
            lng: geolocation._long
        },
        zoom: 13,
        mapTypeId: 'roadmap'
    });
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    // To add the marker to the map, call setMap();
    markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };


            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                address: place.formatted_address,
                status: place.business_status,
                position: place.geometry.location
            }));

            // Stores location info inside custom attr in a hidden div called #info-storage
            let geo = place.geometry.location;
            $('#info-storage').attr('name', place.name).attr('address', place.formatted_address)
                              .attr('lat', geo.lat()).attr('lng', geo.lng());
            $('#store-address').val(place.formatted_address);
            
            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);

        markers.forEach(function (marker) {
            google.maps.event.addListener(marker, 'click', showInfoWindow)
        });


        var infoWindow = new google.maps.InfoWindow({
            content: document.getElementById('info-content')
        });

        function showInfoWindow() {
            console.log(this)
            var marker = this;
            infoWindow.open(map, marker);
            $('#iw-name').html(marker.title);
            $('#iw-address').html(marker.address);
            $('#iw-status').html(marker.status);

        }
    });

    myHomeLatLng = {lat: geolocation._lat, lng: geolocation._long};
    var myHomeMarker = new google.maps.Marker({
        position: myHomeLatLng,
        map: map,
        icon: { url: "http://maps.google.com/mapfiles/ms/micons/red-dot.png" },
        animation: google.maps.Animation.DROP,
        title: 'My Home'
    });
    myHomeMarker.setMap(map);
}

$(document).ready(function() {
    //API for GoogleMaps
    var JSLink = "https://maps.googleapis.com/maps/api/js?key=" + firebaseKEY + "&libraries=places&callback=initMap";
    var JSElement = document.createElement('script');
    JSElement.src = JSLink;
    document.getElementsByTagName('body')[0].appendChild(JSElement);

})
