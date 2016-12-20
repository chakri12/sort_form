
var app = angular.module('sort_form', []);

app.controller('MaintCtrl', function($scope, dataService){
	this.url = 'http://jsonplaceholder.typicode.com/users';
	$scope.getDist = dataService.getDistance;  
	$scope.addUser = function(data){
		console.log($scope.data);
		$scope.data.push(data);
		$("#add_modal").modal('hide');
	};

	var dataPromise = dataService.getData(this.url);
	var coordPromise = dataService.getCoords();
	coordPromise.then(function(res){$scope.coords = res});
	dataPromise.then(function(res){$scope.data = res});
});





