var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var five = require("johnny-five");
var raspi = require("raspi-io");

var board = new five.Board({io: new raspi()});
var led;

board.on("ready", function() {

  led = new five.Led("P1-13");

  // Create a new `motion` hardware instance.
  var motion = new five.Motion(7);

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated");
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motionstart");
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motionend");
  });

});

//APP CONFIGURATION
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

var apiRouter = express.Router();

apiRouter.route('/leds').post(function (req, res) {

        let value = req.body.active;

        console.log("led value: " + req.body.active);

        var message = (value == "1"
            ? 'turn On Led'
            : 'turn Off Led');


	if(value == "1")
	{ 
		//led.on();
		led.blink(500); 
	} 
	else 
	{
		led.stop();
		led.off();
	}

        res.json({success: true, message: 'from the server: '+message});
    });

apiRouter.route('/sensors').post(function (req, res) {

        let value = req.body.active;

        console.log("sensor value: " + req.body.active);

        var message = (value == "1"
            ? 'turn On Sensor'
            : 'turn Off Sensor');

        res.json({success: true, message: message});
    });

app.use('/api', apiRouter);

app.set('port', 1010);

app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.listen(app.get('port'));

console.log("here we go");
