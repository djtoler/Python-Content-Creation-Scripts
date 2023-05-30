// Assuming you are using Adobe After Effects scripting

var comp = app.project.activeItem;

if (comp != null && (comp instanceof CompItem)){
    for (var i = 1; i <= comp.numLayers; i++){
        var layer = comp.layer(i);
        if (layer.source.name == "jpvid.mp4") { // Check if the layer is the video you want
            // Create a new "zoom controller" layer above the video layer
            var zoomController = comp.layers.addNull();
            zoomController.moveBefore(layer);

            // Set the video layer to be a child of the "zoom controller" layer
            layer.parent = zoomController;

            // Set the anchor point of the "zoom controller" layer to be the zoom center
            var zoomCenter = [270, 480]; // The center point of the zoom (in composition coordinates)
            zoomController.property("Anchor Point").setValue(zoomCenter);

            // Set the zoom effect properties
            var zoomStartTime = 1; // The time at which to start the zoom (in seconds)
            var zoomEndTime = 2; // The time at which to end the zoom (in seconds)
            var zoomAmount = 120; // The amount to zoom in (in percent)
            alert('before zoom expression')
            // Add an expression to the Scale property of the "zoom controller" layer to create a zoom effect
            var zoomScaleExpression = 'zoomStartTime = '+zoomStartTime+'; zoomEndTime = '+zoomEndTime+'; zoomAmount = '+zoomAmount+'; [time < zoomStartTime ? value[0] : time < zoomEndTime ? value[0] + (zoomAmount - 100) : value[0], time < zoomStartTime ? value[1] : time < zoomEndTime ? value[1] + (zoomAmount - 100) : value[1]]';
            zoomController.property("Scale").expression = zoomScaleExpression;
            alert('after zoom expression')
        }
    }
}

// Save the project after applying the effect
app.project.save();
