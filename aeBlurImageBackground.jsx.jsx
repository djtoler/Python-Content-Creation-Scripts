// Load the project
var project = app.project;

// Create a new comp
var comp = project.items.addComp('newComp', 1080, 1920, 1, 10, 30);

// Path to the image
var imagePath = "./durk2.jpg";

// Import the image
var imageFile = new File(imagePath);
var importOptions = new ImportOptions(imageFile);
var image = project.importFile(importOptions);

// Add stretched image to the comp
var stretchedImageLayer = comp.layers.add(image);
stretchedImageLayer.scale.setValue([100 * comp.width / image.width, 100 * comp.height / image.height]);

// Apply a Gaussian Blur effect
var blur = stretchedImageLayer.property("Effects").addProperty("ADBE Gaussian Blur 2");
blur.property("Blurriness").setValue(50);

// Set when the stretched image appears and disappears
stretchedImageLayer.inPoint = 3; // starts at 1 second
stretchedImageLayer.outPoint = 7; // ends at 5 seconds

// Add original image to the comp
var originalImageLayer = comp.layers.add(image);

// Set when the original image appears and disappears
originalImageLayer.inPoint = 3; // starts at 3 seconds
originalImageLayer.outPoint = 7; // ends at 7 seconds

// Open the composition in the viewer
comp.openInViewer();

