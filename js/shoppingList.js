$(document).ready(() =>{
    //Text Input
    $("#listEntry").on('keydown', inputEnterKey);
    //Edit Button
    $("#editList").on('click', addRemoveItemEvent);
    //Add-item Button
    $("#addToList").on("click", addToList);
    //Save List Button
    $("#submitList").on("click", saveListToCurrentList);



    ////////////////////////
    //Below are functions
    ///////////////////////
    
    //input values are submitted by pressing enter key
    function inputEnterKey(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            addToList();
        }
    }

    //Add input to llist <li>
    function addToList() {
        let item = $("#listForm").serializeArray();
        if(item[0].value)
            $(".current-list-group").append('<li class="list-group-item">' + item[0].value + '</li>');
        $("#listEntry").val("");
        activateDeleteButton();
    }

    //Activates the inactive delete button
    function activateDeleteButton() {
        if($("#currentList").children().length == 1)
            $("#editList").prop("disabled", false);

    }

    //Saves the list to the database as user/uid/shoppingList/currentList/ array list[]
    function saveListToCurrentList() {
        auth.onAuthStateChanged((user) =>{
            if (user) {
                let arr = [];
                //obtains all child nodes of the list.
                let temp = Object.values($("#currentList").children());
                //clear list and also add the size of list as length : size
                Object.keys(temp).forEach((item) => {
                    if (temp[item].innerText !== undefined) 
                        arr.push(temp[item].innerText)
                })
                db.collection('user').doc(user.uid).collection('shoppingList').doc('currentList').set({list : arr});
            }
        });
    }
    
    //addRemoveItemEvent handles the events of the editList button
    function addRemoveItemEvent() {
        $("#listEntry").prop('disabled', true);
        let img = '<img style="float:right" src="img/delete.png">';
        $(".list-group-item").append(img)
        $(".list-group-item").on("click", function() {
            this.remove();
            let listSize = $("#currentList").children().length;
            if (listSize == 0) {
                $("#editListOff").click();
                $("#editList").prop("disabled", true);
            }
        });
        $("#editList").off();
        $("#editList").attr('id', 'editListOff');
        $('#editListOff').on('click', removeEvent);

        function removeEvent() {
            $("#listEntry").prop('disabled', false);
            $(".list-group-item").children().remove();
            $(".list-group-item").off();
            $("#editListOff").attr('id', 'editList');
            $("#editList").on('click', addRemoveItemEvent);
        }
    }
    
})