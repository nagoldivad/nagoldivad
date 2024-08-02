/**
 * @fileoverview UI functions for CryptoToy2
 * @author David Logan <nagoldivad@gmail.com>
 * @version 2.0.0
 * @date 2024-07-12
 * @license None
 *
 * Just basic UI stuff; required for the CryptoToy 2 app
 * 
 * 
 * @module ModuleName (if your code is modular)
 * @requires OtherModule (if there are dependencies)
 */


// check if all instances of a custom element are connected to the DOM [created by Claude 3.5 Sonnet]
function areCustomElementsReady(tagName) {
    return new Promise((resolve) => {
        if (customElements.get(tagName)) {
        const checkInstances = () => {
            const instances = document.getElementsByTagName(tagName);
            const allConnected = Array.from(instances).every(instance => instance.isConnected);
            if (allConnected) {
                resolve();
            } else {
                requestAnimationFrame(checkInstances);
            }
        };
        checkInstances();
        } else {
            customElements.whenDefined(tagName).then(() => areCustomElementsReady(tagName)).then(resolve);
        }
    });
}
// List of custom elements
const customElementNames = [
    'sl-split-panel',
    'sl-tab-group',
    'sl-range'
];
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create promises for each custom element
    const elementPromises = customElementNames.map(areCustomElementsReady);
    // Wait for all custom elements to be ready
    Promise.all(elementPromises)
        .then(initializeApp)
        .catch(error => console.error('Error waiting for custom elements:', error));
});
// Function to initialize app
function initializeApp() {
    createUILinks();
    rangeStepUpTo13();
    setRangeValue();
}

// UI connections:
var taPlainText = ""; // textarea for plaintext (left side)
var taCipherText = ""; // textarea for ciphertext (right side)
var theVigKey = ""; // textfield for Vignere key
var theSlider = ""; // the slider/range for Caesar

function createUILinks() {
    // UI connections:
    taPlainText = document.getElementById('ta-plaintext');
    taCipherText = document.getElementById('ta-ciphertext');
    theVigKey = document.getElementById('keyVig');
    theSlider = document.getElementById("slidercaesar");
    // event listeners:
    theSlider.addEventListener('sl-change', event => {
        setRangeValue();
    });
}

function setRangeValue() {
    var theSliderValue = theSlider.value;
    theSlider.setAttribute('label', 'Rotation: ' + theSliderValue);
}

function rangeStepUpTo13() {
    // we're doing this because the css --track-active-offset isn't working
    for (var i = 0; i < 12; i++) {
        theSlider.stepUp();
    }
}

// ---- ---- JavaScript to respond to button clicks

function clickedButtonCaesar() {
    
    // get shift
    var shiftAmt = theSlider.value;
    
    // get text and perform input validation
    var theText = taPlainText.value;
    // make this issue a error/explanation to the user
    if ( theText == "" ) {
        console.log("Empty string, no plain text to encrypt.");
        taCipherText.value = "";
        return;
    }
    
    // call encryptWithCaesar function
    var ciphertext = encryptWithCaesar(shiftAmt, theText);
    
    // clear the textarea "ta-ciphertext" then put result into it
    taCipherText.value = "";
    taCipherText.value = ciphertext;
    
    return;
}

function clickedButtonCaesarDecrypt() {
    
    // get shift
    var shiftAmt = theSlider.value;
    // transform shiftAmt into decryption value
    shiftAmt = 26 - shiftAmt;
    
    // get text and perform input validation
    var theText = taCipherText.value;
    // make this issue a error/explanation to the user
    if ( theText == "" ) {console.log("Empty string, no cipher text to decrypt.");return;}
    
    // call encryptWithCaesar function
    var ciphertext = encryptWithCaesar(shiftAmt, theText);
    
    // clear the textarea then put result into it
    taPlainText.value = "";
    taPlainText.value = ciphertext;
    
    return;
}

/*function clickedButtonCaesarAuto() {
    // get text and send to function
    var theText = taCipherText.value;
    var theResult = characterFrequencyAnalysis(theText);
    console.log(theResult);
    var faStr = "";
    theResult.forEach(element => {
        faStr += element + "<br>";
    });
    console.log(faStr);
    document.getElementById("fa").innerHTML = faStr;
    return;
}*/

function clickedButtonVignereEnc() {

    // get text and perform input validation
    var theKey = theVigKey.value;
    var theText = taPlainText.value;
    // make this issue an error/explanation to the user
    if ( theText == "" ) {
        console.log("Empty string, no plain text to encrypt.");
        return;
    }
    if ( theKey == "" ) {
        console.log("Empty key, cannot encrypt.");
        return;
    }
    // make theKey lowercase, remove non-alphabet characters
    theKey = theKey.toLowerCase();
    theKey = theKey.replace(/[^a-zA-Z]/g, '');
    theVigKey.value = theKey;
    
    // call encryptWithVignere
    var ciphertext = encryptWithVignere(theKey, theText);
    
    // put result into ta textarea
    taCipherText.value = "";
    taCipherText.value = ciphertext;
    
    return;
}

function clickedButtonVignereDec() {

    // get text and perform input validation
    var theKey = theVigKey.value;
    var theText = taCipherText.value;
    // make this issue an error/explanation to the user
    if ( theText == "" ) {
        console.log("Empty string, no cipher text to decrypt.");
        return;
    }
    if ( theKey == "" ) {
        console.log("Empty key, cannot encrypt.");
        return;
    }
    // make theKey lowercase
    theKey = theKey.toLowerCase();
    theVigKey.value = theKey;
    
    // transform theKey into a decryption key
    var kntr = 0;
    var theChar = 0;
    var tempStr = "";
    //var x;
    for (kntr; kntr < theKey.length; kntr++ ) {
        theChar = theKey.charCodeAt(kntr);
        theChar = 26 - (theChar - 96);
        //console.log(theChar);
        tempStr = tempStr + String.fromCharCode(theChar + 96);
        //console.log(tempStr);
    }
    theKey = tempStr;
    
    // call encryptWithVignere
    var ciphertext = encryptWithVignere(theKey, theText);
    
    // put result into ta textarea
    taPlainText.value = "";
    taPlainText.value = ciphertext;

}

