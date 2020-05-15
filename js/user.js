$(document).ready(function() {
    createUser();
})

// Fucntion that creates a new document in the users collection
function createUser() {
    // if the current user logged in user
    // is authenticated, then grab "uid" "displayName" and "email"
    // use "set()" with merge (if document did not exist it will be created)
    // get the user id with user.uid
    auth.onAuthStateChanged(function(user){
        if (user) {
            db.collection("user").doc(user.uid).set(
                {
                "name":user.displayName,
                 "email":user.email,
                },{ merge: true });
            } else {
                console.log("no one signed in");
            }
    });
}

/**
 * This displays the name of the logged in user
 */
function showName() {
    auth.onAuthStateChanged(function (user) {
        if(user) {
            document.getElementById("userName").innerHTML = user.displayName;
        }
    });
}

/**
 * logs the user out when the button with ID logout is clicked
 */
function logout() {
    const logout = document.getElementById('logout');
    logout.addEventListener('click', (e) =>{
        auth.signOut().then(( )=> {
            console.log('user signed out');
        });
    })
}

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

var address = "";
function storeAddress() {
    auth.onAuthStateChanged(function (user) {
        //   console.log(user);
        if(user) {
            db.collection("user").doc(user.uid).get().then(function(doc) {
                if (doc.exists) {
                    // Store user address into session storage
                    sessionStorage.setItem("userAddress", doc.data().address);
                    address = sessionStorage.getItem("userAddress");
                    console.log(address)
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting user address document:", error);
            });
            
        }
})


                    
}

function showTest() {
// Retrieve
document.getElementById("result").innerHTML = sessionStorage.getItem("userAddress");
}



  
// /**
//  * Active listener that will check to see if a user is logged in. If logged in, different information will appear.
//  */
// (function () {
//     var logout = document.getElementById("logMeOut");
//     var login = document.getElementById("login");
//     var createImg = document.getElementById("createImg");
//     var createTitle = document.getElementById("createTitle");
//     var mapImg = document.getElementById("mapImg");
//     var mapTitle = document.getElementById("mapTitle");



//     // logout.addEventListener('click', e=> {
//     //     firebase.auth().signOut();
//     //     console.log("logged out");
//     //     location.reload();
//     // });
    
    
//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             logout.classList.remove('hide');
//             login.classList.add('hide');
//             createImg.setAttribute('href', "create_a_group.html");
//             createTitle.setAttribute('href', "create_a_group.html");
//             mapImg.setAttribute('href', "map.html");
//             mapTitle.setAttribute('href', "map.html");

//         } else {
//             logout.classList.add('hide');
//             login.classList.remove('hide');
//         }
//     })

// }());
