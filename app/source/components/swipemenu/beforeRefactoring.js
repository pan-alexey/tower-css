
(function (window) {
    'use strict';
    

    // swipermenu не работает:
    // если был скролл больше 40px;
    // если Math.abs(x) >= Math.abs(y/2)

    var $param = {
        blindZone : 50,
        tan : 2,
        exclude : [
            ".@{_}slider",
            ".@{_}swipermenu-exclide",
            "input",
            "textarea"
        ]
    };

    var clamp = function (value, limit) {
        if (typeof limit == 'undefined') { limit = [0, 100]; }
        return value > limit[1] ? limit[1] : value < limit[0] ? limit[0] : value;
    }








    //-----------------------------------------------//
    var getContentLeft = function(element){
        var left = 0;
        var limit = 0;
        var leftPercent = 0;
        var rightPercent = 0;
        if(element.querySelectorAll('.swipemenu-content').length){
            var content = element.querySelectorAll('.swipemenu-content')[0];
            left = window.getComputedStyle ? getComputedStyle(content).left : content.currentStyle.left;
            left = parseInt(left);
            var leftBlock = content.querySelectorAll('.swipemenu-block[data-swipemenu="left"]').length ? content.querySelectorAll('.swipemenu-block[data-swipemenu="left"]')[0] : null;
            var rightBlock = content.querySelectorAll('.swipemenu-block[data-swipemenu="right"]').length ? content.querySelectorAll('.swipemenu-block[data-swipemenu="right"]')[0] : null;
            var limitLeft = leftBlock ? (window.getComputedStyle ? getComputedStyle(leftBlock).width : leftBlock.currentStyle.width) : 0;
                limitLeft = parseInt(limitLeft);
            var limitRight = rightBlock ? (window.getComputedStyle ? getComputedStyle(rightBlock).width : rightBlock.currentStyle.width) : 0;
                limitRight = parseInt(limitRight);

            leftPercent = left > 0 ? Math.abs(100*left/limitLeft) : 0;
            rightPercent = left < 0 ? Math.abs(100*left/limitRight) : 0;

            limit = [-limitRight, limitLeft];
        }
        return {left, leftPercent, rightPercent, limit};
    }
    //-----------------------------------------------//
    var setContentLeft = function(element, left, limit){
        if(element.querySelectorAll('.swipemenu-content').length){
            var content = element.querySelectorAll('.swipemenu-content')[0];
            //get  swipemenu blocks
            if(!left){
                content.style.left = left + 'px';
                return left;
            }
            left =  clamp(left, limit );
            content.style.left = left + 'px';
            return left;
        }
        return 0;
    }
    //-------------------------------------------------------------------------------------------------//
    var setBackdrop =  function(element, percent){
        if(element.querySelectorAll('.@{_}swipemenu-backdrop').length){
            var backdrop = element.querySelectorAll('.@{_}swipemenu-backdrop')[0];
            backdrop.style.opacity = percent/100;
        }
    }





    // event function (для дополнительной манипуляции с dom)
    var onStartChange = function(element){
    }

    var onChange = function(element){
        $element.addClass('@{_}active');
        // setBackdrop($element, percent);
        // console.log(percent, match);
    }

    var onChangeEnd = function(element,percent, match){
        $element.addClass('@{_}active');
    }

    var onClose = function(element){
        setContentLeft($element,0); // close swipemenu
        setBackdrop($element, 0);
        $element.removeClass('@{_}active');
        
    }


    //В момент действительного открытия, необходимо html джобавить класс, в котором запрещенны все скролы;
    //var root = document.getElementsByTagName( 'html' )[0]; 
    var $element = null;
    var $contentStorage = {};
    var $changeCount = 0;
    var $action = {
        start : function(distance, target){

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
            $element.addClass('@{_}change');
            $changeCount = 0;

            $contentStorage = getContentLeft($element);
            onStartChange($element);
        },
        move : function(distance){
            if(!$element) return;
            var left = $contentStorage.left + distance;
            var prop = setContentLeft($element, left, $contentStorage.limit);
            if(prop){ 
                $changeCount++ ;
                onChange($element);
            }
        },
        end : function(distance, target){
            if(!$element) return;
            $element.removeClass('@{_}change');
            $changeCount = 0;

            var contentLeft = getContentLeft($element);
            if ( contentLeft.leftPercent && contentLeft.rightPercent ) {
                onClose($element);
                return;
            }
            var match = contentLeft.leftPercent > contentLeft.rightPercent ? 'left' : 'right';
            var diff = match == 'left' ?  contentLeft.leftPercent - $contentStorage.leftPercent : contentLeft.rightPercent - $contentStorage.rightPercent;
            if(  Math.abs(diff) < 10 ){
                setContentLeft($element,$contentStorage.left, $contentStorage.limit);
                if(!$contentStorage.left){  $element.removeClass('@{_}active'); }
                return;
            }
            if( diff > 0 ){
                setContentLeft($element, match == 'left' ? 10000 : -10000, $contentStorage.limit);
                setBackdrop($element, 100);
            }else{
                onClose($element); 
            }
        },
        up : function(target){
            if(!$element) return;
            if(!target.closest('.@{_}swipemenu-backdrop')) return;

            console.log($changeCount)
            if($changeCount < 1){
                onClose($element);
            }
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

        var target = event.target;
        var point = event.touches[0];
        var distance = 0;


        // Exclude
        // ---------------------//
        for (var i = 0; i < $param.exclude.length; i++) {
            if( target.closest($param.exclude[i]) ) return;
        }
        // --------------------//


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
            if (trigger == 1) {
                $action.move(-distance);
                return;
            }
            if (Math.max(x, y) >= $param.blindZone) {
                trigger = $param.tan * x <= y ? -1 : 1;
                if (trigger == 1) {
                    point = event.touches[0];
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


        //----------------------------------------------//
        function move(event) {
            if (trigger == -1) return;

            var x = Math.abs(point.clientX - event.clientX);
            var y = Math.abs(point.clientY - event.clientY);
            distance = point.clientX - event.clientX;

            if (trigger == 1) {
                $action.move(-distance);
                return;
            }

            if (Math.max(x, y) >= $param.blindZone) {
                trigger = $param.tan * x <= y ? -1 : 1;
                if (trigger == 1) {
                    point = event;
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