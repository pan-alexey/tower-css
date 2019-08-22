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

    var clamp = function (value, limit) {
        if (typeof limit == 'undefined') { limit = [0, 100]; }
        return value > limit[1] ? limit[1] : value < limit[0] ? limit[0] : value;
    }






    function open(carusel, index){


        index = index < 0;
        var collection = [];
        for (var i = 0; i < carusel.querySelectorAll('.carusel-item').length; i++) {
            collection[i] = carusel.querySelectorAll('.carusel-item')[i];

        }

        if(collection.length - 1  )

    }

    




    var $carusel = null;
    var $item = null;
    var $width = null;


    var $collection = [];
    var $index = null;
    var $before = null;
    var $after = null;






    var $action = {
        start: function (element, points) {
            $carusel = element.closest(".@{_}carusel");
            $item = element.closest(".@{_}carusel-item");
            $width = $carusel.getBoundingClientRect().width;
        },
        // wrap action to debounce function
        move: debounce(function (element, points) {
            if(!$carusel ) return;
        }, 40 ),
        end: function (element, points) {
            if(!$carusel ) return;
            $carusel.removeClass("@{_}active");
            $carusel = null;
        }
    }




// // Проверяем DOM
// // Переделать чтобы складывалось ощущение что слайд наезжает
//     var open = function(carusel, index){
//         var onTransitionEnd = ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"]
//         var item = carusel.querySelectorAll('.carusel-item.@{_}front')[0];
        
        
//         // onTransitionEnd.forEach(function(transitionend){
//         //     $item.removeEventListener(transitionend, transitionEnd);
//         // });
//     }

// //carusel
// //item
// //collection


//     var $starX = 0;
//     var $carusel = null;
//     var $item = null;
//     var $width = null;
//     var $x = 0;

//     var $collection = [];
//     var $index = 0;
//     var $back = 0;


//     var $action = {
//         start: function (element, points) {
//             $starX = parseInt( points[0].pageX );
//             $carusel = element.closest(".@{_}carusel-block");
//             $item = element.closest(".@{_}carusel-item");
//             $width = $carusel.getBoundingClientRect().width;
//             $x = 0;

//             $carusel.addClass("@{_}active");
//             $item.addClass("@{_}front");

//             for (var i = 0; i < $carusel.querySelectorAll('.carusel-item').length; i++) {
//                 $collection[i] = $carusel.querySelectorAll('.carusel-item')[i];
//                 $carusel.querySelectorAll('.carusel-item')[i].style.left = "";
//                 if($item == $carusel.querySelectorAll('.carusel-item')[i]){
//                     $index = i;
//                     continue;
//                 }
//                 $carusel.querySelectorAll('.carusel-item')[i].removeClass("@{_}front");
//             }

//         },
//         // wrap action to debounce function
//         move: function (element, points) {
//             if(!$carusel ) return;
//             $x = parseInt( points[0].pageX ) - $starX;

//             $item.style.left = $x + "px";

//             prew = $index - 1 < 0 ? $collection.length - 1 : $index- 1;
//             next = $index + 1 >= $collection.length ? 0 : $index + 1 ;
//             $back = $x < 0 ? next : prew;

//             for (let i = 0; i < $collection.length; i++) {
//                 if( i == $back ) {
//                     $collection[i].addClass("@{_}back");
//                 }else{
//                     $collection[i].removeClass("@{_}back");
//                 }
//             }

//             // ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"].forEach(function(transitionend){
//             //     $item.removeEventListener(transitionend, transitionEnd);
//             // });
//         },
//         end: function (element, points) {
//             if(!$carusel ) return;
//             $carusel.removeClass("@{_}active");


//             var percent = ( 100 * $x / $width );


//             open();



//             // if( Math.abs(percent) < 20 ){
//             //     $item.style.left = "0px";
//             //     ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"].forEach(function(transitionend){
//             //         $item.addEventListener(transitionend, function(event){
//             //             $collection.forEach(function(element){
//             //                 element.style.left = "0px";
//             //                 element.removeClass("@{_}back");
//             //             })
//             //         });
//             //     });
//             //     return;
//             // }


            
//         }
//     };
//     //=======================================================//

//             //element.removeClass("@{_}front");
//             // ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"].forEach(function(transitionend){
//             //     element.addEventListener(transitionend, function(event){
//             //         element.removeClass("@{_}front");
//             //         // $collection.forEach(function(el){
//             //         //     el.removeClass("@{_}back");
//             //         // });
//             //     });
//             // });





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