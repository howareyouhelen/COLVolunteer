$(document).ready(()=>{
//document ready
showCurrentList();

$('button.make-request').on('click', () => {
    showCurrentList();
})

    

//document ready end
})


function showCurrentList() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList').onSnapshot(function (snap) {
                $("#currentList").html('');
                let data = snap.data();
                for (let i = 0; i < data.length; i++)
                    $("#currentList").append('<li class="list-group-item">' + data[i] + '</li>');
            })
        }
    })
}