/*
element.addEventListener("change", function(e){});
window["@{_}slider"] = function(element, prop){}
*/

/*
    Слайдер пересчитывает значения в процентах, и все манипуляции производятся в процентах
    Если необходимо пересчитывать в зависимости от значения, необходимо делать функцию обертку
    С функцией оберткой функционал становиться шире.
*/




(function (window) {
    'use strict';
    var sliderProps = {
        disable : false,
        slider : 'left',
        step:0, 
        min:0,
        max:100,
    }
    //------------- Helpers -------------//
    var toFloat = function(value){
        var result = parseFloat(value);
        return parseFloat( result.toFixed(6) );
    }
    var clamp = function(value,limit){
        if(typeof limit == 'undefined') { limit = [0, 100]; }
        return  value > limit[1] ? limit[1] : value < limit[0] ? limit[0] : value;
    }

    var getPoints = function(eventTouches, touchesId){
        var points = [];
        for (var i = 0; i < eventTouches.length ; i++) {
            if(touchesId.indexOf(eventTouches[i].identifier) >=0) { 
                points.push( eventTouches[i] );
            }
        }
        return points;
    }
    // Immutable merge simple objects
    var merge = function(a, b){
        var result = new Array();
        for (var key in a) { result[key] = a[key]; }
        for (var key in b) { result[key] = b[key]; }
        return result;
    }
    // Immutable combine objects
    var combine = function(a, b){
        var result = new Array();
        for (var key in a) {
            result[key] = a[key];
            if(b[key]){
                result[key] = b[key];
            }
        }
        return result;
    }
    // Immutable clone objects
    var clone = function(a){
        result = {};
        for (var key in a) {
            result[key] = a[key];
        }
        return result;
    }
    //------------------------------------------------------------//
    function debounce(func, ms) {
        let isCooldown = false;
        return function() {
          if (isCooldown) return;
          func.apply(this, arguments);
          isCooldown = true;
          setTimeout(() => isCooldown = false, ms);
        };
    }
    //------------------------------------------------------------//
    //--------------- DOM HELPERS  -------------------------------//
    var getElementProp = function(element){
        var result = {}
        result.width = (element.querySelector(".@{_}slider-content").getBoundingClientRect()).width;
        result.offset = (element.querySelector(".@{_}slider-content").getBoundingClientRect()).left +document.body.scrollLeft;
        result.handle =  (element.querySelector(".@{_}slider-handle").getBoundingClientRect()).width ;
        return result; //immutable obj;
    }
    var pointsRank = function(elementProp, points){
        var rank = [];
        points.forEach(function(point){
            rank.push(  100*toFloat(  (point-elementProp.offset)/elementProp.width) );
        });
        return rank.sort(function(a, b){return a - b;});
    }

    var getNear = function(rate,left,right){
        if ( left > rate) return 'left';
        if ( right < rate) return 'right';
        return ( Math.abs(rate - left) > Math.abs(rate - right) ) ?'right' : 'left';
    }
    //===================================================================================================//
    var render = function(element, slider){
        if( ["left","right","multi"].indexOf(slider) < 0 ) return;
        element.addClass('@{_}slider');
        element.setAttribute('data-range', slider);
        // Add slider-content element if not exist;
        if( element.querySelectorAll('.@{_}slider-content').length == 0 ){
            var div = document.createElement('div');
            div.className = '@{_}slider-content';
            element.appendChild(div);
        }
        // Add slider-bar element if not exist;
        if( element.querySelectorAll('.@{_}slider-content > .@{_}slider-bar').length == 0 ){
            var div = document.createElement('div');
            div.className = '@{_}slider-bar';
            for (var i = 0; i < element.querySelectorAll('.@{_}slider-content').length; i++) {
                element.querySelectorAll('.@{_}slider-content')[i].prepend(div);
            }
        }

        if( slider=="multi") {
            // Add slider-handle[data-handle="left"] element if not exist;
            if( element.querySelectorAll('.@{_}slider-content > .@{_}slider-handle[data-handle="left"]').length == 0 ){
                var div = document.createElement('div');
                div.className = '@{_}slider-handle';
                div.setAttribute('data-handle', 'left');
                for (var i = 0; i < element.querySelectorAll('.@{_}slider-content').length; i++) {
                    element.querySelectorAll('.@{_}slider-content')[i].appendChild(div);
                }
            }
            // Add slider-handle[data-handle="left"] element if not exist;
            if( element.querySelectorAll('.@{_}slider-content > .@{_}slider-handle[data-handle="right"]').length == 0 ){
                var div = document.createElement('div');
                div.className = '@{_}slider-handle';
                div.setAttribute('data-handle', 'right');
                for (var i = 0; i < element.querySelectorAll('.@{_}slider-content').length; i++) {
                    element.querySelectorAll('.@{_}slider-content')[i].appendChild(div);
                }
            }
        }
    }
    //===================================================================================================//
    var init = function(element, props){
        var result = merge(sliderProps, props);
        var slider = element.getAttribute('data-slider') ? element.getAttribute('data-slider') : result.slider;
        slider = new String(slider).toLowerCase();
        render(element,slider);
    }
    //===================================================================================================//
    var setup = function(element, props){
        var result = combine(sliderProps, props);
        //--------- get attr prop -------------//
        result.disable = element.getAttribute('data-disable') ? element.getAttribute('data-disable') : result.disable;
        result.disable = new String(result.disable).toLowerCase();

        result.slider = element.getAttribute('data-slider') ? element.getAttribute('data-slider') : result.slider;
        result.slider = new String(result.slider).toLowerCase();
        
        result.step =  element.getAttribute('data-step') ? element.getAttribute('data-step') : result.step;
        result.step = toFloat( result.step );

        result.min = element.getAttribute('data-min') ? element.getAttribute('data-min') : result.min;
        result.min = toFloat( result.min );

        result.max = element.getAttribute('data-max')? element.getAttribute('data-max') : result.max; 
        result.max = toFloat( result.max );

        if(result.slider == "multi"){
            result.left = element.getAttribute('data-left') ? element.getAttribute('data-left') : result.left;
            result.left = result.left ? result.left : result.min
            result.left = toFloat( result.left );

            result.right = element.getAttribute('data-right') ? element.getAttribute('data-right') : result.right;
            result.right = result.right ? result.right : result.max
            result.right = toFloat( result.right );
        }

        if(result.slider == "left" || result.slider == "right"){ 
            result.value = element.getAttribute('data-value') ? element.getAttribute('data-value') : result.value;
            result.value = result.value ? result.value : result.min;
            result.value = toFloat( result.value );
        }

        return result;
    }
    //===================================================================================================//
    //muttable obj
    var change = function(prop, element, rank, elementProp){
        if(prop.slider == "multi"){
            var offset = elementProp ? toFloat( 100*(elementProp.handle / elementProp.width)/2 ) : 0;





            if(rank && rank.length == 1){
                prop._general =  prop._general ? prop._general : getNear(rank[0],prop.left,prop.right); 
                prop.left =  ( prop._general=='left')  ? rank[0] + offset :  prop.left ; //+ state._sliderRank/2
                prop.right = ( prop._general=='right') ? rank[0] - offset :  prop.right ; //- state._sliderRank/2

                // collision
                if(prop._general=='left'){ prop.right = (prop.left > prop.right) ? prop.left : prop.right; }
                if(prop._general=='right'){ prop.left = (prop.left >= prop.right) ? prop.right : prop.left; }
            }
            
            if(!rank || rank.length > 1){
                prop.left =  rank[0] + offset;
                prop.right = rank[1] - offset;
                prop.right = (prop.left > prop.right) ? prop.left : prop.right;
            }

            prop.left = clamp(prop.left,[prop.min, prop.max]);
            prop.right = clamp(prop.right,[prop.min, prop.max]);



            for (var i = 0; i < element.querySelectorAll('[data-handle="left"]').length; i++) {
                element.querySelectorAll('[data-handle="left"]')[i].style.left = prop.left+"%";
            }
            for (var i = 0; i < element.querySelectorAll('[data-handle="right"]').length; i++) {
                element.querySelectorAll('[data-handle="right"]')[i].style.right =  (100 - prop.right)+"%";
            }
        }
    }
    var save = function(sliderProp, element){
        for (var key in sliderProp) {
            if (key[0]=='_') continue;
            if(typeof sliderProp[key] === 'function') continue;
            if(typeof sliderProp[key] === 'object') continue;
            var name = 'data-'+key.split(/(?=[A-Z])/).join('-').toLowerCase();
            element.setAttribute(name, sliderProp[key]);
        }
        return sliderProp;
    }

    //===================================================================================================//
    var elementProp = {}; // Dom element properties;
    var sliderProp = {}; // session properties (muttable object);
    let action = {
        start : function(element, points){
            // init touches & calc rank

            //document.body.style.overflow = 'hidden';
            init(element);
            elementProp = getElementProp(element);
            var pointX = points.map(function(point){ return toFloat( point.pageX) });
            var rank = pointsRank(elementProp, pointX);
            sliderProp = setup(element, {});
            change(sliderProp, element, rank , elementProp); // mutable

            //change(sliderProp, element)
        },
        move : debounce(function(element, points){
            // calc rank
            var pointX = points.map(function(point){ return toFloat( point.pageX) });
            var rank = pointsRank(elementProp, pointX);
            change(sliderProp, element, rank , elementProp);
            //change(sliderProp, element)

        }, 30),
        end : function(element, points){
            // calc rank

            //document.body.style.overflow = 'visible';
            var pointX = points.map(function(point){ return toFloat( point.pageX) });
            var rank = pointsRank(elementProp, pointX);
            save(sliderProp, element);
            // sestroy init touches
            elementProp = {};
            sliderProp = {};
        },
    }
























    //----------- touch events  ------------//
    var touchesId = []; // point id;
    var touchPoints = []; // points
    var touchElement = null; // event target elemet eho was start event
    
    document.addEventListener('touchstart', function(event) {
        var slider = event.target.closest(".@{_}slider");
        if( !slider )  { return; }
        // disable browser custom drag and drop
        slider.ondragstart = function() {return false;};
        slider.gesturechange = function() {return false;};

        // if start event other slider
        if( touchElement!=null && slider!= touchElement) {return;}

        touchElement = slider;

        event.preventDefault();
        // Add touch points to array;
        // event.changedTouches is collection;
        for (var i = 0; i < event.changedTouches.length; i++) {
            var id = event.changedTouches[i].identifier;
            if(touchesId.indexOf(id) == -1) { touchesId.push(id); } //uniq id
        }
        // start width points
        touchPoints =  getPoints(event.touches, touchesId); //muttable points
        action.start(touchElement, touchPoints);
        //----------------------------------------------------------------//
        //--------------------- events functions--------------------------//
        function eventMove(event){
            event.preventDefault();
            if( touchElement==null) {return;}
            touchPoints = getPoints(event.touches, touchesId); //muttable points
            action.move(touchElement, touchPoints);
        }
        function eventEnd(event){
            event.preventDefault();
            // Reitin touchesId
            var endTouches = [];
            for (var i = 0; i < event.touches.length ; i++) {
                var id = event.touches[i].identifier;
                if(touches.indexOf(id) >=0) { endTouches.push(id); }
            }
            touchesId = endTouches;
            if( touchesId.length<=0 ){
                eventCancel();
                return;
            }
        };
        function eventCancel(event){
            action.end(touchElement,touchPoints);
            touchElement = null;
            document.removeEventListener('touchcancel', eventCancel, false);
            document.removeEventListener('resize', eventCancel, false);
            document.removeEventListener('touchend', eventEnd, false);
            document.removeEventListener('touchmove', eventMove, false); 
        };
        //--------------------- events functions--------------------------//
        //----------------------------------------------------------------//
        document.addEventListener('touchmove', eventMove, false); 
        document.addEventListener('touchend', eventEnd, false); 
        document.addEventListener('touchcancel', eventCancel, false);
        document.addEventListener('resize', eventCancel, false);
    });
    //----------/ touch events  ------------//
})(window);






// window["@{_}slider"]({
//     element : '#selector', //DOM or Selector
//     range:"multi",  
//     min:"0",
//     max:"100" ,
//     step: '1',
//     start : function(){
//     },
//     change: function(){
//     }
// });