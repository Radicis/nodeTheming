var count = 60;
var searchString = "";

$(document).ready(function(){

    $(window).scroll(function () {
        //if you hard code, then use console
        //.log to determine when you want the
        //nav bar to stick.
        console.log($(window).scrollTop())
        if ($(window).scrollTop() > 180) {
            $('#controls').addClass('fixed');
        }
        if ($(window).scrollTop() < 181) {
            $('#controls').removeClass('fixed');
        }
    });


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

    // Clear existing items
    $('#collage').html("");

    Populate(params);
};


var AppendMix = function(){

    var params = {
        count: count,
        search: searchString,
        skip: count
    };

    Populate(params);


};

var Populate = function(params){
    $.post("http://localhost:3030/object", params, function(data) {

        var collage = $('#collage');

        // Destroy existing mixitup instance if exists
        try{
            collage.mixItUp('destroy');
        }
        catch(err){}

        var container = document.querySelector('[data-ref="container"]');

        data.forEach(function(item){
            var html = '<a class="mix ' + item.color + '" data-ref="item"  data-lightbox="'+ item._id + '"' +
                ' href="' +  item.thumbnail.slice(0, -5) + "10.jpg" + '"><img src="' +
                item.thumbnail + '" data-bg="'+ item.thumbnail +
                '" data-title="' + item.title + '"/></a>';
            collage.append(html);
        });

        mixitup(container, {
            animation: {
                animateResizeContainer: false,
                effects: 'fade rotateX(-45deg) translateY(-10%)'
            }
        });

        var loadMore = $('#load-more');

        // If there are no objects returned then remove the more button
        if(data.length==0){
            loadMore.fadeOut();
        }

        if($('#collage > a').length == 0){
            collage.html("<div>Nothing found</div>")
            loadMore.fadeOut();
        }
        else{
            count += data.length;
            loadMore.fadeIn();
        }
    });
};

