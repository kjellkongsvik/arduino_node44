var five = require("johnny-five")

var board = new five.Board({
		repl: false,
		debug: false
	});
	
	
board.on("ready", function() {
	console.log("Brettet e klart!");
    var led_status = 0;
	var led = new five.Led(9);
	var button = new five.Button({
		pin: 7,
		invert: true
	})
	led.off();
	led_status = 0;
	
	button.on("press", function() {
	
        led.fade({
        easing: "outSine",
        duration: 1000,
        cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
        keyFrames: [0, 250, 25, 150, 100, 250],
        onstop: function() {
            console.log("Lys på");
        }
        });
        led_status = 255;
    });

    button.on("release", function() {
	    led.fade(0,500);
	    console.log("Lys av");
        led_status = 0;

    });
});
