
(function (window) {
    'use strict';
    

    // swipermenu не работает:
    // если был скролл больше 40px;
    // если Math.abs(x) >= Math.abs(y/2)
    
    var $param = {
        blindZone : 40,
        tan : 2,
    };

    //========================================================================//
    var clamp = function (value, limit) {
        if (typeof limit == 'undefined') { limit = [0, 100]; }
        return value > limit[1] ? limit[1] : value < limit[0] ? limit[0] : value;
    }

    function debounce(func, ms) {
        let isCooldown = false;
        return function () {
            if (isCooldown) return;
            func.apply(this, arguments);
            isCooldown = true;
            setTimeout(() => isCooldown = false, ms);
        };
    }
    //========================================================================//










    var move = function(distance, collection, active){


        
        collection[active].style.transform = "translateX("+distance+"px)";
        if(distance > 0){
            var index = active - 1 < 0 ? collection.length - 1 : active - 1;
            if(index==active) return;
            collection[index].addClass("left");
            for (let i = 0; i < collection.length; i++) {
                collection[i].removeClass("right");
                if(i!=index) collection[i].removeClass("left");
            }
        }else{
            var index = active + 1 >= collection.length ? 0: active + 1;
            if(index==active) return;
            collection[index].addClass("right");
            for (let i = 0; i < collection.length; i++) {
                collection[i].removeClass("left");
                if(i!=index) collection[i].removeClass("right");
            }
        }
        collection[index].style.transform = "translateX("+distance+"px)";
    }



    var $collection = [];
    var $active = 0;
    var $width = 0;


    var $action = {
        start : function(distance, carusel){

            
            $collection = [];
            $active = 0;
            $width = carusel.getBoundingClientRect().width;
            carusel.addClass('action');


            // active element;
            for (var i = 0; i < carusel.querySelectorAll('.carusel-item').length; i++) {
                $collection[i] = carusel.querySelectorAll('.carusel-item')[i];
                if( $collection[i].hasClass('active') ){$active = i;} 
            }
            $collection[ $active ].addClass('active');
            

            //clear old state
            for (let i = 0; i < $collection.length; i++) {
                var element = $collection[i];
                element.removeClass("next");
                if($active != i) element.removeClass("active");
            }
           

            move(distance, $collection, $active );


        },
        move : debounce(function(distance, carusel){

            move(distance, $collection, $active );
            //move(distance,  $collection, $active,);
            //console.log("move", carusel);
            //document.getElementById("log").innerHTML = "move: " + distance;



        },60),
        end : function(distance, carusel){
            //console.log("end", distance);
            //document.getElementById("log").innerHTML = "end: " + distance;




            return;
        },
        up : function(distance, carusel){
        //    console.log("up", distance);
        //    document.getElementById("log").innerHTML = "up" + distance;
           return;
        }
    };
    //-----------------------------------------------//







    // 0 - ready
    // 1 - move
    // -1 - disable move
    var trigger = 0;

    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) return; // only single touch
        // ---------------------//

        var target = event.target.closest(".@{_}carusel");
        if(!target) return;

        var point = event.touches[0];
        var distance = 0;
        var width = target.getBoundingClientRect().width;




        var scrollsHits = 0;
        function scroll(e){
            if (trigger != 0) return;
            scrollsHits++;
            if(scrollsHits>=20){
                trigger = -1;
            }
        }

        function move(event) {
            if (trigger == -1) return;
            var x = Math.abs(point.clientX - event.touches[0].clientX);
            var y = Math.abs(point.clientY - event.touches[0].clientY);
            distance = point.clientX - event.touches[0].clientX;

            distance = clamp(distance, [-width, width]) ;
           

            
            if (trigger == 1) {
                $action.move(-distance, target);
                return;
            }
            if (Math.max(x, y) >= $param.blindZone) {
                trigger = $param.tan * x <= y ? -1 : 1;
                if (trigger == 1) {
                    //point = event.touches[0];
                    //distance = point.clientX - event.touches[0].clientX;
                    $action.start(-distance, target);
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

        //----------------------------------------------//
        function move(event) {
            if (trigger == -1) return;

            var x = Math.abs(point.clientX - event.clientX);
            var y = Math.abs(point.clientY - event.clientY);
            distance = point.clientX - event.clientX;

            if (trigger == 1) {
                $action.move(-distance, target);
                return;
            }

            if (Math.max(x, y) >= $param.blindZone) {
                trigger = $param.tan * x <= y ? -1 : 1;
                if (trigger == 1) {
                    //point = event;
                    distance = point.clientX - event.clientX;
                    $action.start(-distance, target);
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