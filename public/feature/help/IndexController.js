app.controller( 'HelpIndexController', function( $scope ) {
  $scope.needsData = [
		{name: 'Medical', value: false},
		{name: 'Food', value: false},
		{name: 'Water', value: false},
		{name: 'Shelter', value: false},
		{name: 'Volunteer', value: false}
	];
	
	$scope.save = function () {
		var name = $scope.namequery,
			adress = $scope.adressquery,
			needs = [];
			
		$scope.needsData.forEach(function(item) {
			if (item.value) {
				needs.push(item.name);
			}
		});
		// TODO :: do something with name, adress and needs - POST To?
	}
	
	$scope.changeCheck = function (item) {
		(item.value) ? item.value = false : item.value = true
	}
	
});