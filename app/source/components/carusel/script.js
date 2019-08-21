/*
element.addEventListener("change", function(e){});
window["@{_}carusel"] = function(element, prop){}
*/

/*
    Слайдер пересчитывает значения в процентах, и все манипуляции производятся в процентах
    Если необходимо пересчитывать в зависимости от значения, необходимо делать функцию обертку
    С функцией оберткой функционал становиться шире.
*/

(function (window) {
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






//carusel
//item
//collection


    var $starX = 0;
    var $carusel = null;
    var $item = null;
    var $width = null;
    var $x = 0;

    var $collection = [];
    var $index = 0;



    var $action = {
        start: function (element, points) {
            $starX = parseInt( points[0].pageX );
            $carusel = element.closest(".@{_}carusel-block");
            $item = element.closest(".@{_}carusel-item");
            $width = $carusel.getBoundingClientRect().width;
            $x = 0;


            $carusel.addClass("@{_}active");
            $item.addClass("@{_}front");


            for (var i = 0; i < $carusel.querySelectorAll('.carusel-item').length; i++) {

                if($item == $carusel.querySelectorAll('.carusel-item')[i]){
                    
                }
                // $collection.push( $carusel.querySelectorAll('.carusel-item')[i]  );
                // $carusel.querySelectorAll('.carusel-item')[i].style.left = "";
                // if($item == $carusel.querySelectorAll('.carusel-item')[i]){
                //     $active = i;
                // }
            }


            // var index = 0;
            // for (var i = 0; i < $carusel.querySelectorAll('.carusel-item').length; i++) {
            //     $collection.push( $carusel.querySelectorAll('.carusel-item')[i]  );
            //     $carusel.querySelectorAll('.carusel-item')[i].style.left = "";
            //     if($item == $carusel.querySelectorAll('.carusel-item')[i]){
            //         $active = i;
            //     }
            // }
            // $collection[$active].removeClass("@{_}back");
            // $collection[$active].addClass("@{_}front");
        },
        // wrap action to debounce function
        move: function (element, points) {
            if(!$carusel ) return;
            $x = parseInt( points[0].pageX ) - $starX;

            $item.style.left = $x + "px";




            // prew = $active - 1 < 0 ? $collection.length - 1 : $active - 1;
            // next = $active + 1 >= $collection.length ? 0 : $active + 1 ;
            // $index = x < 0 ? next : prew;
            // for (let i = 0; i < $collection.length; i++) {
            //     if( i !== $index ) $collection[i].removeClass("@{_}back");
            // }
            // $collection[$index].addClass("@{_}back");
        },
        end: function (element, points) {
            if(!$carusel ) return;


            $carusel.removeClass("@{_}active");




            // var x =  parseInt( points[0].pageX ) - $starX;
            // var width = $carusel.getBoundingClientRect().width;
            // var percent = ( 100 * x / width );
            // if( Math.abs(percent) < 20 ){
            //     $collection[$active].style.left = "0px";
            //     return;
            // }
            // $collection[$active].style.left = percent < 0  ? "-100%" : "100%";
            // $collection.forEach(function(el){el.removeClass("@{_}back");});
        }
    };
    //=======================================================//

            //element.removeClass("@{_}front");
            // ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"].forEach(function(transitionend){
            //     element.addEventListener(transitionend, function(event){
            //         element.removeClass("@{_}front");
            //         // $collection.forEach(function(el){
            //         //     el.removeClass("@{_}back");
            //         // });
            //     });
            // });





    //=======================================================//
    var $touches = [];
    var $element = null;
    //event wrapper for touch
    document.addEventListener('touchstart', function (event) {

        var carusel = event.target.closest(".@{_}carusel");
        var target = event.target;


        if (carusel == null) { return; }
        if ($touches.length > 1) return; //limit 2 point for tocuh devices

        // disable browser custom drag and drop
        carusel.ondragstart = function () { return false; };
        carusel.gesturechange = function () { return false; };

        if ($element != null && $element != carusel) { return; }
        $element = carusel;
        event.preventDefault();
        for (var i = 0; i < event.changedTouches.length; i++) {
            var id = event.changedTouches[i].identifier;
            if ($touches.indexOf(id) == -1) { $touches.push(id); } //uniq
        }
        var points = [];
        for (var i = 0; i < event.touches.length; i++) {
            var id = event.touches[i].identifier;
            if ($touches.indexOf(id) >= 0) {
                points.push(event.touches[i]);
            }
        }
        $action.start(target, points);
        //------------------------------------------------------//
        function move(event) {
            event.preventDefault();
            if ($element == null) { return; }
            points = [];
            for (var i = 0; i < event.touches.length; i++) {
                var id = event.touches[i].identifier;
                if ($touches.indexOf(id) >= 0) {
                    points.push(event.touches[i]);
                }
            }
            $action.move(target, points);
        };
        //------------------------------------------------------//
        function end(event) {
            //event.preventDefault();
            var endTouches = [];
            for (var i = 0; i < event.touches.length; i++) {
                var id = event.touches[i].identifier;
                if ($touches.indexOf(id) >= 0) { endTouches.push(id); }
            }
            $touches = endTouches;
            if ($touches.length <= 0) {
                cancel();
                return;
            }
        };
        //------------------------------------------------------//
        function cancel() {
            $action.end(target, points);
            $element = null;
            document.removeEventListener('touchcancel', cancel, false);
            document.removeEventListener('resize', cancel, false);
            document.removeEventListener('touchend', end, false);
            document.removeEventListener('touchmove', move, false);
        }
        //------------------------------------------------------//
        document.addEventListener('touchmove', move, false);
        document.addEventListener('touchend', end, false);
        document.addEventListener('touchcancel', cancel, false);
        document.addEventListener('resize', cancel, false);
    });
    //=======================================================//


    document.addEventListener('mousedown', function (event) {
        var carusel = event.target.closest(".@{_}carusel");
        if (carusel == null) { return; }
        var target = event.target;
        event.preventDefault();
        // disable browser drag and drop
        carusel.ondragstart = function () { return false; };

        var points = [];
        points.push(event);
        $action.start(target, points);
        //----------------------------------------------//
        function move(event) {
            event.preventDefault();
            points = [];
            points.push(event);
            $action.move(target, points);
        };
        //----------------------------------------------//
        function end(event) {
            event.preventDefault();

            $action.end(target, points);
            document.removeEventListener("mousemove", move);
            document.removeEventListener('mouseup', end);
        };
        //----------------------------------------------//
        document.addEventListener("mousemove", move);
        document.addEventListener('mouseup', end);
    });



















})(window);