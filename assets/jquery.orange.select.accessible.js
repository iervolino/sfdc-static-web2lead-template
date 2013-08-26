(function($, w, d){
    
    ////////////////////////
    // VARIABLES GLOBALES //
    ////////////////////////
    
	
    
    ///////////////////
    // PLUGIN OBJECT //
    ///////////////////
    
    var OrangeSelectAccessible=function(params){
		$.extend(this, params || {});
		this.init();
	};
    
    OrangeSelectAccessible.prototype = {
        
        ///////////////
        // VARIABLES //
        ///////////////
        
        $target : null,
        $formElem : null,
        $list: null,
        $scrollableList: null,
        $oldSelection:null,
        $head:null,
        nbVisibleElement:21,
        config : {},
        liHeight : 0,
        scrollbar: false,
        ctrlPressed: false,
        shiftPressed: false,
        
        
        ///////////////////////////
        // METHODES D'EVENEMENTS //
        ///////////////////////////
        
        
        //////////
        // INIT //
        //////////
        
        init : function() {
            
            // récupérer les classes css de l'élément de formulaire
            var classes = this.$formElem.attr('class')||'';
            
            // créer le div du nouvel élément, et lui refiler les classes de l'élément de formulaire
            this.$formElem.after('<div class="OrangeSelectAccessible ' + classes + '"></div><div class="clear"></div>');
            
            // masquer l'élément de formulaire
            // mais je préfère les garder visibles pendant le développement
            //this.$formElem.css('display', 'none');
            
            // récupérer le nouvel élément et le ranger dans $target
            this.$target = this.$formElem.next();
            this.$target.css('position', 'relative');
            
            // récupérer la configuration du select
            this.config = {
                'name': this.$formElem.attr('name')||false,
                'id': this.$formElem.attr('id')||false,
                'size': this.$formElem.attr('size')||0,
                'multiple': this.$formElem.attr('multiple')||false,
                'type': null
            };
            
            // Suivant la config, on initialise soit un select simple, soit un select étendu
            if(this.config.size || this.config.multiple){
                //this.initExtendedSelect();
            }else{
                this.initSimpleSelect();
        	}
            
            //debug temp 
            if(this.config.size || this.config.multiple){
                //this.initExtendedSelect();
            }else{
                     
	            this.$oldSelection = this.$list.find('li.selected').last();
	            
	            
	            // On applique la taille du plus grand lien sur tout le sélecteur
	            var taille_max = 0;
	            this.$list.each(function(){
	            	var elementWidth = $(this).outerWidth();
	            	if (taille_max < elementWidth) taille_max = elementWidth;
	            });
	            
	            var blocMaxHeight = parseInt(this.$list.css('max-height'));
	            
	            
	            //this.$target.children('a:first').width(taille_max);
	            //taille_max = this.$target.children('a:first').outerWidth();
	           // this.$list.width(taille_max);
	            
	            
	            this.$formElem.css('display', 'none');
	            
	            // binder commun au deux types de select
				this.binder();
        	}       
		},
        
        binder : function() {
            //
        },
        
        
        ///////////////////
        // SELECT SIMPLE //
        ///////////////////
        
        initSimpleSelect: function() {
            // Récupération ou création d'un context général
            if(typeof w.dynamicObject === 'undefined')
                w.dynamicObject = Array();
            w.dynamicObject.push(this);
            
            this.config.type = 'simple';
            
            this.$head=$('<a class="select-head" href="#"></a>').css('display', 'block');
           
            this.$list=$('<div class="list">' + this.getUlOptionsList() + '</div>')
            	
            this.$target
            	.append(this.$head)
            	.append(this.$list);
           
            show_temp = 0;
            if(this.$list.parent().parent().css('display') == "none"){
            	show_temp = 1;
                this.$list.parent().parent().css('display','block');
            }
            var taille_max_li = 0;
            this.$list.find('li').each(function(){
            	var elementWidth = $(this).outerWidth();
            	if (taille_max_li < elementWidth) taille_max_li = elementWidth;
            });

            this.$list.css({
        		position:'absolute',
        		top:0,
        		left:0
        	});

            if (this.$head.width() < taille_max_li){
            	this.$head.width(taille_max_li);
            }
            	
            var delta = Math.round(this.$head.outerWidth(true) - this.$head.width());           
            
            var $liCollection = this.$list.find('li');          
            
            var selected = $liCollection.filter('.selected').find('span');
            this.$head.html(selected.html());
            
            this.liHeight = $liCollection.outerHeight(true);
            var ulHeight = 0;
            
            for (i=0; i<$liCollection.length; i++){
            	ulHeight += $liCollection.eq(i).outerHeight(true)
            }
            
            var ulHeight_max = this.nbVisibleElement * this.liHeight;
            
            if(ulHeight_max > 0 && ulHeight> ulHeight_max){
            	ulHeight = ulHeight_max;
            }
            
            
            this.$list.css('max-height', ulHeight + 'px' );
            
            this.$list.width(this.$list.width()+ delta);            
            
            this.$list.css('overflow', 'hidden');
         
            this.$head.width(this.$list.outerWidth(true)-delta);
            
            if($liCollection.length > this.nbVisibleElement){
            	this.addScrollBar(this.$list);
            	this.$head.width(this.$list.outerWidth(true)-delta);
            }
			if(show_temp == 1){
            	show_temp = 0;
                this.$list.parent().parent().css('display','none');
            }
            
            this.$list.hide();
            
            this.binderSimpleSelect();
        },
        
        binderSimpleSelect: function() {
            // Fermeture des éléments ouverts
            if(w.dynamicObject.length<=1){
                $(d).click($.proxy(this.close_all, this));
            }
            
            this.$list.find('li').click($.proxy(this.simpleSelectItemClick, this));
            
            this.$head
            	.click($.proxy(this.simpleSelectClick, this))
            	.keydown($.proxy(this.keyPressSelect, this));
            
            //désactive le select en as de perte du focus par l element a visible du selecteur.
            //impossibilité d' utilisé la scroll bar
            //this.$target.focusout($.proxy(this.looseFocus, this));
        },
        
        simpleSelectItemClick: function(event) {
        	event.stopImmediatePropagation();
        	        	
        	// déselection de l'item précédemment sélectionnée (enlever la class css 'selected')
            this.$target.find('li.selected').removeClass('selected');
            
            var $current = $(event.currentTarget);
            
            // Selection du nouvel élément
            // ajout de la classe css 'selected'
            $current.addClass('selected');
            var $currentValue = $current.find('span');
            
            // mise à jour du select lié à cet objet
            this.$formElem.val($currentValue.data('value'));

            // mettre le nom de l'élément sélectionné dans le a.select-head
            this.$head.html($currentValue.html());

            //[BBR]
            this.$formElem.change();
            
         // cacher la liste
            this.hideList(event);
            
            return false;
        },
        
        simpleSelectClick: function(event) {
        	event.stopImmediatePropagation();
            if(this.$list.css('display') == 'none') {
                this.showList(event);
                if(this.$scrollableList != null)
                	this.$scrollableList.$ascenceur.css('height'); // IE 7 MYSTIC BUG FIX
            }else{
                this.hideList(event);
            }
            // BUG FIX IE
            this.$list.parent().parent().parent().css("position","relative");
            this.$list.parent().parent().parent().children().css('z-index',10);
            this.$list.parent().parent().css("position","relative");
            this.$list.parent().parent().css('z-index',300);
            // ENF BUG FIX IE
            return false;
        },
        
        showList: function(event) {
            event.stopImmediatePropagation();
            this.close_all();

            var borderSize = this.$head.css("border-bottom-width");
            borderSize = borderSize.split('px');
            borderSize = borderSize[0];
            
            var clientHeight = document.documentElement.clientHeight;
            var ifBottom = this.$head.offset().top + this.$head.outerHeight() + this.$list.outerHeight() - $(d).scrollTop();
            var ifTop = this.$head.offset().top - $(d).scrollTop();            
            
            // la liste s'ouvre-t'elle au dessus ou au dessous du a.select-head ?
            if(ifBottom < clientHeight || ifTop < this.$list.outerHeight()) {
                this.$list.css('top', Math.round(this.$head.outerHeight(false)-borderSize) + 'px');
                this.$target.removeClass('top');
            } else {
            	var listBordertopWidth = Number(this.$list.css("border-top-width").split('px')[0]);
                this.$list.css('top', Math.round((-this.$list.outerHeight(false)) + listBordertopWidth) + 'px');
                this.$target.addClass('top');
            }
            
            this.$target.addClass('open');
            this.$list.css('display', 'block');
			this.$list.css('position', 'absolute');
            
            // On s'assure que l'élément sélectionné est bien dans la zone visible de la liste
            this.checkSelectedVisibility();
        },
        
        hideList: function(event) {
        	this.$target.removeClass('open');
        	this.$list.css('display', 'none');
            this.$list.css('position', 'relative');
        },
        
        ///////////////////
        // SELECT ETENDU //
        ///////////////////
        
        initExtendedSelect: function() {
            
            this.config.type = 'extended';
        
            this.$target.html(this.getUlOptionsList());
            
            var ul = this.$target.find('ul');
            var liCollection = ul.find('li');
            
            if(this.config.size == 0)
                this.config.size = 4;
            
            this.liHeight = liCollection.outerHeight();
            var ulHeight =this.config.size * this.liHeight;
            
            var contentHeight=ul.height();
            
            this.$target.css('max-height', ulHeight + 'px' );
            this.$target.css('overflow', 'hidden');
            this.$target.css('position', 'relative' );
            
            this.$list = this.$target;
            
            if(liCollection.length > this.config.size)
                this.addScrollBar(this.$target, contentHeight);
            
            if(this.$formElem.val() != null)
                this.checkSelectedVisibility();
            
            this.binderExtendedSelect();
        },
        
        binderExtendedSelect: function() {
            this.$target.find('span').click($.proxy(this.extendedSelectItemClick, this));
            this.$target.keydown($.proxy(this.keyPressSelect, this));
            this.$target.keyup($.proxy(this.keyUp, this));
        },
        
        extendedSelectItemClick: function(event) {
            event.stopPropagation();
            
            var $current = $(event.currentTarget);
            
            // Selection du nouvel élément
            
            // mise à jour du select lié à cet objet
            if(!this.config.multiple || (!this.ctrlPressed && !this.shiftPressed)){
            
                this.$target.find('li.selected').removeClass('selected');
                this.$formElem.val($current.data('value'));
                // ajout de la classe css 'selected'
                $current.parent().addClass('selected');
                
            }else if(this.config.multiple && this.ctrlPressed) {
                
                if($current.parent().hasClass('selected'))
                    $current.parent().removeClass('selected');
                else
                    $current.parent().addClass('selected');
                
                var $selected = this.$target.find('li.selected');
                
                var values = Array();
                for(var i = 0 ; i < $selected.length ; i++) {
                    values.push($($selected[i]).find('span').data('value'));
                }
                this.$formElem.val(values);
                
            
            } else if(this.config.multiple && this.shiftPressed) {
            
                var $currentElement = $current.parent();
                
                var currentPos = this.getPosition(this.$list.children('ul'), $currentElement);
                var oldPos =  this.getPosition(this.$list.children('ul'), this.$oldSelection);
                
                if(oldPos<currentPos)
                    for (var i=oldPos; i<=currentPos; i++)
                       $(this.$list.find('li')[i]).addClass('selected');
                else
                    for (var i=currentPos; i<=oldPos; i++)
                       $(this.$list.find('li')[i]).addClass('selected');
                       
            }
            
            this.$oldSelection = $current.parent();
            

            
            return false;
        },

        
        keyUp: function(event) {
            if(event.keyCode == 17)
                this.ctrlPressed = false;
            
            if(event.keyCode == 16)
                this.shiftPressed = false;
        },
        
        ///////////////////////
        // METHODES COMMUNES //
        ///////////////////////
        
        addScrollBar: function($t) {
            if(typeof this.scrollbar == 'boolean' && this.scrollbar) {
                $t.css('overflow-y', 'auto');
            } else if(typeof this.scrollbar == 'object') {
            	 $t.OrangeAscenceur(this.scrollbar);
            	this.$scrollableList = $t.data('OrangeAscenceur');
            }
        },
        
        getUlOptionsList: function() {
            // on regarde la valeur du $formElem et on met la classe selected au(x) <li> correspondant(s)
            var val = this.$formElem.val();
            
            var optionsList = '<ul>';
            var $options = this.$formElem.find('option');
            var counter = 0;
            $options.each(function() {
            	counter++;
                var value = '';
                if(typeof $(this).attr('value') !== 'undefined')
                    value = ' data-value="' +  $(this).attr('value') + '"';
                else
                    value = ' data-value="' +  $(this)[0].text + '"';
                
                var classes = '';
                if(typeof val === "object") {
                    for(var i in val)
                        if(val[i] == $(this).attr('value') || val[i] == $(this)[0].text)
                        	classes = 'selected';
                } else {
                    if(val == $(this).attr('value') || val == $(this)[0].text)
                    	classes = 'selected';
                }
                
                if(counter == 1) classes += ' first';
                if(counter == $options.length) classes += ' last';
                
                optionsList += '<li class="' + classes + '"><span ' + value + '>' + $(this)[0].text + '</span></li>';
                
            });
            return optionsList += '</ul>';
        },
        
        keyPressSelect: function(event) {
        
        	
            if(event.keyCode == 17)
                this.ctrlPressed = true;
            
            if(event.keyCode == 16)
                this.shiftPressed = true;
            
            var selectedElement = null;
            var newSelection = [];
            
          
            
            switch(event.keyCode) {
                case 39:
                case 40:
                    // descendre
                	event.preventDefault();
                	event.stopPropagation();
                    var selectedElement = this.$list.find('li.selected');
                    if(this.$oldSelection.next().length > 0)
                        var newSelection = this.$oldSelection.next();
                    break;
                case 37:
                case 38:
                    // monter
                	event.preventDefault();
                	event.stopPropagation();
                    var selectedElement = this.$list.find('li.selected');
                    if(this.$oldSelection.prev().length > 0)
                        var newSelection = this.$oldSelection.prev();
                    break;
                case 13:
                case 27:
                	event.preventDefault();
                	event.stopPropagation();
                    if(this.config.type == 'simple')
                        this.hideList(event);

                    this.$formElem.change();
//                    break;
                default : return true;
            }
            
            
            
            if(newSelection.length > 0) {
                if(!this.config.multiple || (this.config.multiple && !this.shiftPressed)) {
                    selectedElement.removeClass('selected');
                    newSelection.addClass('selected');
                } else {
                    if(newSelection.hasClass('selected')) {
                        newSelection.removeClass('selected');
                        this.$oldSelection.removeClass('selected');
                    } else{
                        newSelection.addClass('selected');
                    }
                }
                
                this.$oldSelection = newSelection;
                
                //[BBR]
                $newSelectionLink=newSelection.find('span');
                
                
                selectedElement = this.$target.find('li.selected');
                var values = Array();
                for(var i = 0 ; i < selectedElement.length ; i++) {
                    values.push($(selectedElement[i]).find('span').data('value'));
                }
                this.$formElem.val(values);
                
                if(this.config.type == 'simple')
                	this.$head.html($newSelectionLink.html());
                this.checkSelectedVisibility();
            }
            return false;
        },
        
        checkSelectedVisibility: function() {
            if(this.$scrollableList == null || typeof this.$scrollableList !== 'object')
                return false;
                
            var $selected = this.$list.find('li.selected');
            
            if($selected.length == 0)
                return false;
            
            if($selected.position().top < 0) {
                this.$scrollableList.$content.scrollTop(this.$scrollableList.$content.scrollTop() + $selected.position().top);
            } else {
                this.$scrollableList.$content.scrollTop( this.$scrollableList.$content.scrollTop() + $selected.position().top - ( this.$list.height() - $selected.outerHeight(true) ) );
            }
            this.$scrollableList.update();
        },
        
        close:function(event) {
            this.hideList();
        },
        
        looseFocus:function(event){
        	setTimeout ($.proxy(this.close, this), 200	 ); 
        },
        
        close_all:function(event){
            if(typeof w.dynamicObject !=='undefined' && typeof w.dynamicObject === 'object'){
                for(var key in w.dynamicObject){
                    if(typeof w.dynamicObject[key].close ==='function')
                        w.dynamicObject[key].close(event);
                }
            }
        },
        
        getPosition:function($container, $element){
            var $children = $container.children();
            for(var i=0; i<$children.length; i++)
                if($children[i] == $element[0])return i;
        }
        
        
    }
    
    $.fn.OrangeSelectAccessible=function(params) {
		for(var i = 0 ; i < this.length ; i++)
			new OrangeSelectAccessible($.extend(params || {}, {$formElem : $(this[i])}));
		return this;
	};
    
})(jQuery, window, document)