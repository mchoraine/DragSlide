(function() {

	jQuery.fn.dragAndSlide = function(options) {

		settings = jQuery.extend({
		   'transition'         :   !!$.easing['easeOutBack'] ? 'easeOutBack' : '',
		   'transitionDuration' :   500,
		   'keyControls'        :   true,
		   'startImg' : 0
	   }, options);

		return this.each(function(){
			var $this = $(this);
			var scrollPane = $this.find("#slider-miniature" ), scrollContent = scrollPane.find(".scroll-content" );
			var scrollPaneBig = $this.find( "#slider-big" ), scrollContentBig = scrollPaneBig.find( ".scroll-content" );
			
			var widthAllMiniature = 0; //Taille total des images miniatures
			var widthAllBig = 0; //Taille total du slider

			var indexImgCenter = settings.startImg;

			var dragDirection = null, isdragging = false; //Variable pour detecter si on drag le slider et dans quelle direction 

			scrollPane.prepend("<div id='slide-bar'></div>"); //On ajoute le slider
			scrollPaneBig.prepend("<div id='arrow-left'></div>");
			scrollPaneBig.prepend("<div id='arrow-right'></div>");

			var scrollbar = scrollPane.find('#slider-bar');
			var arrowLeft = scrollPaneBig.find('#arrow-left');
			var arrowRight = scrollPaneBig.find('#arrow-right');

			init = function(){
				addImage();

				scrollbar = $( "#slide-bar" ).slider({ // l'element est converti en widget jquery ui : slider
					slide: function( event, ui ) {

						if ( widthAllMiniature > scrollPane.width() )
						  scrollContent.css( "left", Math.round(ui.value / 100 * ( scrollPane.width() - widthAllMiniature )) + "px" );
						else
						  scrollContent.css( "left", 0 );
					}
				});

				scrollContent.draggable({ //Le container des miniatures devient draggable sur l'axe des absisses
				    axis: "x",
				    start: function(event, ui) {
				        $(this).addClass('noclick');
				    },
				    drag: function( event, ui ) {
				      if( ui.position.left>0)
				        ui.position.left=0;

				      if(ui.position.left<(-widthAllMiniature+scrollPane.width()))
				         ui.position.left=(-widthAllMiniature+scrollPane.width());

				      var valslide = Math.round((ui.position.left/(scrollPane.width()-widthAllMiniature))*100);
				      scrollbar.slider("option", "value", valslide);
				    }

				});

				scrollContentBig.draggable({ //Le container du slider devient draggable sur l'axe des absisses
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
						var widthImgBefore = 0;
						scrollContentBig.find('li').each(function() {
							if($(this).index()<=indexImgCenter)
								widthImgBefore += $(this).outerWidth( true );
							if($(this).index()==indexImgCenter)
								widthCurrentImg = $(this).outerWidth( true );
						});

						var moveLeft = scrollContentBig.position().left;

						var positionImg = widthImgBefore+moveLeft;
						var positionImgBefore = widthImgBefore+moveLeft-widthCurrentImg;

						if(!scrollContentBig.find("li").eq(indexImgCenter).find("img").hasClass('panorama')){
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
						} else if (positionImg<$('body').width()/2 && dragDirection=="left" && isdragging) {
							if(isdragging) {
							    centreBig(indexImgCenter+1);
							    isdragging=false;
							}
						} else if (positionImgBefore>$('body').width()/2 && dragDirection=="right" && isdragging) {
							if(isdragging) {
							    centreBig(indexImgCenter-1);
							    isdragging=false;
							}
						};
					}
				});

				centreBig(indexImgCenter);

				//On clique sur un miniature mais on ne la drag pas
				scrollContent.find("img").click(function(){
					if (scrollContent.hasClass('noclick')) {
						scrollContent.removeClass('noclick');
					}
					else {
				   		centreBig(centreBig($(this).parent().index()));
				  	}
				})

				arrowRight.click(function(){
					next();
				})

				arrowLeft.click(function(){
				    prev();
				})

				if(settings.keyControls) {
					$("body").keydown(function(e) {
					    if(e.which == 37) { // left     
					        prev();
					    }
					    else if(e.which == 39) { // right     
					        next();
					    }
					});
				}

			};

			addImage = function(){
				widthAllMiniature = 0;
				//Pour chaque miniature on ajoute a la taille totale des miniatures
				scrollContent.find('li').each(function() {
					widthAllMiniature += $(this).outerWidth( true );
				});

				widthAllBig = 0;
				//Pour chaque image du slider on ajoute a la taille totale du slider
				scrollContentBig.find('li').each(function() {
					widthAllBig += $(this).outerWidth( true );
				});

				scrollContent.width(widthAllMiniature); //On fixe la taille du container des images miniatures
				scrollContentBig.width(widthAllBig); //On fixe la taille du container du slider
			};

			centreBig = function(indexImg){ //Function pour positionner l'image comme image visible du slider
				if(indexImg !== undefined ) {
					indexImgCenter = indexImg;
					var moveX = 0;
					
					scrollContentBig.find('li').each(function() {
						if($(this).index()<indexImg)
							moveX += $(this).outerWidth( true );
					});

					var blockWidth = scrollPaneBig.width()/2;
					var imgWidth = scrollContentBig.find('li').eq(indexImg).find('img').width()/2;
					moveX = moveX-(blockWidth-imgWidth);

					scrollContentBig.animate( { left: -moveX }, 500, "easeInBack" );

					scrollContentBig.find("li .no-viewing").remove();
					scrollContentBig.find("li").append('<span class="no-viewing">');
					scrollContentBig.find("li").eq(indexImg).find(".no-viewing").remove();

					scrollContent.find('li').removeClass('current-item');
					scrollContent.find('li').eq(indexImgCenter).addClass('current-item');

					$("#arrow-left").show();
					$("#arrow-right").show();

					if(indexImg==0) 
						$("#arrow-left").hide();
					if(indexImg==scrollContentBig.find('li').size()-1)
						$("#arrow-right").hide();
				}
			};

			next = function(){
				centreBig(indexImgCenter+1);
			}; 

			prev = function(){
				centreBig(indexImgCenter-1);
			}; 

			init();

		});

	};

})(jQuery);