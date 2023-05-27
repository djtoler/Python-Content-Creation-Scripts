// var compName = "test"; // replace with your composition name

// // replace with your transcription data
// var transcriptionFile = new File("transcriptionForCaptions.js"); // replace with the actual file name

// if (!transcriptionFile.exists) {
//     alert("Transcription file not found.");
//     exit();
// }

// transcriptionFile.open("r");
// var transcriptionData = transcriptionFile.read();
// transcriptionFile.close();

// // evaluate the transcription data as JavaScript code
// var transcriptionForCaptions;
// try {
//     transcriptionForCaptions = eval(transcriptionData);
// } catch (e) {
//     alert("Failed to parse transcription data: " + e);
//     exit();
// }

// // Get the active composition
// var comp = app.project.activeItem;
// if (!comp || !(comp instanceof CompItem) || comp.name !== compName) {
//     alert("No active composition named '" + compName + "' found.");
//     exit();
// }

// // Get the first item in the project (assumed to be the video file)
// var videoFileItem = app.project.item(1);
// if (!videoFileItem) {
//     alert("No video file found.");
//     exit();
// }

// // Add the video to the composition
// var videoLayer = comp.layers.add(videoFileItem);
// videoLayer.moveToBeginning(); // Move the video layer to the bottom of the layer stack

// // Loop through the transcription data
// for (var i = 0; i < transcriptionForCaptions.length; i++) {
//     var intervalBatchOfWords = transcriptionForCaptions[i].intervalBatchOfWords;
//     if (!intervalBatchOfWords) continue; // skip this batch if it has no intervalBatchOfWords object

//     // Create a new text layer for the caption
//     var textLayer = comp.layers.addText();
//     textLayer.name = "Caption " + (i + 1); // Set a name for the text layer
//     textLayer.property("Source Text").setValue(intervalBatchOfWords.words);

//     // Set the font to Battery Park
//     var textProp = textLayer.property("Source Text");
//     var textDocument = textProp.value;
//     textDocument.resetCharStyle();
//     textDocument.font = "Battery Park";
//     textProp.setValue(textDocument);

//     // Set the start and end times
//     textLayer.startTime = intervalBatchOfWords.start;
//     textLayer.outPoint = intervalBatchOfWords.end;

//     // Set the background color to dark yellow
//     var fillEffect = textLayer.property("Effects").addProperty("Fill");
//     fillEffect.property("Color").setValue([1, 1, 0]); // Dark yellow color
// }

// alert("Finished adding captions.");


// '****************WORKING****************'
// var compName = "test"; // replace with your composition name

// // Transcription data
// var captionData = {
//   "intervalBatchOfWords": {
//     "words": "OK so let's go back to the complexity problem See",
//     "start": 0.159,
//     "end": 3.94
//   }
// };

// // Get the active composition
// var comp = app.project.activeItem;
// if (!comp || !(comp instanceof CompItem) || comp.name !== compName) {
//   alert("No active composition named '" + compName + "' found.");
//   exit();
// }

// // Create a new text layer for the caption
// var textLayer = comp.layers.addText();
// textLayer.name = "Caption 1"; // Set a name for the text layer
// textLayer.property("Source Text").setValue(captionData.intervalBatchOfWords.words);

// // Set the start and end times
// textLayer.startTime = captionData.intervalBatchOfWords.start;
// textLayer.outPoint = captionData.intervalBatchOfWords.end;

// alert("Caption added.");

// // Continue with the rest of the code if needed...
// '****************WORKING****************'



var compName = "test"; // replace with your composition name

// Load the JSON data from the file
var jsonFile = new File("transcriptionForCaptions2.json"); // replace with the actual file path
if (!jsonFile.exists) {
  alert("JSON file not found.");
  exit();
}

jsonFile.open("r");
var jsonData = jsonFile.read();
jsonFile.close();

// var transcriptionForCaptions = JSON.parse(jsonData);
// alert(transcriptionForCaptions[0][transcriptionForCaptions[0].length -1])

if (typeof JSON === "undefined") {
    // Polyfill for JSON object
    eval(
      'var JSON={parse:function(s){return eval("("+s+")");},stringify:function(v){return String(v);}};'
    );
}


// Parse the JSON data
var transcriptionForCaptions;
try {
  transcriptionForCaptions = JSON.parse(jsonData);
  // alert(JSON.stringify(transcriptionForCaptions[0][transcriptionForCaptions[0].length - 1]));

} catch (e) {
  alert("Failed to parse JSON data: " + e + "--->" + typeof(transcriptionForCaptions));
  exit();
}

// Get the active composition
var comp = app.project.item(2);
var comp2 = app.project.item(1);
if (!comp || !(comp instanceof CompItem) || comp.name !== compName) {
  alert("No active composition named '" + compName + "' found.");
  exit();
}

var lastArray = transcriptionForCaptions[transcriptionForCaptions.length - 1]

// alert(lastArray[lastArray.length - 1].intervalBatchOfWords.end)

var maxEndTime = lastArray[lastArray.length - 1].intervalBatchOfWords.end

var bgColor = [1, 0, 0]; // RGB color values (red in this example)
// Loop through the transcription data and add captions
for (var i = 0; i < transcriptionForCaptions.length; i++) {
  var captionData = transcriptionForCaptions[i][transcriptionForCaptions[i].length - 1].intervalBatchOfWords;
  if (!captionData) continue; // skip if intervalBatchOfWords is missing or empty

  var textLayer = comp.layers.addText();
  textLayer.name = "Caption " + (i + 1); // set a name for the text layer
  textLayer.property("Source Text").setValue(captionData.words);




  var xPos = comp.width / 2;
  var yPos = comp.height * 3 / 4;

  // Get the size and position of the text layer at the current time
  var textBoundingBox = textLayer.sourceRectAtTime(textLayer.startTime, false);
  var textCenter = [textBoundingBox.left + textBoundingBox.width/2, textBoundingBox.top + textBoundingBox.height/2];

  // Adjust the anchor point to the center of the text bounding box
  textLayer.property("Anchor Point").setValue(textCenter);

  textLayer.property("Position").setValue([xPos, yPos]);

  textLayer.textContainer.autoSizeToFit = true;
  textLayer.textContainer.wordWrap = true;



}

comp.duration = maxEndTime;

alert("Finished adding captions.");
