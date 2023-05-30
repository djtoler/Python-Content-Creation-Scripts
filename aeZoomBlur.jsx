// Import the image file into the project
var importOptions = new ImportOptions(new File("./durk.png"));
var imageFile = project.importFile(importOptions);

// Add the image to the composition
var imageLayer = comp.layers.add(imageFile);

// Scale and position the image layer to fit the composition
var scaleFactor = Math.min(compWidth / imageFile.width, compHeight / imageFile.height);
imageLayer.property("Scale").setValue([scaleFactor * 100, scaleFactor * 100]);
imageLayer.property("Position").setValue([compWidth / 2, compHeight / 2]);

// Set the image layer start and end times
var startTime = 10; // Start time in seconds
var endTime = 13; // End time in seconds
imageLayer.startTime = startTime;
imageLayer.outPoint = endTime;

// Add a Gaussian Blur effect to the image layer
var gaussianBlur = imageLayer.Effects.addProperty("ADBE Gaussian Blur 2");

// Set the blurriness and add keyframes
var transitionDuration = 0.5; // Transition duration in seconds
gaussianBlur.property("Blurriness").setValueAtTime(startTime, 0);
gaussianBlur.property("Blurriness").setValueAtTime(startTime + transitionDuration, 50);
gaussianBlur.property("Blurriness").setValueAtTime(startTime + transitionDuration * 2, 0);
gaussianBlur.property("Blurriness").setValueAtTime(endTime - transitionDuration * 2, 0);
gaussianBlur.property("Blurriness").setValueAtTime(endTime - transitionDuration, 50);
gaussianBlur.property("Blurriness").setValueAtTime(endTime, 0);

// Add keyframes for the position to create the slide effect
imageLayer.property("Position").setValueAtTime(startTime, [-compWidth / 2, compHeight / 2]);
imageLayer.property("Position").setValueAtTime(startTime + transitionDuration, [compWidth / 2, compHeight / 2]);
imageLayer.property("Position").setValueAtTime(endTime - transitionDuration, [compWidth / 2, compHeight / 2]);
imageLayer.property("Position").setValueAtTime(endTime, [compWidth * 1.5, compHeight / 2]);
