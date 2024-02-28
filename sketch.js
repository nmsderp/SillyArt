/*
 * @name Kaleidoscope
 * @arialabel User draws thick black lines on the grey background and it is mirrored 5 times in a circle like a kaleidoscope
 * @description A kaleidoscope is an optical instrument with two or more reflecting surfaces tilted to each other in an angle. This example tries to replicate the behavior of a kaleidoscope. Set the number of reflections at the symmetry variable and start drawing on the screen. Adjust the brush size with the help of the slider. The clear screen as it says clears the screen. The save button will download a .jpg file of the art that you have created.
 This adds a color thingy
 */
// Symmetry corresponding to the number of reflections. Change the number for different number of reflections 
let symmetry = 6;   

let angle = 360 / symmetry;
let saveButton, clearButton, fullscreenButton, brushSizeSlider, colorPicker;

function setup() { 
  createCanvas(windowWidth, windowHeight - 100); // Adjust canvas size to leave space at the bottom
  angleMode(DEGREES);
  background(50);

  // Setting up the slider for the thickness of the brush
  brushSizeSlider = createSlider(1, 32, 4, 0.1);
  brushSizeSlider.position(10, height + 20); // Adjust position
  
  // Creating the color picker
  colorPicker = createColorPicker('#000000');
  colorPicker.position(150, height + 20); // Adjust position

  // Creating the save button for the file
  saveButton = createButton('save');
  saveButton.mousePressed(saveFile);
  saveButton.position(10, height + 50); // Adjust position

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.mousePressed(clearScreen);
  clearButton.position(80, height + 50); // Adjust position

  //fullscreenButton = createButton('Full Screen');
 // fullscreenButton.mousePressed(screenFull);
 // fullscreenButton.position(160, height + 50); // Adjust position
}

// Save File Function
function saveFile() {
  save('design.jpg');
}

// Clear Screen function
function clearScreen() {
  background(50);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;
    
    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = brushSizeSlider.value();
        let color = colorPicker.color(); // Get the selected color from the color picker
        stroke(color);
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}

// Adjust canvas size when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 100);
}
