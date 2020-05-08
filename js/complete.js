$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function(user) {
        if(user){
            var user = user.uid;
            currentUser = user;
            
            var reqRef = db.collection("requestpost");

            //display all request posts dynamically
            reqRef.where("status", "==", "completed").where("volunteer_uid", "==", currentUser).get().then(querySnapshot => {
                querySnapshot.forEach(function(doc){
                    list_div.innerHTML += "<div class= 'list-item'><p>items: </p>" 
                        + doc.data().items 
                        + "<p>need this by: </p>" 
                        + doc.data().needbydate 
                        + "<p>message: </p>" 
                        + doc.data().message
                        + "<p class='docref' style='visibility: hidden'>"
                        + doc.data().docRefid
                        + "</p>"
                        + "<input id='complete-btn' class='btn btn-primary' type='submit' value='Mark as completed'/>"
                        + "</div>";

                });
            });
        } else{
            console.log("no user");
        }

    });
    
});