 // polyfill for custom event 
 try {
    new CustomEvent("IE has CustomEvent, but doesn't support constructor");
} catch (e) {
    window.CustomEvent = function(event, params) {
      var evt;
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };
    CustomEvent.prototype = Object.create(window.Event.prototype);
}

Element.prototype.trigger = function(name, detail){
    var el = this;
    var event = new CustomEvent(name, {detail: detail});
    el.dispatchEvent(event);
}