var count = 72;


$(document).ready(function(){

    $('#load-more').click(function(){
        loadMore(10);
    });

    CreateMix(0);
});


var loadMore = function(plusCount){
    count+=plusCount;
    doneTyping();
};

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
    var searchString = $('#search').val();
    CreateMix(searchString);
};


var CreateMix = function(searchString){

    var params = {
        count: count,
        search: searchString
    };


    $.post("http://localhost:3030/object", params, function(data) {

        console.log(data);

        var container = document.querySelector('[data-ref="container"]');
        var firstGap = document.querySelector('[data-ref="first-gap"]');

        var mixer = mixitup(container, {
            selectors: {
                target: '[data-ref="item"]' // Query targets with an attribute selector to keep our JS and styling classes seperate
            },
            layout: {
                siblingAfter: firstGap // Ensure the first "gap" element is known to mixitup incase of insertion into an empty container
            },
            data: {
                uidKey: '_id' // Our data model must have a unique id. In this case, its key is 'id'
            },
            render: { // We must provide a target render function incase we need to render new items not in the initial dataset (not used in this demo)
                target: function (item) {
                    return '<div class="box mix ' +
                        item.color + '" data-ref="item"><img src="' +
                        item.thumbnail + '" data-bg="'+ item.thumbnail +
                        '" data-title="' + item.title  + '" /></div>';
                }
            }
        });

        mixer.dataset(data)
            .then(function (state) {
                console.log('loaded ' + state.activeDataset.length + ' items');
            });

        if(data.length==0){
            ('.hovernails').html("<h2>Nothing found</h2>")
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
    var thumbnails = $('.hovernails img');
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

