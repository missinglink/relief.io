
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/home', {
      controller: 'HomeIndexController',
      templateUrl: '/feature/home/index.html'
    })
	.otherwise({ redirectTo: '/map' });
});