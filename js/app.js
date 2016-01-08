//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately
// 1b. Store the color to be used later with mouse events
var color = $(".selected").css("background-color");
// 5c. select canvas, cache as a variable
var $canvas = $("canvas"); // <canvas> tag is used to draw graphics. It's a '2d' graphics api. Like an image tag, but you can change what it displays us JS. Can draw a circle, shapes, drop shadows, draw text, draw images, resize images, etc.
// 5a. Prepare to draw lines.
var context = $canvas[0].getContext("2d");  // *** Use jQ to access a canvas object to get its context so we can draw on it.
    // Accessing the 1st element (index 0) of this jQuery object $canvas will get you the canvas element.
    // jQ actually exposes the actual DOM element in numeric indexes. [0] grabs he plain old JS representation of the canvas so you can draw context.
// 5d. create variable for mouse events
var lastEvent;
var mouseDown = false;  // to stop drawing on mouseUp

// 1. CLICKING LI, SELECTING COLORS OF PALLETE
// 1a. When clicking on control list items. 4e. swap .click() for .on() to handle dynamic <li>
$(".controls").on("click", "li", function() {
    // 1d. Deselect sibling elements
    $(this).siblings().removeClass("selected");
    // 1e. Select clicked element
    $(this).addClass("selected");
      // 1c. Set the color. cache current color used for mouse events later
      color = $(this).css("background-color");
      // 1f.Test page, test console typing "color"
});

// 2. GET COLOR SELECTOR BOX TO SHOW/HIDE
// 2a. When "New Color" button is pressed
$("#revealColorSelect").click(function() {
    // 2a. Show color select or hide the color select
    changeColor(); // before showing or hiding, show new color
    $("#colorSelectBox").toggle();
});

// 3. UPDATE NEW COLOR, HAVE COLOR SLIDER COLORS SHOW IN THUMBNAIL
// 3a Create function for changeColor to change to new color
function changeColor()  {
    // 3c. Get a slider values, make variables
    var red = $("#red").val();
    var green = $("#green").val();
    var blue = $("#blue").val();
    // 3a. Change changeColor to new color. Pass in RGB color slide values "rgb("", "", "")"
    $("#newColor").css("background-color", "rgb(" + red + ", " + green + ", " + blue + ")");
}
// 3b. We want the slider values when sliders change, grab input
$("input[type=range]").change(changeColor);  // slects all inputs with type=range

// 4. ADD NEW CUSTOM COLOR TO <LI> PALETTE CONTROLS
// 4a. When "Add Color" buttton is pressed
$("#addNewColor").click(function() {
    // 4b. Append the color to the controls ul
    var $newColor = $("<li></li>");
    $newColor.css("background-color", $("#newColor").css("background-color"));
    // 4d. Append new color to the <li>
    $(".controls ul").append($newColor);
    // 4c. Select the new color
    $newColor.click();
});

// 5. DRAW ON THE CANVAS (events will be .mousedown(), .mousemove(), then .mouseup()
  // when mousedown() we need the location of .mousedown, then a line from .mousedown to .mousemove
  // and then from every subsequent .mousemove, then not draw anymore on .mouseup
// 5d. then use mouse events to draw.
$canvas.mousedown(function(e) {
    lastEvent = e;
    mouseDown = true
     // 5e. draw from last event to new event: mousemove
}).mousemove(function(e){  // use 'e' again to use event on the move
    // 5A. Draw lines. (moved up top to cache variable)
    if(mouseDown) {  // if mouseDown is true, then execute all this code below
      context.beginPath(); // Begins a path, or resets the current path
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY); // starts the line
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke(); // Actually draws the path you have defined
      lastEvent = e // update last event to be the new value from the 'e'
    }  // if mouseDown is false, the drawingcode above won't execute

}).mouseup(function() {  // note we have mousedown, mousemove and mouseup
    mouseDown = false;
}).mouseleave(function() {
    $canvas.mouseup();
});







// 6a. Select the canvas element (not the JQ representation)
// 6. On mouse events on the canvas

// 7a Mouse Event Variable
// 7b. Mouse Events on the canvas
// 7c. make a global variable, to test code in console



// Notes: Confusing! "Now the reason why we need to get the actual HTML object of that element is because it's got a special method on that particular method. Now, the reason we have to select the actual HTML element is because it's got a special method that we can call on that element. And that is to get its context."
