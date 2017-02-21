

$(document).ready(function(){

    var height = $(window).height();
    var width = $(window).width();

    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            console.log("Loading more...");
        }
    });


    $("body").mousemove(function(e){
        var mouseX = e.pageX - $(window).scrollTop();
        var mouseY = e.pageY - $(window).scrollLeft();

        var fullScreen = $('#full-screen');

        var newValueX = mouseX*1.5 - parseInt(fullScreen.css('width'))/4;
        var newValueY = mouseY*1.5 - parseInt(fullScreen.css('height'))/4;

       // console.log("moving to: " + newValueX + " with width: " + fullScreen.css('width') + " and " + fullScreen.width());

        if(newValueX >= fullScreen.css('width')){
            newValueX = fullScreen.css('width');
        }

        if(newValueY >= fullScreen.css('height')){
            newValueY = fullScreen.css('height');
        }


        fullScreen.css("top", -newValueY + "px");
        fullScreen.css("left", -newValueX + "px");
    });
    bindThumbnailEvent();
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


var bindThumbnailEvent = function(){
    var thumbnails = $('.hovernail');
    var fullscreen = $('#full-screen');
    thumbnails.click(function(){
        _this = this;
        var img = new Image();
        img.src = $(_this).data('bg').slice(0, -5) + "10.jpg";
        var imgWidth, imgHeight;
        img.onload = function(){
            imgWidth = this.width;
            imgHeight = this.height;
            fullscreen.css('width', imgWidth);
            fullscreen.css('height', imgHeight);
            fullscreen
                .fadeOut(200, function() {
                    fullscreen.css('background-image', "url("+$(_this).data('bg').slice(0, -5) + "10.jpg"+")");
                })
                .fadeIn(200);
        };
    });


};

