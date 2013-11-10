
app.controller( 'AsideController', function( $scope, $location ) {

  $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
  };

});