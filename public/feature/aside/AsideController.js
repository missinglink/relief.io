
app.controller( 'AsideController', function( $rootScope, $scope, $location, Firebase, safeApply, MapService ) {

  var firebase = Firebase.host;
  var dbRecord;

  $scope.marker = {};
  $scope.poi = { id: '', title: '', description: '' };
  $scope.isDraggable = false;

  var readPoiFromDb = function( nameSnapshot ){
    var val = nameSnapshot.val();
    if( val ){
      safeApply( $scope, function(){
        $scope.poi = val;
        console.log( 'read', $scope.poi );
        if( $scope.poi ){
          $scope.poi.id = $scope.poi.id;
        }
      });
    }
  }

  var writePoiToDb = function( poi ){
    console.log( 'write', poi );
    dbRecord.set( poi );
  }

  var fbConnect = function( key ){
    console.log( 'connect', key );
    if( dbRecord ) dbRecord.off( 'value', readPoiFromDb );
    dbRecord = firebase.child(key);
    dbRecord.on('value', readPoiFromDb );
  }

  fbConnect( 'tmp' );

  $rootScope.$on( 'poi:select', function( event, id ){

    safeApply( $scope, function(){

      fbConnect( 'poi/' + id );

      $scope.marker = MapService.findMarker( id );
      if( $scope.marker ){
        $scope.isDraggable = $scope.marker.options.draggable;
      }
      
      $scope.poi.id = id;
    });
    // console.log( 'poi', $scope.poi );
    console.log( 'select', id );
  });

  $scope.draggable = function( bool ){
    $scope.isDraggable = bool;
    $rootScope.$emit( 'poi:draggable', $scope.poi.id, bool );
  }

  $scope.save = function(){
    $rootScope.$emit( 'poi:draggable', $scope.poi.id, false );
    $rootScope.$emit( 'poi:update', $scope.poi, false );
    writePoiToDb( $scope.poi );
  }

});