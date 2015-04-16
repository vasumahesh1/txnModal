# txnModal - Simple, Customizable Modal JQuery Plugin

txnModal is under construction.

#### Features
* Regular Full Scale Modal
* Customizable Close Button(s) [Support for More that one button that will close the modal]
* Target based Modal Opening (Can Open Modals in Other HTML DOMS)
* Attachable Hooks for Open and Close events

#### Version
0.0.2

#### Prerequisites

txnModal uses Animate.css and Jquery.

* [jQuery]- jQuery
* [Animate] - Animate.css Library

### Basic Usage

```js
// Make sure you have imported JQuery.js , Animate.css & txnModal.js
// Init Line. Put this in Document Ready. txnModal will Take care of your DOM.
$(document).ready(function(){
    // Init Line
    $('#normal-modal').txnModal();

    // On Click Show the Modal
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
    <div id="normal-modal">
        <p>
            This is My Modal!
        </p>
    </div>
    <!-- Triggering Button -->
    <button id="click-btn">Normal Modal</button>
</body>
```

### Advanced Usage

Default Settings:
```js
var defaultOptions = {
    animateIn: 'zoomIn',
    animateOut: 'zoomOut',
    animateDuration: 0.3,
    modalOverflow: 'auto',
    modalTargetContainer: null,
    modalWrapperClass: 'txn-modal-wrapper',
    modalCloseHandlers: [],
    onOpen: function() {},
    onClose: function() {}
};
```
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

##### modalCloseHandlers
Close Identifiers for the Modal. Specify the Identifiers in JSON Array of Strings.


##### onOpen
onOpen Event Hook

##### onClose
onClose Event Hook

License
----
MIT


[jQuery]:http://jquery.com
[Animate]:https://github.com/daneden/animate.css

