

$(document).ready(function(){

    var height = $(window).height();
    var width = $(window).width();

    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            console.log("Loading more...");
        }
    });


    // $("body").mousemove(function(e){
    //     var mouseX = e.pageX - $(window).scrollTop();
    //     var mouseY = e.pageY - $(window).scrollLeft();
    //
    //     var fullScreen = $('#full-screen');
    //
    //     var newValueX = mouseX*1.5 - parseInt(fullScreen.css('width'))/4;
    //     var newValueY = mouseY*1.5 - parseInt(fullScreen.css('height'))/4;
    //
    //    // console.log("moving to: " + newValueX + " with width: " + fullScreen.css('width') + " and " + fullScreen.width());
    //
    //     if(newValueX >= fullScreen.css('width')){
    //         newValueX = fullScreen.css('width');
    //     }
    //
    //     if(newValueY >= fullScreen.css('height')){
    //         newValueY = fullScreen.css('height');
    //     }
    //
    //
    //     fullScreen.css("top", -newValueY + "px");
    //     fullScreen.css("left", -newValueX + "px");
    // });
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
    var fullscreen = $('#full-size');
    thumbnails.click(function(){
        _this = this;
        var img = new Image();
        var src = $(_this).data('bg').slice(0, -5) + "10.jpg";

        $('<img src="'+ src +'">').load(function() {
            this.width = this.width-225;
            var _imgsrc = this;
            fullscreen
                .fadeOut(200, function() {
                    fullscreen.html(_imgsrc);
                })
                .fadeIn(200);
        });
    });
};

