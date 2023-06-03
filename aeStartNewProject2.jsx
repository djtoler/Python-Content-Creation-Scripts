// Create a new project
var projectName = "jpTest141";
var project = app.newProject();
app.project.save(File(projectName + ".aep"));

// Import the video file into the project
var importOptions = new ImportOptions(new File("./jpvid.mp4"));
var videoFile = project.importFile(importOptions);

// Create a new composition
var compWidth = 1080; // Set the width of the composition
var compHeight = 1920; // Set the height of the composition
var pixelAspect = 1; // Set the pixel aspect ratio
var duration = 30; // Set the duration (in seconds)
var frameRate = 30; // Set the frame rate (frames per second)
var compName = "test"; // Set the name of the composition

var comp = project.items.addComp(
  compName,
  compWidth,
  compHeight,
  pixelAspect,
  duration,
  frameRate
);

// Add the video to the composition
var videoLayer = comp.layers.add(videoFile);

// Scale and position the video layer to fit the composition
var scaleFactor = Math.min(
  compWidth / videoLayer.width,
  compHeight / videoLayer.height
);
videoLayer.property("Scale").setValue([scaleFactor * 100, scaleFactor * 100]);
videoLayer.property("Position").setValue([compWidth / 2, compHeight / 2]);

// Duplicate the video layer
var blurredVideoLayer = videoLayer.duplicate();

// Scale the duplicated layer to fill the comp, decrease the scale to zoom out
blurredVideoLayer.property("Scale").setValue([0.4 * compWidth, 0.4 * compHeight]); // Decreased the scale by 10%

// Apply Gaussian Blur to the duplicated layer
var gaussianBlur = blurredVideoLayer.Effects.addProperty("ADBE Gaussian Blur 2");
gaussianBlur.property("Blurriness").setValue(50);

// Open the composition in a viewer
comp.openInViewer();
