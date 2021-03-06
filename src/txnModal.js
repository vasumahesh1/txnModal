// The MIT License (MIT)

// Copyright (c) 2015 Vasu Mahesh

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// 
// 
(function($) {

	$.txnModal = function(element, customOptions) {

		/*
		 * Default Settings of Modal
		 */
		var defaultOptions = {
			animateIn: 'zoomIn',
			animateOut: 'zoomOut',
			animateDuration: 0.3,
			modalTargetContainer: null,
			modalAutoCenter: false,
			modalWrapperClass: 'txn-modal-wrapper',
			modalCloseHandlers: [],
			modalCss: {},
			overlayWrapperClass: 'txn-overlay',
			overlayEnabled: true,
			targetScrollEnabled: false,
			onOpen: function() {},
			onClose: function() {}
		};

		/*
		 * Public Debug Options
		 */
		var showLogs = true;

		/*
		 * Defining Templates of Wrapper & Basic Close Button
		 */
		var templateWrapperDom = '';
		var templateWrapperDomPart1 = '<div class="';
		var templateWrapperDomPart2 = '"></div>';
		var modalInnerWrapperClass = 'txn-inner-modal';
		var fallbackCloseButtonClass = 'txn-modal-close';
		var fallbackCloseButton = "";
		fallbackCloseButton += "<button class='" + fallbackCloseButtonClass + "'";
		fallbackCloseButton += "style='";
		fallbackCloseButton += "position:fixed;";
		fallbackCloseButton += "border:solid 1px #FA951F;";
		fallbackCloseButton += "border-radius:3px;";
		fallbackCloseButton += "color: #fff;";
		fallbackCloseButton += "background: #FA951F;";
		fallbackCloseButton += "top:15px;";
		fallbackCloseButton += "padding-bottom:4px;";
		fallbackCloseButton += "height:25px;";
		fallbackCloseButton += "width:28px;";
		fallbackCloseButton += "cursor: pointer;";
		fallbackCloseButton += "right:15px;";
		fallbackCloseButton += "'>";
		fallbackCloseButton += "x"; // Close Content
		fallbackCloseButton += "</button>";

		/*
		 * Basic Variables
		 */
		var modalContainsTarget = false;
		var modalPlugin = this;
		modalPlugin.finalOptions = {};
		var $element = $(element);

		/*
		 * Initialization Function
		 * Applies some Basic CSS & Attaches Handlers based on the Options
		 */
		modalPlugin.init = function() {
			// Modals with Target Windows are initialized on showModal(). because the Init Involves just movement of the DOM.
			modalContainsTarget = false;
			if ($element.css('display') == 'none') {
				modalContainsTarget = true;
				$element.css('display', $element.attr('data-display'));
			}

			// Get Final Options
			modalPlugin.finalOptions = $.extend({}, defaultOptions, customOptions);
			$element.addClass(modalInnerWrapperClass);

			// Wrapper Init
			templateWrapperDom = templateWrapperDomPart1 + modalPlugin.finalOptions.modalWrapperClass + templateWrapperDomPart2;
			$element.wrap(templateWrapperDom);

			// CSS Overriding Check
			var modalCss = getModalCss();
			for (var cssKey in modalCss) {
				$element.parent().css(cssKey, modalCss[cssKey]);
			}

			// Apllying some CSS to Element inside wrapper
			var elementCss = getElementCss();
			for (var elementCssKey in elementCss) {
				$element.css(elementCssKey, elementCss[elementCssKey]);
			}

			// For those that aren't assigned Target Windows get Postion Fixed in the entire Window
			if (modalContainsTarget === false) {
				$element.parent().css('position', 'fixed');
			}

			// Applying Custom CSS & Auto Centering
			if (modalPlugin.finalOptions.modalCss.length !== 0) {
				var hasVertical = false;
				var hasHorizontal = false;
				var optionCss = modalPlugin.finalOptions.modalCss;
				for (var optionCssKey in optionCss) {
					if (optionCssKey == 'top' || optionCssKey == 'bottom') hasVertical = true;
					if (optionCssKey == 'left' || optionCssKey == 'right') hasHorizontal = true;
					if (optionCssKey == 'height' || optionCssKey == 'width') {
						$element.parent().css('max-' + optionCssKey, optionCss[optionCssKey]);
						$element.parent().css(optionCssKey, '100%');
					} else {
						$element.parent().css(optionCssKey, optionCss[optionCssKey]);
					}
				}
				if (modalPlugin.finalOptions.modalAutoCenter === true) {
					if (hasVertical === false) {
						$element.parent().css('top', '50%');
						var height = $element.parent().outerHeight();
						var suitableVerticalMargin = (-1 * (height / 2)) + 'px';
						$element.parent().css('margin-top', suitableVerticalMargin);
					}

					if (hasHorizontal === false) {
						$element.parent().css('left', '50%');
						var width = $element.parent().outerWidth();
						var suitableHorizontalMargin = (-1 * (width / 2)) + 'px';
						$element.parent().css('margin-left', suitableHorizontalMargin);
					}
				}
			}

			// Attaching Close Handlers
			if (modalPlugin.finalOptions.modalCloseHandlers.length !== 0) {
				for (var closeHandlerKey in modalPlugin.finalOptions.modalCloseHandlers) {
					$(modalPlugin.finalOptions.modalCloseHandlers[closeHandlerKey]).click(function() {
						modalPlugin.closeModal();
					});
				}
			} else {
				$element.parent().append(fallbackCloseButton);
				$element.parent().find('.' + fallbackCloseButtonClass).click(function() {
					modalPlugin.closeModal();
				});
			}

		};

		/*
		 * Main Function to Display the Modal.
		 * As the Animation Starts the Modal is Immediately made Visible so that the Animation can be shown.
		 */
		modalPlugin.showModal = function() {

			if (modalPlugin.finalOptions.targetScrollEnabled === false) {
				if (modalContainsTarget) {
					// Modal-> Modal Wrapper -> Target Container
					$element.parent().parent().css('overflow', 'hidden');
				} else {
					$('body').css('overflow', 'hidden');
				}
			}

			var overlayObject = getOverlayHtml();
			var overlayCss = getOverlayCss();

			if (modalContainsTarget) {
				// Modal-> Modal Wrapper -> Target Container
				$element.parent().parent().prepend(overlayObject);
				$('body').find('.' + modalPlugin.finalOptions.overlayWrapperClass).click(function() {
					modalPlugin.closeModal();
				});
			} else {
				$('body').prepend(overlayObject);
				$element.parent().parent().find('.' + modalPlugin.finalOptions.overlayWrapperClass).click(function() {
					modalPlugin.closeModal();
				});
			}

			for (var overlayCssKey in overlayCss) {
				$element.parent().parent().find('.' + modalPlugin.finalOptions.overlayWrapperClass).css(overlayCssKey, overlayCss[overlayCssKey]);
			}
			if (modalPlugin.finalOptions.overlayEnabled === false) {
				$element.parent().parent().find('.' + modalPlugin.finalOptions.overlayWrapperClass).css('background', 'none');
			}

			if (modalContainsTarget) {
				$element.parent().parent().find('.' + modalPlugin.finalOptions.overlayWrapperClass).css('position', 'absolute');
			}

			$element.parent().parent().find('.' + modalPlugin.finalOptions.overlayWrapperClass).addClass('animated fadeIn');

			// Reset Existing Animation Classes
			resetAnimation();
			$element.parent().addClass('animated ' + modalPlugin.finalOptions.animateIn);
			// Make the Box Appear using the ShowCSS Rules
			var modalCss = getShowCss();
			for (var cssKey in modalCss) {
				$element.parent().css(cssKey, modalCss[cssKey]);
			}
			$element.parent().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				// Animation Ended : ReApply the ShowCSS (Bug)
				var modalCss = getShowCss();
				for (var cssKey in modalCss) {
					$element.parent().css(cssKey, modalCss[cssKey]);
				}
				modalPlugin.finalOptions.onOpen();
			});
			log('Opening Modal', 'log');
		};


		/*
		 * Main Function to Close the Modal.
		 * Here, The animation is started first then the modal is hidden from the user (at the very end)
		 */
		modalPlugin.closeModal = function() {
			if (modalPlugin.finalOptions.targetScrollEnabled === false) {
				if (modalContainsTarget) {
					// Modal-> Modal Wrapper -> Target Container
					$element.parent().parent().css('overflow', 'auto');
				} else {
					$('body').css('overflow', 'auto');
				}
			}

			$element.parent().parent().find('.' + modalPlugin.finalOptions.overlayWrapperClass).removeClass('fadeIn');
			$element.parent().parent().find('.' + modalPlugin.finalOptions.overlayWrapperClass).addClass('animated fadeOut');
			$element.parent().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(e) {
				$element.parent().parent().find('.' + modalPlugin.finalOptions.overlayWrapperClass).remove();
				$element.parent().off(e);
			});


			resetAnimation();
			$element.parent().addClass('animated ' + modalPlugin.finalOptions.animateOut);
			$element.parent().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				var modalCss = getCloseCss();
				for (var cssKey in modalCss) {
					$element.parent().css(cssKey, modalCss[cssKey]);
				}
				modalPlugin.finalOptions.onClose();
			});
			log('Closing Modal', 'log');
		};

		/*
		 * Private function to get default CSS
		 */
		var getModalCss = function() {
			var cssObject = {};
			cssObject['position'] = 'absolute';
			cssObject['overflow'] = 'auto';
			cssObject['display'] = 'none';
			cssObject['padding'] = '0px 0px';
			cssObject['background'] = '#fff';
			cssObject['border'] = '1px solid #b7c7cf';
			cssObject['box-sizing'] = 'border-box';
			cssObject['box-shadow'] = '0px 0px 10px rgba(0,0,0,0.2)';
			cssObject['top'] = '0px';
			cssObject['left'] = '0px';
			cssObject['height'] = '100%';
			cssObject['width'] = '100%';
			cssObject['animation-duration'] = modalPlugin.finalOptions.animateDuration + 's';
			cssObject['-moz-animation-duration'] = modalPlugin.finalOptions.animateDuration + 's';
			cssObject['-webkit-animation-duration'] = modalPlugin.finalOptions.animateDuration + 's';
			cssObject['-ms-animation-duration'] = modalPlugin.finalOptions.animateDuration + 's';
			cssObject['z-index'] = '9999';
			return cssObject;
		};


		/*
		 * Private function to get default Element CSS
		 */
		var getElementCss = function() {
			var cssObject = {};
			cssObject['overflow'] = 'auto';
			cssObject['height'] = '100%';
			return cssObject;
		};

		/*
		 * Private function to get default Overlay CSS
		 */
		var getOverlayCss = function() {
			var cssObject = {};
			cssObject['position'] = 'fixed';
			cssObject['background'] = 'rgba(0,0,0,0.3)';
			cssObject['top'] = '0px';
			cssObject['left'] = '0px';
			cssObject['height'] = '100%';
			cssObject['width'] = '100%';
			cssObject['animation-duration'] = modalPlugin.finalOptions.animateDuration + 's';
			cssObject['-moz-animation-duration'] = modalPlugin.finalOptions.animateDuration + 's';
			cssObject['-webkit-animation-duration'] = modalPlugin.finalOptions.animateDuration + 's';
			cssObject['-ms-animation-duration'] = modalPlugin.finalOptions.animateDuration + 's';
			cssObject['z-index'] = '9998';
			return cssObject;
		};

		/*
		 * Private function to get default Overlay CSS
		 */
		var getOverlayHtml = function() {
			var htmlString = '';
			htmlString += '<div class="' + modalPlugin.finalOptions.overlayWrapperClass + '" ></div>';
			return htmlString;
		};

		/*
		 * CSS Changes when modal is being shown
		 */
		var getShowCss = function() {
			var cssObject = {};
			cssObject['display'] = 'inline-block';
			return cssObject;
		};

		/*
		 * CSS Changes when modal is being closed
		 */
		var getCloseCss = function() {
			var cssObject = {};
			cssObject['display'] = 'none';
			return cssObject;
		};

		/*
		 * Reset the Animation before Re-using
		 */
		var resetAnimation = function() {
			$element.parent().removeClass(modalPlugin.finalOptions.animateIn);
			$element.parent().removeClass(modalPlugin.finalOptions.animateOut);
		};

		/*
		 * Log
		 */
		var log = function(message, type) {
			if (showLogs === true) {
				if (type == 'log') {
					console.log('[LOG] Txn Modal : ' + message);
				} else if (type == 'warn') {
					console.warn('[WARN] Txn Modal : ' + message);
				}
			}
		};

		modalPlugin.init();

	};

	/*
	 * Main Starting Function - Initializes the Un-initialized TxnModals
	 */
	$.fn.txnModal = function(options) {
		return this.each(function() {
			if (options && options.modalTargetContainer !== undefined) {
				$(this).wrap('<p></p>');
				$(this).attr('data-display', $(this).css('display'));
				$(this).attr('txn-modal-options', JSON.stringify(options));
				$(this).css('display', 'none');
				var existingHtml = $(this).parent().html();
				$(this).remove();
				var targetWindow = options.modalTargetContainer;
				$(targetWindow).prepend(existingHtml);
				return;
			}

			if (undefined !== $(this).data('txnModalOptions')) {
				options = $(this).data('txnModalOptions');
			}

			if (undefined === $(this).data('txnModal')) {
				var plugin = new $.txnModal(this, options);
				$(this).data('txnModal', plugin);
			}
		});
	};

	/*
	 * Wrapper Function to Show the Modal. If the TxnModal is no initialized then it can be Initialized here directly.
	 */
	$.fn.showModal = function(options) {
		if (this.length > 1) {
			console.warn('More than 1 element found. Please use Identifiers. Using 1st Reference');
		} else if (this.length === 0) {
			console.error('Modal Element Not Found');
			return;
		}

		if (undefined === $(this).data('txnModal')) {
			var attrOptions = $.parseJSON($(this).attr('txn-modal-options'));
			var plugin = new $.txnModal(this, attrOptions);
			$(this).data('txnModal', plugin);
			console.warn('Modal was not Initialized. Initialized Now.');
		}
		$(this).data('txnModal').showModal();
	};

})(jQuery);