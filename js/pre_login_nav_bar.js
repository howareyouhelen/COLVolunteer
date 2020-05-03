$(document).ready(function() {
    console.log("ready");

    $("#bars").on("click", showNav);
    $("#navPopupBack").on("click", hideNav);
    $("nav").on("click", hideNav);

    function showNav() {
        $("header").css("display", "none");
        $("main").css("display", "none");
        $("#navPopUp").css("display", "block");  
    }

    function hideNav() {
        $("header").css("display", "flex");
        $("main").css("display", "block");
        $("#navPopUp").css("display", "none");  
    }
})

