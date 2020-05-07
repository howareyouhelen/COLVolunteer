function getProfile() {
    //READ database to get the user information to display
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid)
        .get()
        .then(function(data) {
            const userData = data.data();
            fillProfile(userData);
        })    
        .catch((error) => {
            console.log(`Error getting data: ${error}`);
        });
    });
}