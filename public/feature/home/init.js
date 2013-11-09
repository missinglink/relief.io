
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/', {
      controller: 'HomeIndexController',
      templateUrl: '/feature/home/index.html'
    })
	.otherwise({ redirectTo: '/' });
});