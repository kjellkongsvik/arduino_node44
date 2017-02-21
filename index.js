var five = require("johnny-five");
var snapshot = require("./snapshot.js");

var board = new five.Board({
		repl: false,
		debug: false
	});
	
var temp_count = 0;
var temp = 0;
	
board.on("ready", function() {
	console.log("Brettet e klart!");
	var led = new five.Led(9);
	var l1 = new five.Led(2);
	var l2 = new five.Led(3);
	//var temp = new five.Thermometer({
	//	controller: "DS18B20",
	//	pin: 2
	//});
	var motion = new five.Motion(8);
	var proximity = new five.Proximity({
		controller: "HCSR04",
		pin: 4,
		freq: 100
	})
	var knapp = 0;
	photoresistor = new five.Sensor({
		pin: "A0",
		freq: 1000
	});



	//proximity.on("change", function() {
    //console.log("The obstruction has moved.");
	//});
	
    //motion.on("calibrated", function() {
	//	console.log("Bevegelsessensor klar!");
	//});
	
	//motion.on("motionend", function() {
	//	console.log("Slutt på bevegelse");
	//	led.off();
	//}); 
	
	//motion.on("motionstart", function() {
	//	console.log("Noen beveget seg!");
	//	console.log("Temp: " + temp.celsius+"C");
	//	led.on();
	//	snapshot.takeSnapshot(function callback(err) {
	//		if (err) {
	//			console.log('Kan ikke ta bilde - ', err);
	//		}
	//	});
	//});

	var button = new five.Button({
		pin: 7,
		invert: false
	})
	led.off();
	
	photoresistor.on("data", function() {
		if (temp_count < 3) {
				temp += this.value;
		}
		if (temp_count == 3) {
			temp = temp/3;
		}
		temp_count += 1;
		console.log("norm: " + temp + ", Lysstyrke: ", this.value);
		if( this.value < (temp-10)) {
			knapp = 1;
		}
		if( this.value > (temp+10)) {
			knapp = 0;
		}
	});
	
	button.on("press", function() {
	
		//led.fade({
		//	easing: "outSine",
		//	duration: 1000,
		//	cuePoints: [0, 0.2, 0.4, 0.6, 0.8, 1],
		//	keyFrames: [0, 250, 25, 150, 100, 250]
        //});
		//console.log("Lys på");
		//console.log("Temp: " + temp.celsius+"C");

        //snapshot.takeSnapshot(function callback(err) {
		//	if(err) {
		//		console.log('Unable to take camera snapshot ', err);
		//	}
		//});
		
		if(knapp == 1) { 
			knapp = 0;}
		else {
			knapp = 1;
		};
		l1.on();
	    l2.on();
		
		
        
    });

	proximity.on("change", function() {
		if(knapp == 1) {
			console.log("Proximity: ", this.cm, " cm");
		}
		led.brightness(this.cm);
	});


    button.on("release", function() {
	    led.fade(0,500);
	    l1.off();
	    l2.off();
	    //console.log("Lys av");
		//proximity.off();
		//knapp = 0;
    });
    
   
    
    
});
