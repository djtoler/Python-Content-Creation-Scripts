// Get the first layer in the active composition
let myLayer = app.project.activeItem.layer(1);

// Add the 'Fast Blur' effect to the layer (this must match exactly the name of the effect in After Effects)
let myEffect = myLayer.Effects.addProperty("Fast Box Blur");

// Set the 'Blurriness' property of the 'Fast Box Blur' effect (property index may consty)
myEffect.property(1).setValue(80);

// for (var i = myLayer.Effects.numProperties; i > 0; i--) {
//     myLayer.Effects.property(i).remove();
// }