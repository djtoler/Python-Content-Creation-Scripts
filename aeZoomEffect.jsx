// Assuming you are using Adobe After Effects scripting

var comp = app.project.activeItem;

if (comp != null && (comp instanceof CompItem)){
    for (var i = 1; i <= comp.numLayers; i++){
        var layer = comp.layer(i);
        if (layer.source.name == "jpvid.mp4") { // Check if the layer is the video you want
            // Set the zoom effect properties
            var zoomPeriod = 5; // The period of the zoom effect (in seconds)
            var zoomAmount = 10; // The amount to zoom in each time (in percent)
            
            // Add an expression to the Scale property of the layer to create a zoom effect
            var zoomExpression = 'zoomPeriod = '+zoomPeriod+'; zoomAmount = '+zoomAmount+'; [value[0] + zoomAmount * Math.sin(time * 2 * Math.PI / zoomPeriod), value[1] + zoomAmount * Math.sin(time * 2 * Math.PI / zoomPeriod)]';
            layer.property("Scale").expression = zoomExpression;
        }
    }
}

// Save the project after applying the effect
app.project.save();
