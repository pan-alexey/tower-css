/*
(function (window, $) {
    $(document).on("click tap" , ".checkbox", function(e){

      // for attr
      //---------------------------------------------------------------------//
      var forId = $( e.target ).attr( "for" );
      if( forId ) {
        $("#"+forId).each(function(){
          if(this.disabled)return;
          $(this).trigger( "change");
          this.checked = !this.checked;
        });;
        return;
      };
      // simple
      //---------------------------------------------------------------------//
      $(e.target).closest( ".checkbox" )
      .find(':checkbox')
      .each(function(){
        if(this.disabled)return;
        $(this).trigger( "change");
        this.checked = !this.checked;
      });
      //---------------------------------------------------------------------//

    });

})(window, $);
*/


/*
$('.checkbox').on("change", function(e){
  //console.log('cheked',e);
});
*/
