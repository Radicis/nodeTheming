var count = 60;
var searchString = "";

$(document).ready(function(){

    $('#load-more').click(function(){
        loadMore();
    });

    CreateMix(0);
});


$(window).scroll(function() {
    console.log("Scrolling..");
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        AppendMix();
    }
});

//setup before functions
var typingTimer;                //timer identifier
var doneTypingInterval = 1000;  //time in ms, 5 second for example
var $input = $('#search');

//on keyup, start the countdown
$input.on('keyup', function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

//on keydown, clear the countdown
$input.on('keydown', function () {
    clearTimeout(typingTimer);
});

var doneTyping = function(){
    searchString = $('#search').val();
    console.log("Searching for: " + searchString);
    CreateMix();
};




var CreateMix = function(){

    var params = {
        count: 60,
        search: searchString,
        skip: 0
    };

    $.post("http://localhost:3030/object", params, function(data) {

        try{
            $("div.mix").remove();
            var collage = $('#collage');
            collage.mixItUp('destroy');
        }
        catch(err){}

        var container = document.querySelector('[data-ref="container"]');

        data.forEach(function(item){
            var html = '<div class="mix ' +
                item.color + '" data-ref="item"><img src="' +
                item.thumbnail + '" data-bg="'+ item.thumbnail +
                '" data-title="' + item.title + '" /></div>';
            $('#collage').append(html);
        });

        var mixer = mixitup(container, {
            animation: {
                animateResizeContainer: false,
                effects: 'fade rotateX(-45deg) translateY(-10%)'
            }
        });

        if(data.length==0){
            ('.hovernails').html("<h2>Nothing found</h2>")
        }
        else{
            count += data.length;
        }

        bindThumbnailEvent();

    });
};


var AppendMix = function(){

    var params = {
        count: count,
        search: searchString,
        skip: count
    };

    $.post("http://localhost:3030/object", params, function(data) {

        try{
            $('#collage').mixItUp('destroy');
        }
        catch(err){}

        var container = document.querySelector('[data-ref="container"]');

        data.forEach(function(item){
            var html = '<div class="mix ' +
                item.color + '" data-ref="item"><img src="' +
                item.thumbnail + '" data-bg="'+ item.thumbnail +
                '" data-title="' + item.title + '" /></div>';
            $('#collage').append(html);
        });

        var mixer = mixitup(container, {
            animation: {
                animateResizeContainer: false,
                effects: 'fade rotateX(-45deg) translateY(-10%)'
            }
        });

        if(data.length==0){
            ('.hovernails').html("<h2>Nothing found</h2>")
        }
        else{
            count += data.length;
        }

        bindThumbnailEvent();

    });


};

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
    var thumbnails = $('.mix img');
    var details = $('#details');
    var fullscreen = $('#full-size');
    thumbnails.click(function(){
        _this = this;
        var img = new Image();
        var src = $(_this).data('bg').slice(0, -5) + "10.jpg";

        $('<img src="'+ src +'">').load(function() {
            var _imgsrc = this;
            fullscreen
                .fadeIn(200, function() {
                    fullscreen.html(_imgsrc);
                    fullscreen.click(function(){
                        closeFullSize();
                    })
                });

        });
    });
};

var closeFullSize = function(){
    var fullscreen = $('#full-size');
    fullscreen
        .fadeOut(200, function() {
            fullscreen.html("");
            fullscreen.unbind('click');
        });
};

