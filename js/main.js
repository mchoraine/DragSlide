$(function() {

  //scrollpane parts
  var scrollPane = $( "#slider-miniature" ), scrollContent = $( "#slider-miniature .scroll-content" ), scrollPaneBig = $( "#slider-big" ), scrollContentBig = $( "#slider-big .scroll-content" );
  var indexImgCenter = 0;

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

  var dragDirection;
  var isdragging
  //Drag pour déplacer les grandes images
  $( "#slider-big ul" ).draggable({ 
    axis: "x",
    drag: function( event, ui ) {
      if(ui.originalPosition.left > ui.position.left && (ui.originalPosition.left-ui.position.left > 200)) { //On déplace à gauche
        dragDirection="left";
        isdragging = true;
      }
      if(ui.originalPosition.left < ui.position.left && (ui.position.left-ui.originalPosition.left > 200)) { //On déplace à droite
        dragDirection="right";
        isdragging = true;
      }
    },
    stop: function(event,ui) {
      if(isdragging) {
        if (dragDirection=="left")
          centreBig(indexImgCenter+1);
        if (dragDirection=="right")
          centreBig(indexImgCenter-1);
        isdragging=false;
      }
      else {
         centreBig(indexImgCenter);
      }
    }

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
      indexImgCenter = indexImg;
      var moveX = 0;
      scrollContentBig.find('li').each(function() {
        if($(this).index()<indexImg)
          moveX += $(this).outerWidth( true );
      });
      var blockWidth = scrollPaneBig.width()/2;
      var imgWidth = $('#slider-big .scroll-content li:eq('+indexImg+') img').width()/2;
      moveX = moveX-(blockWidth-imgWidth);

      scrollContentBig.animate( 
        { left: -moveX }, 
        500, 
        "easeInBack" 
      )

      $('#slider-big .scroll-content li .no-viewing').remove();
      $('#slider-big .scroll-content li').append('<span class="no-viewing">');
      $('#slider-big .scroll-content li:eq('+indexImg+') .no-viewing').remove();

    }
  }

  centreBig(0);

});