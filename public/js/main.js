

$(document).ready(function(){

    var height = $(window).height();
    var width = $(window).width();

    $(window).scroll(function() {
        if($(window).scrollTop() == $(document).height() - $(window).height()) {
            console.log("Loading more...");
        }
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
    var thumbnails = $('.hovernails img');
    var fullscreen = $('#full-size');
    thumbnails.click(function(){
        _this = this;
        var img = new Image();
        var src = $(_this).data('bg').slice(0, -5) + "10.jpg";

        $('<img src="'+ src +'">').load(function() {
            var _imgsrc = this;
            fullscreen
                .fadeOut(200, function() {
                    fullscreen.html(_imgsrc);
                })
                .fadeIn(200);
        });
    });
};

