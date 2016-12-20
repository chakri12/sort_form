app.factory('dataService', function($http,$q) {
	return {

		getData: function(url){
            var deferred = $q.defer();
            $http.get(url).
             success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(status);
            });       
            return deferred.promise;
        },

    	getCoords: function() {
    		var deferred = $q.defer();
    		var coordsDefault = {
    			lat: 50.4501,
    			lng: 30.5234
    		}

    		if('geolocation' in navigator) {
    			navigator.geolocation.getCurrentPosition(function success(position){
    				var coords = {
    					lat: position.coords.latitude,
    					lng: position.coords.longitude
    				}
    				deferred.resolve(coords);
    			}, 
    			function error(){
    				deferred.resolve(coordsDefault);
    			});
    		} else {
    			deferred.resolve(coordsDefault);
    		}
    		return deferred.promise;
    	}, // getCoords

    getDistance(baseCoords, remoteCoords) {            // google map api for get distance
    	var p1 = new google.maps.LatLng(baseCoords.lat, baseCoords.lng);
		var p2 = new google.maps.LatLng(remoteCoords.lat, baseCoords.lng);
        var dist = (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(1);
        return dist;
   		},

    addUser(data,container) {
        container.push(data);
        $("#add_modal").modal('hide');
        }    

    } //return	
});	
