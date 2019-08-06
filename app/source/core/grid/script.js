(function(document, window) {
    'use strict';

    // if browser not supported flex, use inline block and hidden max-width methods
    if (('flexWrap' in document.documentElement.style) || ('WebkitFlexWrap' in document.documentElement.style) || ('msFlexWrap' in document.documentElement.style)) { return; }

    var colElement = document.createElement('div');
    colElement.className = "@{_}col";
    var style = window.getComputedStyle ? getComputedStyle(colElement) : colElement.currentStyle;

    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}row", "font-size: 0 ;") };
    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}row", "padding: 0 ;") };

    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}row-left", "text-align: left !important;") };
    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}row-right", "text-align: right !important;") };
    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}row-center", "text-align: center !important;") };

    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}col", "max-width: 100%") };
    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}col", "vertical-align: top ;") };
    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}col", "display: inline-block ;") };
    if (document.styleSheets[0].addRule) { document.styleSheets[0].addRule(".@{_}col", "font-size: " + style.fontSize + " ;") };

})(document, window);