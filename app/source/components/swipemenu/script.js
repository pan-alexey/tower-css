
(function (window) {
    'use strict';
    

    // swipermenu не работает:
    // если был скролл больше 40px;
    // если Math.abs(x) >= Math.abs(y/2)
    
    var $param = {
        blindZone : 20,
        matageLength : 40,
        tan : 2,
        exclude : [
            ".@{_}slider",
            ".@{_}swipermenu-exclide",
            "input",
            "textarea"
        ]
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



    var openLeft = function(element, width){
        var state = getElementProp(element);
        if(!state.left) return;

        setX(element, state.left);
        setBackdrop(element, 1);
    }

    var openRight = function(element, width){
        var state = getElementProp(element);
        if(!state.right) return;

        setX(element, -state.right);
        setBackdrop(element, 1);
    }

    var close = function(element){
        element.removeClass('@{_}active');
        setBackdrop(element, 0);
        setX(element, 0);
    }


    var begin = function(element, state){
        element.addClass('@{_}active');
        element.addClass('@{_}change');

        
    }
    var change = function(element,state){
        var percent = 0;
        if(state.x > 0 && state.left){percent = Math.abs( state.x/state.left );}
        if(state.x < 0 && state.right){percent = Math.abs( state.x/state.right );}
        setBackdrop(element, percent);
    }


    var end = function(element, state){
        element.removeClass('@{_}change');
        //openLeft
        //openRight
        //close
    }





    




    var $element = null;
    var $change = 0;
    var $state = {};
    var $lastX = null;
    var $action = {
        start : function(distance, target){
            $change = 0;
            $lastX = null;
            // ---------------------------------------- //
            // -----  Get swipemenu element;  ----------//
            var stack = [];
            for (var i = 0; i < document.querySelectorAll('.swipemenu').length; i++) {
                var element = document.querySelectorAll('.swipemenu')[i];
                    element.removeClass('@{_}change');
                var  display = window.getComputedStyle ? getComputedStyle(element).display : element.currentStyle.display;
                if(display == 'none') continue;
                stack.push(element);
            }
            $element = stack.pop(); // last element dom
            stack.forEach(function(element){element.removeClass('@{_}active');});
            if(!$element) return;
            // ---------------------------------------- //

            $state = getElementProp($element);
            begin($element, $state); // ++++

        },
        move : debounce(function(distance){
            if(!$element) return;
            var x = parseInt( $state.x + distance );
                x = clamp(x, [-$state.right,$state.left] );
            if($lastX === x) return;
            $lastX = x;

            setX($element, x);
            var state = {
                x : x,
                right : $state.right,
                left : $state.left
            }
            change($element,state);

            $change++ ;
        },60),
        end : function(distance, target){
            if(!$element) return;
            $element.removeClass('@{_}change');
            $change = 0;
            var state = getElementProp($element);

            // Проработать логику перемещения сразу на 2 меню
            if(Math.abs(state.x) < $param.matageLength) {
                close($element);
                return;
            }

            // OLD STATE
            if( Math.abs($state.x - state.x) < $param.matageLength  ){
                if(!$state.x){
                    close($element);
                    return;
                }
                if($state.x > 0){
                    openLeft($element);
                    return;
                }
                if($state.x < 0){
                    openRight($element);
                    return;
                }
            }
            //---------------------------------//
            var left = state.x > 0 ? Math.abs($state.x - state.x) : 0;
            var right = state.x < 0 ? Math.abs($state.x - state.x): 0;
            if(left){
                if($state.x && ($state.x - state.x)>0    ){
                    close($element);
                    return;
                }
                openLeft($element);
                return;
            }
            if(right){
                if($state.x && ($state.x - state.x)<0 ){
                    close($element);
                    return;
                }
                openRight($element);
                return;
            }
            close($element);
            return;
        },
        up : function(target){
            if(!$element) return;
            if(!target.closest('.@{_}swipemenu-backdrop')) return;
            if($change < 1){
                close($element);
                $element = null;
            }
        }
    };
    //-----------------------------------------------//



    function setBackdrop(element, opacity){
        if(element.querySelectorAll('.swipemenu-backdrop').length){
            element.querySelectorAll('.swipemenu-backdrop')[0].style.opacity = opacity;
        }
    }

    function setX(element, x){
        //x =  clamp(x, [ -state.right, state.left] );
        if(element.querySelectorAll('.swipemenu-content').length){
            var content = element.querySelectorAll('.swipemenu-content')[0];
            content.style.left = x + 'px';
        }
    }


    function getElementProp(element){
        var x = 0;
        var left = 0;
        var right = 0;
        if(element.querySelectorAll('.swipemenu-content').length){

            var content = element.querySelectorAll('.swipemenu-content')[0];
            var leftBlock = content.querySelectorAll('.swipemenu-block[data-swipemenu="left"]').length ? content.querySelectorAll('.swipemenu-block[data-swipemenu="left"]')[0] : null;
            var rightBlock = content.querySelectorAll('.swipemenu-block[data-swipemenu="right"]').length ? content.querySelectorAll('.swipemenu-block[data-swipemenu="right"]')[0] : null;

            x = window.getComputedStyle ? getComputedStyle(content).left : content.currentStyle.left;
            x = parseInt(x);

            left = leftBlock ? (window.getComputedStyle ? getComputedStyle(leftBlock).width : leftBlock.currentStyle.width) : 0;
            left = parseInt(left);

            right = rightBlock ? (window.getComputedStyle ? getComputedStyle(rightBlock).width : rightBlock.currentStyle.width) : 0;
            right = parseInt(right);
        }
        return {
            x,
            left,
            right
        }
    }



    function checkContent(state, x){
        if(state) 

        return 0;
    }

    function getPercent(state){
        let result = {
            block : null,
            percent : 0
        }

    }





    // 0 - ready
    // 1 - move
    // -1 - disable move
    var trigger = 0;

    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) return; // only single touch
        // ---------------------//

        var target = event.target;
        var point = event.touches[0];
        var distance = 0;


        // Exclude
        // ---------------------//
        for (var i = 0; i < $param.exclude.length; i++) {
            if( target.closest($param.exclude[i]) ) return;
        }
        // --------------------//
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

            if (trigger == 1) {
                $action.move(-distance);
                return;
            }
            if (Math.max(x, y) >= $param.blindZone) {
                trigger = $param.tan * x <= y ? -1 : 1;
                if (trigger == 1) {
                    //point = event.touches[0];
                    distance = point.clientX - event.touches[0].clientX;
                    offset = -1 * distance;
                    $action.start(0, target);
                }
                return;
            }
        }
        function end(event) {
            $action.up(target);
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


        var target = event.target;
        // Exclude
        // ---------------------//
        for (var i = 0; i < $param.exclude.length; i++) {
            if( target.closest($param.exclude[i]) ) return;
        }
        // --------------------//
        var offset = 0;

        //----------------------------------------------//
        function move(event) {
            if (trigger == -1) return;

            var x = Math.abs(point.clientX - event.clientX);
            var y = Math.abs(point.clientY - event.clientY);
            distance = point.clientX - event.clientX;
            distance = distance + offset;
            if (trigger == 1) {
                $action.move(-distance);
                return;
            }

            if (Math.max(x, y) >= $param.blindZone) {
                trigger = $param.tan * x <= y ? -1 : 1;
                if (trigger == 1) {
                    distance = point.clientX - event.clientX;
                    offset = -1 * distance;
                    $action.start(0, target);
                }
                return;
            }
        };
        //----------------------------------------------//
        function end(event) {
            $action.up(target);
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