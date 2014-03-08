$(function() {

  //scrollpane parts
  var scrollPane = $( "#slider-miniature" ), scrollContent = $( "#slider-miniature .scroll-content" ), scrollPaneBig = $( "#slider-big" ), scrollContentBig = $( "#slider-big .scroll-content" );
  
  var widthAllMiniature = 0;
  scrollContent.find('li').each(function() {
    widthAllMiniature += $(this).outerWidth( true );
  });

  var miniaturePane = scrollPane.width();
  scrollContent.width(widthAllMiniature);

  var widthAllBig = 0;
  scrollContentBig.find('li').each(function() {
    widthAllBig += $(this).outerWidth( true );
  });

  var miniaturePaneBig = scrollPaneBig.width();
  scrollContentBig.width(widthAllBig);


  var scrollbar = $( "#slide-bar" ).slider({
      slide: function( event, ui ) {

        if ( widthAllMiniature > scrollPane.width() ) {
          scrollContent.css( "left", Math.round(
            ui.value / 100 * ( scrollPane.width() - widthAllMiniature )
          ) + "px" );
        } else {
          scrollContent.css( "left", 0 );
        }

      }
  });
  
  //Drag pour déplacer les miniatures
  $( "#slider-miniature .scroll-content" ).draggable({ 
    axis: "x",
    start: function(event, ui) {
        $(this).addClass('noclick');
    },
    drag: function( event, ui ) {
      if( ui.position.left>0)
        ui.position.left=0;

      if(ui.position.left<(-widthAllMiniature+miniaturePane))
         ui.position.left=(-widthAllMiniature+miniaturePane);

      var valslide = Math.round((ui.position.left/(miniaturePane-widthAllMiniature))*100);
      scrollbar.slider("option", "value", valslide);
    }

  });

  //Drag pour déplacer les grandes images
  $( "#slider-big ul" ).draggable({ 
    axis: "x"
  });

  //On clique sur un miniature mais on ne la drag pas
  $( "#slider-miniature .scroll-content img" ).click(function(){
      if ($("#slider-miniature .scroll-content" ).hasClass('noclick')) {
       $( "#slider-miniature .scroll-content" ).removeClass('noclick');
      }
      else {
        centreBig(centreBig($(this).parent().index()));
      }
  })

  centreBig = function(indexImg){
    
    if(indexImg !== undefined ) {
      var moveX = 0;
      scrollContentBig.find('li').each(function() {
        if($(this).index()<indexImg)
          moveX += $(this).outerWidth( true );
      });

      scrollContentBig.animate( 
        { left: -moveX }, 
        500, 
        name 
      )
      console.log(indexImg+" "+scrollContentBig.css( "left" ));
    }
  }

});