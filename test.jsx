// Import the After Effects project that contains the composition you want to use
var importProjectOptions = new ImportOptions(new File("./transitions.aep"));
var importedProject = project.importFile(importProjectOptions);
alert("Imported Project: " + importedProject.name); // Add alert

// Locate the desired composition from the imported project
var importedComp;
for (var i = 1; i <= importedProject.numItems; i++) {
  if (importedProject.item(i) instanceof FolderItem && importedProject.item(i).name === "Useful Transitions") {
    var folder1 = importedProject.item(i);
    alert("Found Folder: " + folder1.name);
    for (var j = 1; j <= folder1.numItems; j++) {
      if (folder1.item(j) instanceof FolderItem && folder1.item(j).name === "01. Edit Comps") {
        var folder2 = folder1.item(j);
        alert("Found Folder: " + folder2.name);
        for (var k = 1; k <= folder2.numItems; k++) {
          if (folder2.item(k) instanceof FolderItem && folder2.item(k).name === "01. Distortion Zoom") {
            var folder3 = folder2.item(k);
            alert("Found Folder: " + folder3.name);
            for (var l = 1; l <= folder3.numItems; l++) {
              if (folder3.item(l) instanceof FolderItem && folder3.item(l).name === "Distortion Zoom IN (Fast)") {
                var folder4 = folder3.item(l);
                alert("Found Folder: " + folder4.name);
                for (var m = 1; m <= folder4.numItems; m++) {
                  if (folder4.item(m) instanceof CompItem && folder4.item(m).name === "Distortion IN Fast") {
                    importedComp = folder4.item(m);
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// Use the imported composition in the new project
// (For example, add it as a layer to the new composition)
if (importedComp) {
  var importedCompLayer = comp.layers.add(importedComp);

  // Turn on collapse transformations for the layer
  importedCompLayer.collapseTransformation = true;

  // Set the in and out points of the layer (in seconds)
  importedCompLayer.inPoint = 4.0; // Set the in point to 1 second
  importedCompLayer.outPoint = 5.0; // Set the out point to 2 seconds
}

// Import the image files
var importImage1Options = new ImportOptions(new File("./durk.png"));
var imageFile1 = project.importFile(importImage1Options);
alert("Imported Image 1: " + imageFile1.name); // New alert

var importImage2Options = new ImportOptions(new File("./durk2.jpg"));
var imageFile2 = project.importFile(importImage2Options);
alert("Imported Image 2: " + imageFile2.name); // New alert


// Replace the placeholder layers in the imported composition with the image files
// Assuming that the placeholder layers are the first two layers in the composition
// if (importedComp) {
//   alert("Number of layers in importedComp: " + importedComp.numLayers); // New alert
//   alert("Layer 1 type: " + importedComp.layer(1).typeName);
//   alert("Layer 1 source name: " + importedComp.layer(1).source.name);
//   alert("Layer 2 type: " + importedComp.layer(2).typeName);
//   alert("Layer 2 source name: " + importedComp.layer(2).source.name);
//   for (var n = 1; n <= importedComp.numLayers; n++) {
//     alert("Layer " + n + " type: " + importedComp.layer(n).typeName);
//     alert("Layer " + n + " source name: " + importedComp.layer(n).source.name);
//   }
//   if (importedComp.numLayers >= 2) {
//     importedComp.layer(1).replaceSource(imageFile1, false);
//     importedComp.layer(2).replaceSource(imageFile2, false);
//   } else {
//     alert('The imported composition does not have enough layers for replacement.');
//   }
// } else {
//   alert('The imported composition is undefined.');
// }

// Assuming that you've already found the 'importedComp' as shown in your previous code

// Explore the precomps within the imported composition
if (importedComp) {
  alert("Number of layers in importedComp: " + importedComp.numLayers);
  for (var n = 1; n <= importedComp.numLayers; n++) {
    var layer = importedComp.layer(n);
    if (layer.source instanceof CompItem) { // Checking if the layer is a precomp
      var preComp = layer.source;
      alert("Found pre-comp: " + preComp.name);
      alert("Number of layers in pre-comp: " + preComp.numLayers);
      for (var o = 1; o <= preComp.numLayers; o++) {
        var preCompLayer = preComp.layer(o);
        alert("Layer " + o + " in pre-comp: Type - " + preCompLayer.source.typeName + ", Name - " + preCompLayer.source.name);

        // Assuming that you want to replace the first two layers of each precomp
        if (o == 1) {
          preCompLayer.replaceSource(imageFile1, false);
        } else if (o == 2) {
          preCompLayer.replaceSource(imageFile2, false);
        }
      }
    }
  }
}
