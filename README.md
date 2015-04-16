# txnModal - Simple, Customizable Modal JQuery Plugin

txnModal is under construction.

#### Features
* Regular Full Scale Modal
* Customizable Close Button(s) [Support for More that one button that will close the modal]
* Target based Modal Opening (Can Open Modals in Other HTML DOMS)
* Attachable Hooks for Open and Close events

#### Version
0.0.1

#### Prerequisites

txnModal uses Animate.css and Jquery.

* [jQuery]- jQuery
* [Animate] - Animate.css Library

### Basic Usage

```js
// Make sure you have imported JQuery.js , Animate.css & txnModal.js
// Init Line. Put this in Document Ready. txnModal will Take care of your DOM.
$(document).ready(function(){
    $('#normal-modal').txnModal({ 
        modalCloseHandlers : ['#closeModalBtn'] 
    });
    
    $('#click-btn').click(function(){
        // Use this to Show Your Modal.
        $('#normal-modal').showModal();
    });
});
```

Above code works for the below HTML Markup:
```html
<body>
    <!-- Modal Code. Remember Modal is Position Specific. Make sure it is at
         the BODY Level for a full scale Modal -->
    <div id="normal-modal" class="txn-modal">
        <button id="closeModalBtn">Close this</button>
    </div>
    <!-- Triggering Button -->
    <div class="row">
        <button id="click-btn">Normal Modal</button>
    </div>
</body>
```

### Advanced Usage

Default Settings:
```js
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
```
##### [REQUIRED] modalCloseHandlers
Close Identifiers for the Modal. Specify the Identifiers in JSON Array of Strings.

##### animateIn
Refer to Animate.css for Various Types

##### animateOut
Refer to Animate.css for Various Types

##### animateDuration
Duration for Animation of the Modals

##### modalOverflow
[Not Implemented As of Yet]

##### modalTargetContainer
If you want to open the Modal in any Given HTML Windows / Div. Specify the Identifier here.

##### modalWrapperClass
Class for the Wrapper on which animation is performed.

##### onOpen
onOpen Event Hook

##### onClose
onClose Event Hook

License
----
MIT


[jQuery]:http://jquery.com
[Animate]:https://github.com/daneden/animate.css

