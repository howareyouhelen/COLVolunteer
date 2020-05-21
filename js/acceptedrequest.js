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
                    console.log(x);
                    var isaccepted = doc.data().reqAccepted;
                    var iscompleted = doc.data().reqCompleted;
                    if(isaccepted == true && iscompleted == false){
                    var requesterId = doc.data().fromUserId;
                    db.collection("user").doc(requesterId).get().then((snap1 =>{
                        var requesterName = snap1.data().name;
                        //var requesterAddress = snap1.data().address;
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
                    //console.log(requesterAddress);
                    console.log("card number " + x);
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

                    // var d = '<h6 class="card-subtitle mb-2 text-muted" id="' + y + 'address">Requester\'s address: ' + requesterAddress + '</h6>';
                    // var d_id = '#' + y + 'address';

                    var da = '<h6 class="card-subtitle mb-2 text-muted" id="' + y + 'email">Requester\'s email: ' + requesterEmail + '</h6>';
                    var d_id = '#' + y + 'email';

                    $(b_id).append(da);

                    var f = '<p class="card-text" id="' + y + 'message"> Message: ' + message + '</p>';
                    var f_id = '#' + y + 'message';

                    var g = '<p class="card-text" id="' + y + 'list"> Items requested: ' + list + '</p>';
                    var g_id = '#' + y + 'list';

                    $(b_id).append(f);
                    $(b_id).append(g);
                    
                    

                    var h = '<button type="button" class="btn btn-success" id=' + docRef + ' value = ' + docRef + ' onclick = "requestCompleted(this.id)" >' + 'Mark Complete</button>';
                    $(b_id).append(h);

                    
                    console.log("x incremented");
                    x++;
                    
                }))}
                })
            })         
        }          
    });               
}

function requestCompleted(clicked_id){
    console.log("request accepted");
    console.log(clicked_id);
    auth.onAuthStateChanged((user) => {
        db.collection("user").doc(user.uid).collection("requestForMe").doc(clicked_id).set(
            {reqCompleted:true},{merge:true}
        )
    })
    location.reload();
}