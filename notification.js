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

function updateAddress() {
    while (userAddress == "" || null || undefined) {
        let para = document.createElement("P")
        let text = document.createTextNode("update address");
        para.appendChild(text);
        document.getElementById("notif").appendChild(para);
    }
}
function updateAddress() {
    while (userPhone == "" || null || undefined) {
        let para = document.createElement("P")
        let text = document.createTextNode("update phone number");
        para.appendChild(text);
        document.getElementById("notif").appendChild(para);
    }
}