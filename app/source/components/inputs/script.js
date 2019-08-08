(function (window) {
    'use strict';


    document.addEventListener('focus', function(event) {
        var el = event.target.closest(".@{_}input-block");
        if(!el) return;
        el.addClass('@{_}focus' );
    },true);



    document.addEventListener('blur', function(event) {
        var el = event.target.closest(".@{_}input-block");
        if(!el) return;
        el.removeClass('@{_}focus' );

        var input = el.querySelectorAll('input')[0] ? el.querySelectorAll('input')[0].value : false;
        var textarea = el.querySelectorAll('textarea')[0] ? el.querySelectorAll('textarea')[0].value : false;

        if( input || textarea) {
            el.addClass('@{_}valid' );
        }else{
            el.removeClass('@{_}valid' );
        }
    },true);



    // Textarea Max Size;
    var change = function(event){
        var element = event.target;
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        var style =  window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
        var minHeight = parseInt( style.minHeight);
        var maxRow = element.getAttribute("row-max") ? element.getAttribute("row-max") : 1;

        // clear height;
        element.style.height = minHeight + "px";
        var height = element.scrollHeight;
        var line =  Math.floor( height / minHeight  );

        line = line > maxRow ? maxRow : line;
        element.style.height = Math.floor( line * minHeight ) +'px';
        if( Math.floor(height/minHeight) > line ) {
            element.style.overflow = "auto";
        }else{
            element.style.overflow = "hidden";
        }
    }

    document.addEventListener('change', change, true);
    document.addEventListener('input', change, true);
    document.addEventListener('input', change, true);
    document.addEventListener('keydown', change, true); // fix for IE9

    
})(window);