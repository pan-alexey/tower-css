/*
element.addEventListener("change", function(e){});
window["@{_}seekbar"] = function(element, prop){}
*/

/*
    Слайдер пересчитывает значения в процентах, и все манипуляции производятся в процентах
    Если необходимо пересчитывать в зависимости от значения, необходимо делать функцию обертку
    С функцией оберткой функционал становиться шире.
*/

(function (window) {
    //-----------------------------------//
    var merge = function (a, b) {
        var result = {};
        if (!b) {
            b = {};
        }
        for (var key in a) {
            result[key] = a[key];
            if (b[key]) {
                result[key] = b[key];
            }
        }
        return result;
    }
    //-----------------------------------//
    var toFloat = function (value) {
        var result = parseFloat(value);
        return parseFloat(result.toFixed(6));
    }
    //-----------------------------------//
    var clamp = function (value, limit) {
        if (typeof limit == 'undefined') { limit = [0, 100]; }
        return value > limit[1] ? limit[1] : value < limit[0] ? limit[0] : value;
    }
    //-----------------------------------//

    var getNear = function (rate, left, right) {
        if (left > rate) return 'left';
        if (right < rate) return 'right';
        return (Math.abs(rate - left) > Math.abs(rate - right)) ? 'right' : 'left';
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





    function init(element, properties) {
        // 1. merge properties
        var attr = {};
        var propDefault = {
            disable: false,
            seekbar: 'left',
            step: 0,
            min: 0,
            max: 100,
        }

        attr.disable = element.getAttribute('data-disable') ? element.getAttribute('data-disable') : propDefault.disable;
        attr.disable = new String(attr.disable).toLowerCase();

        attr.max = element.getAttribute('data-max') ? element.getAttribute('data-max') : propDefault.max;
        attr.max = toFloat(attr.max);

        attr.min = element.getAttribute('data-min') ? element.getAttribute('data-min') : propDefault.min;
        attr.min = toFloat(attr.min);

        //normalize min/max
        attr.seekbar = element.getAttribute('data-seekbar') ? element.getAttribute('data-seekbar') : propDefault.seekbar;
        attr.seekbar = new String(attr.seekbar).toLowerCase();

        attr.step = element.getAttribute('data-step') ? element.getAttribute('data-step') : propDefault.step;
        attr.step = parseInt(attr.step);

        if (attr.seekbar == "multi") {

            attr.left = element.getAttribute('data-left') ? element.getAttribute('data-left') : attr.left;
            attr.left = attr.left ? attr.left : attr.min;
            attr.left = toFloat(attr.left);

            attr.right = element.getAttribute('data-right') ? element.getAttribute('data-right') : attr.right;
            attr.right = attr.right ? attr.right : attr.max;
            attr.right = toFloat(attr.right);
        }

        if (attr.seekbar == "left" || attr.seekbar == "right") {
            attr.value = element.getAttribute('data-value') ? element.getAttribute('data-value') : attr.value;
            attr.value = attr.value ? attr.value : attr.min;
            attr.value = toFloat(attr.value);
        }



        properties = merge(attr, properties);
        render(element, properties.seekbar);
        return properties;
    }

    //----------------------------------------------------------------------------------------------------------------//
    var mutable = function (state, bounding, points) {
        var rank = points.map(function (point) {
            return toFloat(100 * (point.pageX - bounding.offset) / bounding.width);
        });

        state._rank = rank;
        rank.sort(function (a, b) { return a - b; });
        if (state.seekbar == 'multi') {
            state.left = state.left ? state.left : state.min;
            state.right = state.right ? state.right : state.max;
            // single touch
            if (rank.length <= 1) {
                state._general = state._general ? state._general : getNear(rank[0], state.left, state.right);
                state.left = state._general == 'left' ? rank[0] + bounding.handle / 2 : state.left; //+ state._seekbarRank/2
                state.right = state._general == 'right' ? rank[0] - bounding.handle / 2 : state.right; //- state._seekbarRank/2

                // collision
                if (state._general == 'left') { state.right = (state.left > state.right) ? state.left : state.right; }
                if (state._general == 'right') { state.left = (state.left >= state.right) ? state.right : state.left; }
            }
            else {
                state.left = rank[0] + bounding.handle / 2;
                state.right = rank[1] - bounding.handle / 2;
                state.right = (state.left > state.right) ? state.left : state.right;
            }
            state.left = clamp(state.left, [state.min, state.max]);
            state.right = clamp(state.right, [state.min, state.max]);
        }


        if (state.seekbar == "left") {
            state.value = rank[0];
            state.value = clamp(state.value, [state.min, state.max]);
        }
        if (state.seekbar == "right") {
            state.value = 100 - rank[0];
            state.value = clamp(state.value, [state.min, state.max]);
        }


        return state;
    }
    //----------------------------------------------------------------------------------------------------------------//
    var cahnge = function (element, state) {
        //----------------------------------------------------------//

        if (state.seekbar == 'multi') {
            for (var i = 0; i < element.querySelectorAll('[data-handle="left"]').length; i++) {
                element.querySelectorAll('[data-handle="left"]')[i].style.left = state.left + "%";
            }
            for (var i = 0; i < element.querySelectorAll('[data-handle="right"]').length; i++) {
                element.querySelectorAll('[data-handle="right"]')[i].style.right = (100 - state.right) + "%";
            }
        }

        //----------------------------------------------------------//

        for (var i = 0; i < element.querySelectorAll('.seekbar-handle').length; i++) {
            var handle = element.querySelectorAll('.seekbar-handle')[i];
            if (state.seekbar == "left") {
                handle.style.left = state.value + "%";
            }
            if (state.seekbar == "right") {
                handle.style.right = state.value + "%";
            }
        }

        //----------------------------------------------------------//
    }
    //----------------------------------------------------------------------------------------------------------------//
    var save = function (element, state) {
        for (var key in state) {
            if (key[0] == '_') continue;
            if (typeof state[key] === 'function') continue;
            if (typeof state[key] === 'object') continue;
            var name = 'data-' + key.split(/(?=[A-Z])/).join('-').toLowerCase();

            element.setAttribute(name, state[key]);
        }
        return state;
    }
    //----------------------------------------------------------------------------------------------------------------//
    var $elementBounding = {};
    var $state = {};


    var $action = {
        start: function (element, points) {
            $state = init(element, {});
            $elementBounding = getBounding(element);
            $state = mutable($state, $elementBounding, points);
            cahnge(element, $state);
            save(element, $state);
            domActive(element, $state); // for active seekbar and handle
        },
        // wrap action to debounce function
        move: debounce(function (element, points) {
            $state = mutable($state, $elementBounding, points);
            cahnge(element, $state);
            domActive(element, $state); // for active seekbar and handle
        }, 40),

        end: function (element, points) {
            cahnge(element, $state);
            save(element, $state);
            $elementBounding = {};
            $state = {};
            $debounce = 40;
            domActive(element); // clear active seekbar and handle
        }
    };
    //=======================================================//



    //=======================================================//
    var $touches = [];
    var $element = null;
    //event wrapper for touch
    document.addEventListener('touchstart', function (event) {

        var seekbar = event.target.closest(".@{_}seekbar");
        if (seekbar == null) { return; }
        if ($touches.length > 1) return; //limit 2 point for tocuh devices

        // disable browser custom drag and drop
        seekbar.ondragstart = function () { return false; };
        seekbar.gesturechange = function () { return false; };

        if ($element != null && $element != seekbar) { return; }
        $element = seekbar;
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
        $action.start($element, points);
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
            $action.move($element, points);
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


    document.addEventListener('mousedown', function (event) {
        var seekbar = event.target.closest(".@{_}seekbar");
        if (seekbar == null) { return; }
        event.preventDefault();
        // disable browser drag and drop
        seekbar.ondragstart = function () { return false; };

        var points = [];
        points.push(event);
        $action.start(seekbar, points);
        //----------------------------------------------//
        function move(event) {
            event.preventDefault();
            points = [];
            points.push(event);
            $action.move(seekbar, points);
        };
        //----------------------------------------------//
        function end(event) {
            event.preventDefault();

            $action.end(seekbar, points);
            document.removeEventListener("mousemove", move);
            document.removeEventListener('mouseup', end);
        };
        //----------------------------------------------//
        document.addEventListener("mousemove", move);
        document.addEventListener('mouseup', end);
    });


















    function getBounding(el) {
        var result = {};
        result.width = (el.querySelector(".@{_}seekbar-content").getBoundingClientRect()).width;
        result.offset = (el.querySelector(".@{_}seekbar-content").getBoundingClientRect()).left + document.body.scrollLeft;
        result.handle = 100 * (el.querySelector(".@{_}seekbar-handle").getBoundingClientRect()).width / result.width;
        return result;
    }


    function render(element, seekbar) {
        if (["left", "right", "multi"].indexOf(seekbar) < 0) return;
        element.addClass('@{_}seekbar');
        element.setAttribute('data-seekbar', seekbar);
        // Add seekbar-content element if not exist;
        if (element.querySelectorAll('.@{_}seekbar-content').length == 0) {
            var div = document.createElement('div');
            div.className = '@{_}seekbar-content';
            element.appendChild(div);
        }
        // Add seekbar-bar element if not exist;
        if (element.querySelectorAll('.@{_}seekbar-content > .@{_}seekbar-bar').length == 0) {
            var div = document.createElement('div');
            div.className = '@{_}seekbar-bar';
            for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-content').length; i++) {
                element.querySelectorAll('.@{_}seekbar-content')[i].prepend(div);
            }
        }

        if (seekbar == "multi") {
            // Add seekbar-handle[data-handle="left"] element if not exist;
            if (element.querySelectorAll('.@{_}seekbar-content > .@{_}seekbar-handle[data-handle="left"]').length == 0) {
                var div = document.createElement('div');
                div.className = '@{_}seekbar-handle';
                div.setAttribute('data-handle', 'left');
                for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-content').length; i++) {
                    element.querySelectorAll('.@{_}seekbar-content')[i].appendChild(div);
                }
            }
            // Add seekbar-handle[data-handle="left"] element if not exist;
            if (element.querySelectorAll('.@{_}seekbar-content > .@{_}seekbar-handle[data-handle="right"]').length == 0) {
                var div = document.createElement('div');
                div.className = '@{_}seekbar-handle';
                div.setAttribute('data-handle', 'right');
                for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-content').length; i++) {
                    element.querySelectorAll('.@{_}seekbar-content')[i].appendChild(div);
                }
            }

            //RESET CSS PROPERTIES
            for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-handle[data-handle="right"]').length; i++) {
                var handle = element.querySelectorAll('.@{_}seekbar-handle[data-handle="right"]')[i];
                handle.style.left = null;
            }
            for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-handle').length; i++) {
                var handle = element.querySelectorAll('.@{_}seekbar-handle')[i];
                handle.style.right = null;
            }

        }
        if (seekbar == "left" || seekbar == "right") {
            // Add seekbar-handle[data-handle="left"] element if not exist;
            if (element.querySelectorAll('.@{_}seekbar-content > .@{_}seekbar-handle').length == 0) {
                var div = document.createElement('div');
                div.className = '@{_}seekbar-handle';
                for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-content').length; i++) {
                    element.querySelectorAll('.@{_}seekbar-content')[i].appendChild(div);
                }
            }
        }
        return element;
    }


    // dom event - active handle.
    function domActive(element, state) {
        if (!state) {
            element.removeClass('@{_}active');
            for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-handle').length; i++) {
                element.querySelectorAll('.@{_}seekbar-handle')[i].removeClass('@{_}active');
            }
            return;
        }
        //-------------------------------------------------------------------------------//
        if (state.seekbar == 'left' || state.seekbar == 'right') {
            element.addClass('@{_}active');
            for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-handle').length; i++) {
                element.querySelectorAll('.@{_}seekbar-handle')[i].addClass('@{_}active');
            }
            return;
        }
        //-------------------------------------------------------------------------------//
        if (state.seekbar == 'multi' && state._rank.length > 1) {
            element.addClass('@{_}active');
            for (var i = 0; i < element.querySelectorAll('.@{_}seekbar-handle').length; i++) {
                element.querySelectorAll('.@{_}seekbar-handle')[i].addClass('@{_}active');
            }
            return;
        }

        if (state.seekbar == 'multi' && state._rank.length == 1) {
            element.addClass('@{_}active');
            var selector = '.@{_}seekbar-handle[data-handle="' + state._general + '"]';
            for (var i = 0; i < element.querySelectorAll(selector).length; i++) {
                element.querySelectorAll(selector)[i].addClass('@{_}active');
            }
            return;
        }
        //-------------------------------------------------------------------------------//

    }


})(window);