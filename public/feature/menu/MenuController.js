
app.controller( 'MenuController', function( $rootScope, $scope, $location ) {

  $scope.isActive = function (viewLocation) { 
      return viewLocation === $location.path();
  };

  $scope.newPoi = function(){
    $rootScope.$emit( 'poi:new' );
  }

});