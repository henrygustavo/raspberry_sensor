angular.module('applicationModule.sensorService', [])
    .service('sensorService', function($http, $q, $filter) {

        this.triggerLed = function(value) {
            var deferred = $q.defer();

            $http.post("/api/leds/", {'active':value})
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

        this.triggerSensor = function(value) {
            var deferred = $q.defer();

            $http.post("/api/sensors/", {'active':value})
                .success(function(response) {
                    deferred.resolve(response);
                })
                .error(function(response) {
                    deferred.reject(response);
                });

            return deferred.promise;
        };

    });
