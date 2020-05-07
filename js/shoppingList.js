$(document).ready(function() {
    $("#addToList").on("click", function() {
        let item = $("#listForm").serializeArray();
        if(item[0].value)
        $(".current-list-group").append('<li class="list-group-item">' + item[0].value + '</li>');
        $("#listEntry").val("");
        removeListItem();
    })

    $("#submitList").on("click", saveListToCurrentList);
    function saveListToCurrentList() {
        auth.onAuthStateChanged(function (user) {
            if (user) {
                let list = $("#currentList").children();
                db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList').set({length:list.length});
                Object.keys(list).forEach(function (item) {
                    if (list[item].innerText !== undefined) {
                        db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList').update({
                            [item] :list[item].innerText
                        });
                    }
                })
            }
        });
    }
    //Functions
    // function getitems
    
    function removeListItem() {
        $(".list-group-item").on("click", function() {
            this.remove();
        })
    }





})