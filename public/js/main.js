var count = 0;

var items = [
    {
        id: 1,
        color: 'green',
        publishedDate: '2015-10-03'
    },
    {
        id: 2,
        color: 'green',
        publishedDate: '2015-12-22'
    },
    {
        id: 3,
        color: 'blue',
        publishedDate: '2016-02-15'
    },
    {
        id: 4,
        color: 'pink',
        publishedDate: '2016-04-25'
    },
    {
        id: 5,
        color: 'green',
        publishedDate: '2016-05-02'
    },
    {
        id: 6,
        color: 'blue',
        publishedDate: '2016-10-07'
    },
    {
        id: 7,
        color: 'pink',
        publishedDate: '2016-11-13'
    },
    {
        id: 8,
        color: 'blue',
        publishedDate: '2016-12-01'
    }
];


$(document).ready(function(){

    $('#load-more').click(function(){
        hideMenu();
    });
    $('#hide-details').click(function(){
        hideDetails();
    });
    bindThumbnailEvent();

    testMix();
});


var testMix = function(){
    var container = document.querySelector('[data-ref="container"]');
    var firstGap = document.querySelector('[data-ref="first-gap"]');

    $.get( "http://localhost:3030/object/0", function( data ) {
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
                target: function(item) {
                    return '<div class="box mix ' + item.color + '" data-ref="item"><img src="'+ item.thumbnail + '" /></div>';
                }
            }
        });
        mixer.dataset(data)
            .then(function(state) {
                console.log('loaded ' + state.activeDataset.length + ' items');
            });
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

var hideMenu = function(){
    console.log("Hiding Menu..");
    var menu = $('#menu');
    menu.addClass('left-closed');
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

