$(document).ready(function() {
    $("#bars").on("click", showNav);
    $("#navPopupBack").on("click", hideNav);
    $("#navPopUp").on("click", hideNav);
    //media query: hides the navPopUp if window size > 766px
    window.matchMedia("(min-width: 766px)").addListener(hideNav);

    function showNav() {
        $(".navbar").css("display", "none");
        $(".main-content").css("display", "none");
        $("#navPopUp").css("display", "block");  
    }

    function hideNav() {
        $(".navbar").css("display", "flex");
        $(".main-content").css("display", "block");
        $("#navPopUp").css("display", "none");  
    }
})

