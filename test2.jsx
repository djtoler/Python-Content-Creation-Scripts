// Load the project
var project = app.project;

// Create a new comp
var comp = project.items.addComp('newComp', 1080, 1920, 1, 10, 30);

// Path to the image
var imagePath = "./durk.png";

// Import the image
var imageFile = new File(imagePath);
var image = project.importFile(new ImportOptions(imageFile));

// Add stretched image to the comp
var stretchedImageLayer = comp.layers.add(image);
stretchedImageLayer.scale.setValue([100 * comp.width / image.width, 100 * comp.height / image.height]);

// Apply a Gaussian Blur effect
var blur = stretchedImageLayer.property("Effects").addProperty("ADBE Gaussian Blur 2");
blur.property("Blurriness").setValue(10);

// Add original image to the comp
var originalImageLayer = comp.layers.add(image);
