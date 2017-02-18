

$(document).ready(function(){
    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $("body").mousemove(function(e){
        var pageX = e.pageX - (($(window).width()+300) / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newValueX = width * pageX * -2 - 25;
        var newValueY = height * pageY * -2 - 50;
        var fullScreen = $('#full-screen');
        fullScreen.css("top", newValueY+"px");
        fullScreen.css("left", newValueX+"px");
    });
});


var addCustomField = function(){
    var currentCount = $('.customField').length;
    console.log("Adding field: " + currentCount);
    var customFields = $('#customFields');
    var html = '<div class="form-group row customField">';
    html += '<div class="col-md-2"><input class="form-control" name="field_' + currentCount  + '_label" type="text" /></div>';
    html += '<div class="col-md-10"><input class="form-control"  name="field_' + currentCount  + '_ref" type="text" /></div></div>';
    customFields.append(html);
};
