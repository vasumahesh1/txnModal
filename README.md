# txnModal - Simple, Customizable Modal JQuery Plugin
[![BuildStatus](https://travis-ci.org/vasumahesh1/txnModal.svg?branch=master)](https://travis-ci.org/vasumahesh1/txnModal)

> **IMPORTANT:**
> txnModal is **under construction**.
> Well most of it works.
> Hence might be buggy.

#### Features
* Regular Full Scale Modal
* Customizable Close Button(s) [Support for More that one button that will close the modal]
* Target based Modal Opening (Can Open Modals in Other HTML DOMS)
* Customizable CSS for the Modal (If you don't want the full scale Default)
* Auto Centering - X & Y Independently.
* Overlay - Optional Overlay
* Attachable Hooks for Open and Close events

#### Version
0.0.6

#### Prerequisites

txnModal uses Animate.css and Jquery.

* [jQuery]- jQuery
* [Animate] - Animate.css Library

#### Browser Support

Chrome 30+, Firefox 34+, Safari (Not Tested Yet), IE (Not Tested Yet)

### Basic Usage

Importing
```html
<!-- Needs Animate.css-->
<link rel="stylesheet" href="../dependencies/animate.css"/>
<!-- JQuery Required-->
<script src="http://code.jquery.com/jquery-2.1.3.min.js"></script>
```
Init & Execution
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
```
##### animateIn
Refer to Animate.css for Various Types

---

##### animateOut
Refer to Animate.css for Various Types

---

##### animateDuration
Duration for Animation of the Modals in **seconds**. By Default it is set to 0.3 seconds.

---

##### modalTargetContainer
If you want to open the Modal in any Given HTML Window / Div. Specify the Identifier here. Note: This doesn't require you to place the modal in the Nested HTML. It is taken care by the Plugin. It moves the modal's HTML code to the Target Container. Refer Examples for various Customizations.
Eg:
```js
$('#target-modal-2').txnModal({ 
    modalTargetContainer : '#temp-parent-container-2'
});
```

---

##### modalWrapperClass
Class for the Wrapper on which animation is performed. Use this If you want to
add some extra CSS Classes for other JQuery or CSS needs.

---

##### overlayWrapperClass
Class for the Overlay which is Appended at the same level as the Modal. Use this If you want to
add some extra CSS Classes for other JQuery or CSS needs.

---

##### modalCloseHandlers
Close Identifiers for the Modal. Specify the Identifiers in JSON Array of Strings.
Eg:
```js
$('#normal-modal').txnModal({
    modalCloseHandlers : ['#closeModalBtn']
});
```
Use this if you have Custom Button(s) for Closing the Modal or You don't want to use the basic one.

---

##### modalCss
CSS Overriding Parameter. So you can modify the Modal's Appearance. Refer
Examples for a working sample.
Eg:
```js
$('#css-modal').txnModal({ 
    modalCss : { 
        'height' : '450px',
        'width' : '750px',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : '-375px',
        'margin-top' : '-225px'
    }
});
```
Above code will open a modal of `750p x 450p` right in the center of the screen.

---

##### modalAutoCenter
Auto Centers the Modal based on the CSS Given to it. If 'top' or 'bottom' is present then it auto-centers it Horizontally. If 'left' or 'right' is present it auto-centers it Vertically. Otherwise X & Y Both are centered.

```js
// Both Centering
$('#auto-modal-1').txnModal({ 
    modalCss : { 
        'height' : '450px',
        'width' : '750px'
    },
    modalAutoCenter: true
});

// Only X Axis Centering
$('#auto-modal-2').txnModal({ 
    modalCss : { 
        'height' : '450px',
        'width' : '750px',
        'top' : '10px'
    },
    modalAutoCenter: true
});

// Only Y Axis Centering
$('#auto-modal-3').txnModal({ 
    modalCss : { 
        'height' : '450px',
        'width' : '750px',
        'left' : '10px'
    },
    modalAutoCenter: true
});
```

---

##### targetScrollEnabled
Change if the Target Window can scroll or not. For those that haven't given the
Target Window, target is taken as `body`.

```js
$('#overflow-modal').txnModal({
    targetScrollEnabled : false
});
```

---

##### overlayEnabled
If you don't want the faded Overlay. You can set this option to false.

```js
$('#overflow-modal').txnModal({
    overlayEnabled : false
});
```

---

##### onOpen
onOpen Event Hook

---

##### onClose
onClose Event Hook

Known Issues, Bugs & Fix Status
----
* ~~Outside Click doesn't Close the Modal [Yet]~~
* Responsive Issues maybe present with some Modals with Fixed Width and Heights
* ~~Overflow Modal's Default Close Button is not Fixed at the Top Right~~
* ~~Overflow Dialog has Scroll Issues~~
* ~~Cannot Auto Center Modals with `modalTargetContainer` property~~

License
----
MIT


[jQuery]:http://jquery.com
[Animate]:https://github.com/daneden/animate.css

