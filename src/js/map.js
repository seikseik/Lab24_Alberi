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
      'id': "classifica-custom",
      'type': 'circle',
      'source': 'classifica',
      'layout': {
          'visibility': 'visible',
      },
      'paint': {
          'circle-radius': {
              'base': 5,
              'stops': [[12, 12], [22, 12]]
          },

          'circle-color': {
            'property': 'VALUE',
            'type': 'exponential',
            'stops': [
                [0, 'rgb(236,222,239)'],
                [10, 'rgb(236,222,239)'],
                [20, 'rgb(208,209,230)'],
                [30, 'rgb(166,189,219)'],
                [40, 'rgb(103,169,207)'],
                [50, 'rgb(28,144,153)'],
                [108, 'rgb(1,108,89)']
              ]
            },
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': 0,
          'circle-stroke-opacity': 0,
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
