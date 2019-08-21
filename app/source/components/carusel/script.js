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


    var $carusel = null;
    var $starX = 0;
    var $action = {
        start: function (element, points) {
            $carusel = element.closest(".@{_}carusel");
            $starX = parseInt( points.pageX );

            console.log("carusel move" ,  points);
        },
        // wrap action to debounce function
        move: debounce(function (element, points) {
            if(!$carusel ) return;

            //console.log( $starX - parseInt(points.pageX) );


            //console.log("carusel move" , element , points);
        }, 40),

        end: function (element, points) {
            if(!$carusel ) return;
            



            console.log("carusel move" , element , points);
            $carusel = null;
            $starX = 0
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