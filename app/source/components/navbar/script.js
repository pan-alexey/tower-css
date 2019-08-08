(function (window) {
    'use strict';
    var oldScroll = window.pageYOffset || document.documentElement.scrollTop;





    //------------------------------------------------------------//
    //---------------------- helpers  ----------------------------//
    function addToArr(value, arr, limit){
        var $sumArr = arr.reduce(function(a,b) {return a + b;});
        var sum = $sumArr + value;
        var result = arr.map(function(name) {return 0;}); // set zero arr
        for (let i = 0; i < arr.length; i++) {
            var _limit = limit[i] ? limit[i] : 0;
            var item = sum > _limit ? _limit : sum;
                item = item <= 0 ? 0 : item;
                result[i] = item;
            sum = sum - _limit;
        }
        return result;
    }
    //---------------------- helpers  ----------------------------//
    //------------------------------------------------------------//
    var stikyMode = function(navbars, scroll){
        if(navbars.querySelectorAll('.@{_}navbar-block[data-type="sticky"]').length==0) return 0;
        var navBlock = [];
        var blockHeight = [];
        var blockMargin = [];
        var vector = [];
        // Get DOM data
        for (let i = 0; i < navbars.querySelectorAll('.@{_}navbar-block[data-type="sticky"]').length; i++) {
            var element = navbars.querySelectorAll('.@{_}navbar-block[data-type="sticky"]')[i];
            var height =  window.getComputedStyle ? getComputedStyle(element).height : element.currentStyle.height;
                height = parseInt(height);

            var margin =  window.getComputedStyle ? getComputedStyle(element).marginTop : element.currentStyle.marginTop;
                margin = margin ? -parseInt( margin ) : 0;

            vector[i] = 0;
            navBlock[i] = element;
            blockMargin[i] = margin;
            blockHeight[i] = height;
        }
        var offset = addToArr(scroll, vector, blockHeight);
        for (let i = 0; i < navBlock.length; i++) {
            var element = navBlock[i];
            element.style.marginTop = - offset[i] + "px";
        }
        return Math.abs( offset.reduce(function(a,b) {return a + b;}) - blockMargin.reduce(function(a,b) {return a + b;}) );
    }
    //------------------------------------------------------------//
    var floatMode = function(navbars, scrolled){
        if(navbars.querySelectorAll('.@{_}navbar-block[data-type="float"]').length==0) return 0;
        var navBlock = [];
        var blockHeight = [];
        var blockMargin = [];
        // Get DOM data
        for (let i = 0; i < navbars.querySelectorAll('.@{_}navbar-block[data-type="float"]').length; i++) {
            var element = navbars.querySelectorAll('.@{_}navbar-block[data-type="float"]')[i];
            var height =  window.getComputedStyle ? getComputedStyle(element).height : element.currentStyle.height;
                height = parseFloat(height);

                
            var margin =  window.getComputedStyle ? getComputedStyle(element).marginTop : element.currentStyle.marginTop;
                margin = margin ? -parseFloat( margin ) : 0;



            navBlock[i] = element;
            blockMargin[i] = margin;
            blockHeight[i] = height;
        }
        var offset = addToArr(scrolled, blockMargin, blockHeight);
        for (let i = 0; i < navBlock.length; i++) {
            var element = navBlock[i];
            element.style.marginTop = - offset[i] + "px";
        }
        return Math.abs( offset.reduce(function(a,b) {return a + b;}) - blockMargin.reduce(function(a,b) {return a + b;}) );
    }
    //------------------------------------------------------------//
    var offset = function(navbars){
        if(navbars.querySelectorAll('.@{_}navbar-top').length==0) return 0;
        if(navbars.querySelectorAll('.@{_}navbar-offset').length==0) {
            var dom =  document.createElement('div');
            dom.className = "@{_}navbar-offset";
            navbars.appendChild(dom);
        }
        var element = navbars.querySelectorAll('.@{_}navbar-top')[0];
        var elementOffset = navbars.querySelectorAll('.@{_}navbar-offset')[0];

        //all childs dociments
        var heightChilds = 0;
        for (let i = 0; i < navbars.querySelectorAll('.@{_}navbar-block').length; i++) {
            var element = navbars.querySelectorAll('.@{_}navbar-block')[i];
            var height =  window.getComputedStyle ? getComputedStyle(element).height : element.currentStyle.height;
                height = parseInt(height);
            var minHeight = window.getComputedStyle ? getComputedStyle(element).minHeight : element.currentStyle.minHeight;
                minHeight = parseInt(minHeight);
                
                height = minHeight? minHeight : height;
            heightChilds += height;
        }
        elementOffset.style.height = heightChilds + "px" ;
    }
    //------------------------------------------------------------//
    var navbar = function () {
       var scroll = window.pageYOffset || document.documentElement.scrollTop;
       var navbars = document.querySelectorAll('.@{_}navbar');
        for (let i = 0; i < navbars.length; i++) {
           if(!stikyMode(navbars[i], scroll)){
                floatMode(navbars[i], scroll - oldScroll);
           }
           offset(navbars[i]);
        }
        oldScroll = scroll;
    }
    navbar();
    document.addEventListener("scroll", navbar);
    document.addEventListener("resize", navbar);
})(window);