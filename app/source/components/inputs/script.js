(function (window) {
    'use strict';


    document.addEventListener('focus', function(event) {
        let el = event.target.closest(".@{_}input-block");
        if(!el) return;
        el.addClass('@{_}focus' );
    },true);







    document.addEventListener('blur', function(event) {
        let el = event.target.closest(".@{_}input-block");
        if(!el) return;
        el.removeClass('@{_}focus' );

        let input = el.querySelectorAll('input')[0] ? el.querySelectorAll('input')[0].value : false;
        let textarea = el.querySelectorAll('textarea')[0] ? el.querySelectorAll('textarea')[0].value : false;

        if( input || textarea) {
            el.addClass('@{_}valid' );
        }else{
            el.removeClass('@{_}valid' );
        }
    },true);


    document.addEventListener('input', function(event) {
        let el = event.target.closest(".@{_}input-block");
        if(!el) return;
        let input = el.querySelectorAll('input')[0] ? el.querySelectorAll('input')[0].value : false;
        let textarea = el.querySelectorAll('textarea')[0] ? el.querySelectorAll('textarea')[0].value : false;

        if( input || textarea) {
            el.addClass('@{_}valid' );
        }else{
            el.removeClass('@{_}valid' );
        }
    });






    // Textarea Max Size;
    let change = function(event){
        let element = event.target;
        if (event.target.tagName.toLowerCase() !== 'textarea') return;
        let style =  window.getComputedStyle ? getComputedStyle(element) : element.currentStyle;
        let minHeight = parseInt( style.minHeight);
        let maxRow = element.getAttribute("row-max") ? element.getAttribute("row-max") : 1;

        // clear height;
        element.style.height = minHeight + "px";
        let height = element.scrollHeight;
        let line =  Math.floor( height / minHeight  );

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
    document.addEventListener('keydown', change, true); // fix for IE9

    
})(window);