

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
        //
        // var top = $('#homepage-main').css("margin-top");
        //
        // console.log(top.slice(0, -2));
        //
        // $('#homepage-main').css("margin-top", newvalueY+40 + 100 +"px");
        // $('#homepage-main').css("margin-left", newvalueY+40 +"px");
    });

});


var addCustomField = function(){
    console.log("adding field");
    var customFields = $('#customFields');
    var html = '<div class="form-group row">';
    html += '<div class="col-md-2"><input class="form-control" type="text" /></div>';
    html += '<div class="col-md-10"><input class="form-control" type="text" /></div></div>';

    customFields.append(html);
};
