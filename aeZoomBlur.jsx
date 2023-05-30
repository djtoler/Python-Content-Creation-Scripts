// Import the photo file into the project
var photoImportOptions = new ImportOptions(new File("./durk.png"));
var photoFile = project.importFile(photoImportOptions);

// Add the photo to the composition
var photoLayer = comp.layers.add(photoFile);

// Set the photo layer to start 10 seconds into the composition and last for 3.5 seconds.
photoLayer.startTime = 10;
photoLayer.outPoint = 13.5;

// Create an adjustment layer for the transition in.
var adjustmentLayerIn = comp.layers.addSolid([0, 0, 0], "Adjustment Layer In", compWidth, compHeight, pixelAspect, duration);
adjustmentLayerIn.adjustmentLayer = true;
adjustmentLayerIn.startTime = 9.5;
adjustmentLayerIn.outPoint = 10.5;

// Add the 'Transform' effect to the adjustment layer.
var myEffectIn = adjustmentLayerIn.property("ADBE Effect Parade").addProperty("ADBE Geometry2");

// Set keyframes for the scale property of the Transform effect.
myEffectIn.property("Scale").setValueAtTime(9.5, 100);
myEffectIn.property("Scale").setValueAtTime(10, 300);
myEffectIn.property("Scale").setValueAtTime(10.5, 100);

// Add a 'Gaussian Blur' effect to the adjustment layer.
myEffectIn = adjustmentLayerIn.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");

// Set keyframes for the blurriness property of the Gaussian Blur effect.
myEffectIn.property("Blurriness").setValueAtTime(9.5, 0);
myEffectIn.property("Blurriness").setValueAtTime(10, 100);
myEffectIn.property("Blurriness").setValueAtTime(10.5, 0);

// Create a second adjustment layer for the transition out.
var adjustmentLayerOut = comp.layers.addSolid([0, 0, 0], "Adjustment Layer Out", compWidth, compHeight, pixelAspect, duration);
adjustmentLayerOut.adjustmentLayer = true;
adjustmentLayerOut.startTime = 13;
adjustmentLayerOut.outPoint = 13.5;

// Add the 'Transform' effect to the second adjustment layer.
var myEffectOut = adjustmentLayerOut.property("ADBE Effect Parade").addProperty("ADBE Geometry2");

// Set keyframes for the scale property of the Transform effect.
myEffectOut.property("Scale").setValueAtTime(13, 100);
myEffectOut.property("Scale").setValueAtTime(13.25, 300);
myEffectOut.property("Scale").setValueAtTime(13.5, 100);

// Add a 'Gaussian Blur' effect to the second adjustment layer.
myEffectOut = adjustmentLayerOut.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");

// Set keyframes for the blurriness property of the Gaussian Blur effect.
myEffectOut.property("Blurriness").setValueAtTime(13, 0);
myEffectOut.property("Blurriness").setValueAtTime(13.25, 100);
myEffectOut.property("Blurriness").setValueAtTime(13.5, 0);
