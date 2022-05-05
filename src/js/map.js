import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as data from './dataset-verde-abitante.json';


// first map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
    accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
    center:[8.533621, 47.119] ,
    zoom: 4
});

map.scrollZoom.disable();



map.on("load", function() {

  map.addSource('classifica', {
    type: 'geojson',
    data: data,
  });

  map.addLayer({
  'id': 'circle',
  'type': 'circle',
  'source': 'classifica',
  'paint': {
    'circle-color': {
        'property': 'VALUE',
        'type': 'exponential',
        'stops': [
            [0, 'rgb(236,222,239)'],
            [1, 'rgb(236,222,239)'],
            [2, 'rgb(208,209,230)'],
            [3, 'rgb(166,189,219)'],
            [4, 'rgb(103,169,207)'],
            [5, 'rgb(28,144,153)'],
            [6, 'rgb(1,108,89)']
          ]
        },
  'circle-radius': 8,
  'circle-stroke-width': 2,
  'circle-stroke-color': '#ffffff'
    }
  });

  map.on('click', function(e) {


    var features = map.queryRenderedFeatures([e.point.x, e.point.y ], {
        layers: ["circle"]
    });

    if(features != null){
        var feature = features[0];
        var popup = new mapboxgl.Popup({ offset: [0, -15] })
          .setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.TOOLTIP)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map);
      }
  });

});


var map_due = new mapboxgl.Map({
    container: 'map_second',
    style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
    accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
    center:[8.533621, 47.119] ,
    zoom: 4
});

map_due.scrollZoom.disable();


var map_tre = new mapboxgl.Map({
    container: 'map_third',
    style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
    accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
    center:[8.533621, 47.119] ,
    zoom: 4
});

map_tre.scrollZoom.disable();
