angular
    .module('applicationModule.homeCtrl', [])
    .controller('homeCtrl', function ($location, sensorService) {
        var vm = this;
        vm.ledTurnOn = function () {

            sensorService
                .triggerLed("1")
                .then(function (response) {
                    alert(response.message);
                }, function (response) {});
        };

        vm.ledTurnOff = function (username, password) {
            sensorService
                .triggerLed("0")
                .then(function (response) {
                    alert(response.message);
                }, function (response) {});
        };

        vm.sensorTurnOn = function () {

            sensorService
                .triggerSensor("1")
                .then(function (response) {
                    alert(response.message);
                }, function (response) {});
        };

        vm.sensorTurnOff = function (username, password) {
            sensorService
                .triggerSensor("0")
                .then(function (response) {
                    alert(response.message);
                }, function (response) {});
        };

    });
