(function(window) {
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
})();