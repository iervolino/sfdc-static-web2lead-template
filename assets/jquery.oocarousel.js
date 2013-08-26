(function($){
    //TODO unit test
    // https://github.com/pivotal/jasmine/wiki/Suites-and-specs
    /*
     * Class Carousel
     * @param {Object} el
     * @param {Object} options
     */

	
    $.OoCarousel = function(el, options){
                
        var CLSCAROUSELVIEW     = 'carousel-view',
            CLSCAROUSELPAGER    = 'carousel-list',
            TRANSITIONFADE      = 'fade',
            TRANSITIONFADEOUTIN = 'fadeOutIn',
            CLSTYPECAROUSEL     = 'carousel-view-',
            CLSCAROUSELTHUMB    = 'carousel-thumb',
            CLSITEM             = 'item-',
            CLSACTIVEITEM       = 'active',
            TRANSITIONS         = ['fade', 'slide', 'fadeOutIn', 'apple', 'slideFade', 'slideOver'];
                
        var self = this;
        
        
        self.$el = $(el);
        self.el = el;
        
        self.$el.data("OoCarousel", self);
        
        self.init = function init(){
        	
            /*opts*/
            self.options = $.extend({},$.OoCarousel.defaultOptions, options);
            
            // carousel vars
            self.carouselView = self.$el.find('div.' + CLSCAROUSELVIEW);
            self.carouselContainer = self.carouselView.children();
            self.items = self.carouselView.find('>ul>li');
            self.totalItems = self.items.length;
            self.timer = null;
            self.cssTransitionsSupported = self.isCssTransition();
            self.vendorPrefix = self.getVendorPrefix();
            
            // On enlève le focus des liens
            /*self.carouselView.find('a').each(function(){
            	$(this).attr('tabindex', '-1');
            });*/
            
            if ( 0 === self.carouselView.length || self.totalItems <= 1 || !self.existTransition() ){
                return ;
            }
            
            self.currentItem = self.options.activeItem - 1;
            
            self.buildView();

            //Pagers
            if ( self.options.pager )
                self.createPagers();
                
            if ( self.options.diaporama.active) {
                self.prepareDiaporama();
            }
                
            // Apple animation worker
            if( self.options.effect.type === "apple") {
                self.appleWorker = true;
            }
                
            //keyboard controls
            if ( self.options.keyboardControls.active ) {
                self.attachKeyboardControls();
            }
            
            //self.attachTabControls();
            self.gestionfocus();
            
            self.setActiveItem(self.currentItem);
            
            // callback
            self.options.ended();
        };
        
        /*VIEW*/
        /*
         * Add the specific class CSS on the carousel-view element
         */
        self.buildView = function buildView(){
            self.carouselView.addClass( CLSTYPECAROUSEL + self.options.effect.type );
            
            self['prepareView' + self.options.effect.type]();
            for (var i = 0, len = self.items.length; i<len; i++){
              $(self.items[i]).addClass(CLSITEM + i);
            }
        };
        
        self.prepareViewslide = function prepareViewSlide(){
            var leftPosition;
            self.itemWidth = self.items.outerWidth(true);
            self.elCount = Math.ceil(self.items.length);
            self.slideCount = Math.ceil(self.elCount / self.options.group);
            self.slideWidth = self.itemWidth * self.options.group;

            self.totalWidth = (self.options.loop) ? (self.slideCount+2)*self.slideWidth : self.slideCount*self.slideWidth; //todo ternaire if option loop + clone first and last

            if(self.options.fluid) {
                self.slideWidth = (100/self.slideCount);
                self.itemWidth = (100/self.slideCount);
                self.totalWidth = 100 * self.slideCount;
                self.items.css({width:self.itemWidth+'%'});
            }

            var modulo = self.elCount%self.options.group;
            
            if(self.options.group>1 && self.elCount >= self.options.group ) {
                if(modulo) {
                    var elOldMargin = parseInt(self.carouselView.find('li:first').css('margin-right'), 10);
                    var elNewMargin = (self.options.group - modulo) * self.itemWidth + elOldMargin;
                    self.carouselView.find('li:last').css('margin-right', elNewMargin);
                }
            }
            
            if (self.options.loop){

                if(self.options.fluid) {
                    self.slideWidth = (100/(self.slideCount+2));
                    self.itemWidth = (100/(self.slideCount+2));
                    self.totalWidth = 100 * (self.slideCount+2);
                    self.items.css({width:self.itemWidth+'%'});
                }

                //clone first and last item
                var cloneFirst = self.carouselView.find('li:lt('+ self.options.group+')').clone().addClass('cloned'),
                    cloneLast = self.items.slice( (modulo) ? - modulo : - self.options.group ).clone().addClass('cloned');
                
                if(self.options.fluid) {
                    self.carouselContainer.append(cloneFirst).css({width:self.itemWidth+'%'});
                    self.carouselContainer.prepend(cloneLast).css({width:self.itemWidth+'%'});
                } else {
                    self.carouselContainer.append(cloneFirst);
                    self.carouselContainer.prepend(cloneLast);
                }
                
            }

            leftPosition = self.slideLeftPosition(self.currentItem);
            self.carouselView.css('overflow', 'hidden');

            if(self.options.fluid) {
                self.carouselContainer.width(self.totalWidth+'%');
                self.carouselContainer.css('left', -leftPosition+'%');
            } else {
                self.carouselContainer.width(self.totalWidth);
                self.carouselContainer.css('left', - leftPosition);
            }
        };
        
        self.prepareViewslideOver = function prepareViewslideOver(){
            self.itemWidth = self.items.outerWidth(true);
            self.elCount = Math.ceil(self.items.length);
            self.slideCount = Math.ceil(self.elCount / self.options.group);
            self.slideWidth = self.itemWidth * self.options.group;
            $('.carousel-prev-next li', self.$el).live({
                mouseenter: function(e){
                    var newIndex = ($(e.currentTarget).hasClass('carousel-prev')) ? self.currentItem-1 : self.currentItem+1;
                    if(newIndex<0) newIndex = self.slideCount-1;
                    if(newIndex==self.slideCount) {newIndex = 0; }
                    var newItem = self.carouselView.find('li').eq(newIndex),
                        side = (newIndex<self.currentItem) ? '-' : '';
                    if((newIndex===0 && self.currentItem == self.slideCount-1)){
                        side = '';
                    }
                    if((newIndex==self.slideCount-1 && self.currentItem === 0)){
                        side = '-';
                    }
                    newItem.css({
                        'z-index': 3,
                        'left': side+''+self.slideWidth+'px'
                    }).animate({
                        left: side+''+(self.slideWidth-100)+'px'
                    }, 'fast');
                },
                mouseleave: function(e){
                    var newIndex = ($(e.currentTarget).hasClass('carousel-prev')) ? self.currentItem-1 : self.currentItem+1;
                    if(newIndex<0) newIndex = self.slideCount-1;
                    if(newIndex==self.currentItem) newIndex = 0;
                    var newItem = self.carouselView.find('li').eq(newIndex),
                        side = (newIndex<self.currentItem) ? '-' : '';
                    if((newIndex===0 && self.currentItem == self.slideCount-1)){
                        side = '';
                    }
                    if((newIndex==self.slideCount-1 && self.currentItem === 0)){
                        side = '-';
                    }
                    newItem.animate({
                        left: side+''+(self.slideWidth)+'px'
                    }, 'fast', function(){
                        $(this).css({
                            'z-index': 1,
                            'left': 0
                        });
                    });
                }
            });
        };
        self.prepareViewfade = function prepareViewFade(){
            
        };
        
        self.prepareViewfadeOutIn = function prepareViewfadeOutIn(){
            
        };
        
        self.prepareViewslideFade = function prepareViewSlideFade(){
            
            self.itemWidth = self.items.width();
            self.totalWidth = self.itemWidth*self.totalItems; //todo ternaire if option loop + clone first and last
            self.carouselViewWidth = self.carouselView.width();
           
            self.carouselView.css('overflow', 'hidden');
            self.carouselContainer.width(self.totalWidth);
            self.carouselContainer.css('left', (self.carouselViewWidth - self.itemWidth) / 2);
            
            
            self.carouselContainer.find('li').eq(0).css('z-index', 2);
            self.carouselContainer.find('li .before:not(.active)').css('display','none');
            self.carouselContainer.find('li .after:not(.active)').css('display','none');
            
            // Add CSS3 transition to all Li
            self.carouselContainer.find('li').css({
                '-webkit-transition': '-webkit-transform  '+self.options.speed+'ms linear, -webkit-box-shadow '+self.options.speed+'ms linear',
                '-moz-transition': '-moz-transform  '+self.options.speed+'ms linear, -moz-box-shadow '+self.options.speed+'ms linear',
                '-ms-transition': '-ms-transform  '+self.options.speed+'ms linear, -ms-box-shadow '+self.options.speed+'ms linear',
                'transition': 'transform  '+self.options.speed+'ms linear, box-shadow '+self.options.speed+'ms linear'
            });
            
        };
        
        self.prepareViewapple = function prepareViewApple(){
            
            // Init all CSS positions
            for( var i = 0; i < self.totalItems; i++) {
                var current = self.carouselView.find('li').eq(i);
                $('.carousel-text-content', current).css({
                    top: self.options.arrayApple[i].text.initPosition[0],
                    left: self.options.arrayApple[i].text.initPosition[1],
                    opacity: 0
                });
                $('.carousel-pic-content', current).css({
                    top: self.options.arrayApple[i].pic.initPosition[0],
                    left: self.options.arrayApple[i].pic.initPosition[1],
                    '-webkit-transition': '-webkit-transform '+ self.options.arrayApple[i].pic.speed +'ms linear 0ms',
                    '-moz-transition': '-moz-transform '+ self.options.arrayApple[i].pic.speed +'ms linear 0ms',
                    'transition': 'transform '+ self.options.arrayApple[i].pic.speed +'ms linear 0ms',
                    '-webkit-transform': 'rotate('+ self.options.arrayApple[i].pic.initPosition[2] +'deg) scale('+ self.options.arrayApple[i].pic.initPosition[3] +')',
                    '-moz-transform': 'rotate('+ self.options.arrayApple[i].pic.initPosition[2] +'deg) scale('+ self.options.arrayApple[i].pic.initPosition[3] +')',
                    'transform': 'rotate('+ self.options.arrayApple[i].pic.initPosition[2] +'deg) scale('+ self.options.arrayApple[i].pic.initPosition[3] +')',
                    opacity: 0
                });
            }
            
            
            // Launch animation for the first Item
            var initDelay = (self.options.arrayApple.initDelay) ? self.options.arrayApple.initDelay : 0;
        
            $('.carousel-text-content', self.items.eq(0)).delay(self.options.arrayApple[0].text.delay + initDelay).animate({
                top: self.options.arrayApple[0].text.stopPosition[0],
                left: self.options.arrayApple[0].text.stopPosition[1],
                opacity: 1
            }, self.options.arrayApple[0].text.speed);
             
            self.appleTransitionTransform(self.items.eq(0), (self.options.arrayApple[0].pic.delay + initDelay), self.options.arrayApple[0].pic.stopPosition[2], self.options.arrayApple[0].pic.stopPosition[3]);

            $('.carousel-pic-content', self.items.eq(0)).delay(self.options.arrayApple[0].pic.delay + initDelay).animate({
                top: self.options.arrayApple[0].pic.stopPosition[0],
                left: self.options.arrayApple[0].pic.stopPosition[1],
                opacity: 1
            }, self.options.arrayApple[0].pic.speed, function () {
                self.appleWorker = false;
            });
      };
      /*END VIEW*/
        
        /*
         * Test if the wrapper pager already exists
         */
        self.isWrapperPager = function isWrapperPager(){
            var res = ( self.$el.parents('div.' + CLSCAROUSELPAGER).length > 0 ) ? true : false;
            
            return res;
        };
        
        /*
         * Create the wrapper pager DOM element
         */
        self.createPagerWrapper = function createPagerWrapper(){
            self.pager = $('<div />', { 'class' : CLSCAROUSELPAGER });
            self.pager.appendTo(self.$el);
        };
        
        /*
         * Create the wrapper pager if it doesn't exist + create all the pager : prevNext / thumb etc
         * all the config objects pass the events methodes and if it's existe the dom element
         */
        self.createPagers = function createPagers(){
            if ( !self.isWrapperPager() ){
                self.createPagerWrapper();
            }
         
            if ( self.options.pager.pagerItems ){
                var configItems = {
                    itemHandler : function itemHandler(index){
                      if (self.options.effect.type ==='slide' && self.options.loop){
                       index = (Math.floor( index/self.options.group));
                      }
                      self.goTo(index);
                    }
                };
                
                if ( typeof self.options.pager.pagerItems === 'object' ){
                    configItems.domElem = self.options.pager.pagerItems;
                } else {
                    configItems.totalItems = self.totalItems;
                    
                    if (self.options.pager.pagerItems !== true){
                        configItems.numeric = true;
                    }
                }
                
                self.pagerItems = new $.OoPagerItems(self.pager, configItems);
                if (self.options.pager.itemsPreviewClass){ 
                    self.createPreviewItems();
                }
                
            }
            
            if ( self.options.pager.prevNext ) {
                configPrevNext = {
                    nextHandler : function nextHandler(){
                        self.goToNext();
                        if (self.options.pager.prevNextPreviewClass){
                            self.updatePreviewPrevNext(self.currentItem);
                        }
                    },
                    prevHandler : function(){
                        self.goToPrev();
                        if (self.options.pager.prevNextPreviewClass){
                            self.updatePreviewPrevNext(self.currentItem);
                        }
                    }
                    
                };
                if ( typeof self.options.pager.prevNext === 'object' ){
                    configPrevNext.domElem = self.options.pager.prevNext;
                }
                self.pagerPrevNext = new $.OoPagerPrevNext(self.pager, configPrevNext);
                if (self.options.pager.prevNextPreviewClass){
                    self.createPreviewPrevNext(self.currentItem);
                }
            }
            if(self.options.pager.itemActiveWalking){
                $('<span class="icon_nav icon-item-active"/>').appendTo($('.carousel-items li:first',self.$el));
            } 
        };

        self.getPrev = function getPrev(id){
            return (id-1 < 0) ? self.slideCount-1 : id-1;
            
        };
        self.getNext = function getNext(id){
            return (id+1 == self.slideCount) ? 0 : id+1;
        };        
        self.createPreviewPrevNext = function createPreviewPrevNext(id){
            $('<span class="preview"/>').appendTo($('.carousel-prev-next button',self.$el));
            self.updatePreviewPrevNext(id);
        };
        self.updatePreviewPrevNext = function updatePreviewPrevNext(id){
        	
        	prevPreview = $('.carousel-view ul > li', self.$el).eq(self.getPrev(id))
            .find('.'+self.options.pager.prevNextPreviewClass)
            .text();
        	
        	nextPreview = $('.carousel-view ul > li', self.$el).eq(self.getNext(id))
            .find('.'+self.options.pager.prevNextPreviewClass)
            .text();

            $('.carousel-prev .preview', self.$el).text(prevPreview);
            $('.carousel-next .preview', self.$el).text(nextPreview);
        };
        
        self.createPreviewItems = function createPreviewItems(){ 
            $('.carousel-items li', self.$el).each(function(index, el){
                offset = $(el).offset();
                var hover = $('<span />', {
                    'class': 'item-preview item-preview-'+index,
                    'html': '<span class="icon_nav icon-preview-queue"></span>'+$('.carousel-view ul > li', self.$el).eq(index)
                            .find('.'+self.options.pager.itemsPreviewClass)
                            .text()
                }).appendTo($('.carousel-list', self.$el))
                  .offset({top:offset.top-36, left:offset.left-4})
                  .hide();

                  hover.css('margin-left', '-'+(hover.width()/2) +'px');
                
                $(this).bind({
                	mouseenter: function(){
                        hover.fadeIn('fast');
                    },
                    mouseleave: function() {
                        hover.fadeOut('fast');
                    }
                });
                
                $(this).find('button').bind({
                    focus: function() {
                        hover.fadeIn('fast');
                    },
                	focusout: function() {
                		hover.fadeOut('fast');
                	}
                });
            });
        };

        
        /*
         * add active class on current item
         */
        self.setActiveItem = function setActiveItem(index){

            var newActiveItem  = self.carouselView.find('li.'+CLSITEM+index);
                self.carouselView.find('li.' + CLSACTIVEITEM).removeClass(CLSACTIVEITEM);
                
                newActiveItem.addClass(CLSACTIVEITEM);
                
                switch ( self.options.effect.type ){
                    case TRANSITIONFADE, TRANSITIONFADEOUTIN : newActiveItem.css('z-index', 3);
                                                               newActiveItem.siblings().css('z-index', 1);
                                                               break; 
                };
                
                self.updatePagers();
                
        };
        
        /*
         * Test if all dom elements are inactive
         */
        self.isBusy = function isBusy(){
            return ( 0 === self.carouselView.find(':animated').length );
        };
        
        /*
         * Go the next slide
         */
        self.goToNext = function goToNext(){
          if ( self.options.effect.type === 'slide' && self.options.loop){
            //condition will be done in callback function cause with clone the limit isn't self.totoalITems - 1
        	  /*console.log(self.currentItem);
        	  if (self.currentItem < self.totalItems-1){
                  self.goTo(self.currentItem + 1);
              }
        	  else{
        		  self.goTo(0);
        	  }*/
        	  self.goTo(self.currentItem + 1);
          } else {
            if (self.currentItem < self.totalItems-1){
                self.goTo(self.currentItem + 1);
            } else {
                if ( self.options.loop){
                    self.goTo(0);
                } else {
                    if ( self.timer ) {
                        self.stopDiaporama();
                    }
                }
            }
          }
        };
        
        /*
         * Go to the prev slide
         */
        self.goToPrev = function goToPrev(){
          if ( self.options.effect.type === 'slide' && self.options.loop){
            //condition will be done in callback function cause with clone the limit isn't 0
        	  /*console.log(self.currentItem);
        	  if (self.currentItem > 0){
                  self.goTo(self.currentItem - 1);
              }
        	  else{
        		  self.goTo(self.totalItems - 1);
        	  }*/
        	  self.goTo(self.currentItem - 1);
          } else {
        	  if (self.currentItem > 0){
        		 self.goTo(self.currentItem - 1);
            } else {
                if (self.options.loop){
                    self.goTo(self.totalItems - 1);
                } else {
                    if ( self.timer ) {
                        self.stopDiaporama();
                    }
                }
            }
          }
            
        };
        
        /*
         * Go to a specific slide
         * test if all dom elements are inactive and if the slide to reach exists
         */
        self.goTo = function goTo(index){
            if ( self.isBusy() /*&& self.existSlide(index)*/) {
                self[self.options.effect.type + 'Transition'](index);
                //if (self.options.effect.type !== 'slide')
                  self.goneTo(index);
                  
                
            }
        };
        
        /*
         * Callback function after the transition
         */
        self.goneTo = function goneTo (index){
            self.currentItem = index;
            self.setActiveItem(index);

            /*if (self.options.loop && self.options.effect.type === TRANSITIONS[1] && index === self.totalItems ){
                self.carouselContainer.css('left', 0)
                self.currentItem = 0;
                self.setActiveItem(0);
            }*/
            
           // self.options.after();
        };
        
        /*
         * Test if the slide exists
         */
        self.existSlide = function existSlide (index){
            var res = ( index >= 0 && index <= self.totalItems-1  ) ? true : false ;
            return res;
        };
        
        self.existTransition = function existTransition() {
            var res = false;
            for ( var i=0, len = TRANSITIONS.length; i < len; ++i ){
                if ( self.options.effect.type === TRANSITIONS[i] ){
                    res = true;
                }
            }
            
            return res;
        };
        
         /*
         * Css Transition supported ?
         */
        self.isCssTransition = function isCssTransition() {
            var div = document.createElement('div');
            div.setAttribute('style', 'transition:top 1s ease;-webkit-transition:top 1s ease;-moz-transition:top 1s ease;-o-transition:top 1s ease;-ms-transition:top 1s ease;');
            var ret = !!(div.style.transition || div.style.webkitTransition || div.style.MozTransition || div.style.OTransition || div.style.msTransition);
            delete div;  
            return ret;
        };
        
        /*
        * Detect vendor prefix
        */
        self.getVendorPrefix = function getVendorPrefix() {
           var // localized, declared references
            div = document.createElement("div"),
            specProp = "Transform",
            prefixes = [ "Webkit", "Moz", "ms", "O", "" ],
            prop, idx, len, prefix;

            for ( idx = 0, len = prefixes.length; idx < len; idx++ ) {
                prefix = prefixes[ idx ];

                if ( (prefix + specProp) in div.style ) {
                    return prefix.toLowerCase();
                }
            }
            return prefix.toLowerCase();
        };
        
        
        /*
         * Fade transition - fade out only the old item
         */
        self.fadeTransition = function(index){
            var that = self,
                newItem = self.carouselView.find('li').eq(index),
                oldItem = self.carouselView.find('li').eq(self.currentItem);

            oldItem.css('z-index',3);
            newItem.css('z-index',2);
            oldItem.fadeTo(self.options.speed, 0, function(){
               $(this).css({
                  'z-index' : 1,
                  'opacity' : 1
               });
               
               newItem.css('z-index', 3);
               
               self.options.after();
            });
        };
        
        /*
         * FadeOutIn transition - fade out the old item then fade in the new item
         */
        self.fadeOutInTransition = function fadeOutInTransition(index){
            var newItem = self.carouselView.find('li').eq(index),
                oldItem = self.carouselView.find('li').eq(self.currentItem);
            
            oldItem.siblings().hide();
            newItem.css('z-index',2);
            oldItem.fadeTo(self.options.speed, 0, function(){
               newItem.css('z-index', 3).fadeTo(self.options.speed, 1 , function(){
                   oldItem.css({
                      'z-index' : 1,
                      'opacity' : 1
                   }).hide();
               });
               
               self.options.after();
            });
        };

        self.slideOverTransition = function slideOverTransition(index){
            var newItem = self.carouselView.find('li').eq(index),
                oldItem = self.carouselView.find('li').eq(self.currentItem),
                side = (index<self.currentItem) ? '-' : '';
                if((index===0 && self.currentItem == self.slideCount-1)){
                    side = '';
                }
                if((index==self.slideCount-1 && self.currentItem === 0)){
                    side = '-';
                }
            if(newItem.css('left')=='0px') {
                newItem.css({
                    'z-index': 3,
                    'left': side+''+self.slideWidth +'px'
                });
            }
            newItem.animate({
                left: 0
            }, 'normal', function(){
                oldItem.css('z-index',1);
                newItem.css('z-index',2);
                self.options.after();
            });
        };
        
        /*
         * Slide transition
         */
        self.slideLeftPosition = function slideLeftPosition(index){
            var res;
            if(self.options.fluid) {
                res =  (self.options.loop) ?  index*100 + 100 :  index*100;
            }
            else {
                res = (self.options.loop) ? index*self.slideWidth + self.slideWidth : index*self.slideWidth;
            }
            return res;
        };
        
        self.slideTransition = function slideTransition(index){
            var that = self;
            if(self.options.fluid) {
                self.carouselContainer.animate({
                    'left' : - that.slideLeftPosition(index)+'%'
                }, self.options.speed, function(){
                  that.callbackTransitionSlide(index);
                });
            } else {
            	self.carouselContainer.animate({
                    'left' : - that.slideLeftPosition(index)
                }, self.options.speed, function(){
                  that.callbackTransitionSlide(index);
                });
            }
        };
        
        self.callbackTransitionSlide = function callbackTransitionSlide(index){
          var that = self;
          var newIndex = index, leftPosition;
          if (self.options.loop){
            if (newIndex >= self.slideCount){
              //reset first Item
              newIndex = 0;
            } else {
              if (newIndex < 0){
                //reset last item
                newIndex = self.slideCount-1;
              }
            }
            if(self.options.fluid) {
                self.carouselContainer.css({
                    'left' : - that.slideLeftPosition(newIndex)+'%'
                });
            } else {
                self.carouselContainer.css({
                    'left' : - that.slideLeftPosition(newIndex)
                });
            }
          }

          self.goneTo(newIndex);
          self.options.after();
        };
        /*
         * Update the pagers elements
         */
        self.updatePagers = function updatePagers (){
          var itemsLimits = [];
            if ( self.pagerItems )
              {
                if ( self.options.effect.type === 'slide' && self.options.loop){
                  itemsLimits.push(self.currentItem*self.options.group);
                  itemsLimits.push(self.currentItem*self.options.group + self.options.group);
                } else {
                  itemsLimits.push(self.currentItem);
                  itemsLimits.push(self.currentItem+1);
                }
                
                self.pagerItems.activeItem(itemsLimits);
              }
                
                
            if ( self.pagerPrevNext && false === self.options.loop ){
                self.pagerPrevNext.showHideItem('all', 1);
                if ( 0 === self.currentItem || ( self.totalItems - 1 ) === self.currentItem ) {
                    self.pagerPrevNext.showHideItem( (0 === self.currentItem ) ? 'prev' : 'next', 0 );
                }
            }
            
            if(self.options.pager.itemActiveWalking) {
                dot = $('.icon-item-active',self.$el);
                activeItem = $('.carousel-items li',self.$el).eq(self.currentItem);
                console.log(activeItem.position().left)
            }

            self.options.afterUpdatePagers();
        };
        
        /*
         * SlideFade transition
         */
        self.slideFadeTransition = function(index){
            
            var that = self;
            self.carouselView.find('li').removeClass('slidefade-active');
            
            var li = self.carouselView.find('li').eq(index);
            var lis = self.carouselView.find('li');

             // Remove old ads

             $('.after.active', lis).removeClass('active');
             // opacity altern style
             $('.after', lis).fadeOut();
       

     

             $('.before.active', lis).removeClass('active');
             // opacity altern style
             $('.before', lis).fadeOut();


             
            // Change slide
            self.carouselContainer.delay(self.options.speed).animate({
                'left' : - (index*that.itemWidth) + ((self.carouselViewWidth - self.itemWidth) / 2)
            }, self.options.speed, function() {
            	
                // Add shadow and scale
                lis.css('z-index',1);
                li.css('z-index',2).addClass('slidefade-active');
                
                $('.after', li).addClass('active');
                $('.after', li).fadeIn(self.options.speed);
                $('.before', li).addClass('active');
                $('.before', li).fadeIn(self.options.speed);

            });
        };
        
        
        /*
         * Apple transition - inspired by http://www.apple.com/fr/iphone/ (iPhone 4S presentation / without rotation)
         */
        self.appleTransition = function(index){
            var newItem = self.carouselView.find('li').eq(index),
                oldItem = self.carouselView.find('li').eq(self.currentItem);
            
            var indexNew = index,
                indexOld = self.currentItem;
            
            if(self.appleWorker === false) {
                
                self.appleWorker = true;
                
                // Hide old Item
                $('.carousel-text-content', oldItem).delay(self.options.arrayApple[indexOld].text.delay).animate({
                    top: self.options.arrayApple[indexOld].text.afterPosition[0],
                    left: self.options.arrayApple[indexOld].text.afterPosition[1],
                    opacity: 0
                }, self.options.arrayApple[indexOld].text.speed);
                
                self.appleTransitionTransform(oldItem, self.options.arrayApple[indexOld].pic.delay, self.options.arrayApple[indexOld].pic.afterPosition[2], self.options.arrayApple[indexOld].pic.afterPosition[3]);
                
                $('.carousel-pic-content', oldItem).delay(self.options.arrayApple[indexOld].pic.delay).animate({
                    top: self.options.arrayApple[indexOld].pic.afterPosition[0],
                    left: self.options.arrayApple[indexOld].pic.afterPosition[1],
                    opacity: 0
                }, self.options.arrayApple[indexOld].pic.speed, function() {

                    // Animation complete
                    
                    // Reset init Position for old Item
                    $('.carousel-text-content', oldItem).css({
                        top: self.options.arrayApple[indexOld].text.initPosition[0],
                        left: self.options.arrayApple[indexOld].text.initPosition[1],
                        opacity: 0
                    });
                    $('.carousel-pic-content', oldItem).css({
                        top: self.options.arrayApple[indexOld].pic.initPosition[0],
                        left: self.options.arrayApple[indexOld].pic.initPosition[1],
                        '-webkit-transform': 'rotate('+ self.options.arrayApple[indexOld].pic.initPosition[2] +'deg) scale('+ self.options.arrayApple[indexOld].pic.initPosition[3] +')',
                        '-moz-transform': 'rotate('+ self.options.arrayApple[indexOld].pic.initPosition[2] +'deg) scale('+ self.options.arrayApple[indexOld].pic.initPosition[3] +')',
                        'transform': 'rotate('+ self.options.arrayApple[indexOld].pic.initPosition[2] +'deg) scale('+ self.options.arrayApple[indexOld].pic.initPosition[3] +')',                        
                        opacity: 0
                    });
                    
                    // Display new Items
                    $('.carousel-text-content', newItem).delay(self.options.arrayApple[indexNew].text.delay).animate({
                        top: self.options.arrayApple[indexNew].text.stopPosition[0],
                        left: self.options.arrayApple[indexNew].text.stopPosition[1],
                        opacity: 1
                    }, self.options.arrayApple[indexNew].text.speed);

                    self.appleTransitionTransform(newItem, self.options.arrayApple[indexNew].pic.delay, self.options.arrayApple[indexNew].pic.stopPosition[2], self.options.arrayApple[indexNew].pic.stopPosition[3]);
                    
                    $('.carousel-pic-content', newItem).delay(self.options.arrayApple[indexNew].pic.delay).animate({
                        top: self.options.arrayApple[indexNew].pic.stopPosition[0],
                        left: self.options.arrayApple[indexNew].pic.stopPosition[1],
                        opacity: 1
                    }, self.options.arrayApple[indexNew].pic.speed, function() {
                        
                        // reset apple worker  
                        self.appleWorker = false;
                        
                    });

                });
            
            }
            
        };
        
        /* Apple Transition : rotation */
        self.appleTransitionTransform = function(item, delay, position, scale) {
            if(self.cssTransitionsSupported) {
                // Fake delay
                $('html').animate({top: 'auto'}, delay, function() { 
                    $('.carousel-pic-content', item).css({
                        '-webkit-transform': 'rotate('+ position +'deg) scale('+ scale +')',
                        '-moz-transform': 'rotate('+ position +'deg) scale('+ scale +')',
                        'transform': 'rotate('+ position +'deg) scale('+ scale +')'
                    });
                });
            }
        };
        
        
        
        /*
         * attach event on the carousel if pause option and lauch the diaporama
         */
        self.prepareDiaporama = function(){
            if ( self.options.diaporama.pause) {
                self.$el.bind({
                    mouseenter : function(){
                        self.stopDiaporama()
                    },
                    mouseleave : function(){
                        self.restartDiaporama()
                    }
                })
            }
            self.startDiaporama()
        };
        
        /*
         * call goTONext function at duration option interval time
         */
        self.startDiaporama = function diaporama(){
            self.timer = setInterval(function(){
                self.goToNext()
            }, self.options.diaporama.duration);
        };
        
        self.restartDiaporama = function restartDiaporama(){
            self.startDiaporama()
        };
        
        self.stopDiaporama = function stopDiaporama(){
            clearInterval(self.timer)
        };

        self.attachKeyboardControls = function attachKeyboardControls(){
            $(document).bind({
                'keyup' : function(e){
                    switch (e.keyCode){
                        case self.options.keyboardControls.prev :
                                self.goToPrev()
                            break;
                        case self.options.keyboardControls.next :
                                self.goToNext() 
                            break;
                    }
                }
            });
        };
        
        
        // Gestion focus
        self.gestionfocus = function(){
        	self.carouselView.find('a').focus(function() {
	        	var container_parent = $(this).closest('.views-row');
	        	var item_number = container_parent.attr('class').split('item-');
	        	item_number = parseInt(item_number[1]);

	        	var choise = self.carouselView.offset().left - (container_parent.width() * item_number);
	        	
	        	// Previous item
        		if(self.currentItem > item_number){
        			/*var choise = self.carouselView.offset().left-(container_parent.width()) * (item_number+1);
	        		self.carouselContainer.offset({left:choise});
        			
        			var choise = self.carouselView.offset().left-(container_parent.width()) * (item_number);
	        		self.carouselContainer.animate({left: choise}, 500);*/
	        		
	        		self.carouselContainer.offset({left:choise});
	        	}
        		
        		// Next item
        		else if(self.currentItem < item_number){
        			/*var choise = self.carouselView.offset().left-(container_parent.width()) * (item_number-1);
	        		self.carouselContainer.offset({left:choise});
	        		
	        		var choise = self.carouselView.offset().left-(container_parent.width()) * (item_number);
	        		self.carouselContainer.animate({left: choise}, 500);*/
	        		
	        		self.carouselContainer.offset({left:choise});
	        	}
        		
        		// Same item
        		else if(self.currentItem == item_number){
        			//var choise = self.carouselView.offset().left-(container_parent.width()) * item_number;
        			self.carouselContainer.offset({left:choise});
        			//self.carouselContainer.animate({left: choise}, 1000);
        		}
        		
        		self.currentItem = item_number;
	        	self.options.activeItem = self.currentItem;
        		
        		// Update pagers
        		if (self.options.pager.prevNextPreviewClass){
                    self.updatePreviewPrevNext(self.currentItem);
                }
	        	if (self.options.pager.pagerItems){
	        		self.setActiveItem(self.currentItem);
	        	}
	        	self.updatePagers();
	        	
	        	console.log(self.currentItem);
        		
	    	});
        }

        self.init();

    };
    
    $.OoCarousel.defaultOptions = {
        effect: {type:'slide'},
        pager: {
            'prevNext'   : true, //true false or domElem
            //'pagerItems' : false, //true false or domElem,
            'pagerItems' : false, //true false or domElem
            'prevNextPreviewClass': false
        },
        afterUpdatePagers : function(){},
        group: 1,
        speed: 400,
        diaporama : false,
        loop : true,
        thumb : false,
        fullWidth : false,
        activeItem : 1,
        after : function after(){},
        ended : function ended(){},
        diaporama : { active: false, duration: 10000, pause: true },
        keyboardControls : {
            active : false,
            prev : 37 ,
            next : 39
        },
        arrayApple: {},
        fluid: false
    };
    
    $.fn.OoCarousel = function(options){
        return this.each(function(){
            (new $.OoCarousel(this, options));
        });
    };
  
    $.fn.getOoCarousel = function(){
        this.data("OoCarousel");
    };
    
    
    /*end OoCarousel*/
    
    
   
   /*-----------------------------------------------------------------------*/
   
   
    /*
     * Pager PrevNext
     * @param {Object} el
     * @param {Object} options
     */
    $.OoPagerPrevNext = function(el, options){
        
        var self = this;


        //CONST
        var CLSPREVNEXT = 'carousel-prev-next',
            CLSPREV = 'carousel-prev',
            CLSNEXT = 'carousel-next',
            CLSICON = 'icon_nav';
        

        self.$el = $(el);
        self.el = el;
        

        self.$el.data("OoPagerPrevNext", self);
        
        self.init = function init(){
            self.options = $.extend({},$.OoPagerPrevNext.defaultOptions, options);
           
            if (!self.options.domElem){
                self.buildPager();
            } else {
                self.list = self.options.domElem;
            }
            
            self.attachEvents();
            
            
        };
        
        self.attachEvent = function attachEvent(elem, customEventType, handler){
            var configObject = {};
                configObject[customEventType] = function(e){
                    handler();
                    
                    e.preventDefault();
                };
                
                elem.bind(configObject);
        };
        
        self.attachEvents = function attachEvents(){
            self.attachEvent(self.list.find('.'+ CLSPREV + ' button'), 'click', self.options.prevHandler);
            self.attachEvent(self.list.find('.'+ CLSNEXT + ' button'), 'click', self.options.nextHandler);
        };
        
        self.buildPager = function buildPager(){
            self.list = $('<ul />', {'class':CLSPREVNEXT});
            self.buildPrevItem();
            self.buildNextItem();
            self.list.appendTo(self.$el);
        };


        self.buildPrevItem = function buildPrevItem(){
            var  lnkPrev = $('<button />').append($('<span />',{'class': CLSICON}).text('Previous')),
                 prev = $('<li />', {'class' : CLSPREV}).append(lnkPrev);

            prev.appendTo(self.list);
        };
        
        self.buildNextItem = function buildNextItem(){
            var  lnkNext = $('<button />').append($('<span />',{'class': CLSICON}).text('Next')),
                 next = $('<li />', {'class' : CLSNEXT }).append(lnkNext);

            next.appendTo(self.list);
        };


        self.showHideItem = function hideItem(elem, display){
            //display : 0 hide 1 show
            var item;
            switch (elem) {
                case 'next' : item = self.list.find('li.' + CLSNEXT);
                              break;
                case 'prev' : item = self.list.find('li.' + CLSPREV);
                              break;
                case 'all' : item = self.list.find('li.' + CLSPREV + ', li.' + CLSNEXT);
                              break;
            }
            
            item[(0 === display) ? 'hide' : 'show' ]();
        };

        self.init();
    };
    
    $.OoPagerPrevNext.defaultOptions = {
        prevHandler : null,
        nextHandler : null,
        prevNextPreviewClass: null
    };
    
    $.fn.OoPagerPrevNext = function(options){
        return this.each(function(){
            (new $.OoPagerPrevNext(this, options));
        });
    };
    
    $.fn.getOoPagerPrevNext = function(){
        this.data("OoPagerPrevNext");
    };
    
    /*end OoPagerPrevNext*/
   
   
   /*-----------------------------------------------------------------------*/
   
   /*
    * OoPagerItem
    * @param {Object} el
    * @param {Object} options
    */
   $.OoPagerItems = function(el, options){
        var self = this;

        self.$el = $(el);
        self.el = el;
        
        var CLSACTIVEITEM = 'active',
            CLSPAGERITEM  = 'carousel-items',
            CLSHOVER      = 'item-hover',
            CLSITEM       = 'item';
        
        
        self.$el.data("OoPagerItem", self);
        
        self.init = function(){
            self.options = $.extend({},$.OoPagerItems.defaultOptions, options);
            self.list  = self.options.domElem || $('<ul />', { 'class' : CLSPAGERITEM});

            
            if ( self.options.domElem ) {
                elems = self.options.domElem;
                //elems.appendTo(self.$el);
            } else {
                self.buildItems();
            }
            
            //prepare children
            self.list.children().addClass(CLSITEM);
            self.bindElems();
        };
        
        self.bindElems = function bindElems(){
            self.list.delegate('.'+CLSITEM, 'click', function(e){
                e.preventDefault();
                if ( !$(this).hasClass(CLSACTIVEITEM)){
                  self.options.itemHandler($(this).index());
                }
                
            });
            
            self.list.delegate('.'+CLSITEM, 'mouseenter', function(){
                $(this).toggleClass(CLSHOVER);
            });
            
            self.list.delegate('.'+CLSITEM, 'mouseleave', function(){
                $(this).toggleClass(CLSHOVER);
            });
            
            self.list.delegate('.'+CLSITEM+' button', 'focus', function(){
            	$(this).parent('.'+CLSITEM).toggleClass(CLSHOVER);
            });
            
            self.list.delegate('.'+CLSITEM+' button', 'focusout', function(){
            	$(this).parent('.'+CLSITEM).toggleClass(CLSHOVER);
            });
        };
        
        self.activeItem = function(limits){
            self.list.find('li.' + CLSACTIVEITEM).removeClass(CLSACTIVEITEM);
            //limits
            var items = self.list.find('li');
            items.slice(limits[0], limits[1]).addClass(CLSACTIVEITEM)
            //self.list.find('li').eq(index).addClass(CLSACTIVEITEM);
        };
        
        self.buildItems = function buildItems(){
     	for ( var i=0, len = self.options.totalItems; i < len; ++i){
                var item = $('<li />'),
                    itemIcon = $('<button />', {
                        "class" : ( !self.options.numeric ) ? 'icon_nav' : '',
                        text : i + 1,
                        "href" : "#"
                    });
                    item.append(itemIcon);
                self.list.append(item);
            }
            self.list.appendTo(self.$el);
        };

        self.init();
    };
    
    $.OoPagerItems.defaultOptions = {
    };
    
    $.fn.OoPagerItems = function(options){
        return this.each(function(){
            (new $.OoPagerItems(this, options));
        });
    };
    
	$.obs_fluid_img = function(el, options){

		
		var self = this;
        self.$el = $(el);
        self.el = el;		

		self.$el.data("obs_fluid_img", self);
        
        
        self.init = function init(){
        	jQuery(window).resize(function(){ 
                self.resizeFluidImage();
            });
        	self.resizeFluidImage();
        }
                
        self.resizeFluidImage = function resizeFluidImage(){
            //self.slideWidth = $(window).width();            
            
            $(self).each(function(){
                coeff = 1262/650;
                if(self.$el.height() > 0){
                	var imgHeight = "auto";
                	var imgWidth = $(window).width();

	                if($(window).width() < 980){
	                	imgWidth = 1000;
	                	imgHeight = self.$el.height() * 1000 / self.$el.width();
	                }

	                self.$el.css({
	                		'width':imgWidth,
	                		'height':imgHeight,
	                        'position':'absolute'
	                    });
                    imgLeft = 0;
                    // A améliorer
                    //imgTop = -(self.$el.height() - 650) / 2;   
                    imgTop = 0;
                    if (imgTop > 0) imgTop = 0;
                    
	                self.$el.css({
                        'left': imgLeft,
                        'top': imgTop
                    });

                }
            });
        };
        self.init();
	}
    $.obs_fluid_img.defaultOptions = {};
    $.fn.obs_fluid_img = function(options){
        return this.each(function(){
            (new $.obs_fluid_img(this, options));
        });
    };
    $.fn.getobs_fluid_img = function(){
        this.data("obs_fluid_img");
    };    

})(jQuery);

