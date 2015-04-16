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
			onOpen: function() {},
			onClose: function() {}
		};

		/*
		 * Defining Templates of Wrapper & Basic Close Button
		 */
		var templateWrapperDom = '';
		var templateWrapperDomPart1 = '<div class="';
		var templateWrapperDomPart2 = '"></div>';

		var fallbackCloseButtonClass = 'txn-modal-close';
		var fallbackCloseButton = "";
		fallbackCloseButton += "<button class='" + fallbackCloseButtonClass + "'";
		fallbackCloseButton += "style='";
		fallbackCloseButton += "position:fixed;";
		fallbackCloseButton += "border:solid 1px #aaa;";
		fallbackCloseButton += "border-radius:3px;";
		fallbackCloseButton += "color: #aaa;";
		fallbackCloseButton += "background: none;";
		fallbackCloseButton += "top:10px;";
		fallbackCloseButton += "padding-bottom:4px;";
		fallbackCloseButton += "height:25px;";
		fallbackCloseButton += "width:28px;";
		fallbackCloseButton += "cursor: pointer;";
		fallbackCloseButton += "right:10px;";
		fallbackCloseButton += "'>";
		fallbackCloseButton += "x"; // Close Content
		fallbackCloseButton += "</button>";

		/*
		 * Basic Variables
		 */
		var modalPlugin = this;
		modalPlugin.finalOptions = {}
		var $element = $(element),
			element = element;

		/*
		 * Initialization Function
		 * Applies some Basic CSS & Attaches Handlers based on the Options
		 */
		modalPlugin.init = function() {
			// Get Final Options
			modalPlugin.finalOptions = $.extend({}, defaultOptions, customOptions);

			// Wrapper Init
			templateWrapperDom = templateWrapperDomPart1 + modalPlugin.finalOptions.modalWrapperClass + templateWrapperDomPart2;
			$element.wrap(templateWrapperDom);

			// CSS Overriding Check
			var modalCss = getModalCss();
			for (var cssKey in modalCss) {
				$element.parent().css(cssKey, modalCss[cssKey]);
			}

			if (modalPlugin.finalOptions.modalCss.length != 0) {
				var hasVertical = false;
				var hasHorizontal = false;
				var optionCss = modalPlugin.finalOptions.modalCss;
				for (var cssKey in optionCss) {
					if (cssKey == 'top' || cssKey == 'bottom') hasVertical = true;
					if (cssKey == 'left' || cssKey == 'right') hasHorizontal = true;
					$element.parent().css(cssKey, optionCss[cssKey]);
				}
				if (modalPlugin.finalOptions.modalAutoCenter == true) {
					if (hasVertical == false) {
						$element.parent().css('top', '50%');
						var height = $element.parent().outerHeight();
						var suitableMargin = (-1 * (height / 2)) + 'px';
						$element.parent().css('margin-top', suitableMargin);
					}

					if (hasHorizontal == false) {
						$element.parent().css('left', '50%');
						var width = $element.parent().outerWidth();
						var suitableMargin = (-1 * (width / 2)) + 'px';
						$element.parent().css('margin-left', suitableMargin);
					}
				}
			}

			if (modalPlugin.finalOptions.modalCloseHandlers.length != 0) {
				for (var closeHandlerKey in modalPlugin.finalOptions.modalCloseHandlers) {
					$(modalPlugin.finalOptions.modalCloseHandlers[closeHandlerKey]).click(function() {
						modalPlugin.closeModal();
					});
				}
			} else {
				$element.parent().append(fallbackCloseButton);
				$('.' + fallbackCloseButtonClass).click(function() {
					modalPlugin.closeModal();
				});
			}
		};

		/*
		 * Main Function to Display the Modal.
		 * As the Animation Starts the Modal is Immediately made Visible so that the Animation can be shown.
		 */
		modalPlugin.showModal = function() {

			if (modalPlugin.finalOptions.modalTargetContainer) {
				var targetWindow = modalPlugin.finalOptions.modalTargetContainer;
				var targetHeight = $(targetWindow).outerHeight() + 'px';
				var targetWidth = $(targetWindow).outerWidth() + 'px';
				var targetPos = $(targetWindow).position();
				$element.parent().css('height', targetHeight);
				$element.parent().css('width', targetWidth);
				$element.parent().css('top', targetPos.top);
				$element.parent().css('left', targetPos.left);
				if ($(targetWindow).css('position') != 'fixed') {
					$element.parent().css('position', 'absolute');
				}

			}

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
		};


		/*
		 * Main Function to Close the Modal.
		 * Here, The animation is started first then the modal is hidden from the user (at the very end)
		 */
		modalPlugin.closeModal = function() {
			resetAnimation();
			$element.parent().addClass('animated ' + modalPlugin.finalOptions.animateOut);
			$element.parent().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
				var modalCss = getCloseCss();
				for (var cssKey in modalCss) {
					$element.parent().css(cssKey, modalCss[cssKey]);
				}
				modalPlugin.finalOptions.onClose();
			});
			console.log('Closing Modal');
		};

		/*
		 * Private function to get default CSS
		 */
		var getModalCss = function() {
			var cssObject = {};
			cssObject['position'] = 'fixed';
			cssObject['overflow'] = 'auto';
			cssObject['display'] = 'none';
			cssObject['padding'] = '10px';
			cssObject['background'] = '#f6f6f6';
			cssObject['border'] = 'solid 1px #d8d8d8';
			cssObject['box-sizing'] = 'border-box';
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

		modalPlugin.init();

	}

	/*
	 * Main Starting Function - Initializes the Un-initialized TxnModals
	 */
	$.fn.txnModal = function(options) {
		return this.each(function() {
			if (undefined == $(this).data('txnModal')) {
				var plugin = new $.txnModal(this, options);
				$(this).data('txnModal', plugin);
			}
		});
	}

	/*
	 * Wrapper Function to Show the Modal. If the TxnModal is no initialized then it can be Initialized here directly.
	 */
	$.fn.showModal = function(options) {
		if (this.length > 1) {
			console.warn('More than 1 element found. Please use Identifiers. Using 1st Reference');
		} else if (this.length == 0) {
			console.warn('Modal Element Not Found');
			return;
		}

		if (undefined == $(this).data('txnModal')) {
			var plugin = new $.txnModal(this, options);
			$(this).data('txnModal', plugin);
		}
		$(this).data('txnModal').showModal();
	}

})(jQuery);