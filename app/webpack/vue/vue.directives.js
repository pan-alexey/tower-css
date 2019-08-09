(function(window) {
    'use strict';
    if (!Vue) return;


    Vue.directive('click-outside', {
        bind: function(el, binding, vnode) {
            el.clickOutsideEvent = function(event) {
                if (!(el == event.target || el.contains(event.target))) {
                    vnode.context[binding.expression](event);
                }
            };
            document.body.addEventListener('click', el.clickOutsideEvent)
        },
        unbind: function(el) {
            document.body.removeEventListener('click', el.clickOutsideEvent)
        },
    });



    // var hoveThrottle = null;
    // Vue.directive('hover', function (el, binding, vnode) {
    //     el.addEventListener('mouseover', function(e) {
    //         // if( isDescendant(el, e.target) ) return;
    //         // binding.value(e)
    //     });
    // });



})(window);