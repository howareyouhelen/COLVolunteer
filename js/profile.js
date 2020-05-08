function getID() {
    //READ database to get the user information to display
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log(user);
            var uid = user.uid;
            console.log(uid);
        } else {
                // No user is signed in.
        }
    })}

function getProfile() {
    firebase.auth().onAuthStateChanged(function(user) {
    db.collection("user").doc(user.uid)
    .get()
    .then(function(data) {
        const userData = data.data();
        displayProfile(userData);
    })    
    .catch((error) => {
        console.log(`Error getting data: ${error}`);
        });
    });
}
function displayProfile(user) {
    document.getElementById("userName").innerHTML = user.name;
    document.getElementById("userEmail").innerHTML = user.email;
    console.log(user.address);
    if (user.address == undefined ) {
        document.getElementById("userAddress").innerHTML = "Please enter your address to gain access to full features of this app.";
    } else {
        document.getElementById("userAddress").innerHTML = user.address;
    }
}