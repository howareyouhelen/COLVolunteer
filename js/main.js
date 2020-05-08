$(document).ready(()=>{
    showCurrentList();
    sendRequest(makeARequestButtonDone);
})

//Sends the request to the volunteer --> shoppingList + msg
function sendRequest(callback) {
    $("#send-request").on('click', ()=>{
        let requestMsg = $('#msgEntry').val();
        auth.onAuthStateChanged((user) => {
            if (user) {
                let userCurrentList = db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList');
                userCurrentList.onSnapshot(function (snap) {
                    let volunteerMsg = db.collection('user').doc(user.uid).collection('requestToBuy').doc();
                    volunteerMsg.set({
                        list    : snap.data().list,
                        message : requestMsg,
                        userId  : user.uid
                    });
                })
            } else {console.log("no user");}
        })  
        callback();     
    })
}

//After Request is Sent, disables the make-a-request button
function makeARequestButtonDone() {
    $("#first").html("Request Sent");
    $("#first").prop("disabled", true);
}

//Request pop-up window for make-a-request button
function attachMakeRequestButtonEvent() {
    $('button.make-request').on('click', (event) => {
        let name = $(event.currentTarget.parentNode).children()[0].innerText;
        $('#volunteerName').html("Send your request to " + name);
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