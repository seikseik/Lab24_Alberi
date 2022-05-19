import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// import * as data from './dataset-verde-abitante.json';
// import * as alberi from './alberi_p5.json';


// first map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
  accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
  center: [8.533621, 47.119],
  zoom: 3.3
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
          [0, 'rgb(217, 128, 31)'],
          [1, 'rgb(199, 134, 30)'],
          [2, 'rgb(182, 140, 30)'],
          [3, 'rgb(147, 153, 29)'],
          [4, 'rgb(112, 166, 28)'],
          [5, 'rgb(77, 179, 27)'],
          [6, 'rgb(43, 192, 27)']
        ]
      },
      'circle-radius': 6.5,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#ffffff'
    }
  }, "country-label");

  map.on('click', function(e) {

    var features = map.queryRenderedFeatures([e.point.x, e.point.y], {
      layers: ["circle"]
    });

    if (features != null) {
      var feature = features[0];
      var popup = new mapboxgl.Popup({
          offset: [0, -15]
        })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.TOOLTIP)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
    }
  });

});



// second map

var map_due = new mapboxgl.Map({
  container: 'map_second',
  style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
  accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
  center: [9.17, 45.47],
  zoom: 11.2
});

map_due.scrollZoom.disable();

map_due.on('load', () => {

  map_due.addSource('arborea', {
    'type': 'raster',
    'url': 'mapbox://lucagorini.8ln15ca6'
  });

  map_due.addSource('temperatura', {
    'type': 'raster',
    'url': 'mapbox://lucagorini.3eez86i1'
  });


  map_due.addLayer({
    'id': 'temperatura_super',
    'source': 'temperatura',
    'type': 'raster'
  },"country-label");
  map_due.addLayer({
    'id': 'copertura',
    'source': 'arborea',
    'type': 'raster'
  }, "country-label");

});

map_due.on('idle', () => {
  if (!map_due.getLayer('copertura') || !map_due.getLayer('temperatura_super')) {
    return;
  }
  const toggleableLayerIds = ['temperatura_super', 'copertura'];

  for (const id of toggleableLayerIds) {
    if (document.getElementById(id)) {
      continue;
    }

    const link = document.createElement('a');
    link.id = id;
    link.href = '#';
    link.textContent = id;
    link.className = 'active';

    link.onclick = function(e) {
      const clickedLayer = this.textContent;
      e.preventDefault();
      e.stopPropagation();

      const visibility = map_due.getLayoutProperty(
        clickedLayer,
        'visibility'
      );
      if (visibility === 'visible') {
        map_due.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
      } else {
        this.className = 'active';
        map_due.setLayoutProperty(
          clickedLayer,
          'visibility',
          'visible'
        );
      }
    };

    const layers = document.getElementById('menu');
    layers.appendChild(link);
  }
});




// THIRD MAP

const chapters = {
  'roma': {
    center: [12.496, 41.90278],
    zoom: 11.3,
    essential: true
  },
  'napoli': {
    center: [14.2681244, 40.8517746],
    zoom: 11.4,
    essential: true
  },
  'bologna': {
    center: [11.3426163, 44.494887],
    zoom: 11.3,
    essential: true
  },
  'torino': {
    center: [7.6868565, 45.070312],
    zoom: 11.3,
    essential: true
  }
}

// var map_tre = new mapboxgl.Map({
//   container: 'map_third',
//   style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
//   accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
//   center: [12.496, 41.90278],
//   zoom: 11.3
// });
//
// map_tre.scrollZoom.disable();


// map_tre.scrollZoom.disable();

// map_tre.on('load', () => {
//
//   map_tre.addSource('alberi', {
//     type: 'geojson',
//     data: alberi
//   });
//
//   map_tre.addLayer({
//     'id': 'albero',
//     'type': 'circle',
//     'source': 'alberi',
//     'paint': {
//       'circle-color': "green",
//       'circle-radius': 1.5,
//     }
//   }, "country-label");
//
//
//   let tabs = document.querySelectorAll(".tablinks");
//
//     tabs.forEach((item, i) => {
//       item.addEventListener("click", function(e){
//         let città = item.getAttribute("city")
//         openCity(e, città)
//         map_tre.flyTo(chapters[città])
//       })
//     });
//
// });


// tabs
function openCity(evt, cityName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}
