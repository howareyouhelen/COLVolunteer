$(document).ready(function() {
    $("#bars").on("click", showNav);
    $("#navPopupBack").on("click", hideNav);
    $("nav").on("click", hideNav);
    //media query: hides the navPopUp if window size > 766px
    window.matchMedia("(min-width: 766px)").addListener(hideNav);

    function showNav() {
        $("header").css("display", "none");
        $("main").css("display", "none");
        $("#navPopUp").css("display", "block");  
        $("footer").css("display", "none");  
    }

    function hideNav() {
        $("header").css("display", "flex");
        $("main").css("display", "block");
        $("#navPopUp").css("display", "none");  
        $("footer").css("display", "block");
    }
})

