$(document).ready(()=>{
    showCurrentList();
    sendRequest(makeARequestButtonDone);
    deactivatePastRequests();
})
//Sends the request to the volunteer --> shoppingList + msg
function sendRequest(callback) {
    $("#send-request").on('click', ()=>{
        let requestMsg = $('#msgEntry').val();
        auth.onAuthStateChanged((user) => {
            if (user) {
                let userCurList = db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList');
                let volPost = db.collection('user').doc(user.uid).collection('volunteerPost').doc('current');
                volPost.get().then((doc)=>{
                    volPostId  = doc.data().volpostDocId;
                    db.collection('volunteerPosts').doc(volPostId).get().then((snap1) => {
                        let volUId = snap1.data().volUId;
                        userCurList.onSnapshot(function (snap2) {
                            let volunteerMsg = db.collection('user').doc(volUId).collection('requestToBuy').doc();
                            volunteerMsg.set({
                                list    : snap2.data().list,
                                message : requestMsg,
                                userId  : user.uid
                            });
                        })
                    })
                    callback(volPostId);
                    db.collection('user').doc(user.uid).collection('volunteerPost').doc('past').collection('requests').add({ volPostDocId : volPostId})
                })
            } else {console.log("no user");}
        })  
    })
}

//After Request is Sent, disables the make-a-request button
function makeARequestButtonDone(uid) {
    let buttons = $('button.make-request');
    for (let x = 0; x < buttons.length; x++) {
        if(buttons[x].value === uid) {
            $(buttons[x]).html("Request Sent");
            $(buttons[x]).prop("disabled", true);
        }
    }
}

//Request pop-up window for make-a-request button
function attachMakeRequestButtonEvent() {
    $('button.make-request').on('click', (event) => {
        let name = $(event.currentTarget.parentNode).children()[0].innerText;
        $('#volunteerName').html("Send your request to " + name);
        auth.onAuthStateChanged((user) => {
            if(user) {
                let current = db.collection('user').doc(user.uid).collection('volunteerPost').doc('current');
                let postId = $(event)[0].currentTarget.value;
                current.set({ volpostDocId: postId });
            }
        })
        showCurrentList();
    })
}

//Put shopping list on Make-A-Request popup window --- by reading from database: user/shoppingList/currentList/list arr[]
function showCurrentList() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList').onSnapshot(function (snap) {
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
        if(user){
            db.collection('user').doc(user.uid).collection('volunteerPost').doc('past').collection('requests').get().then((snap)=>{
                snap.forEach((doc)=> {
                    vPoId = doc.data().volPostDocId;
                    makeARequestButtonDone(vPoId);
                })
            })
        }
    })
}
