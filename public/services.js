
// -- Generic Services --

app.factory( 'Firebase', function( $rootScope ) {

  var firebase = new Firebase( $rootScope.config['firebase.host'] );
  return { host: firebase };

});

app.factory( 'PoiService', function( $http ) {

  var save = function( poi, cb ){
    $http.post( '/poi', poi ).then( cb, cb );
  }

  var loadAll = function( cb ){
    $http.get( '/poi' ).then( cb, cb );
  }

  return {
    save: save,
    loadAll: loadAll
  }
});

app.factory( 'safeApply', function() {
  return function($scope, fn) {
    var phase = $scope.$root.$$phase;
    if(phase == '$apply' || phase == '$digest') {
      if(fn && (typeof(fn) === 'function')) {
        fn();
      }
    } else {
      $scope.$apply(fn);
    }
  }
});