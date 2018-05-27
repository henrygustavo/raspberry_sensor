var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

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

        res.json({success: true, message: message});
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
