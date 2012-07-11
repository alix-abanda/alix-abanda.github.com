var content;
var inner;
var customResizeHeight;
var customResizeHeightInner;
var scrolling;
var api = [];
var throttleTimeout;
var emailLink = decodeURIComponent('%3Ca%20%68%72ef%3D%22%26%23109%3Ba%26%23105%3B%6c%26%23116%3B%26%23111%3B%3A%26%2397%3B%26%23108%3B%26%23105%3B%26%23120%3B%26%2346%3B%26%2397%3B%26%2398%3B%26%2397%3B%26%23110%3B%26%23100%3B%26%2397%3B%26%2364%3B%26%23103%3B%26%23109%3B%26%2397%3B%26%23105%3B%26%23108%3B%26%2346%3B%26%2399%3B%26%23111%3B%26%23109%3B%22%3Ea%6c%69%78%2eaba%6eda%40%67%6da%69%6c%2ec%6f%6d%3C%2fa%3E');
var phoneNumber = decodeURIComponent('06%2063%2012%2059%2062');

function centerAll() {
    // Set the #content height
    var windowHeight = $(window).height() - 72- 3 - 40;
    content.height(windowHeight);
    customResizeHeight.css('height', windowHeight);
    customResizeHeightInner.css('height', windowHeight - 10);

    // Center .inner elements
    inner.each(function() {
        var innerHeight = $(this).height();
        if (windowHeight - innerHeight < 0) {
            innerHeight = windowHeight;
        }
        $(this).css('padding-top', (windowHeight - innerHeight) / 2);
    });
}

$(window).resize(function() {
    centerAll();

    if (scrolling.size() > 0 && api.length > 0) {
        if ($.browser.msie) {
            // IE fires multiple resize events while you are dragging the browser window which
            // causes it to crash if you try to update the scrollpane on every one. So we need
            // to throttle it to fire a maximum of once every 50 milliseconds...
            if (!throttleTimeout) {
                throttleTimeout = setTimeout(function() {
                    $(api).each(function() {
                        this.reinitialise();
                    });
                    throttleTimeout = null;
                }, 50);
            }
        } else {
            $(api).each(function() {
                this.reinitialise();
            });
        }
    }
});

$(document).ready(function() {
    content = $('#content');
    inner = content.find('.inner');
    customResizeHeight = $('.customResizeHeight');
    customResizeHeightInner = $('.customResizeHeightInner');
    scrolling = $('.scrolling');

    if ($(".scrollable").size() > 0) {
        var horizontal = $(".scrollable").scrollable().navigator(".navi");
        horizontal.eq(0).data("scrollable").focus();
    }
    $('#slider').nivoSlider({
        manualAdvance: true
    });
    centerAll();

    // Scroll
    if (scrolling.size() > 0) {
        scrolling.each(function() {
            $(this).jScrollPane({
                hideFocus: true,
                verticalDragMinHeight: 40,
                verticalDragMaxHeight: 40
            });
            api.push($(this).data('jsp'));
        })
    }
    
    $('#emailAdress').html(emailLink);
    $('#phoneNumber').html(phoneNumber);
    
    window.setTimeout(centerAll, 10);
});
