let counter = 0;

$(document).ready( function() {

    $("#about-btn").click( function(event) {
        counter++;
        $("#changer").html("Counter: " + counter);
    });
});