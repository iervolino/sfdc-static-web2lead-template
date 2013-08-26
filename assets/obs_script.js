(function($, w, d){
	$(d).ready(function() {
		
		/***********************************************
		 * bouton envoyer à un ami (widget share this) *
		 ***********************************************/
		var $rentrer = false;
		$("#send").mouseenter(function(){
			$("#send .node-webform").show();
		}).mouseleave(function(){
			setTimeout(function() {
				if($rentrer == false){
					$("#send .node-webform").hide();
				}
			}, 1500);
		});
		
		$("#send .node-webform").mouseenter(function(){
			$("#send .node-webform").show();
			$rentrer = true;
		}).mouseleave(function(){
			$rentrer = false;
		});
		
		// Gestion de l'expediteur (du widget share this)
		$exp = $("#send .node-webform input#edit-submitted-expediteur").val();
		$("#send .node-webform input#edit-submitted-expediteur").bind("click",{exp: $exp},function(e){
			if( $("#send .node-webform input#edit-submitted-expediteur").val()== "" || $("#send .node-webform input#edit-submitted-expediteur").val()== e.data.exp ){
				$("#send .node-webform input#edit-submitted-expediteur").val(null);
			}
		});
		
		$("#send .node-webform input#edit-submitted-expediteur").bind("focusout",{exp: $exp},function(e){
			if( $("#send .node-webform input#edit-submitted-expediteur").val()== "" ){
				$("#send .node-webform input#edit-submitted-expediteur").val(e.data.exp);
			}
		});
			
		// Gestion du destinataire (du widget share this)
		$des = $("#send .node-webform input#edit-submitted-destinataire").val();
		$("#send .node-webform input#edit-submitted-destinataire").bind("click",{des: $des},function(e){
			if( $("#send .node-webform input#edit-submitted-destinataire").val()== "" || $("#send .node-webform input#edit-submitted-destinataire").val()== e.data.des ){
				$("#send .node-webform input#edit-submitted-destinataire").val(null);
			}
		});

		$("#send .node-webform input#edit-submitted-destinataire").bind("focusout",{des: $des},function(e){
			if( $("#send .node-webform input#edit-submitted-destinataire").val()== "" ){
				$("#send .node-webform input#edit-submitted-destinataire").val(e.data.des);
			}
		});

		/***************************************************************************
		 * bouton envoyer à un ami (widget obs_widget -- barre laterale a gauche)  * 
		 ***************************************************************************/
		$(".widget-share .send").mouseenter(function(){
			$(".widget-share .send .node-webform").show();
		}).mouseleave(function(){
				setTimeout(function() {
					if($rentrer == false){
						$(".widget-share .send .node-webform").hide();
					}
				}, 1500);
			
		});
		
		$(".widget-share .send .node-webform").mouseenter(function(){
			$(".widget-share .send .node-webform").show();
			$rentrer = true;
		}).mouseleave(function(){
			$rentrer = false;
		});
		
		// Gestion de l'expediteur (du widget obs_widget)
		if($(".widget-share .send input#edit-submitted-expediteur").length !=0){
			$exp1 = $(".widget-share .send input#edit-submitted-expediteur").val();	
			$(".widget-share .send input#edit-submitted-expediteur").bind("click",{exp1: $exp1},function(e){
				if( $(".widget-share .send input#edit-submitted-expediteur").val()== "" || $(".widget-share .send input#edit-submitted-expediteur").val()== e.data.exp1 ){
					$(".widget-share .send input#edit-submitted-expediteur").val(null);
				}
			});
		
			$(".widget-share .send input#edit-submitted-expediteur").bind("focusout",{exp1: $exp1},function(e){
				if( $(".widget-share .send input#edit-submitted-expediteur").val()== "" ){
					$(".widget-share .send input#edit-submitted-expediteur").val(e.data.exp1);
				}
			});		
		} else {
			$exp1 = $(".widget-share .send input#edit-submitted-expediteur--2").val();	
			$(".widget-share .send input#edit-submitted-expediteur--2").bind("click",{exp1: $exp1},function(e){
				if( $(".widget-share .send input#edit-submitted-expediteur--2").val()== "" || $(".widget-share .send input#edit-submitted-expediteur--2").val()== e.data.exp1 ){
					$(".widget-share .send input#edit-submitted-expediteur--2").val(null);
				}
			});
		
			$(".widget-share .send input#edit-submitted-expediteur--2").bind("focusout",{exp1: $exp1},function(e){
				if( $(".widget-share .send input#edit-submitted-expediteur--2").val()== "" ){
					$(".widget-share .send input#edit-submitted-expediteur--2").val(e.data.exp1);
				}
			});		
		}
		
		// Gestion du destinataire (du widget obs_widget)
		if($(".widget-share .send input#edit-submitted-destinataire").length !=0){
			$des1 = $(".widget-share .send input#edit-submitted-destinataire").val();
			$(".widget-share .send input#edit-submitted-destinataire").bind("click",{des1: $des1},function(e){
				if( $(".widget-share .send input#edit-submitted-destinataire").val()== "" || $(".widget-share .send input#edit-submitted-destinataire").val()== e.data.des1 ){
					$(".widget-share .send input#edit-submitted-destinataire").val(null);
				}
			});

			$(".widget-share .send input#edit-submitted-destinataire").bind("focusout",{des1: $des1},function(e){
				if( $(".widget-share .send input#edit-submitted-destinataire").val()== "" ){
					$(".widget-share .send input#edit-submitted-destinataire").val(e.data.des1);
				}
			});	
		}else {
			$des1 = $(".widget-share .send input#edit-submitted-destinataire--2").val();
			$(".widget-share .send input#edit-submitted-destinataire--2").bind("click",{des1: $des1},function(e){
				if( $(".widget-share .send input#edit-submitted-destinataire--2").val()== "" || $(".widget-share .send input#edit-submitted-destinataire--2").val()== e.data.des1 ){
					$(".widget-share .send input#edit-submitted-destinataire--2").val(null);
				}
			});

			$(".widget-share .send input#edit-submitted-destinataire--2").bind("focusout",{des1: $des1},function(e){
				if( $(".widget-share .send input#edit-submitted-destinataire--2").val()== "" ){
					$(".widget-share .send input#edit-submitted-destinataire--2").val(e.data.des1);
				}
			});			
		}
		
		
		// Formulaire de commentaires
		var $name = $(".node-type-content-magazine-article #edit-name");
		var $name_value = $name.val();
		$name.click( function(){
			if($name.val()== "" || $name.val() == $name_value){
				$name.val(null);
			}
		});
		
		$name.focusout(function(){
			if($name.val()== ""){
				$name.val($name_value);
			}
		});
		
		var $email = $(".node-type-content-magazine-article #edit-field-txt-email-und-0-email");
		var $email_value = $email.val();
		$email.click( function(){
			if($email.val()== "" || $email.val() == $email_value){
				$email.val(null);
			}
		});
		
		$email.focusout(function(){
			if($email.val()== ""){
				$email.val($email_value);
			}
		});
		
		var $link = $(".node-type-content-magazine-article #edit-field-link-und-0-url");
		var $link_value = $link.val();
		$link.click( function(){
			if($link.val()== "" || $link.val() == $link_value){
				$link.val(null);
			}
		});
		
		$link.focusout(function(){
			if($link.val()== ""){
				$link.val($link_value);
			}
		});
		
		var $body = $(".node-type-content-magazine-article #edit-comment-body-und-0-value");
		var $body_value = $body.val();
		$body.click( function(){
			if($body.val()== "" || $body.val() == $body_value){
				$body.val(null);
			}
		});
		
		$body.focusout(function(){
			if($body.val()== ""){
				$body.val($body_value);
			}
		});
		
		
		// News/Twitter
		if($('.box-ticker').length){
			var $ticker = $('.box-ticker'),

			countNews = $ticker.find('li').length,
			heightNews = $ticker.find('li').outerHeight(true),
			i = 1, margin = 0;
			if (countNews>1){
				var ticker_interval = setInterval(function(){
					margin = (i >= countNews) ? 0 : '-='+heightNews;
					i = (i >= countNews) ? 1 : i+1;
					$ticker.find('ul').animate({ marginTop: margin }, 200);
				}, 6000);
				
				$('.box-ticker a').bind({
					mouseenter: function(e){
			    		clearInterval(ticker_interval);
			    	},
			    	focusin:function(e){
			    		clearInterval(ticker_interval);
			    	},
			    	mouseleave: function(e){
			    		ticker_interval = setInterval(function(){
				    		margin = (i >= countNews) ? 0 : '-='+heightNews;
							i = (i >= countNews) ? 1 : i+1;
							$ticker.find('ul').animate({ marginTop: margin }, 200);
						}, 6000);
			    	},
			    	focusout: function(e){
			    		ticker_interval = setInterval(function(){
				    		margin = (i >= countNews) ? 0 : '-='+heightNews;
							i = (i >= countNews) ? 1 : i+1;
							$ticker.find('ul').animate({ marginTop: margin }, 200);
						}, 6000);
			    	}
				});
			}
		} 
		
		/* page case studies home */
		/*  masquage des 6 derniers elements de la liste main */
		$(".hidden_zone_case_studies_home").css("display", "none");
		
		/* fonction d affciahge du bt sur les case studie home */
		$(".btn_hidden_zone_case_studies_home").click( function(){
			var nbr_cases_all = $('.view-display-id-case_studies_list_main .views-row').length;
			$('.counter_element_case_story .current').text(nbr_cases_all);
			$(".hidden_zone_case_studies_home").slideToggle()
			$(".btn_hidden_zone_case_studies_home").css("display", "none");
			return false;
		});
		
		if($('.widget-share').length){
			if($('.node-type-content-case-studies-card').length ||$('.node-type-content-partner').length){
				$('.widget-share').css('top', 505);
			};
			var diff = 20,
			$widgetShare = $('.widget-share'),
			widgetInit = {top: $widgetShare.css('top'), left: $widgetShare.css('left')},
			widgetOffset = $widgetShare.offset(),
			sectionOffset = $('#zone-widget').offset();
			/*if(parseInt($('#main').css('paddingLeft'))>0){
				$widgetShare.css({
					marginLeft:-parseInt($('#main').css('paddingLeft'))
				});
			}*/
			if($('.node-type-content-case-studies-card').length){
				widgetInit.top = 400; 
			}
			$(window).scroll(function(){
				
				var scrollTop = $(window).scrollTop();
				var pad = -35;
				var padAuto = 'auto';
				if(parseInt($('#main').css('paddingLeft'))>0){
					pad = pad-parseInt($('#main').css('paddingLeft'));
					//padAuto = -parseInt($('#main').css('paddingLeft'));
				}
				
				if(scrollTop >= widgetOffset.top - 20){
					$widgetShare.css({
					position:'fixed',
					top:diff,
					marginLeft:pad,
					left:'auto'
				});
					} else {
						$widgetShare.css({
						position:'absolute',
						top:widgetInit.top,
						marginLeft:padAuto,
						left:widgetInit.left
					});
				}
			});
		} 
		
		var filterBar = $('.view-display-id-case_studies_list_main .view-filters .views-exposed-form');
		if(filterBar.length) {
			navSticky = false;
			navTop = filterBar.offset().top;
			$(window).bind('scroll', function() {
				windowTop = $(window).scrollTop();
				if((windowTop>=navTop) && (navSticky===false)) {
					filterBar.addClass('filter-bar-sticky');
					navSticky = true;
				} else {
					if((windowTop<=navTop) && navSticky) {
						filterBar.removeClass('filter-bar-sticky');
						navSticky = false;
					}
				}
			});
			
			//WMI récupération des élémént de décompt de la vue.
			if ($('.btn_hidden_zone_case_studies_home').length){
				var nbr_cases_visible = $('.view-display-id-case_studies_list_main .views-row:visible').length;
				$('.counter_element_case_story .current').text(nbr_cases_visible);
			}
			var element_decompt = $('.counter_element_case_story');
			$('.counter_element_case_story_content').append(element_decompt);
			
		}
		
		if($('.view-display-id-case_studies_list_main').length){
			$('.view-display-id-case_studies_list_main .views-field-field-illustration', this).each(function () {	
				imgHeight = $(this).children().find("img:first").height();
				$(this).css("line-height",imgHeight+"px");
				$(this).css("height",imgHeight+"px");
				$(this).css("margin-bottom",(160-imgHeight)+"px");
			});
		}
		
		$('.view-display-id-case_studies_list_main .views-row').bind({
			mouseenter: function(e){
				 $('.views-field-field-img-logo', this).each(function () {	
					var imgHeight = 150;
					var imgNode = $(this).prev();
					imgHeight = imgNode[0].height;
					
					$(this).css({
						'top': '100px',
						'opacity': 0,
						'display': 'block'
					}).animate({
					'height': imgHeight,
					'top': 0,
					'opacity': 1
					}, {
						'duration':'fast',
						'queue':false
					});
				});
			},
			mouseleave: function(e){
				$('.views-field-field-img-logo', this).animate({
					'height': 150,
					'top': '100px',
					'opacity': 0
				}, {
					'duration':'fast',
					'queue':false
				});
			}
		}); 		
		
		
//		if(c!=null)c.dir(this);
		
		/*******************************************************************************************
		 * 	SELECT ACCESSIBLE
		 ******************************************************************************************/
		$('.form-select ').OrangeSelectAccessible({nbVisibleElement:5, scrollbar:true});
	
	
		/*******************************************************************************************
		 * NORMALISATION DE LA WIDTH DES SELECT
		 ******************************************************************************************/
		 function normalisation_width_select(){
			// pour l'instant on ne l'applique que sur page press (pour eviter toute regression)
		    if( $('.page-press-home').length > 0 || $('.page-presse-home').length > 0){
				var forms = $('#main #content .OrangeSelectAccessible .select-head'); //.form-select 
				var minWidth = 0;
				//concatener
				forms.each(function(){
					if($(this).is(':visible')){
						currentWidth = $(this).width();
						if( minWidth==0 ||currentWidth < minWidth){
							minWidth = currentWidth;
						}
					}
				});
				forms.each(function(){
					if($(this).is(':visible')){
						$(this).css('width',  minWidth);
						$(this).siblings().css('width',$(this).parent().width()-2); 
					}
				});
			}
		}
		normalisation_width_select();

		
		/* page case studies fiche */
		
		/*
		 * Normalisation de la hauteur des titre de blocs news en bas de page
		 */

		function normalisation_hauteur_titre_block (conteneur, bloc){
			// récupération de la plus grande hauteur de bloc dans le conteneur
			if ($(conteneur).length){
				if ($(conteneur).length == 1){
					//une ocurence dans la page
					normalisation_hauteur_titre_block_execute(conteneur, bloc);
				}else{
					//une ocurence dans la page (cf page about us)
					$(conteneur).each(function (){
						css_name = $(this).attr('class').split(" ");
						css_name[0] = "";
						/*final_name = conteneur;
						for(i=0;i<css_name.length;i=i+1){
							if(css_name[i] != ""){
								final_name = final_name + "." + css_name[i];
							}
						}
						*/
						final_name = css_name.join(".");
						normalisation_hauteur_titre_block_execute(final_name, bloc);
					});
				}
			}
		}
		function normalisation_hauteur_titre_block_execute (conteneur, bloc){
			var height_block = 0;
			$(conteneur + ' ' + bloc).each(function (){
				if ($(this).outerHeight(true) > height_block){
					height_block = $(this).outerHeight(true);
				}
			});
			// application de la hauteur max à tous les blocs
			$(conteneur + ' ' + bloc).height(height_block);			
		}

		normalisation_hauteur_titre_block('.node-type-content-solution', '.related-content .views-row h3');
		normalisation_hauteur_titre_block('.node-type-content-industry', '.related-content .views-row h3');
		normalisation_hauteur_titre_block('.node-type-content-region', '.related-content .views-row h3');
		normalisation_hauteur_titre_block('.node-type-pagette', '.hot-content .views-row h3');
		normalisation_hauteur_titre_block('.page-network-performance', '.pane-obs-backbones-4 .views-row h3');

		normalisation_hauteur_titre_block('.node-type-content-region', ' .view-display-id-block_know_more .views-row h3');
		normalisation_hauteur_titre_block('.node-type-content-industry', ' .view-display-id-block_know_more .views-row h3');
		normalisation_hauteur_titre_block('.node-type-content-solution', ' .view-display-id-block_know_more .views-row h3');

		
		normalisation_hauteur_titre_block('.page-about-us-home .view-view-pages .ligne', '.views-row h2');
		
		normalisation_hauteur_titre_block('.page-error-404', ' .view-display-id-block_page_link_general .views-row h2');
		normalisation_hauteur_titre_block('.page-error-403', ' .view-display-id-block_page_link_general .views-row h2');
		normalisation_hauteur_titre_block('.page-library-home', ' .view-display-id-block_bottom_pagette_pres .views-row h2');
		
		// vérifie que la page est chargée et la font aussi
		$(window).bind("load", function() {
			normalisation_hauteur_titre_block('.page-mobiles-et-tablettes', '.eqpt h3');
			normalisation_hauteur_titre_block('.page-mobiles-et-tablettes', '.offre h3');
			normalisation_hauteur_titre_block('.page-mobiles-et-tablettes', '.zoom h3');
		});
		normalisation_hauteur_titre_block('.node-type-axiome', '.hot-content h3');
		normalisation_hauteur_titre_block('.node-type-content-partner', '.related-content .views-row h3');
		
		
		/*
		 * Normalisation de la hauteur des blocs news en bas de page
		 */
		function normalisation_hauteur_block (conteneur, bloc, marge){
			
			// récupération de la plus grande hauteur de bloc dans le conteneur
			$(bloc).imagesLoaded(function(){
				var height_block = 0;
				if ($(conteneur).length){
					$(conteneur + ' ' + bloc).each(function (){
						if ($(this).outerHeight(true) > height_block){
							height_block = $(this).outerHeight(true);
						}
					});
					height_block = height_block + marge;
					// application de la hauteur max à tous les blocs
					$(conteneur + ' ' + bloc).height(height_block);
				}
			});
		}
		
		normalisation_hauteur_block('.node-type-content-case-studies-card', '.related-content .views-row', 32);
		normalisation_hauteur_block('.node-type-content-solution', '.related-content .views-row', 32);
		normalisation_hauteur_block('.node-type-content-industry', '.related-content .views-row', 32);
		normalisation_hauteur_block('.node-type-content-region', '.related-content .views-row', 32);
		normalisation_hauteur_block('.node-type-content-partner', ' .related-content .views-row', 32);
		normalisation_hauteur_block('.node-type-axiome', '.view-hot-content .views-row', 32);
		normalisation_hauteur_block('.node-type-pagette', '.hot-content .views-row', 32);
		normalisation_hauteur_block('.page-network-performance', '.pane-obs-backbones-4 .views-row', 32);


		normalisation_hauteur_block('.page-partners-home', ' .view-display-id-partner_list .views-row', -85);

		normalisation_hauteur_block('.node-type-content-region', ' .view-display-id-block_know_more .views-row', 32);
		normalisation_hauteur_block('.node-type-content-industry', ' .view-display-id-block_know_more .views-row', 32);
		normalisation_hauteur_block('.node-type-content-solution', ' .view-display-id-block_know_more .views-row', 32);

		normalisation_hauteur_block('.page-error-404', ' .view-display-id-block_page_link_general .views-row', 32);
		normalisation_hauteur_block('.page-error-403', ' .view-display-id-block_page_link_general .views-row', 32);
		
		// pour attendre que les images soient chargées
		$(window).bind("load", function() {
			normalisation_hauteur_block('.node-type-content-home-page', '.toppagebloced .row .block', 0);
			normalisation_hauteur_block('.node-type-content-home-page', '.highlighted .row .block', 0);
		});
		
		//normalisation_hauteur_block('.page-mobiles-et-tablettes', '#equipements .eqpt', 0);
		normalisation_hauteur_block('.page-error-404', ' .view-display-id-block_page_link_general .views-row', 32);
		normalisation_hauteur_block('.page-error-403', ' .view-display-id-block_page_link_general .views-row', 32);
		
		normalisation_hauteur_block('.page-library-home', ' .view-display-id-block_bottom_pagette_pres .views-row', 32);
		
		/*
		 * Normalisation de la hauteur des blocs document type en bas de page
		 */
		function normalisation_hauteur_block_document_type (reference, bloc, titre){
			if ($(reference).length){
				// récupération de la hauteur du bloc reference
				var height_block = 0;
				$(reference).each(function (){
					if ($(this).outerHeight(true) > height_block){
						height_block = $(this).outerHeight(true);
					}
				});
				
				// application de la hauteur au block document type si la hauteur est different de 0
				if (height_block!=0){
					$(bloc).each(function (){
						if(height_block > $(this).outerHeight(true)){
							var diff = parseInt(height_block) - parseInt($(this).outerHeight(true)) + parseInt($(this).find('.document_type_random_block').css('padding-bottom'));
							$(this).find('.document_type_random_block').css('paddingBottom', diff);
						}

					});
					
				}
			}
		}
		normalisation_hauteur_block_document_type('.view-hot-content .views-row', '.view-documents .document_type_random', '.view-documents .views-field-title h3');
		normalisation_hauteur_block_document_type('.view-backbones-hot-content .views-row', '.view-documents .document_type_random', '.view-documents .views-field-title h3');
		normalisation_hauteur_block_document_type('.view-display-id-block_know_more .views-row', '.view-display-id-block_know_more .document_type_random', '.view-display-id-block_know_more .views-field-title');

		function complement_hauteur_block_document_type (reference, bloc, titre, editable){
			if ($(reference).length){
				// récupération de la hauteur du bloc reference
				var height_block = 0;
				$(reference).each(function (){
					if ($(this).outerHeight(true) > height_block){
						height_block = $(this).outerHeight(true);
					}
				});
				// application de la hauteur au block document type si la hauteur est different de 0
				if (height_block!=0){
					$(bloc).each(function (){
						var diff = parseInt(height_block) - (parseInt($(this).outerHeight(true)) - parseInt($(this).find(editable).css('padding-bottom')) + parseInt($(this).find(titre).outerHeight(true))) +10 ;
						$(this).find(editable).css('paddingBottom', diff);
					});
				}
			}
		}
		complement_hauteur_block_document_type('.node-type-content-case-studies-card .block-hot-content .view-documents .views-row', '.node-type-content-case-studies-card .block-hot-content .view-documents .document_type_random', '.views-field-title h3', '.document_type_random_block');

		/*
		 * Normalisation de la hauteur des blocs news dans la home des case studies
		 */
		function normalisation_hauteur_caseStudies_home (){
			
			var tab_caseStudies = new Array();
			var count_bloc = 0;
			var height_case_studies_news = 0;
			var conteneur = $('.view-display-id-case_studies_list_main .view-content');
			conteneur.children().each(function(){
				if ($(this).attr('class')=='clear'){
					for (var i=0; i<tab_caseStudies.length; i++){
						tab_caseStudies[i].height(height_case_studies_news); 
					}
					height_case_studies_news = 0;
					count_bloc = 0;
					tab_caseStudies = new Array();
				}else{
					tab_caseStudies[count_bloc] = $(this);
					if ($(this).height()>height_case_studies_news){
						height_case_studies_news = $(this).height();
					}
					count_bloc++;
				}
			});
			
			var tab_caseStudies = new Array();
			var count_bloc = 0;
			var height_case_studies_news = 0;
			var conteneur = $('.view-display-id-case_studies_list_main .hidden_zone_case_studies_home');
			conteneur.css('display', 'block');
			conteneur.children().each(function(){
				if ($(this).attr('class')=='clear'){
					for (var i=0; i<tab_caseStudies.length; i++){
						tab_caseStudies[i].height(height_case_studies_news); 
					}
					height_case_studies_news = 0;
					count_bloc = 0;
					tab_caseStudies = new Array();
				}else{
					tab_caseStudies[count_bloc] = $(this);
					if ($(this).height()>height_case_studies_news){
						height_case_studies_news = $(this).height();
					}
					count_bloc++;
				}
			});
			conteneur.css('display', 'none');
		}
		
		
		normalisation_hauteur_caseStudies_home();
		

		/*
		 * Pop-in contact presentation
		 */
		
		function obs_popin_contact_presentation(page, bouton, formulaire){
			if ($(page).length){
				$(formulaire).hide();
				$('body').append('<div class="popin_contact"><div class="content"></div></div>');
				$('.popin_contact .content').append($(formulaire).html());
				$('.popin_contact .content').append('<div class="fermer"><a href="#contact">close</a></div>');
			
				$('.popin_contact .fermer a').bind({
	            	click: function(e){
	            		$('.popin_contact').hide();
	            		window.location.hash="";
	            		history.pushState('', document.title, window.location.pathname);
	            		e.preventDefault();
	            	}
				});
				
				if ($(formulaire).hasClass('post_sent')){
					$('.popin_contact').show();
				}
				else{
					$('.popin_contact').hide();
				}
				
				$(bouton).click(function(){
					$('.popin_contact').show();
				});
			}
		}
		
		//obs_popin_contact_presentation('.node-type-content-region', '.contact_box .contact_mail', '.node-type-content-region .form_contact');
		//obs_popin_contact_presentation('.node-type-content-solution', '.contact_box .contact_mail', '.node-type-content-solution .form_contact');
		//obs_popin_contact_presentation('.node-type-content-indusrty', '.contact_box .contact_mail', '.node-type-content-indusrty .form_contact');
		
			
		/* gestion des case a cocher en js pour la recherche solr */
		
		$("#facetapi-facet-apachesolrsolr-block-bundle .leaf").each(function(){
			if(jQuery(this).find(".facetapi-checkbox").attr('checked')){
				jQuery(this).addClass("checked");
			}
			
	    	//if (jQuery(this).checked == "check"){
	    	//	jQuery(this).remove();
	    	//}
	    });
		
		
		
		// Lien en _blank dans le menu footer
		$('#footer .content a[href^="http"]').each(function(){
			$(this).attr({'target': '_blank'});
		});
		
		
		
		// Pager News Press Release
	    if($('.news_feed').length){
	        $('.pager_news_feed').ooPager($('.news_feed'),4, {
	             prev: {
	                 label: "\u2039",
	                 icon: false
	             },
	             next: {
	                 label: "\u203a",
	                 icon: false
	             }
	         });
	    }
	    // case studies (si pas d'image on prend toute la largeur)
	    	//home 
	    if($('.view-case-studies-views').length){
	    	$('.case-studies-wrap').each(function(index) {
	    		if($.browser.msie){
	    			if(this.childNodes[0].className == "views-field views-field-title"){
	    				for(var i=0; i<= 3 ; i++){
		    				$(this.childNodes[i]).css("margin-left","-400px");
		    				$(this.childNodes[i]).css("width","600px");
		    			}
	    			}
	    		}else{
	    			if(this.childNodes[1].className == "views-field views-field-title"){
		    			for(var i=1; i<= 8 ; i++){
		    				$(this.childNodes[i]).css("margin-left","-400px");
		    				$(this.childNodes[i]).css("width","600px");
		    			}
		    		}
	    		}
		    });
	    }
	    	// page du case study
	    if($('.view-display-id-block_verbatim_customer_banniere .views-row').length){
			$('.view-display-id-block_verbatim_customer_banniere').each(function(index) {
				if($.browser.msie){
    				if(this.childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML == ""){
    					$(".view-display-id-block_verbatim_customer_banniere .view-content").css("padding","0 0 10px 0");
    				}
				}else{
					if(this.childNodes[1].childNodes[1].childNodes[1].childNodes[1].innerHTML == ""){
						$("#block-system-main .view-display-id-block_verbatim_customer_banniere .view-content").css("padding","0 0 10px 0");
						$("#block-system-main .view-display-id-block_verbatim_customer_banniere .view-content .views-row").css("width","100%");
					}
				}
			});
			// si pas de results on prend toute la largeur
			var divObj = $('.node-type-content-case-studies-card .row-results .highlights-verbatim div').html().replace(/^\s+/g,'').replace(/\s+$/g,'');
			if(divObj == ''){	
				$('.node-type-content-case-studies-card .row-results .results').width("auto");
			}
			// si pas d'objective on prend toute la largeur
			var divObj = $('.node-type-content-case-studies-card .row-objective .contexte div').html().replace(/^\s+/g,'').replace(/\s+$/g,'');
			if(divObj == ''){	
				$('.node-type-content-case-studies-card .row-objective .objective').width("auto");
			}
			// si pas de white paper on prend toute la largeur
			var divWP = $('.node-type-content-case-studies-card .row-benefits .white-paper div').html().replace(/^\s+/g,'').replace(/\s+$/g,'');
			if(divWP == ''){	
				$('.node-type-content-case-studies-card .row-benefits .benefits').width("auto");
			}
			// centrage vertical icon solution
			if($('.view-display-id-block_solution_banniere').length){
				$('.view-display-id-block_solution_banniere .carousel-view li').each(function(index) {
					var hIcon = (jQuery(this).height()-jQuery(this).find('.views-field-field-image img').height())/2;
	    			hIcon += 22; // correspond au padding
					jQuery(this).find('.views-field-field-image').css('top',hIcon+'px');
				});
			}
	    }
	    // page sitemap
	    if($('#sitemap #sitemap-link1').length){
	    	$("#sitemap #sitemap-link1 a").hover(
			  function () {
				  $("#sitemap #sitemap-link1 a .icon-more-big").css("background-position","-112px -103px");
				  }, 
				  function () {
					  $("#sitemap #sitemap-link1 a .icon-more-big").css("background-position","-80px -56px");
				  }
				);
	    	$("#sitemap #sitemap-link2 a").hover(
	  			  function () {
	  				  $("#sitemap #sitemap-link2 a .icon-more-big").css("background-position","-112px -103px");
	  				  }, 
	  				  function () {
	  					  $("#sitemap #sitemap-link2 a .icon-more-big").css("background-position","-80px -56px");
	  				  }
	  				);
	    	$("#sitemap #sitemap-link3 a").hover(
	  			  function () {
	  				  $("#sitemap #sitemap-link3 a .icon-more-big").css("background-position","-112px -103px");
	  				  }, 
	  				  function () {
	  					  $("#sitemap #sitemap-link3 a .icon-more-big").css("background-position","-80px -56px");
	  				  }
	  				);
	    	$("#sitemap #sitemap-link4 a").hover(
	  			  function () {
	  				  $("#sitemap #sitemap-link4 a .icon-more-big").css("background-position","-112px -103px");
	  				  }, 
	  				  function () {
	  					  $("#sitemap #sitemap-link4 a .icon-more-big").css("background-position","-80px -56px");
	  				  }
	  				);
	    	$("#sitemap #sitemap-link5 a").hover(
	  			  function () {
	  				  $("#sitemap #sitemap-link5 a .icon-more-big").css("background-position","-112px -103px");
	  				  }, 
	  				  function () {
	  					  $("#sitemap #sitemap-link5 a .icon-more-big").css("background-position","-80px -56px");
	  				  }
	  				);
	    	$("#sitemap #sitemap-link6 a").hover(
	  			  function () {
	  				  $("#sitemap #sitemap-link6 a .icon-more-big").css("background-position","-112px -103px");
	  				  }, 
	  				  function () {
	  					  $("#sitemap #sitemap-link6 a .icon-more-big").css("background-position","-80px -56px");
	  				  }
	  				);
	    	// adjust height for sitemap blocks
	    	// solutions and products
	    	var h1;
	    	var h2;
	    	h1 = $(".view-display-id-block_sitemap_solutions .box-gray").height();
	    	h2 = $(".view-display-id-block_sitemap_products .box-gray").height();
	    	if(h1 > h2){
	    		$(".view-display-id-block_sitemap_products .box-gray").css("height",h1+"px");
	    	}else{
	    		$(".view-display-id-block_sitemap_solutions .box-gray").css("height",h2+"px");
	    	}
	    	// case studies and industries
	    	h1 = $(".view-display-id-block_sitemap_casestudies .box-gray").height();
	    	h2 = $(".view-display-id-block_sitemap_industries .box-gray").height();
	    	if(h1 > h2){
	    		$(".view-display-id-block_sitemap_industries .box-gray").css("height",h1+"px");
	    	}else{
	    		$(".view-display-id-block_sitemap_casestudies .box-gray").css("height",h2+"px");
	    	}
	    	// regions and experts
	    	h1 = $(".view-display-id-block_sitemap_regions .box-gray").height();
	    	h2 = $(".view-display-id-block_sitemap_experts .box-gray").height();
	    	if(h1 > h2){
	    		$(".view-display-id-block_sitemap_experts .box-gray").css("height",h1+"px");
	    	}else{
	    		$(".view-display-id-block_sitemap_regions .box-gray").css("height",h2+"px");
	    	}
	    	// about us and partners
	    	h1 = $(".view-display-id-block_sitemap_aboutus .box-gray").height();
	    	h2 = $(".view-display-id-block_sitemap_partners .box-gray").height();
	    	if(h1 > h2){
	    		$(".view-display-id-block_sitemap_partners .box-gray").css("height",h1+"px");
	    	}else{
	    		$(".view-display-id-block_sitemap_aboutus .box-gray").css("height",h2+"px");
	    	}
	    }
		
	    
	    // Main menu
	    $('.obs_main_menu > ul > li > ul').css('clip', 'auto');
	    $('.obs_main_menu > ul > li > ul').css('top', '42px');
	    $('.obs_main_menu > ul > li > ul').css('display', 'block');
	    $('.obs_main_menu > ul > li > ul').addClass('element-invisible');
	    
	    $('.obs_main_menu > ul > li').bind({
	    	mouseenter: function(e){
	    		$(this).addClass('focused');
	    		$(this).find('ul:first').removeClass('element-invisible');
	    	},
	    	focusin:function(e){
	    		$(this).addClass('focused');
		    	$(this).find('ul:first').removeClass('element-invisible');
	    	},
	    	mouseleave: function(e){
	    		$(this).removeClass('focused');
	    		$(this).find('ul:first').addClass('element-invisible');
	    	},
	    	focusout:function(e){
	    		$(this).removeClass('focused');
		    	$(this).find('ul:first').addClass('element-invisible');	
	    	}
	    });
	    
	    
	    // Top menu
	    $('.obs_top_menu > div > ul > li > ul').css('clip', 'auto');
	    $('.obs_top_menu > div > ul > li > ul').css('top', '100%');
	    $('.obs_top_menu > div > ul > li > ul').css('display', 'block');
	    $('.obs_top_menu > div > ul > li > ul').addClass('element-invisible');
	    
	    $('.obs_top_menu > div > ul > li').bind({
	    	mouseenter: function(e){
	    		$(this).addClass('focused');
	    		$(this).find('ul:first').removeClass('element-invisible');
	    	},
	    	focusin:function(e){
	    		$(this).addClass('focused');
	    		$(this).find('ul:first').removeClass('element-invisible');
	    	},
	    	mouseleave: function(e){
	    		$(this).removeClass('focused');
	    		$(this).find('ul:first').addClass('element-invisible');
	    	},
	    	focusout:function(e){
	    		$(this).removeClass('focused');
	    		$(this).find('ul:first').addClass('element-invisible');
	    	}
	    });
	    
	    //gestion du script de select pour les liste de wwpresence
	    val_area = $('#edit-area').val();
	    if(val_area != "All"){
	    	$('.location_auto_country .list ul li').each(function(){
	    		if(tab_country[$(this).find('span').attr('data-value')] != val_area){
					$(this).hide();
				}
			});
		}
	    $('#edit-area').bind({
	    	change: function(e){
	    		$('.location_auto_country .list ul li').each(function(){
						   $(this).show();
				});
	 		   	val_area = $('#edit-area').val();
	 		   	if(val_area != "All"){ 		   		
	 		   		$('.location_auto_country .list ul li').each(function(){
	 		   			if(tab_country[$(this).find('span').attr('data-value')] != val_area){
	 		   				$(this).hide();
	 		   			}
	 		   		});
	 		   	}	    		
	    		
	    	}
	    });
	    
	    //gestion du script de select pour les liste de network-coverage
	    if ($('#views-exposed-form-network-coverage-page-network-coverage #edit-solution option').length){
	    	var tab_solution = new Array();
	    	$('#edit-solution option').each(function(){
	    		if ($(this).attr('value') != 'All'){
	    			tab_solution[$(this).val()] = $(this).text();
	    		}
	    	});
	    	
	    	var tab_produit = new Array();
	    	$('#edit-product option').each(function(){
	    		if ($(this).attr('value') != 'All'){
	    			tab_produit[$(this).val()] = $(this).text();
	    		}
	    	});
	    	
	    	//console.log(tab_solutions[16347][5577]);
	    	val_solution = $('#edit-solution').val();
		    if(val_solution != "All"){
		    	
		    	$('#edit-product-wrapper .list ul li').each(function(){
		    		if ($(this).find('span').attr('data-value') != "All"){
			    		if($(this).find('span').attr('data-value') in tab_solutions[val_solution]){
	 		   			}
	 		   			else{
	 		   				$(this).hide();
	 		   			}
		    		}
				});
			}
		    $('#edit-solution').bind({
		    	change: function(e){
		    		$('#edit-product-wrapper .list ul li').each(function(){
						$(this).show();
					});
		    		val_solution = $('#edit-solution').val();
		 		   	if(val_solution != "All"){ 		   		
		 		   		$('#edit-product-wrapper .list ul li').each(function(){
		 		   			if ($(this).find('span').attr('data-value') != "All"){
			 		   			if($(this).find('span').attr('data-value') in tab_solutions[val_solution]){
			 		   			}
			 		   			else{
			 		   				$(this).hide();
			 		   			}
		 		   			}
		 		   		});
		 		   	}	    		
		    	}
		    });
	    }
	   
	   
	   // Placeholder support
		var checkPlaceholder = function checkPlaceholder(){
	        var i = document.createElement('input');
	        return 'placeholder' in i;
	    };

	    if(!checkPlaceholder()) {
	        var active = document.activeElement;
	        $(':text, input[type="email"], input[type="password"], textarea').focus(function () {
	        	if ($(this).attr('placeholder') !== '' && $(this).val() === $(this).attr('placeholder')) {
	                $(this).val('').removeClass('hasPlaceholder');
	            }
	        }).blur(function () {
	        	if ($(this).attr('placeholder') !== '' && ($(this).val() === '' || $(this).val() === $(this).attr('placeholder'))) {
	                $(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
	            }
	        });
	        $('input').blur();
	        $(active).focus();
	        $('form').submit(function () {
	            $(this).find('.hasPlaceholder').each(function() { 
	            	if ($(this).val() === $(this).attr('placeholder')) {
	            		$(this).val(''); 
	            	}
	            });
	        });
	    }
	    else{
	    }
	   
	   
	   // eviter scroll horizontal sur home case studies 
	   if($('.page-customer-stories').length){
		   $('html').css('overflow-x','hidden');
	   }

		//Cacher la colonne "related content" de document si pas de contenu:
		if( $('.node-type-content-document-type .right-column .views-row').length == 0 ){
			$('.node-type-content-document-type .right-column').css("display","none");
			$('.node-type-content-document-type .left-column').addClass("full");	
		}
		
		// Gestion du "push contact"
		var stickyContact = $('#sticky-contact');
	    if(stickyContact.length) {
	    	stickyContact.css('display', 'block');
	        var isSticky = false, supportTransitions = $('html').hasClass('csstransitions'), offsetTop = $("#header").outerHeight(true);
	        $(window).bind('scroll', function() {
	            windowTop = $(window).scrollTop();

	            if(windowTop > offsetTop) {

	                if(supportTransitions && !stickyContact.hasClass("shown")) {
	                    
	                    stickyContact.addClass("shown");
	                    isSticky = true;
	                    
	                } else if(!supportTransitions && !isSticky) {

	                    stickyContact.stop().animate({"bottom":0},200);
	                    isSticky = true;

	                }


	            } else {

	                if(supportTransitions && stickyContact.hasClass("shown")) {
	                    
	                    stickyContact.removeClass("shown");
	                    isSticky = false;
	                    
	                } else if(!supportTransitions && isSticky) {
	                	var stickyContactHeight = stickyContact.height()+5;
	                    stickyContact.stop().animate({"bottom":-stickyContactHeight},200);
	                    isSticky = false;

	                }

	            }
	        });
	    }

		// Gestion du "popin-campagne"
	    var campagne = $("#popin-campagne");
	    if(campagne.length) {
	        $("body").addClass("not-scrollable");
	        $('#overlay-website, #popin-campagne .close').click(function(event){
	            $('#overlay-website').stop().fadeOut(300);
	            $("body").removeClass("not-scrollable");
	            campagne.hide();
	        });

	        var PADDING = 55, campagneHeight = campagne.height();
	        $(window).resize(function() {
	            var hh = $(this).height();
	            if(hh <= campagneHeight + 2*PADDING && !campagne.find(".more").hasClass("fixed")) campagne.find(".more").addClass("fixed");
	            else if(hh > campagneHeight + 2*PADDING && campagne.find(".more").hasClass("fixed")) campagne.find(".more").removeClass("fixed");
	        });
	    }
	    
	    
	    if( jQuery('.node-type-axiome .rubrique_standard .doc_utiles .colorbox-inline').length > 0){
			// appels colorbox
			jQuery(".node-type-axiome .rubrique_standard .doc_utiles .colorbox-inline").colorbox({inline:true, fastIframe:false, scalePhotos:true,maxWidth:'100%',maxHeight:'100%',fixed:true,current:""});
			jQuery(document).bind('cbox_complete', function(){
				var h = (jQuery('#cboxLoadedContent iframe').height()+50)+'px';
				jQuery.colorbox.resize({innerHeight:h});
			});
		}
	    
	});
	
})(jQuery, window, document); 