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









    var $starX = 0;
    var $carusel = null;
    var $collection = [];
    var $active = 0;
    var $index = 0;
    var $action = {
        start: function (element, points) {
            $starX = parseInt( points[0].pageX );
            $carusel = element.closest(".@{_}carusel-block");
            $carusel.addClass("@{_}active");
            var index = 0;
            for (var i = 0; i < $carusel.querySelectorAll('.carusel-item').length; i++) {
                $collection.push( $carusel.querySelectorAll('.carusel-item')[i]  );
                $carusel.querySelectorAll('.carusel-item')[i].style.left = '0';
                if(element == $carusel.querySelectorAll('.carusel-item')[i]){
                    $active = i;
                    $carusel.querySelectorAll('.carusel-item')[i].addClass("@{_}front");
                } else{
                    $carusel.querySelectorAll('.carusel-item')[i].removeClass("@{_}front");
                }
            }



        },
        // wrap action to debounce function
        move: debounce(function (element, points) {
            if(!$carusel ) return;
            var x =  parseInt( points[0].pageX ) - $starX;
            element.style.left = x + "px";

            //------------------------------------------//
            $collection.forEach(function(item){ item.removeClass("@{_}back"); });

            var indexAfter = $active + 1 > $collection.length-1 ? 0 : $active + 1;
            var indexBefore = $active - 1 < 0 ? $collection.length-1  : $active - 1;
            var $index = x > 0 ? indexBefore : indexAfter;
            $collection[ $index ].addClass("@{_}back");



            // var indexAfter = index + 1 > $collection.length-1 ? 0 : index + 1;
            // var indexBefore = index - 1 < 0 ? $collection.length-1  : index - 1;

            // $itemBefore = $collection[indexBefore];
            // $itemAfter = $collection[indexAfter];

            // if( x > 0 ){
            //     $itemBefore.addClass("@{_}back");
            // }else{
            //     $itemAfter.addClass("@{_}back");
            // }


        }, 40),
        end: function (element, points) {
            if(!$carusel ) return;
            $carusel.removeClass("@{_}active");

            var x =  parseInt( points[0].pageX ) - $starX;
            var width = $carusel.getBoundingClientRect().width;
            var percent = ( 100 * x / width );


            if( Math.abs(percent) < 20 ){
                element.style.left = "0px";
                return;
            }
            element.style.left = percent < 0  ? "-100%" : "100%";


            //element.removeClass("@{_}front");
            // ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"].forEach(function(transitionend){
            //     element.addEventListener(transitionend, function(event){
            //         element.removeClass("@{_}front");
            //         // $collection.forEach(function(el){
            //         //     el.removeClass("@{_}back");
            //         // });
            //     });
            // });
        }
    };
    //=======================================================//







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