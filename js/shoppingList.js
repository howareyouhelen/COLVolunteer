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

    // ---------------------------------------------------------- EASTER EGG BEGIN ----------------------------------------------------------
    // ↑ ↑ ↓ ↓ ← → ← → B A represented in js char code...
    var sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    sequence_index = 0;

    document.onkeyup = function (e) {
        if (e.keyCode === sequence[sequence_index]) {
            sequence_index++;
            
            if (sequence_index === sequence.length) {
                console.log("secret easter egg activated...");
                sequence_index = 0;
                //calling function that sets bunny max count to 15
                zombiebunny();
            }
        } else {
            sequence_index = 0;
        }
    };

    //
    zombiebunnyCount = 0;
    function zombiebunny(){
        console.log(zombiebunnyCount);
        if (zombiebunnyCount == 15){
            saveApocalypseList();
        }
        else if(zombiebunnyCount > 15){   
            return false
        }else{
        var randomTime = Math.floor(Math.random() * (300) * 2);
        setTimeout(function(){
            zombiebunnyCount = zombiebunnyCount +1;
            //call this until zombiebunnyCount reaches > 15
            jqueryzombie_bunny();
            zombiebunny();
        },randomTime);
        }
    }
    function jqueryzombie_bunny() {
       var zombiebunnyimg = $("<div class='zombie_bunny'></div>");
        $("#zombie_bunny_div").prepend(zombiebunnyimg);
        zombiebunnyimgX = Math.floor(Math.random() * $("#zombie_bunny_div").width());
        zombiebunnyimgSpd = Math.floor(Math.random() * (300) * 20);
        zombiebunnyimg.css({"left":zombiebunnyimgX+"px"});
        zombiebunnyimg.html('*');
        zombiebunnyimg.animate({
            top: "300px",
            opacity : "0",
        }, 3000, function(){
            $(this).remove();
        });
    }

    function saveApocalypseList(){
        auth.onAuthStateChanged((user) =>{
            if (user) {
                var itemArr = ["First-aid kit","hotpot supplies","water/water purifier","vitamins","food","capsule tent","internet","devices"];
                db.collection("user").doc(user.uid).collection("shoppingList").doc("currentList").set({
                    list : itemArr
                })
                .then(function() {
                    console.log("success! apocalypse list added.")
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }
        });
    }
    
    // ---------------------------------------------------------- EASTER EGG ENDS ----------------------------------------------------------
})