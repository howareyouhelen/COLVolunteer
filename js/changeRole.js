//Converts address into geolocation and sets in the user's database
function userGeopoint() {
    auth.onAuthStateChanged(function (user) {
        db.collection('user').doc(user.uid).get().then(snap => {
            let address = snap.data().address;
            let string = address.split(" ").join("+");
            
        })
    })
}

// This find the current positino of user and saves it to Database
function getUserLocation() {
    let x = document.getElementById("user-location");

    // Gets current location of the user. location changes depending on where user is logged in
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(saveAndShowPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }

    // Process the user's current location(geolocation) 
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

            const Url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng + '&key=' + firebaseKEY;
            $.ajax({
                url: Url,
                type: "GET",
                success: function (response) {
                    userAddress = response.results[1].formatted_address;
                    let userAD = db.collection('user').doc(user.uid);
                    userAD.set({
                        address: userAddress
                    },{ merge: true });
                }
            })
        })
    }
}

