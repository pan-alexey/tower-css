
    Element.prototype.addClass = function(classToAdd) {
        var classes = this.className.split(' ')
        if (classes.indexOf(classToAdd) === -1) classes.push(classToAdd)
        this.className = classes.join(' ')
    }

    Element.prototype.removeClass = function(classToRemove) {
        var classes = this.className.split(' ')
        var idx = classes.indexOf(classToRemove)
        if (idx !== -1) classes.splice(idx, 1)
        this.className = classes.join(' ')
    }

    
    Element.prototype.addClass = function (classToAdd) {
        var classes = this.className.split(' ')
        if (classes.indexOf(classToAdd) === -1) classes.push(classToAdd)
        this.className = classes.join(' ')
    }

    Element.prototype.removeClass = function (classToRemove) {
        var classes = this.className.split(' ')
        var idx = classes.indexOf(classToRemove)
        if (idx !== -1) classes.splice(idx, 1)
        this.className = classes.join(' ')
    }


    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
    //---------------------------------//
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(css) {
        var node = this;
        while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
        }
        return null;
        };
    }
    //---------------------------------//
    Element.prototype.addClass = function(className){
        // something
        var el = this;
        if (el.classList){  el.classList.add(className); }
        else { el.className += ' ' + className; }
        return el;
    }

    Element.prototype.removeClass = function(className){
        // something
        var el = this;
        if (el.classList){
            el.classList.remove(className);
        }else{
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
        return el;
    }