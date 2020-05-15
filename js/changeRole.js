//Converts address into geolocation and sets in the user's database
function userGeopoint() {
    auth.onAuthStateChanged(function (user) {
        db.collection('user').doc(user.uid).get().then(snap => {
            let address = snap.data().address;
            let string = address.split(" ").join("+");
            const Url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + string + '&key=' + firebaseKEY;
            $.ajax({
                url: Url,
                type: "GET",
                success: function (response) {
                    let userGeopoint = db.collection('user').doc(user.uid).collection('metaData').doc('map');
                    let location = response.results[0].geometry.location;
                    userGeopoint.set({
                        geolocation: new firebase.firestore.GeoPoint(location.lat, location.lng)
                    });
                }
            })
        })
    })
}


// This find the current positino of user and saves it to Database
function getUserLocation() {
    let x = document.getElementById("user-location");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveAndShowPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function saveAndShowPosition(position) {
        let currentPos = position.coords;
        let lat = currentPos.latitude;
        let lng = currentPos.longitude
        x.innerHTML =    "Latitude: " + lat + 
              "<br>" +  "Longitude: " + lng;
        auth.onAuthStateChanged(function (user) {
            let userDB = db.collection('user').doc(user.uid).collection('metaData').doc('map');
            userDB.set({
                geolocation: new firebase.firestore.GeoPoint(lat, lng)
            });

        })
    }
}

