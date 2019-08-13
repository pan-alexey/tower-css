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




















    var $action = {
        start: function (element, points) {


            var pointX = points.map(function(point)  {return point.pageX;});
            document.getElementById("log").innerHTML = pointX.join(",");
        },
        move: function (element, points) {
            var pointX = points.map(function(point)  {return point.pageX;});
            document.getElementById("log").innerHTML = pointX.join(",");
        },
        end: function (element, points) {
            var pointX = points.map(function(point)  {return point.pageX;});
            document.getElementById("log").innerHTML = "";
        }
    };
    //=======================================================//
    //=======================================================//
    var $touches = [];
    var $element = null;
    //event wrapper for touch
    document.addEventListener('touchstart', function (event) {

        var slider = event.target.closest(".@{_}slider");
        if( slider == null )  { return; }
        if( $touches.length > 1 ) return; //limit 2 point for tocuh devices

        // disable browser custom drag and drop
        slider.ondragstart = function() {return false;};
        slider.gesturechange = function() {return false;};

        if( $element!=null && $element != slider) {return;}
        $element = slider;
        event.preventDefault();
        for (var i = 0; i < event.changedTouches.length; i++) {
            var id = event.changedTouches[i].identifier;
            if($touches.indexOf(id) == -1) { $touches.push(id); } //uniq
        }

        var points = [];
        for (var i = 0; i < event.touches.length ; i++) {
            var id = event.touches[i].identifier;
            if($touches.indexOf(id) >=0) { 
                points.push( event.touches[i]  );
            }
        }
        $action.start($element, points);


        //------------------------------------------------------//
        function move(event) {
            event.preventDefault();
            if( $element==null) {return;}
            points = [];
            for (var i = 0; i < event.touches.length ; i++) {
                var id = event.touches[i].identifier;
                if($touches.indexOf(id) >=0) { 
                    points.push( event.touches[i] );
                }
            }
            $action.move($element, points);
        };

        //------------------------------------------------------//

        function end(event) {
            event.preventDefault();
            var endTouches = [];
            for (var i = 0; i < event.touches.length ; i++) {
                var id = event.touches[i].identifier;
                if($touches.indexOf(id) >=0) { endTouches.push(id); }
            }
            $touches = endTouches;
            if( $touches.length<=0 ){
                cancel();
                return;
            }
        };

        //------------------------------------------------------//

        function cancel(){
            $action.end($element, points);
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
})(window);