
app.controller( 'MapIndexController', function( $scope ) {

  $scope.map = L.map('map');

	L.tileLayer.provider('Nokia.terrainDay', {
	  devID: 'pT52rESblK2luN6D0562LQ',
	  appId: 'yKqVsh6qFoKdZQmFP2Cn'
	}).addTo($scope.map);

  $scope.map.setView( [ 11.609193,123.398438 ], 5 );

});