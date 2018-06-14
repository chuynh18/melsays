"use strict";

var inputText;
var displayText = "";

// add more characters to find and replace here as they are discovered
const charTable = [
    {find: "%20", replace: " "},
    {find: "%21", replace: "!"},
    {find: "%22", replace: '"'},
    {find: "%27", replace: "'"},
    {find: "%2C", replace: ","},
    {find: "%3A", replace: ":"},
    {find: "%3C", replace: "<"},
    {find: "%3E", replace: ">"},
    {find: "%3F", replace: "?"},
    {find: "%40", replace: "@"},
    {find: "%60", replace: "`"},
    {find: "+", replace: " "} // did not happen locally, but space was replaced by +
];

var parseURL = function() {
    var URL = window.location.href;
    if (URL.indexOf("q=") !== -1) {
        var spliced = URL.substr(URL.search("q=") + 2);
        for (var i = 0; i < charTable.length; i++) {
            while (spliced.indexOf(charTable[i].find) !== -1) {
                spliced = spliced.replace(charTable[i].find, charTable[i].replace)
            };
        };
        inputText = spliced;
    }
    else {
        inputText = prompt("What does Mel say?", "Don't forget to sign in to BootCamp Spot!");
    };
};

var genRandomColor = function(numChars) {
    var colorArray = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
    var randomColor = "#";
    for (var i = 0; i < numChars; i++) {
        randomColor += colorArray[Math.floor(Math.random()*colorArray.length)];
    }
    return randomColor;
};

var randomizeColor = function() {
    setTimeout(function() {
        document.getElementById("textDisplay").style.color = genRandomColor(6);
        randomizeColor();
    }, 100);
};

// this is how we chunk up inputText and display it one character at a time
// we don't (can't!) use a for loop with setTimeout, because JavaScript.
var i = 0;
var printerFunction = function() {
    if (i < inputText.length) {
        displayText = displayText.concat(inputText[i]);
        i++;
        document.getElementById("textDisplay").textContent = displayText;
        setTimeout(function() {
            printerFunction();
        }, 50);
    }
    else {
        i = 0;
        displayText = "";
        setTimeout(function() {
            printerFunction();
        }, 5000);
    };
};

// ---------------------------------- function calls ----------------------------------

parseURL(); // runs once, gets text to write either through URL or prompt
randomizeColor(); // infinite loop
printerFunction(); // infinite loop
