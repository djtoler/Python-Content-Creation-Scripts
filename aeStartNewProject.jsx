// Create a new project
var projectName = 'jpTest34';
var project = app.newProject();
app.project.save(File(projectName+".aep"))

// Import the video file into the project
var importOptions = new ImportOptions(new File("./jpvid.mp4"));
var videoFile = project.importFile(importOptions);

// Create a new composition
var compWidth = 1920; // Set the width of the composition
var compHeight = 1080; // Set the height of the composition
var pixelAspect = 1; // Set the pixel aspect ratio
var duration = 30; // Set the duration (in seconds)
var frameRate = 30; // Set the frame rate (frames per second)
var compName = "test"; // Set the name of the composition

var comp = project.items.addComp(compName, compWidth, compHeight, pixelAspect, duration, frameRate);

// Add the video to the composition
var videoLayer = comp.layers.add(videoFile);

// Open the composition in a viewer
comp.openInViewer();