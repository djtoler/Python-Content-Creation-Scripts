var compName = "test"; // replace with your composition name

// Load the JSON data from the file
var jsonFile = new File("transcriptionForCaptions.json"); // replace with the actual file path
if (!jsonFile.exists) {
  alert("JSON file not found.");
  exit();
}

jsonFile.open("r");
var jsonData = jsonFile.read();
jsonFile.close();

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
alert(transcriptionForCaptions.length)
alert(lastArray.length)

var maxEndTime = 143.729

// Loop through the transcription data and add captions
for (var i = 0; i < transcriptionForCaptions.length; i++) {
  var captionData = transcriptionForCaptions[i][transcriptionForCaptions[i].length - 1].intervalBatchOfWords;
  if (!captionData) continue; // skip if intervalBatchOfWords is missing or empty

  var textLayer = comp.layers.addText();
  textLayer.name = "Caption " + (i + 1); // set a name for the text layer
  textLayer.property("Source Text").setValue(captionData.words);

  // Set the text color to yellow
  textLayer.property("Source Text").setValue(new TextDocument(captionData.words));
  var textProp = textLayer.property("Source Text");
  var textDocument = textProp.value;
  textDocument.resetCharStyle();
  textDocument.fillColor = [1, 1, 0]; // RGB color values (yellow in this example)
  textProp.setValue(textDocument);

  textLayer.inPoint = captionData.start;
  textLayer.outPoint = captionData.end;

  var xPos = comp.width / 2;
  var yPos = comp.height * 3 / 4;

  // Get the size and position of the text layer at the current time
  var textBoundingBox = textLayer.sourceRectAtTime(textLayer.startTime, false);
  var textCenter = [textBoundingBox.left + textBoundingBox.width/2, textBoundingBox.top + textBoundingBox.height/2];

  // Adjust the anchor point to the center of the text bounding box
  textLayer.property("Anchor Point").setValue(textCenter);
  textLayer.property("Position").setValue([xPos, yPos]);

}

comp.duration = maxEndTime;

alert("Finished adding captions.");
