
app.config( function( $routeProvider ) {
  $routeProvider
    .when( '/map', {
      controller: 'MapIndexController',
      templateUrl: '/feature/map/index.html'
    })
});

app.factory( 'MapService', function( $rootScope ) {

  var map = L.map( 'map', { zoomControl:false, attributionControl:false } );
  L.tileLayer.provider('Nokia.terrainDay', {
    devID: 'pT52rESblK2luN6D0562LQ',
    appId: 'yKqVsh6qFoKdZQmFP2Cn'
  }).addTo( map );

  L.control.mousePosition().addTo( map );

  // Center map
  map.setView( [ 12.46876, 125.698438 ], 6 );

  var findMarker = function( id ){
    if( !id ) return;
    for( var k in map._layers ){
      var layer = map._layers[k];
      if( layer && layer._icon &&
          layer.options && layer.options.id &&
          layer.options.id === id ){
        return layer;
      }
    }
  }

  var updateMarker = function( poi, isNew ){

    var marker = findMarker( poi.id );
    if( !marker ){
      marker = new L.marker( poi.geo, { id:poi._id, draggable: isNew || false } );
      marker.on('dragend', function(event){
        poi.geo = event.target.getLatLng();
        $rootScope.$emit( 'poi:update', poi );
      });
      marker.on('click', function(event){
        $rootScope.$emit( 'poi:select', poi._id );
      });
      map.addLayer( marker );
    }

    marker.options.title = poi.title;

    var icon = L.AwesomeMarkers.icon({
      icon: poi.icon || 'dot-circle-o',
      markerColor: poi.color || 'blue'
    });

    marker.setLatLng( poi.geo );
    marker.setIcon( icon );

    return poi;
  }

  return {
    map: map,
    findMarker: findMarker,
    updateMarker: updateMarker
  }
});