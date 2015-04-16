# txnModal - Simple, Customizable Modal JQuery Plugin


> **IMPORTANT:**
> txnModal is **under construction**.
> Hence might be buggy.

#### Features
* Regular Full Scale Modal
* Customizable Close Button(s) [Support for More that one button that will close the modal]
* Target based Modal Opening (Can Open Modals in Other HTML DOMS)
* Customizable CSS for the Modal (If you don't want the full scale Default)
* Attachable Hooks for Open and Close events

#### Version
0.0.2

#### Prerequisites

txnModal uses Animate.css and Jquery.

* [jQuery]- jQuery
* [Animate] - Animate.css Library

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
    modalWrapperClass: 'txn-modal-wrapper',
    modalCloseHandlers: [],
    modalCss: {},
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

##### modalOverflow
[Not Implemented As of Yet]

---

##### modalTargetContainer
If you want to open the Modal in any Given HTML Window / Div. Specify the Identifier here.
Eg:
```js
$('#target-modal-2').txnModal({ 
    modalTargetContainer : '#temp-parent-container-2'
});
```

---

##### modalWrapperClass
Class for the Wrapper on which animation is performed.

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

##### onOpen
onOpen Event Hook

---

##### onClose
onClose Event Hook

License
----
MIT


[jQuery]:http://jquery.com
[Animate]:https://github.com/daneden/animate.css

