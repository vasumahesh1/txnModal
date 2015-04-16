(function($) {

	$.txnModal = function(element, customOptions) {

		var defaultOptions = {
			animateIn: 'zoomIn',
			animateOut: 'zoomOut',
			animateDuration: '0.3s',
			modalOverflow: 'auto',
			modalTargetContainer: null,
			modalWrapperClass: 'txn-modal-wrapper',
			modalCloseHandlers: [],
			onOpen: function() {},
			onClose: function() {}
		};

		var templateDom = '';
		var templateDomPart1 = '<div class="';
		var templateDomPart2 = '"></div>';

		var modalPlugin = this;

		modalPlugin.finalOptions = {}

		var $element = $(element),
			element = element;

		modalPlugin.init = function() {
			modalPlugin.finalOptions = $.extend({}, defaultOptions, customOptions);
			templateDom = templateDomPart1 + modalPlugin.finalOptions.modalWrapperClass + templateDomPart2;
			$element.wrap(templateDom);
			var modalCss = getModalCss();
			for (var cssKey in modalCss) {
				$element.parent().css(cssKey, modalCss[cssKey]);
			}

			if(modalPlugin.finalOptions.modalTargetContainer)
			{
				var targetWindow = modalPlugin.finalOptions.modalTargetContainer;
				var targetHeight = $(targetWindow).css('height');
				var targetWidth = $(targetWindow).css('width');
				var targetPos = $(targetWindow).position();
				$element.parent().css('height' , targetHeight);
				$element.parent().css('width' , targetWidth);
				$element.parent().css('top' , targetPos.top);
				$element.parent().css('left' , targetPos.left);

			}

			for (var closeHandlerKey in modalPlugin.finalOptions.modalCloseHandlers) {
				console.log('Attaching Handler for : ' + modalPlugin.finalOptions.modalCloseHandlers[closeHandlerKey]);
				$(modalPlugin.finalOptions.modalCloseHandlers[closeHandlerKey]).click(function() {
					modalPlugin.closeModal();
				});
			}
		};

		modalPlugin.showModal = function() {
			resetAnimation();
			$element.parent().addClass('animated ' + modalPlugin.finalOptions.animateIn);
			var modalCss = getShowCss();
			for (var cssKey in modalCss) {
				$element.parent().css(cssKey, modalCss[cssKey]);
			}
			modalPlugin.finalOptions.onOpen();
			console.log('Opening Modal');
		};

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


		var getModalCss = function() {
			var cssObject = {};
			cssObject['position'] = 'absolute';
			cssObject['display'] = 'none';
			cssObject['background'] = '#e8e8e8';
			cssObject['top'] = '0px';
			cssObject['left'] = '0px';
			cssObject['height'] = '100%';
			cssObject['width'] = '100%';
			cssObject['animation-duration'] = modalPlugin.finalOptions.animateDuration;
			cssObject['-moz-animation-duration'] = modalPlugin.finalOptions.animateDuration;
			cssObject['-webkit-animation-duration'] = modalPlugin.finalOptions.animateDuration;
			cssObject['-ms-animation-duration'] = modalPlugin.finalOptions.animateDuration;
			cssObject['z-index'] = '9999';
			return cssObject;
		};

		var getShowCss = function() {
			var cssObject = {};
			cssObject['display'] = 'inline-block';
			return cssObject;
		};

		var getCloseCss = function() {
			var cssObject = {};
			cssObject['display'] = 'none';
			return cssObject;
		};

		var resetAnimation = function() {
			$element.parent().removeClass(modalPlugin.finalOptions.animateIn);
			$element.parent().removeClass(modalPlugin.finalOptions.animateOut);
		};

		modalPlugin.init();

	}

	$.fn.txnModal = function(options) {
		return this.each(function() {
			if (undefined == $(this).data('txnModal')) {
				var plugin = new $.txnModal(this, options);
				$(this).data('txnModal', plugin);
			}
		});
	}

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