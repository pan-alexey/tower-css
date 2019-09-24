(function (window) {
    'use strict';
  
   
    //---------------------------------//
    var ripple = function(el,pos){

        if( el.matches(".disabled") )return;
        if( el.matches("[disabled]") )return;



        var style =  window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
        var d = Math.max( el.offsetWidth, el.offsetHeight) ;
        //-----------------------------------------------------//
        var ink =  document.createElement('div');
            ink.className = "@{_}ink";

        var rippleContainer =  document.createElement('div');
            rippleContainer.className = "ripple-container";
            rippleContainer.appendChild(ink);

        var rippleContent =  document.createElement('div');
            rippleContent.className = "@{_}ripple-content"; 
            //---- set style -----//
            rippleContainer.style.borderTopLeftRadius = style.borderTopLeftRadius || style.borderRadius;
            rippleContainer.style.borderTopRightRadius = style.borderTopRightRadius || style.borderRadius;
            rippleContainer.style.borderBottomLeftRadius = style.borderBottomLeftRadius || style.borderRadius;
            rippleContainer.style.borderBottomRightRadius = style.borderBottomRightRadius || style.borderRadius;

            rippleContent.appendChild(rippleContainer);
        el.insertBefore(rippleContent, el.firstChild);
        
        //-----------------------------------------------------//
        var html = document.documentElement;
        var body = document.body;
        var scrollTop = html.scrollTop || body && body.scrollTop || 0;
        var scrollLeft = html.scrollLeft || body && body.scrollLeft || 0;

        var x = pos.pageX - (el.getBoundingClientRect()).left - scrollLeft - d/2 ;
        var y = pos.pageY - (el.getBoundingClientRect()).top - scrollTop - d/2 ;

        ink.style.top = y + "px";
        ink.style.left = x + "px";
        ink.style.margin = 0;

        

        ink.style.background = el.getAttribute('ripple-color') ? el.getAttribute('ripple-color') :  style.color;



        //-------------------------------------------------------//
        ink.style.height = d + "px";
        ink.style.width = d + "px";
        
        var trensitionTrigger = false;
        ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"].forEach(function(transitionend){
            ink.addEventListener(transitionend, function(event){
                if(trensitionTrigger) return; 
                trensitionTrigger = true;
                //el.removeChild(rippleContent);
            });
        });
        ink.addClass('@{_}animate' );

    }

    //-------------------------------------------------------------//
    document.addEventListener('touchstart', function(event) {
        if(event.touches.length >= 1) { return; }
        var el = event.target.closest(".@{_}ripple");
        if( el == null )  { return; }
        ripple(el,event.touches);
    });
    document.addEventListener('mousedown', function(event) {
        var el = event.target.closest(".@{_}ripple");
        if( el == null )  { return; }
        ripple(el,event);
    });
    //-------------------------------------------------------------//







})(window);