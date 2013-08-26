(function($, w, d, c){
	$(d).ready(function() {
		var documentWidth = jQuery(document).width();
		var bodyWidth = jQuery("body").width();
/*
		if (documentWidth > bodyWidth){
			jQuery("#pre-main").width(bodyWidth-5);
			jQuery("#pre-main").css('overflow', 'hidden');
		}
		else{
			if (documentWidth < 1260){
				jQuery("#pre-main").width(documentWidth);
				jQuery("#pre-main").css('overflow', 'hidden');
			}
			else{
				jQuery("#pre-main").width(1260);
			}
		}
*/	
		// prototype pour contrer le bug qui limite la taille de 
		// la property left pour le caroussel
		// http://bugs.jquery.com/ticket/7287
		$.fx.prototype.cur = function(){ 
    	    if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
    	      return this.elem[ this.prop ];
    	    }

    	    var r = parseFloat( jQuery.css( this.elem, this.prop ) );
    	    return typeof r == 'undefined' ? 0 : r;
    	    
    	}
		
/* page case studies */
		var carousel_list = jQuery(".page-customer-stories-home .view-display-id-case_studies_list_vip .view-content li");
		var carousel_parent = jQuery(".page-customer-stories-home .view-display-id-case_studies_list_vip .view-content");
		if(jQuery("body").width()<1260){
			jQuery(".page-customer-stories-home #sub-header").width("100%");
			carousel_list.width(jQuery("body").width());
			carousel_parent.find('.carousel-view').width(jQuery("body").width());
		}
		else{
			jQuery(".page-customer-stories-home #sub-header").width(1260);
			carousel_list.width(1260);
			carousel_parent.find('.carousel-view').width(1260);
		}	
		
		jQuery(".page-customer-stories-home .view-display-id-case_studies_list_vip .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : true,
	            "pagerItems" : false,
	            'prevNextPreviewClass' : 'views-field-field-taxo-client'
	        },
	        loop: false
	    });
		
		if(jQuery("body").width()<1260){
			carousel_parent.find('.carousel-list').width(jQuery("body").width());
			jQuery(".page-customer-stories-home #pre-main").width(jQuery("body").width());
		}
		else{
			carousel_parent.find('.carousel-list').width(1260);
			jQuery(".page-customer-stories-home #pre-main").width(1260);
		}	
		
		
	    jQuery(".node-type-content-case-studies-card .view-display-id-block_solution_banniere .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });

	    jQuery(".view-display-id-block_verbatim_customer_banniere_by_nat .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
	    
	    jQuery(".view-display-id-block_verbatim_customer_banniere_by_tid .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
		
		
/* page solution */
		
		jQuery(".view-display-id-block_solution_bandeau .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : true,
	            "pagerItems" : false,
	            "prevNextPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
	    
	    jQuery(".carousel_block_solution li").each(function(){
	    	if (jQuery(this).find(".block_textuel").text() == ""){
	    		jQuery(this).remove();
	    	}
	    });
	    
	    jQuery(".carousel_block_solution").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
	    
	    jQuery(".carousel_block_solution_pourquoinous li").each(function(){
	    	var hauteurText = $(this).find('.block_textuel').height();
	    	var hauteurImage = 	$(this).parent().parent().parent().find('.pourquoinous_background img').height();
	    	if (jQuery(this).text() == ""){
	    		jQuery(this).remove();
	    	}
	    	
	    	if (hauteurText > hauteurImage) $(this).parent().parent().parent().find('.pourquoinous_background').height(hauteurText);
	    	else $(this).find('.block_textuel').height(hauteurImage);
	    });	    
	    
	    jQuery(".carousel_block_solution_pourquoinous").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : true,
	            "pagerItems" : false
	        },
	        loop: false
	    });
	    
	    $(".carousel_block_solution_pourquoinous li").each(function(){
			var imageHeight = $(this).parent().parent().parent().find('.pourquoinous_background').height();
			var textHeight = $(this).find('.block_textuel').height();
			
			if (imageHeight>textHeight) $(this).find('.block_textuel').height(imageHeight);
			else if (imageHeight<textHeight) $(this).parent().parent().parent().find('.pourquoinous_background img').height(textHeight);
		});
	    
	    if ($.trim($(".view-display-id-block_solution_pourquoinous").text()) == ""){
	    	$(".view-display-id-block_solution_pourquoinous").remove();
	    }
	    
	    var hauteurParent = jQuery(".view-display-id-block_solution_pourquoinous").height();
		var hauteurConteneur = jQuery(".carousel_block_solution_pourquoinous").height();
		var hauteurFleche = jQuery(".carousel_block_solution_pourquoinous .carousel-list .carousel-next").height();
		var carouselFleche = jQuery(".carousel_block_solution_pourquoinous .carousel-list");
		carouselFleche.css('top', (hauteurConteneur/2-((hauteurParent-hauteurConteneur)/2)-hauteurFleche)+'px');
	    
		jQuery(".node-type-content-solution .view-display-id-block_solution_explique .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
		
	    
		var carousel_list = jQuery(".view-display-id-block_solution_bandeau .view-content .carousel-view li");
		if(jQuery("body").width()<1260){
			carousel_list.width(jQuery("body").width());
		}
		else{
			carousel_list.width(1260);
		}	
		
	    
/* page industrie */

		jQuery(".view-display-id-block_industry_bandeau .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : true,
	            "pagerItems" : false,
	            "prevNextPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
	    

	    jQuery(".carousel_block_industry li").each(function(){
	    	if (jQuery(this).find(".block_textuel").text() == ""){
	    		jQuery(this).remove();
	    	}
	    });	  	    
	    jQuery(".carousel_block_industry").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
  
	    
	    jQuery(".carousel_block_industry_pourquoinous").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : true,
	            "pagerItems" : false
	        },
	        loop: false
	    });
	    
	    $(".carousel_block_industry_pourquoinous li").each(function(){
			var imageHeight = $(this).parent().parent().parent().find('.pourquoinous_background img').height();
			var textHeight = $(this).find('.block_textuel').height();
			
			if (imageHeight>textHeight) $(this).find('.block_textuel').height(imageHeight);
			else if (imageHeight<textHeight) $(this).parent().parent().parent().find('.pourquoinous_background img').height(textHeight);
		});
	    
	    
	    jQuery(".carousel_block_industry_pourquoinous li").each(function(){
	    	var hauteurText = $(this).find('.block_textuel').height();
	    	var hauteurImage = 	$(this).find('.image_gauche').height();
	    	if (jQuery(this).text() == ""){
	    		jQuery(this).remove();
	    	}
	    	
	    	if (hauteurText > hauteurImage) $(this).find('.image_gauche').height(hauteurText);
	    	else $(this).find('.block_textuel').height(hauteurImage);
	    });
	    
	    if ($.trim($(".view-display-id-block_industry_pourquoinous").text()) == ""){
	    	$(".view-display-id-block_industry_pourquoinous").remove();
	    }
	    
	    var hauteurParent = jQuery(".view-display-id-block_industry_pourquoinous").height();
		var hauteurConteneur = jQuery(".carousel_block_industry_pourquoinous").height();
		var hauteurFleche = jQuery(".carousel_block_industry_pourquoinous .carousel-list .carousel-next").height();
		var carouselFleche = jQuery(".carousel_block_industry_pourquoinous .carousel-list");
		carouselFleche.css('top', (hauteurConteneur/2-((hauteurParent-hauteurConteneur)/2)-hauteurFleche)+'px');
	    
		jQuery(".node-type-content-industry .view-display-id-block_industry_explique .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
		
		var carousel_list = jQuery(".view-display-id-block_industry_bandeau .view-content .carousel-view li");
		if(jQuery("body").width()<1260){
			jQuery(".node-type-content-industry #sub-header").width("100%");
			carousel_list.width(jQuery("body").width());
		}
		else{
			jQuery(".node-type-content-industry #sub-header").width(1260);
			carousel_list.width(1260);
		}
		
		
/* page region */
		
		var carousel_list = jQuery(".view-display-id-block_region_bandeau .view-content .carousel-view li");
		if(jQuery("body").width()<1260){
			jQuery(".node-type-content-region #sub-header").width("100%");
			carousel_list.width(jQuery("body").width());
			
		}
		else{
			jQuery(".node-type-content-region #sub-header").width(1260);
			carousel_list.width(1260);
			
		}
		
		var carousel_list = jQuery(".view-display-id-block_region_bandeau .view-content .carousel-view li");
		if(jQuery("body").width()<1260){
			jQuery(".page-node-contact-form #sub-header").width("100%");
			carousel_list.width(jQuery("body").width());
			
		}
		else{
			jQuery(".page-node-contact-form #sub-header").width(1260);
			carousel_list.width(1260);
			
		}
		jQuery(".node-type-content-region .view-display-id-block_region_explique .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });
		
		jQuery(".carousel_block_region_pourquoinous").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : true,
	            "pagerItems" : false
	        },
	        loop: false
	    });
		
		$(".carousel_block_region_pourquoinous li").each(function(){
			var imageHeight = $(this).parent().parent().parent().find('.pourquoinous_background img').height();
			var textHeight = $(this).find('.block_textuel').height();
			
			if (imageHeight>textHeight) $(this).find('.block_textuel').height(imageHeight);
			else if (imageHeight<textHeight) $(this).parent().parent().parent().find('.pourquoinous_background img').height(textHeight);
		});
	    
	    
	    jQuery(".carousel_block_region_pourquoinous li").each(function(){
	    	var hauteurText = $(this).find('.block_textuel').height();
	    	var hauteurImage = 	$(this).find('.image_gauche').height();
	    	if (jQuery(this).text() == ""){
	    		jQuery(this).remove();
	    	}
	    	
	    	if (hauteurText > hauteurImage) $(this).find('.image_gauche').height(hauteurText);
	    	else $(this).find('.block_textuel').height(hauteurImage);
	    });
	    
	    if ($.trim($(".view-display-id-block_region_pourquoinous").text()) == ""){
	    	$(".view-display-id-block_region_pourquoinous").remove();
	    }
	    
	    var hauteurParent = jQuery(".view-display-id-block_region_pourquoinous").height();
		var hauteurConteneur = jQuery(".carousel_block_region_pourquoinous").height();
		var hauteurFleche = jQuery(".carousel_block_region_pourquoinous .carousel-list .carousel-next").height();
		var carouselFleche = jQuery(".carousel_block_region_pourquoinous .carousel-list");
		carouselFleche.css('top', (hauteurConteneur/2-((hauteurParent-hauteurConteneur)/2)-hauteurFleche)+'px');
		
		
/* page produits */
	    jQuery(".node-type-axiome .view-display-id-block_solution_banniere .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });

/* page russian product */
	    jQuery(".node-type-russian-product .view-display-id-block_verbatim_russian_product .view-content").OoCarousel({
	        effect: {type:"slide"},
	        pager: {
	            "prevNext"   : false,
	            "pagerItems" : true,
	            "itemsPreviewClass" : "carousel-preview"
	        },
	        loop: false
	    });	
	    
	    // Home
	   $('.carousel-home').OoCarousel({
	    	effect: {type:"fade"},
	        pager: {
	        	'prevNext'   : true,
	        	'pagerItems' : $('.list-home-carousel')
	        },
	        diaporama: {
	        	'active' : true,
	        	'duration' : 6000,
	        	'pause' : true
	        	},
	        	fluid: true 
	    });
	    
	    jQuery(".node-type-content-home-page .carousel-home .carousel-view ul li img").obs_fluid_img();
	    jQuery(".view-display-id-block_solution_bandeau .views-field-field-illustration img").obs_fluid_img();
	    jQuery(".view-display-id-block_industry_bandeau .views-field-field-illustration img").obs_fluid_img();
	    jQuery(".view-display-id-block_region_bandeau .views-field-field-img-banniere img").obs_fluid_img();    	  
	    jQuery(".page-library-home .view-display-id-headband_page_premain .views-field-field-illustration img").obs_fluid_img();
	    jQuery(".node-type-content-document-type .view-display-id-documents_bandeau .views-field-field-illustration img").obs_fluid_img();
	});

	
	
	
})(jQuery, window, document, window.console); 