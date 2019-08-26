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
    //-----------------------------------//
    function clamp(value, limit) {
        if (typeof limit == 'undefined') { limit = [0, 100]; }
        return value > limit[1] ? limit[1] : value < limit[0] ? limit[0] : value;
    }
    //-----------------------------------//



    var $onAnimation = [
        "webkitTransitionEnd", 
        "otransitionend", 
        "oTransitionEnd", 
        "msTransitionEnd", 
        "transitionend"
    ];


    




    var $carusel = null;
    var $collection = [];
    var $active = 0;
    var $index = 0;
    var $width = 0;

    
    var $action = {
        start: function (element, points) {
            $carusel = element.closest(".@{_}carusel");
            if( $carusel.hasClass("@{_}progress") ) return;
            $carusel.addClass("@{_}action");

            
            //-------------------------------------------------------------------------//

            $collection = [];
            $active = 0;
            $index = 0;
            $width = 0;

            for (var i = 0; i < $carusel.querySelectorAll('.carusel-item').length; i++) {
                $collection[i] = $carusel.querySelectorAll('.carusel-item')[i];
                if( $collection[i].hasClass('active') ){$active = i;} 
            }
            //-------------------------------------------------------------------------//
            $collection[$active].addClass("active");
            $collection.forEach(function(element, i){
                element.removeClass("right");
                element.removeClass("left");
                element.style.transform = "";
                if( i!=$active )  element.removeClass("active");
            });
            //-------------------------------------------------------------------------//

            $s = 0;
            $x = parseInt( points[0].pageX );
            $width = $carusel.getBoundingClientRect().width;
        },
        // wrap action to debounce function
        move: function (element, points) {
            if($carusel == null ) return;
            if( $carusel.hasClass("@{_}progress") ) return;
            $carusel.removeClass("@{_}action");
            $s =  parseInt( points[0].pageX ) - $x; 



            $s = clamp($s, [-$width, $width]) ;
            if( $s > 0){
                $index = $active - 1 < 0 ? $collection.length - 1 : $active - 1;
                $collection[$index].addClass("left");
            } else{
                $index = $active + 1 >= $collection.length ? 0: $active + 1;
                $collection[$index].addClass("right");
            }

            for (let i = 0; i < $collection.length; i++) {
                if (i!=$index) {
                    $collection[i].removeClass("left");
                    $collection[i].removeClass("right");
                }
            }
            $collection[$index].style.transform = "translateX("+$s+"px)";
            //$collection[$active].style.transform = "translateX("+$s+"px)";
            

        },
        end: function (element, points) {
            if($carusel == null ) return;
            $carusel.addClass("@{_}progress");
            $carusel.removeClass("@{_}action");

            if( Math.abs($s/$width) < 0.1 ){
                $s = 0;
                $collection[$index].style.transform = "translateX("+$s+"px)";
                $onAnimation.forEach(function(onEvent){
                    $collection[$index].addEventListener(onEvent, cancel, false);
                });
            } else{
                $s = $s > 0 ? $width : -$width;
                $collection[$index].style.transform = "translateX("+$s+"px)";
                $onAnimation.forEach(function(onEvent){
                    $collection[$index].addEventListener(onEvent, action, false);
                });
            }



            //-----------------------------------------------------//
            function action(event){
                if( $carusel == null ) return;
                $carusel.removeClass("@{_}progress");
                $onAnimation.forEach(function(onEvent){
                    event.target.removeEventListener(onEvent, action);
                });
                $collection[$index].style.transform = "";
                $collection[$index].addClass("active");
                $collection.forEach(function(element, i){
                    element.removeClass("right");
                    element.removeClass("left");
                    element.style.transform = "";
                    if(i!==$index) element.removeClass("active");
                });
                $carusel=null;
            }
            //-----------------------------------------------------//
            function cancel(event){
                if( $carusel == null ) return;
                $carusel.removeClass("@{_}progress");
                $onAnimation.forEach(function(onEvent){
                    event.target.removeEventListener(onEvent, cancel);
                });
                $collection.forEach(function(element, i){
                    element.removeClass("right");
                    element.removeClass("left");
                    element.style.transform = "";
                });
                $carusel=null;
            }
            //-----------------------------------------------------//



        }
    }





    // function _open(prop = {
    //     carusel : null,
    //     rule : "auto",
    //     collection : [],
    //     active : 0,
    //     index : 0
    // }){


    //     /*
    //     $collection[$index].style.transform = "translateX(0px)";
    //     $collection[$index].addClass("active");
    //     $collection.forEach(function(element, i){
    //         element.removeClass("right");
    //         element.removeClass("left");
    //         element.style.transform = "translateX(0px)";
    //         if(i!==$index)  element.removeClass("active");
    //     });
    //     */

    // }


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








            /*
            $carusel.removeClass("@{_}progress");
            $collection[$index].style.transform = "";
            $collection[$index].addClass("active");

            $collection.forEach(function(element, i){
                element.removeClass("right");
                element.removeClass("left");
                element.style.transform = "";
                if(i!==$index) element.removeClass("active");
            });
            */







/*
setTimeout(function(){
    var carusel = document.querySelectorAll(".carusel")[0];
    open(carusel, 1);
}, 1000);


setTimeout(function(){
    var carusel = document.querySelectorAll(".carusel")[0];
    open(carusel, 3);
    console.log("3")
}, 10000);


setTimeout(function(){
    var carusel = document.querySelectorAll(".carusel")[0];
    open(carusel, 0);
    console.log("0")
}, 15000);
*/



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



/*
function open(carusel, index){
    if( carusel.querySelectorAll('.carusel-item').length <= 0) return;
    if( carusel.hasClass("action") ) return ;
        
    var block = carusel.querySelectorAll('.carusel-block')[0];
    carusel.addClass("action");

    var collection = [];
    var active = 0;
    for (var i = 0; i < carusel.querySelectorAll('.carusel-item').length; i++) {
        collection[i] = carusel.querySelectorAll('.carusel-item')[i];
        if( collection[i].hasClass('active') ){active = i;} 
    }
    collection[active].addClass("active");
    index = clamp(index, [0, collection.length - 1] );
    if(index == active) return;

    collection.forEach(function(element){
        element.removeClass("right");
        element.removeClass("left");
    });

    if(active > index ){
        collection[index].addClass("left");
        block.style.transform = "translateX(100%)";
    }else{
        collection[index].addClass("right");
        block.style.transform = "translateX(-100%)";
    }

    var action = function(event){
        carusel.removeClass("action");
        block.style.transform = "translateX(0)";
        collection[index].addClass("active");


        // collection.forEach(function(element, i){
        //     element.removeClass("right");
        //     element.removeClass("left");
        //     if(i!==index)  element.removeClass("active");
        // });
        // collection[index].addClass("active");

        
        block.removeEventListener(event.type,action);
    }
    var event = ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"];
    event.forEach(function(onEvent){
        block.addEventListener(onEvent, action);
    });
}
*/

/*

    var $carusel = null;
    var $block = null;
    var $collection = [];
    

    var $active = 0;
    var $index = null;
    var $width = 0;
    var $x = 0;
    var $s = 0;

    var $action = {
        start: function (element, points) {
            $carusel = element.closest(".@{_}carusel");
            //если у нас произходит анимация, то не обрабатываем 
            if($carusel.hasClass("@{_}action")) return;


            $block = element.closest(".@{_}carusel-block");




            $block.style.transform = "translateX(0px)";
            element.closest(".@{_}carusel-item").addClass('active');


            $width = $carusel.getBoundingClientRect().width;
            $s = 0;
            $x = parseInt( points[0].pageX );


            

            for (var i = 0; i < $carusel.querySelectorAll('.carusel-item').length; i++) {
                $collection[i] = $carusel.querySelectorAll('.carusel-item')[i];
                if( $collection[i].hasClass('active') ){$active = i;} 
            }
            // clear old active element
            for (let i = 0; i < $collection.length; i++) {
                if(i != $active) { $collection[i].removeClass("active");}
                $collection[i].removeClass("right");
                $collection[i].removeClass("left");
            }


        },
        // wrap action to debounce function
        move: debounce(function (element, points) {
            if(!$block ) return;
            $s =  parseInt( points[0].pageX ) - $x;
            $s = clamp($s, [-$width, $width]) ;
            if($s == 0 ) return;

            $block.style.transform = "translateX("+$s+"px)";

            //слево на право
            if($s > 0){
                $index = $active - 1 < 0 ? $collection.length - 1 : $active - 1;
                $collection[$index].addClass("left");
                $collection.forEach(element => {
                    element.removeClass("right");
                });
            }else{
                $index = $active + 1 >= $collection.length ? 0: $active + 1;
                $collection[$index].addClass("right");
                $collection.forEach(element => {
                    element.removeClass("left");
                });
                
            }

            
        }, 40 ),
        end: function (element, points) {
            if(!$block ) return;
            //open($carusel, $index);


            //$block.style.transform = "translateX(0)";

            if($active > $index ){
                $block.style.transform = "translateX(-100%)";
            }else{
                $block.style.transform = "translateX(100%)";
            }

            for (let i = 0; i <   $collection.length; i++) {
                $collection[i].removeClass("left");
                $collection[i].removeClass("right");
                if( i == $index ){
                    $collection[i].addClass("active");
                }else{
                    $collection[i].removeClass("active");
                }
            }
            $block.style.transform = "translateX(0)";



            $active = 0;
            $collection = [];
            $carusel = null;
            $block = null;
        }
    }

    */