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
//current profile
function getEditProfile() {
    firebase.auth().onAuthStateChanged(function (uid) {    
        db.collection("user").doc(uid)
        .get()
        .catch((error) => {
            console.log(`Error getting data: ${error}`);
        });
    });
}

//entered changes
function saveChanges() {
    let newName = document.getElementById("editName").value;
    let newEmail = document.getElementById("editEmail").value;
    let newAddress = document.getElementById("editAddress").value;
    let newPhone = document.getElementById("editPhone").value;

    const newProfile = {
        name: newName,
        email: newEmail,
        address: newAddress,
        phone: newPhone
    }

    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("user").doc(user.uid).update(newProfile)
        .catch(function(error){
            console.log(`error updating: ${error}`);
        })
        .then(function() {
            window.location.href = "./profile.html";
        });
    });
}