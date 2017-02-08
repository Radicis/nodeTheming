

$(document).ready(function(){
    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $("body").mousemove(function(e){
        var pageX = e.pageX - (($(window).width()+300) / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -2 - 25;
        var newvalueY = height * pageY * -2 - 50;
        $('#full-screen').css("top", newvalueY+"px")
        $('#full-screen').css("left", newvalueX+"px");
    });

});

