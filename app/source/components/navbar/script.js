(function (window) {
    'use strict';
    let oldScroll = window.pageYOffset || document.documentElement.scrollTop;

    //------------------------------------------------------------//
    //---------------------- helpers  ----------------------------//
    function addToArr(value, arr, limit){
        let $sumArr = arr.reduce(function(a,b) {return a + b;});
        let sum = $sumArr + value;
        let result = arr.map(function(name) {return 0;}); // set zero arr
        for (let i = 0; i < arr.length; i++) {
            let _limit = limit[i] ? limit[i] : 0;
            let item = sum > _limit ? _limit : sum;
                item = item <= 0 ? 0 : item;
                result[i] = item;
            sum = sum - _limit;
        }
        return result;
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
    
    //---------------------- helpers  ----------------------------//
    //------------------------------------------------------------//
    let stikyMode = function(navbars, scroll){
        if(navbars.querySelectorAll('.@{_}navbar-block[data-type="sticky"]').length==0) return 0;
        let navBlock = [];
        let blockHeight = [];
        let blockMargin = [];
        let vector = [];
        // Get DOM data
        for (let i = 0; i < navbars.querySelectorAll('.@{_}navbar-block[data-type="sticky"]').length; i++) {
            let element = navbars.querySelectorAll('.@{_}navbar-block[data-type="sticky"]')[i];
            let height =  window.getComputedStyle ? getComputedStyle(element).height : element.currentStyle.height;
                height = parseInt(height);

            let margin =  window.getComputedStyle ? getComputedStyle(element).marginTop : element.currentStyle.marginTop;
                margin = margin ? -parseInt( margin ) : 0;

            vector[i] = 0;
            navBlock[i] = element;
            blockMargin[i] = margin;
            blockHeight[i] = height;
        }
        let offset = addToArr(scroll, vector, blockHeight);
        for (let i = 0; i < navBlock.length; i++) {
            let element = navBlock[i];
            element.style.marginTop = - offset[i] + "px";
        }
        return Math.abs( offset.reduce(function(a,b) {return a + b;}) - blockMargin.reduce(function(a,b) {return a + b;}) );
    }
    //------------------------------------------------------------//
    let floatMode = function(navbars, scrolled){
        if(navbars.querySelectorAll('.@{_}navbar-block[data-type="float"]').length==0) return 0;
        let navBlock = [];
        let blockHeight = [];
        let blockMargin = [];
        // Get DOM data
        for (let i = 0; i < navbars.querySelectorAll('.@{_}navbar-block[data-type="float"]').length; i++) {
            let element = navbars.querySelectorAll('.@{_}navbar-block[data-type="float"]')[i];
            let height =  window.getComputedStyle ? getComputedStyle(element).height : element.currentStyle.height;
                height = parseFloat(height);

            let margin =  window.getComputedStyle ? getComputedStyle(element).marginTop : element.currentStyle.marginTop;
                margin = margin ? -parseFloat( margin ) : 0;

            navBlock[i] = element;
            blockMargin[i] = margin;
            blockHeight[i] = height;
        }
        let offset = addToArr(scrolled, blockMargin, blockHeight);
        for (let i = 0; i < navBlock.length; i++) {
            let element = navBlock[i];
            element.style.marginTop = - offset[i] + "px";
        }
        return Math.abs( offset.reduce(function(a,b) {return a + b;}) - blockMargin.reduce(function(a,b) {return a + b;}) );
    }
    //------------------------------------------------------------//
    let offset = function(navbars){
        if(navbars.querySelectorAll('.@{_}navbar-top').length==0) return 0;
        if(navbars.querySelectorAll('.@{_}navbar-offset').length==0) {
            let dom =  document.createElement('div');
            dom.className = "@{_}navbar-offset";
            navbars.appendChild(dom);
        }
        let element = navbars.querySelectorAll('.@{_}navbar-top')[0];
        let elementOffset = navbars.querySelectorAll('.@{_}navbar-offset')[0];

        //all childs dociments
        let heightChilds = 0;
        for (let i = 0; i < navbars.querySelectorAll('.@{_}navbar-block').length; i++) {
            let element = navbars.querySelectorAll('.@{_}navbar-block')[i];
            let height =  window.getComputedStyle ? getComputedStyle(element).height : element.currentStyle.height;
                height = parseInt(height);
            let minHeight = window.getComputedStyle ? getComputedStyle(element).minHeight : element.currentStyle.minHeight;
                minHeight = parseInt(minHeight);
                
                height = minHeight? minHeight : height;
            heightChilds += height;
        }
        elementOffset.style.height = heightChilds + "px" ;
    }
    //------------------------------------------------------------//
    let navbar = function (event) {

       var target = event ? event.target : null;
       var forbiden = target != document && target!=null && !target.closest("[navbar-scroll='bind']");

       if(forbiden) return;

       var targetScroll = event ? event.target.scrollTop : 0;
       let scroll = window.pageYOffset || document.documentElement.scrollTop || targetScroll ;
       if(scroll < 0 ) scroll = 0;

       let navbars = document.querySelectorAll('.@{_}navbar');
        for (let i = 0; i < navbars.length; i++) {
           if(!stikyMode(navbars[i], scroll)){
                floatMode(navbars[i], scroll - oldScroll);
           }
           offset(navbars[i]);
        }
        oldScroll = scroll;

    };



    navbar();
    document.addEventListener("scroll", navbar,true);
    document.addEventListener("resize", navbar);



    window['@{_}navbar'] = navbar;
})(window);