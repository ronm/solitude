/**************************/
/*** Solitude ************/
/*** by Ron Marcelle ******/
/*** Licensed under MIT ***/
/**************************/

(function( $ ){
	"use strict";

	var methods = {
			destroy: function() { 
				return this.replaceAll( this.parent() );
			},
		},
		baseCss = '.solitude-wrapper {position:relative;}' + 
		'.solitude-wrapper.solitude-focus {z-index:100;}' + 
		'.solitude-wrapper:before {background:rgba(255,255,255,0);border-radius:2px;bottom:-5em;content:"";left:-5em;position:absolute;right:-5em;top:-5em;z-index:99;' + 
		'	-webkit-transition:background .2s linear .2s;' + 
		'			transition:background .2s linear .2s;' + 
		'}' + 
		'.solitude-wrapper:after {background:rgba(0,0,0,.7);bottom:0;content:"";left:0;opacity:0;position:fixed;right:0;top:0;z-index:98;' + 
		'	-webkit-transform-origin:50% 50%;' + 
		'		-ms-transform-origin:50% 50%;' + 
		'			transform-origin:50% 50%;' + 
		'	-webkit-transform:scale(0);' + 
		'		-ms-transform:scale(0);' + 
		'			transform:scale(0);' + 
		'	-webkit-transition:opacity .5s ease, -webkit-transform 0 linear .5s;' + 
		'			transition:opacity .5s ease, -ms-transform 0 linear .5s;' + 
		'			transition:opacity .5s ease, transform 0 linear .5s;' + 
		'}' + 
		'.solitude-wrapper.solitude-focus:before {background:rgba(255,255,255,1);' + 
		'	-webkit-transition:background .2s ease;' + 
		'			transition:background .2s ease;' + 
		'}' + 
		'.solitude-wrapper.solitude-focus:after {opacity:1;' + 
		'	-webkit-transform:scale(1);' + 
		'		-ms-transform:scale(1);' + 
		'			transform:scale(1);' + 
		'	-webkit-transition:opacity .5s ease, -webkit-transform 0;' + 
		'			transition:opacity .5s ease, -ms-transform 0;' + 
		'			transition:opacity .5s ease, transform 0;' + 
		'}' + 
		'.solitude-wrapper form {position:relative;z-index:101;}' + 
		'.solitude-close {cursor:pointer;max-height:0;opacity:0;overflow:hidden;position:absolute;right:-4em;top:-4em;z-index: 102;' + 
		'	-webkit-transition:opacity .5s ease;' + 
		'			transition:opacity .5s ease;' +		
		'}' + 
		'.solitude-close:before {color:#999;content:"X";font-family: sans-serif;font-size: 27px;font-weight: 100;}' + 
		'.solitude-wrapper.solitude-focus .solitude-close {max-height:30px;opacity:1;}',
	    init = function( options ) {
	    	
	    	var $ss = $('<style />').attr({ "data-style-solitude": '', "type" : "text/css" }),
	    		$firstSS = $('link').filter('[rel="stylesheet"]').first().length ? $('link').filter('[rel="stylesheet"]').first() : $('head').children().last();
	    		
			$ss.text( baseCss );
	    	$firstSS.before( $ss );
	    	
			return this.each(function() { 
				var $this = $(this).on("submit", function() { loseFocus.apply( $(this) ); }),
					$wrapper = $( '<div class="solitude-wrapper" />' ).on( 'focus mousedown', function() { bringFocus.apply( $this ); }),
					$closeButton = $( '<span class="solitude-close" />' ).on('mousedown', function( evt ) {
						evt.stopPropagation();
						loseFocus.apply( $this );
					});

				return $this.wrap( $wrapper ).before( $closeButton );
			});
	    },
	    bringFocus = function() {
	    	this.parent().addClass( 'solitude-focus' );
	    },
	    loseFocus = function() {
	    	this.parent().removeClass( 'solitude-focus' );
	    };    

	$.fn.solitude = (function( method ){
		 if ( ! method ) {
	      return init.apply( this );
	    } else if ( methods[method] ) {
	      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	    } else {
	      $.error( 'Method ' +  method + ' does not exist on solitude' );
	    }   
	});

	$( 'form[data-solitude]' ).solitude();
})( jQuery );