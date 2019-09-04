(function (window) {
  'use strict';

 

  function check(element){


    if( element.matches(".disabled") )return;
    if( element.matches("[disabled]") )return;


    if( element.querySelectorAll('input[type=checkbox]').length == -1  )return;
    let checkbox = element.querySelectorAll('input[type=checkbox]')[0];

    checkbox.checked = checkbox.checked ? false: true;
    let event = new Event("change");
    checkbox.dispatchEvent(event);


  }



  //-------------------------------------------------------------//
  document.addEventListener('click', function(event) {

      var el = event.target.closest(".@{_}switch");


      if( el == null )  { return; }
      check(el);
      //alert("ckeckbox click");
  });

  //-------------------------------------------------------------//







})(window);