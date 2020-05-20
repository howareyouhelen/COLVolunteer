$(document).ready(()=>{
    console.log("in js file");
    loadrequests();
    
})



function loadrequests(){

    auth.onAuthStateChanged((user) => {
        console.log(user);

        if(user){

            db.collection("user").doc(user.uid).set(
                {newMsg: false},{merge:true}
            );


            db.collection("user").doc(user.uid).collection("requestForMe").get().then((querySnapshot) => {
                var x = 1;
                querySnapshot.forEach(function (doc) {

                    var istrue = doc.data().reqAccepted;
                    if(istrue == false){
                    var requesterId = doc.data().fromUserId;
                    db.collection("user").doc(requesterId).get().then((snap1 =>{
                        var requesterName = snap1.data().name;
                        var requesterAddress = snap1.data().address;
                        var requesterEmail = snap1.data().email;
                        

                    console.log("test..." + requesterEmail);
                    console.log("test..." + requesterName);
                    var message = doc.data().message;
                    var list = doc.data().list;
                    var docRef = doc.data().docRefid;
                    
                    console.log(message);
                    console.log(list);
                    console.log(requesterId);
                    console.log(requesterName);
                    console.log(requesterAddress);

                    var y = "card" + x;

                    var z = '<div class="card" id="' + y + '"></div>';
                    var z_id = '#' + y;

                    $("#item_cards").append(z);

                    var b = '<div class="card-body" id="' + y + 'body">';
                    var b_id = '#' + y + 'body';

                    $(z_id).append(b);

                    var c = '<h4 class="card-title" id="' + y + 'name">Requester: ' + requesterName + '</h4>';
                    var c_id = '#' + y + 'name';

                    $(b_id).append(c);

                    var d = '<h6 class="card-subtitle mb-2 text-muted" id="' + y + 'address">Requester\'s address: ' + requesterAddress + '</h6>';
                    var d_id = '#' + y + 'address';

                    var da = '<h6 class="card-subtitle mb-2 text-muted" id="' + y + 'email">Requester\'s email: ' + requesterEmail + '</h6>';
                    var d_id = '#' + y + 'email';

                    $(b_id).append(da);

                    var f = '<p class="card-text" id="' + y + 'message"> Message: ' + message + '</p>';
                    var f_id = '#' + y + 'message';

                    var g = '<p class="card-text" id="' + y + 'list"> Items requested: ' + list + '</p>';
                    var g_id = '#' + y + 'list';

                    $(b_id).append(f);
                    $(b_id).append(g);
                    
                    

                    var h = '<button type="button" class="btn btn-success" id=' + docRef + ' value = ' + docRef + ' onclick = "requestAccepted(this.id)" >' + 'Accept</button>';
                    $(b_id).append(h);

                    var i = '<button  type="button" class="btn btn-danger" id=' + docRef + ' value = ' + docRef + ' onclick = "requestDeclined(this.id)">' + 'Decline</button>';
                    $(b_id).append(i);
                    
                    x++;
                    
                }))}
                })
            })         
        }          
    });               
}

function requestAccepted(clicked_id){
    console.log("request accepted");
    console.log(clicked_id);
    auth.onAuthStateChanged((user) => {
        db.collection("user").doc(user.uid).get().then(snap => {
            var volName = snap.data().name;
        
        db.collection("user").doc(user.uid).collection("requestForMe").doc(clicked_id).set(
            {reqAccepted:true,reqCompleted:false},{merge:true}
        )
        db.collection("user").doc(user.uid).collection("requestForMe").doc(clicked_id).get().then(function(doc){
            var requesterId = doc.data().fromUserId;
            var volunteerPostId = doc.data().volPostDocId;
            
            console.log(requesterId);
            console.log(volunteerPostId);
            console.log(volName);
            db.collection("user").doc(requesterId).collection("pastRequestsToOthers").where("volPostDocId","==",volunteerPostId).get().
                then(querySnapshot => {
                    querySnapshot.forEach(documentSnapshot => {
                        var querry = documentSnapshot.ref.path;
                        console.log(querry);
                      console.log(`Found document at ${documentSnapshot.ref.path}`);
                      var d = querry.split('/');
                      console.log(d);
                      var c = d[3];
                      console.log(c);
                      db.collection("user").doc(requesterId).collection("pastRequestsToOthers").doc(c).set(
                        {reqAccepted:true,reqCompleted:false,volunteerName:volName},{merge:true}
                      )
            })
            
            
        })
    })
    location.reload();
})
})
}

function requestDeclined(clicked_id){
    auth.onAuthStateChanged((user) => {
    console.log("request declined");
    console.log(clicked_id);

    db.collection("user").doc(user.uid).collection("requestForMe").doc(clicked_id).delete().then(function() {
        console.log("Document successfully deleted!");
        alert("request deleted");
        
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });


    
})
    
    location.reload();
}
