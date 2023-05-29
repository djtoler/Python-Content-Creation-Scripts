var comp = app.project.activeItem;

if (comp != null && (comp instanceof CompItem)){
    for (var i = 1; i <= comp.numLayers; i++){
        var layer = comp.layer(i);
        if (layer.source.name == "jpvid.mp4") { // Check if the layer is the video you want
            // Add an expression to the Position property of the layer to create a shake effect
            var freq = 3; // Frequency of the shake
            var amp = 25; // Amplitude of the shake
            var shakeExpression = 'freq = '+freq+'; amp = '+amp+'; wiggle(freq, amp)';
            layer.property("Position").expression = shakeExpression;
        }
    }
}
