$(document).ready(function () {
    //adding calendar to create request post page
    var JSLink = "https://maps.googleapis.com/maps/api/js?key=" + firebaseKEY + "&libraries=places&callback=initMap";
    var JSElement = document.createElement('script');
    JSElement.src = JSLink;
    document.getElementsByTagName('body')[0].appendChild(JSElement);

    // Listen for form submission then execute submitForm function
    var reqform = document.getElementById("create-reqpost-form")
    reqform.addEventListener('submit', submitForm);

    firebase.auth().onAuthStateChanged(function(user) {
        var user = user.uid;
        currentUser = user;
    });


    // take in an event and submit form
    function submitForm(event){
        event.preventDefault();
        var date = new Date();
        var gettimestamp = date.getTime();
        // get values
        var items = getInputVal("items");
        var needbydate = getInputVal("needbydate");
        var message = getInputVal("message");
        var timestamp = gettimestamp;
        var postrequester_uid = currentUser;
        var status = "pending";

        //save request post
        savePost(items, needbydate, message, timestamp, postrequester_uid, status);
    }
    

    // Function to get form values 
    function getInputVal(id) {
        return $("#"+id).val();
    }

    // save requestpost to firebase
    function savePost (items, needbydate, message, timestamp, postrequester_uid, status) {
        db.collection("requestpost").add({
            items: items,
            needbydate: needbydate,
            message: message,
            timestamp: timestamp,
            postrequester_uid: postrequester_uid,
            status: status
        })
        .then(function(docRef) {
            docRef.set({
                docRefid: docRef.id
            }, {merge: true});
            console.log("Document written with ID: ", docRef.id);
            $("form").trigger("reset");
            $("#success_bar").show();
                setTimeout(function(){
                    $("#success_bar").hide();
                }, 4000);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
});
