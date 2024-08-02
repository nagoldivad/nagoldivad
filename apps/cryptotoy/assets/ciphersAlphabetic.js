/**
 * @fileoverview ciphersAlphabetic.js
 * @author David Logan <nagoldivad@gmail.com>
 * @version 0.9.0
 * @date 2014-04-12
 * @license GNU General Public License, version 3 (GPL-3.0)
 * http://opensource.org/licenses/gpl-3.0.html
 * (This is free, open source software.)
 *
 * a JavaScript function to perform simple alphabetic encryption
 * input: a text string (to be shifted) and an integer (1 to 26)
 * returns a text string or null for error
 * 
 * created by David M. Logan (nagoldivad@gmail.com)
 * version 0.9
 * May 2014
 * 
 * @module ModuleName (if your code is modular)
 */


function encryptWithCaesar(theShift, theText) {
	
	//variable initialization
	var kntr = 0;
	var theChar = 0;
	var cipherText = "";
	theShift = parseInt(theShift);
	//console.log(theShift);
	
	// check that text has something in it 
	if (theText.length < 1) { return null;}
	
	// main loop
	for ( kntr; kntr < theText.length; kntr++ ) {
		theChar = theText.charCodeAt(kntr);
		if ( theChar > 96 && theChar < 123 ) {
			if ( (theChar + theShift) > 122 ) {
				cipherText += String.fromCharCode(97 + ((theChar + theShift) - 123));
			}
			else {
				cipherText += String.fromCharCode(theChar + theShift);
			}
		}
		else if ( theChar > 64 && theChar < 91 ) {
			if ( (theChar + theShift) > 90 ) {
				cipherText += String.fromCharCode(65 + ((theChar + theShift) - 91));
			}
			else {
				cipherText += String.fromCharCode(theChar + theShift);
			}
		}
		else {
			cipherText += String.fromCharCode(theChar);
		}
	}
	
	// return the cipherText string
	return cipherText;
}

function encryptWithVignere(theKey, theText) {
	
	// variable initialization
	var theShift = 0;
	var cipherText = "";
	var kntr = 0;
	var keyPos = 0;
	
	// input verification & error checking
	theKey = theKey.toLowerCase();
	
	// main loop
	for ( kntr; kntr < theText.length; kntr++ ) {
		// get theShift from theKey
		if ( keyPos > (theKey.length - 1 ) ) { keyPos = 0 };
		theShift = ( theKey.charCodeAt(keyPos) - 96 );
		keyPos++;
		//console.log(theShift);
		// code section for shifting
		theChar = theText.charCodeAt(kntr);
		if ( theChar > 96 && theChar < 123 ) {
			if ( (theChar + theShift) > 122 ) {
				cipherText += String.fromCharCode(97 + ((theChar + theShift) - 123));
			}
			else {
				cipherText += String.fromCharCode(theChar + theShift);
			}
		}
		else if ( theChar > 64 && theChar < 91 ) {
			if ( (theChar + theShift) > 90 ) {
				cipherText += String.fromCharCode(65 + ((theChar + theShift) - 91));
			}
			else {
				cipherText += String.fromCharCode(theChar + theShift);
			}
		}
		else {
			cipherText += String.fromCharCode(theChar);
		}
	}
	
	// return the cipherText string
	return cipherText;
}

// this function created by Claude Sonnet 3.5 (2024, July 20) 
function characterFrequencyAnalysis(str) {
    // Convert the string to lowercase and remove non-alphabetic characters
    const cleanStr = str.toLowerCase().replace(/[^a-z]/g, '');
    // Initialize an array to store character frequencies
    const frequencyArray = new Array(26).fill(0);
    // Count the frequency of each character
    for (let char of cleanStr) {
        const index = char.charCodeAt(0) - 97; // 'a' is 97 in ASCII
        frequencyArray[index]++;
    }
    // Calculate the total number of characters
    const totalChars = cleanStr.length;
    // Calculate the frequency percentage for each character
    return frequencyArray.map((count, index) => {
        const char = String.fromCharCode(index + 97);
        const percentage = (count / totalChars * 100).toFixed(2) + '%';
        return `${char}: ${percentage}`;
    });
}
