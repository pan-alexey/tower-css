(function (window) {

    
    var $param = {
        blindZone : 40,
        transition: 200,
        tan : 2,
    };

    var onAnimation = [
        "webkitTransitionEnd", 
        "otransitionend", 
        "oTransitionEnd", 
        "msTransitionEnd", 
        "transitionend"
    ];

  //-----------------------------------//
  function debounce(func, ms) {
      let isCooldown = false;
      return function () {
          if (isCooldown) return;
          func.apply(this, arguments);
          isCooldown = true;
          setTimeout(() => isCooldown = false, ms);
      };
  }
  //-----------------------------------//
  function clamp(value, limit) {
      if (typeof limit == 'undefined') { limit = [0, 100]; }
      return value > limit[1] ? limit[1] : value < limit[0] ? limit[0] : value;
  }
//-----------------------------------//


var getState = function(carusel){
    var active = 0;
    var collection = [];
    var element = null;
    var width = carusel.getBoundingClientRect().width;
    for (var i = 0; i < carusel.querySelectorAll('.carusel-item').length; i++) {
        collection[i] = carusel.querySelectorAll('.carusel-item')[i];
        if( collection[i].hasClass('active') ){
            active = i;
        } 
    }
    element = collection[active];
    element.addClass("active");
    collection.forEach(function(element, i){
        element.removeClass("right");
        element.removeClass("left");
        element.addClass("pass");
        element.style.transform = "";
        element.style.transition =  "";
        if( i!= active ) {
            element.removeClass("active");
        } 
    });
    var prew = active - 1 < 0 ? collection.length - 1 : active - 1;
        prew = clamp(prew, [0, collection.length-1]);
    var next = active + 1 >= collection.length ? 0: active + 1;
        next = clamp(next, [0, collection.length-1]);
    return {
        active,
        collection,
        element,
        prew,
        next,
        width
    }
};





var moveNext = function(distance, collection, next, opacity){
    collection[next].addClass("next");
    collection.forEach( function(element, index){
        if(index!==next){element.removeClass("next");}
        element.removeClass("prew");
    });
    collection[next].style.transform = "translateX("+distance+"px)";
    collection[next].style.msTransform  = "translateX("+distance+"px)";




}
var movePrew = function(distance, collection, next){
    collection[next].addClass("prew");
    collection.forEach( function(element, index){
        if(index!==next){element.removeClass("prew");}
        element.removeClass("next");
    });
    collection[next].style.transform = "translateX("+distance+"px)";
    collection[next].style.msTransform  = "translateX("+distance+"px)";


}


var caruselCansel = function(state){



    onAnimation.forEach(function(onEvent){
        state.collection[state.active].addEventListener(onEvent, caruselEnd, false);
    });
    function caruselEnd(event){
        onAnimation.forEach(function(onEvent){
            event.target.removeEventListener(onEvent, caruselEnd);
        });
        var carusel = event.target.closest(".@{_}carusel");
        carusel.removeClass("animate");
    }

    state.collection[state.active].style.transition =  $param.transition+"ms ease transform";
    state.collection[state.prew].style.transition =  $param.transition+"ms ease transform";
    state.collection[state.next].style.transition =  $param.transition+"ms ease transform";
    state.collection[state.active].style.transform =  "";
    state.collection[state.prew].style.transform =  "";
    state.collection[state.next].style.transform =  "";

    state.collection[state.active].style.msTransform  =  "";
    state.collection[state.prew].style.msTransform  =  "";
    state.collection[state.next].style.msTransform  =  "";


    //fix for ie <11
    // in future add js animation
    if (isIE () && isIE () <= 11) {
        onAnimation.forEach(function(onEvent){
            state.collection[state.active].removeEventListener(onEvent, caruselEnd);
        });
        var carusel = state.collection[state.active].closest(".@{_}carusel");
        carusel.removeClass("animate");
    }

}



var caruselNext = function(state){
    state.collection[state.active].style.transition =  $param.transition+"ms ease transform";
    state.collection[state.prew].style.transition =  $param.transition+"ms ease transform";
    state.collection[state.next].style.transition =  $param.transition+"ms ease transform";



    state.collection[state.active].style.transform =  "translateX(-"+state.width+"px)";
    state.collection[state.prew].style.transform =  "translateX(-"+state.width+"px)";
    state.collection[state.next].style.transform =  "translateX(-"+state.width+"px)";


    state.collection[state.active].style.msTransform  =  "translateX(-"+state.width+"px)";
    state.collection[state.prew].style.msTransform  =  "translateX(-"+state.width+"px)";
    state.collection[state.next].style.msTransform  =  "translateX(-"+state.width+"px)";

    var collection = state.collection;
    var index = state.next;
    onAnimation.forEach(function(onEvent){
        state.collection[state.active].addEventListener(onEvent, caruselEnd, false);
    });
    function caruselEnd(event){
        onAnimation.forEach(function(onEvent){
            event.target.removeEventListener(onEvent, caruselEnd);
        });
        var carusel = event.target.closest(".@{_}carusel");
        collection.forEach(function (element, i) {
            element.style.transition =  "";
            element.style.transform =  "";
            element.style.msTransform  =  "";

            element.removeClass("active");
            element.removeClass("next");
            element.removeClass("prew");
        })
        collection[index].addClass("active");
        carusel.removeClass("animate");
    }


    //fix for ie <11
    // in future add js animation
    if (isIE () && isIE () <= 11) {
        onAnimation.forEach(function(onEvent){
            state.collection[state.active].removeEventListener(onEvent, caruselEnd);
        });
        var carusel = state.collection[state.active].closest(".@{_}carusel");
        collection.forEach(function (element, i) {
            element.style.transition =  "";
            element.style.transform =  "";
            element.style.msTransform  =  "";

            element.removeClass("active");
            element.removeClass("next");
            element.removeClass("prew");
        })
        collection[index].addClass("active");
        carusel.removeClass("animate");
    }
}



var caruselPrew = function(state){
    state.collection[state.active].style.transition =  $param.transition+"ms ease transform";
    state.collection[state.prew].style.transition =  $param.transition+"ms ease transform";
    state.collection[state.next].style.transition =  $param.transition+"ms ease transform";
    state.collection[state.active].style.transform =  "translateX("+state.width+"px)";
    state.collection[state.prew].style.transform =  "translateX("+state.width+"px)";
    state.collection[state.next].style.transform =  "translateX("+state.width+"px)";

    state.collection[state.active].style.msTransform  =  "translateX("+state.width+"px)";
    state.collection[state.prew].style.msTransform  =  "translateX("+state.width+"px)";
    state.collection[state.next].style.msTransform  =  "translateX("+state.width+"px)";


    var collection = state.collection;
    var index = state.prew;
    onAnimation.forEach(function(onEvent){
        state.collection[state.active].addEventListener(onEvent, caruselEnd, false);
    });
    function caruselEnd(event){
        onAnimation.forEach(function(onEvent){
            event.target.removeEventListener(onEvent, caruselEnd);
        });
        var carusel = event.target.closest(".@{_}carusel");
        collection.forEach(function (element, i) {
            element.style.transition =  "";
            element.style.transform =  "";
            element.style.msTransform  =  "";

            element.removeClass("active");
            element.removeClass("next");
            element.removeClass("prew");
        })
        collection[index].addClass("active");
        carusel.removeClass("animate");
    }




        //fix for ie <11
    // in future add js animation
    if (isIE () && isIE () <= 11) {
        onAnimation.forEach(function(onEvent){
            state.collection[state.active].removeEventListener(onEvent, caruselEnd);
        });
        var carusel = state.collection[state.active].closest(".@{_}carusel");
        collection.forEach(function (element, i) {
            element.style.transition =  "";
            element.style.transform =  "";
            element.style.msTransform  =  "";

            element.removeClass("active");
            element.removeClass("next");
            element.removeClass("prew");
        })
        collection[index].addClass("active");
        carusel.removeClass("animate");
    }

}




var state = {};
var $action = {
    start : function(distance, carusel){


        carusel.addClass("animate");
        carusel.addClass("noscroll");

        state = getState(carusel);
        if(!state.element) return;
        distance = clamp(distance, [-state.width, state.width]);
        var rule = distance>0 ? "prew" : "next";
        state.element.style.transform = "translateX("+distance+"px)";
        state.element.style.msTransform  = "translateX("+distance+"px)";

        if( state.collection.length < 2) return;
        if( rule == "next"  ){
            moveNext(distance, state.collection, state.next,);
        }else{
            movePrew(distance, state.collection, state.prew);
        }
    },
    move : function(distance, carusel){
        distance = clamp(distance, [-state.width, state.width]);


        var rule = distance>0 ? "prew" : "next";
        state.element.style.transform = "translateX("+distance+"px)";
        state.element.style.msTransform  = "translateX("+distance+"px)";

        if( state.collection.length < 2) return;
        if( rule == "next"  ){
            moveNext(distance, state.collection, state.next, Math.abs(distance/state.width));
        }else{
            movePrew(distance, state.collection, state.prew, Math.abs(distance/state.width));
        }
    },
    end : function(distance, carusel){
        if(Math.abs(distance/state.width) < 0.2 || Math.abs(distance) < 80 || state.collection.length < 2  ){
            caruselCansel(state);
            state = {};
            return;
        }

        carusel.removeClass("noscroll");


        var rule = distance>0 ? "prew" : "next";
        if(rule=="next"){
            caruselNext(state);
            return;
        }
        if(rule=="prew"){
            caruselPrew(state);
            return;
        }




    },
    // dont start move
    up : function(distance, carusel){
       carusel.removeClass("noscroll");
       return;
    }
};












    // 0 - ready
    // 1 - move
    // -1 - disable move
    var trigger = 0;
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) return; // only single touch
        // ---------------------//

        var target = event.target.closest(".@{_}carusel");
        if(!target) return;
        if(target.hasClass("animate")) return;
        var point = event.touches[0];
        var distance = 0;
        var width = target.getBoundingClientRect().width;
        var offset = 0;



        var scrollsHits = 0;
        function scroll(e){
            if (trigger != 0) return;
            scrollsHits++;
            if(scrollsHits>=40){
                trigger = -1;
            }
        }

        function move(event) {
            if (trigger == -1) return;
            var x = Math.abs(point.clientX - event.touches[0].clientX);
            var y = Math.abs(point.clientY - event.touches[0].clientY);
            distance = point.clientX - event.touches[0].clientX;
            distance = distance + offset;
            distance = clamp(distance, [-width, width]) ;
           

            
            if (trigger == 1) {
                $action.move(-distance, target);
                return;
            }
            if (Math.max(x, y) >= $param.blindZone) {
                trigger = $param.tan * x <= y ? -1 : 1;
                if (trigger == 1) {
                    offset = -1 * distance;
                    $action.start(0, target);
                }
                return;
            }
        }
        function end(event) {
            $action.up(-distance, target);
            if (event.touches.length <= 0) {
                cancel();
                return;
            }
        }


        function cancel() {
            if (trigger == 1) {
                $action.end(-distance, target);
            }
            trigger = 0;
            document.removeEventListener('touchcancel', cancel, false);
            document.removeEventListener('resize', cancel, false);
            document.removeEventListener('touchend', end, false);
            document.removeEventListener('touchmove', move, false);
            document.removeEventListener('scroll', scroll, false);
        }
        document.addEventListener('touchmove', move, false);
        document.addEventListener('touchend', end, false);
        document.addEventListener('touchcancel', cancel, false);
        document.addEventListener('resize', cancel, false);


        document.addEventListener('scroll', scroll, true);
    });







    document.addEventListener('mousedown', function (event) {
        var point = event;
        var distance = 0;
        


        var target = event.target.closest(".@{_}carusel");
        if(!target) return;
        if(target.hasClass("animate")) return;

        var width = target.getBoundingClientRect().width;
        var offset = 0;
        //----------------------------------------------//
        function move(event) {
            if (trigger == -1) return;

            var x = Math.abs(point.clientX - event.clientX);
            var y = Math.abs(point.clientY - event.clientY);
            distance = point.clientX - event.clientX;
            distance = distance + offset;
            
            distance = clamp(distance, [-width, width]) ;


            if (trigger == 1) {
                $action.move(-distance, target);
                return;
            }

            if (Math.max(x, y) >= $param.blindZone) {
                trigger = $param.tan * x <= y ? -1 : 1;
                if (trigger == 1) {
                    offset = -1 * distance;
                    $action.start(0, target);
                }
                return;
            }
        };
        //----------------------------------------------//
        function end(event) {
            $action.up(-distance,target);
            if(trigger == 1){
                $action.end(-distance,target);
            }
            trigger = 0;
            document.removeEventListener("mousemove", move);
            document.removeEventListener('mouseup', end);
        };
        //----------------------------------------------//
        document.addEventListener("mousemove", move);
        document.addEventListener('mouseup', end);
    });
})(window);
