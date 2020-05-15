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