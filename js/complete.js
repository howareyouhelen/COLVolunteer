$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function(user) {
        var user = user.uid;
        currentUser = user;
        const list_div = document.querySelector("#list_div");
        var reqRef = db.collection("requestpost").where("status", "==", "completed").where("postrequester_uid", "==", currentUser).orderBy("timestamp", "desc").limit(5);
        
        //display all request posts dynamically
        reqRef.onSnapshot(function(querySnapshot){
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
                    + "<input id='help_btn' class='btn btn-primary' type='submit' value='Help Me'/>"
                    + "</div>";
            });
        });

    });

    
});
