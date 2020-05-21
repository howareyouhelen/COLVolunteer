// working with notifications
function workingWithNotifications() {
    // console.log("in new function");

    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('user').doc(user.uid).onSnapshot(function (snap) {
                var newrequest = snap.data().newMsg;
                // console.log("current data is ...", snap.data().newMsg);
                if (newrequest == true) {
                    alert("you have a new request");
                    var notify = {
                        "background-color": "red"
                    };
                    $("#pendingRequests").css(notify);
                }
            });
        }
    })
}


//Sends the request to the volunteer --> shoppingList + msg
function sendRequest(callback) {
    $("#send-request").on('click', () => {
        let requestMsg = $('#msgEntry').val();
        auth.onAuthStateChanged((user) => {
            if (user) {
                let my = db.collection('user').doc(user.uid);
                let userCurList = my.collection('shoppingList').doc('currentList');
                my.get().then((doc) => {
                    volPostId = doc.data().currentVolpostDocId;
                    db.collection('volunteerPosts').doc(volPostId).get().then((snap1) => {
                        let volUId = snap1.data().volUId;
                        userCurList.onSnapshot(function (snap2) {
                            let volunteer = db.collection('user').doc(volUId);
                            let volunteerMsg = volunteer.collection('requestForMe').doc();
                            console.log(volunteerMsg.id);
                            var docid = volunteerMsg.id;

                            console.log(user.uid);
                            volunteerMsg.set({

                                list: snap2.data().list,
                                message: requestMsg,
                                fromUserId: user.uid,
                                volPostDocId: volPostId,
                                myUID: volUId,
                                docRefid: docid,
                                reqAccepted: false,
                                reqDeclined: false
                                
                            })
                            volunteer.set({
                                newMsg: true
                            }, {
                                merge: true
                            });
                            volunteer.set({
                                newReq: true
                            }, {
                                merge: true
                            });
                        })
                    })
                    callback(volPostId);
                    my.collection('pastRequestsToOthers').add({
                        volPostDocId: volPostId
                    });
                })
            } else {
                console.log("no user");
            }
        })
    })
}

//After Request is Sent, disables the make-a-request button
function makeARequestButtonDone(uid) {
    let buttons = $('button.make-request');
    for (let x = 0; x < buttons.length; x++) {
        if (buttons[x].value === uid) {
            $(buttons[x]).html("Request Sent");
            $(buttons[x]).prop("disabled", true);
        }
    }
}

//Request pop-up window for make-a-request button
//This is called by using onclick attribute on the button when the button was made
function makeRequestButtonEvent() {
    let name = $(event.currentTarget.parentNode).children()[0].innerText;
    console.log(name)
    $('#volunteerName').html("Send your request to " + name);
    auth.onAuthStateChanged((user) => {
        if (user) {
            let myCollection = db.collection('user').doc(user.uid);
            let postId = $(event)[0].currentTarget.value;
            myCollection.set({
                currentVolpostDocId: postId
            }, {
                merge: true
            });
        }
    })
    showCurrentList();
}


//Put shopping list on Make-A-Request popup window --- by reading from database: user/shoppingList/currentList/list arr[]
function showCurrentList() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            let my = db.collection('user').doc(user.uid);
            my.collection('shoppingList').doc('currentList').onSnapshot(function (snap) {
                $("#currentList").html('');
                let data = snap.data();
                for (let i = 0; i < data.list.length; i++)
                    $("#currentList").append('<li class="list-group-item">' + data.list[i] + '</li>');
            })
        }
    })
}

// Deactivates previously made request posts
function deactivatePastRequests() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('user').doc(user.uid).collection('pastRequestsToOthers').get().then((snap) => {
                snap.forEach((doc) => {
                    vPoId = doc.data().volPostDocId;
                    makeARequestButtonDone(vPoId);
                })
            })
        }
    })
}

// Drops a pin on the map based on the geolocation of the volunteer post.
// The pin is dropped whenever the "drop pin" button is clicked.
function dropPin() {
    // hideDistance()
    markers.forEach(function (marker) {
        marker.setMap(null);
    });
    markers = [];
    let store = $(event.currentTarget.parentNode).children()[1].innerText;
    let storelat = parseFloat($(event.currentTarget).attr('lat'));
    let storelng = parseFloat($(event.currentTarget).attr('lng'));
    let latlng = {
        lat: storelat,
        lng: storelng
    }

    var storeMarker = new google.maps.Marker({
        position: latlng,
        map: map,
        animation: google.maps.Animation.DROP,
        title: store
    });

    markers.push(storeMarker);
    storeMarker.setMap(map);
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(myHomeLatLng);
    bounds.extend(latlng);
    map.fitBounds(bounds);
}

// Sorts the volPosts by distance and stores the order of volpostdocid in the meta data of the user
// All the Volunteer Posts are read and using the logged-in user's current geolocation and the post's
// geolocation, a distance is calculated. This distance is then saved into a metaData collection in the 
// the database using distance as the document ID. Firebase automatically sorts all documents in ascending 
// order of doc id. Distance of all posts change depending on the currently logged-in user.
function sortPostsInDB() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let postOrder = db.collection('user').doc(user.uid).collection('metaData').doc('volPostOrder').collection('order');
            let myMap = db.collection('user').doc(user.uid).collection('metaData').doc('map');
            myMap.get().then(snap => {
                let myGeopoint = snap.data().geolocation;
                db.collection("volunteerPosts").get().then((querySnapshot) => {
                    querySnapshot.forEach(function (doc) {
                        /* get volunteer post data from db */
                        var docId = doc.id;
                        var storeGeopoint = doc.data().geopoint; //geopoint._lat
                        let distance = geopoint_distance(myGeopoint, storeGeopoint);
                        if((distance/10) <= 1) {
                            distance = "0" + distance;
                        }
                        postOrder.doc("" + distance).set({
                            docId: docId
                        })
                    })
                }).then(displayPosts)
            })
        }
    })
}

// Function used for testing
function hideDistance() {
    $('.distance').on('click', function() {
        $('.distance').hide();
    })
}

// displays the volposts according to the order in the user's metadata in the database. The posts are sorted
// automatically by firebase, as firebase automatically sorts doc ID in ascending order when it is saved. Each doc
// is then displayed onto the page and then in the end, the metaData is deleted from the database.
function displayPosts() {
    console.log("displaying posts")
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let order = db.collection('user').doc(user.uid).collection('metaData').doc('volPostOrder').collection('order');
            order.get().then((data) => {
                var x = 1;
                data.forEach(function (item) {
                    let vdocid = item.data().docId;
                    db.collection("volunteerPosts").doc(vdocid).get().then((doc) => {
                        var store = doc.data().store;
                        var storeAddress = doc.data().storeAddress;
                        var volname = doc.data().volname;
                        // var email = doc.data().email;
                        var date = doc.data().date;
                        var storeGeopoint = doc.data().geopoint;
                        var lat = doc.data().geopoint._lat + "";
                        var lng = doc.data().geopoint._long;
                        var docId = doc.id;

                        var y = "card" + x;

                        var z = '<div class="card" id="' + y + '"></div>';
                        var z_id = '#' + y;

                        $("#item_cards").append(z);

                        var b = '<div class="card-body" id="' + y + 'body">';
                        var b_id = '#' + y + 'body';

                        $(z_id).append(b);

                        var c = '<h4 class="card-title" id="' + y + 'name">' + volname + '</h4>';
                        var c_id = '#' + y + 'name';

                        $(b_id).append(c);

                        var d = '<h6 class="card-subtitle mb-2" style="color:MediumSlateBlue" id="' + y + 'store">' + store + '</h6>';
                        var d_id = '#' + y + 'store';

                        $(b_id).append(d);

                        var address = '<h6 class="card-subtitle mb-2 text-muted" id="' + y + 'address">' + storeAddress + '</h6>';
                        var address_id = '#' + y + 'address';

                        $(b_id).append(address);

                        var f = '<p class="card-text" id="' + y + 'date"> Planning to go on: ' + date + '</p>';
                        var f_id = '#' + y + 'date';

                        $(b_id).append(f);

                        let myMap = db.collection('user').doc(user.uid).collection('metaData').doc('map');
                        myMap.get().then(snap => {
                            let myGeopoint = snap.data().geolocation;
                            let distance = geopoint_distance(myGeopoint, storeGeopoint);
                            distance = distance.toFixed(2);

                            var dis = '<h6 class="card-title text-muted distance" id="' + y + 'distance"> distance: ' + distance + 'km</h6>';
                            var dis_id = '#' + y + 'distance';
                            $(b_id).append(dis);

                            let info = 'class="btn btn-outline-info make-request" data-toggle="modal" data-target="#exampleModal" onclick="makeRequestButtonEvent()"';
                            var e = '<button type="button"' + info + 'id="' + y + 'button" value = ' + docId + '>' + 'Send Request</button>';
                            $(b_id).append(e);

                            var pin = `<i class='fas fa-map-marker-alt' lat="${lat}" lng="${lng}" onclick="dropPin()"></i>`;
                            var btn = `<button type="button" class="btn btn-outline-primary btn-sm show-on-map" lat="${lat}" lng="${lng}" onclick="dropPin()">show on map</button>`
                            var bp =  btn + pin;

                            $(b_id).append(bp);
                        })
                        x++;
                    })
                    order.doc(item.id).delete().then(function() {
                        // console.log("Document successfully deleted! " + item.id);
                    }).catch(function(error) {
                        console.error("Error removing document: ", error);
                    });
                })
            }).then(deactivatePastRequests)
        }
    })
}