
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/help', {
      controller: 'HelpIndexController',
      templateUrl: '/feature/help/index.html'
    })
});

app.factory( 'HelpService', function() {
  return function(){
    //this is a service
  }
});