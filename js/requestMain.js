$(document).ready(function () {
    const list_div = document.querySelector("#list_div");
    var reqRef = db.collection("requestpost").orderBy("timestamp", "desc");

    firebase.auth().onAuthStateChanged(function(user) {
        var user = user.uid;
        currentUser = user;
    });

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

            $(".btn").click(function(){
                $(this).val("Help on its way!").prop('disabled', true);
                var matchID = $(this).siblings('.docref')[0].innerHTML;
                var docRef = reqRef.doc(matchID);
                docRef.set({
                    volunteer_uid: currentUser,
                    status: "accepted"
                }, {merge: true});
           })
        });
    });

    
});
