$(document).ready(() =>{
    // $( window ).on( "load", function() {
    //Text Input
    $("#listEntry").on('keydown', inputEnterKey);
    //Edit Button
    $("#editList").on('click', addRemoveItemEvent);
    //Add-item Button
    $("#addToList").on("click", addToList);
    //Save List Button
    $("#submitList").on("click", saveListToCurrentList);

    showCurrentList();
    ////////////////////////
    //Below are functions
    ///////////////////////

    //Put shopping list on Make-A-Request popup window --- by reading from database: user/shoppingList/currentList/list arr[]
    function showCurrentList() {
        auth.onAuthStateChanged((user) => {
            if (user) {
                let my = db.collection('user').doc(user.uid);
                my.collection('shoppingList').doc('currentList').onSnapshot(function (snap) {
                    $("#currentList").html('');
                    let data = snap.data();
                    if(data) {
                        for (let i = 0; i < data.list.length; i++)
                            $("#currentList").append('<li class="list-group-item">' + data.list[i] + '</li>');
                            activateDeleteButton();
                    }
                })
            }
        })
    }
        
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
        if($("#currentList").children().length != 0)
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
    
    //addRemoveItemEvent handles the events of the editList button (delete list)
    function addRemoveItemEvent() {
        console.log("click")
        $("#listEntry").prop('disabled', true);
        $("#addToList").prop('disabled', true);
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
            $("#addToList").prop('disabled', false);
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
                    console.log("success! apocalypse list added.");
                    // show success msg
                    $("#success_bar").show();
                    $("#main-content-title").hide();
                    showCurrentList();
                    activateDeleteButton();
                    setTimeout(function(){
                        $("#success_bar").hide();
                        $("#main-content-title").show();
                    }, 4000);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }
        });
    }

    $("#mobile").click(function () {
        console.log("secret easter egg activated...");
        sequence_index = 0;
        //calling function that sets bunny max count to 15
        zombiebunny();
    });


    // for mobile default taphold threshold = 750
    // $(document).on('pagebeforeshow', '#body', function(){ 
    //     $('#navbarSupportedContent').bind('taphold', function(e) {
    //         console.log("taphold is detected");
    //         zombiebunny();
    //         e.preventDefault();
    //         return false;
    //     } );
    // });
    // ---------------------------------------------------------- EASTER EGG ENDS ----------------------------------------------------------
})
