$(document).ready(() =>{

    //Adds items to the list
    $("#addToList").on("click", () =>{
        let item = $("#listForm").serializeArray();
        if(item[0].value)
            $(".current-list-group").append('<li class="list-group-item">' + item[0].value + '</li>');
        $("#listEntry").val("");
        removeListItem();
    })

    $("#submitList").on("click", saveListToCurrentList);

    //Saves the list to the databas as user/uid/shoppingList/currentList { 1:item1,  2:item2, 3:item3, length:3}
    function saveListToCurrentList() {
        auth.onAuthStateChanged((user) =>{
            if (user) {
                //obtains all child nodes of the list.
                let list = $("#currentList").children();
                //clear list and also add the size of list as length : size
                db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList').set({length:list.length});
                Object.keys(list).forEach((item) => {
                    if (list[item].innerText !== undefined) {
                        db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList').update({
                            [item] :list[item].innerText
                        });
                    }
                })
            }
        });
    }
    
    //Removes list items
    function removeListItem() {
        $(".list-group-item").on("click", function() {
            this.remove();
        })
    }





})