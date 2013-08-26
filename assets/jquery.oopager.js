/*------------------------PAGER MODULE --------------------------*/
(function($){
    if(!$.Pager){
        $.Pager = new Object();
    };
    
    $.Pager.Pager = function(el, list, groupBy, options){
        var base = this;
        
        base.$el = $(el);
        base.el = el;
        
        base.$el.data("Pager.Pager", base);
        
        base.init = function(){
            base.CLSNEXT = 'pager-list-next';
            base.CLSPREV = 'pager-list-prev';
            
            base.groupBy = groupBy;
            base.list = list;
            
            base.options = $.extend(true,{},$.Pager.Pager.defaultOptions, options);

            base.buildPager();
            base.refresh();
            base.attachEvents();
        };
        
        base.refresh = function refresh(){
            
            base.items = base.list.children(':visible');
            base.totalPages = Math.ceil(base.items.length / base.groupBy);
            
            
            if (base.totalPages <= 1){
                base.next.addClass('disable');
                base.prev.addClass('disable');
            }
            
            base.currentPage = 1;
            
            base.showPage(base.currentPage);
            
            
            base.callback();
        };
        
        base.attachEvents = function attachEvents(){
            
            base.$el.delegate('.'+base.CLSPREV, 'click', function(e){
                e.preventDefault();
                
                if ( !$(this).hasClass('disable')){
                    base.showPage(base.currentPage - 1);
                }
            });
            
            base.$el.delegate('.'+base.CLSNEXT, 'click', function(e){
                e.preventDefault();
                if ( !$(this).hasClass('disable')){
                    base.showPage(base.currentPage + 1);
                }
            });
        };
        
        /*Build Dom Element Pager*/
        base.buildPager = function(){ 
                
            base.prev = $('<a />', {
                "class" : base.CLSPREV + ' disable',
                "text" : base.options.prev.label,
                "href": "#"
            });
            
            if (base.options.prev.icon){
                var iconPrev = $('<img />',{
                    "src" : base.options.prev.icon.url,
                    "class" : 'icon ' + ((base.options.prev.icon.cls) ? base.options.prev.icon.cls + ' ' : '')
                });

                base.prev.prepend(iconPrev);
            }
            
            base.next = $('<a />',{
                "class" : base.CLSNEXT,
                "text" : base.options.next.label,
                "href" : "#"
            });
            if (base.options.next.icon){
                var iconNext = $('<img />',{
                    "src" : base.options.next.icon.url,
                    "class" : 'icon ' + ((base.options.next.icon.cls) ? base.options.next.icon.cls + ' ': '')
                });

                base.next.append(iconNext);
            }
            
            base.$el.append(base.prev, base.next)
        }
        
        /*Show the specific page*/
        base.showPage = function showPage(page){
            //hide all visible page and show only items of the fake page
            base.items.addClass('hidden');
            base.items.slice( base.groupBy*(page-1) , page*base.groupBy ).removeClass('hidden');
            
            base.currentPage = page;
            base.callback();
        };
        
        /*Callback after show the page : update class disable*/
        base.callback = function(){
            if ( base.currentPage <= 1 ){
                base.prev.addClass('disable');
            } else {
                if (base.prev.hasClass('disable')){
                    base.prev.removeClass('disable');
                }
            }
            
            if ( base.currentPage == base.totalPages || base.totalPages == 0){
                base.next.addClass('disable');
            } else {
                if (base.next.hasClass('disable')){
                    base.next.removeClass('disable');
                }
            }
        }

        base.init();
    };
    
    $.Pager.Pager.defaultOptions = {
        prev : {
            label : "prev",
            icon : true,
            icon : {
                cls : "icon-pager icon-pager-prev",
                url : "/layouts/frontoffice/images/px.png"
            }
        },
        next : {
            label : "next",
            icon : {
                cls : "icon-pager icon-pager-next",
                url : "/layouts/frontoffice/images/px.png"
            }
            
        }
    };
    
    $.fn.ooPager = function(list, groupBy, options){
        return this.each(function(){
            (new $.Pager.Pager(this, list, groupBy, options));
        });
    };
    
    // This function breaks the chain, but returns
    // the Pager.Pager if it has been attached to the object.
    $.fn.getPager_Pager = function(){
        this.data("Pager.Pager");
    };
    
})(jQuery);