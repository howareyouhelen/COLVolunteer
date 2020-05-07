$(document).ready(function () {
    // Listen for form submission then execute submitForm function
    var reqform = document.getElementById("create-reqpost-form")
    reqform.addEventListener('submit', submitForm);

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

    console.log(needbydate);
    console.log(items);

    //save request post
    savePost(items, needbydate, message, timestamp);
    }
    
    // Function to get form values 
    function getInputVal(id) {
        return $("#"+id).val();
    }

    // save requestpost to firebase
    function savePost (items, needbydate, message, timestamp) {
        db.collection("requestpost").add({
            items: items,
            needbydate: needbydate,
            message: message,
            timestamp: timestamp
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            $("form").trigger("reset");
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
});
