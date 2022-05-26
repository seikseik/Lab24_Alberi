import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import * as data from './dataset-verde-abitante.json';
import * as alberi from './alberi_p5.json';
import * as parchi from './parchi.json';

let mobile = false;
if(window.innerWidth < 900){
  mobile = true;
}

let zoom_map_one;
let zoom_map_two;
let zoom_map_three;

if(mobile){
  zoom_map_one = 2.5;
  zoom_map_two = 10.2;
  zoom_map_three = 10;
}else{
  zoom_map_one = 3.3;
  zoom_map_two = 11.2;
  zoom_map_three = 11.3;
}



// first map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
  accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
  center: [8.533621, 47.119],
  zoom: zoom_map_one,
});

map.scrollZoom.disable();
map.doubleClickZoom.disable();



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
          [0, 'rgb(255, 0, 0)'],
          [1, 'rgb(255, 168, 168)'],
          [2, 'rgb(255, 199, 84)'],
          [3, 'rgb(255, 255, 0)'],
          [4, 'rgb(209, 255, 84)'],
          [5, 'rgb(100, 168, 0)'],
          [6, 'rgb(5, 107, 71)']
        ]
      },
      'circle-radius': 6.5,
      'circle-stroke-width': 0.4,
      'circle-stroke-color': 'black'
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

  map.addControl(new mapboxgl.NavigationControl());

});



// second map
var map_due = new mapboxgl.Map({
  container: 'map_second',
  style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
  accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
  center: [9.17, 45.47],
  zoom: zoom_map_two
});

map_due.scrollZoom.disable();
map_due.doubleClickZoom.disable();

map_due.on('load', () => {

  map_due.addSource('arborea', {
    'type': 'raster',
    'url': 'mapbox://lucagorini.2s9popqr'
  });

  map_due.addSource('temperatura', {
    'type': 'raster',
    'url': 'mapbox://lucagorini.3f6bzd16'
  });


  map_due.addLayer({
    'id': 'temperatura_super',
    'source': 'temperatura',
    'type': 'raster'
  },"settlement-subdivision-label");
  map_due.addLayer({
    'id': 'copertura',
    'source': 'arborea',
    'type': 'raster'
  }, "settlement-subdivision-label");

});

map_due.on('idle', () => {
  if (!map_due.getLayer('copertura') || !map_due.getLayer('temperatura_super')) {
    return;
  }
  const toggleableLayerIds = ['copertura'];

  for (const id of toggleableLayerIds) {
    if (document.getElementById(id)) {
      continue;
    }

    const link = document.createElement('a');
    link.id = id;
    link.href = '#';
    link.textContent = "";
    link.innerHTML += "<img src='./images/content/btn_alberi_on.svg' />"
    link.className = 'active';

    link.onclick = function(e) {

      const clickedLayer = this.id;

      e.preventDefault();
      e.stopPropagation();

      const visibility = map_due.getLayoutProperty(
        clickedLayer,
        'visibility'
      );


      if (visibility === 'visible' || visibility == undefined) {
        map_due.setLayoutProperty(clickedLayer, 'visibility', 'none');
        this.className = '';
        this.querySelector("img").src = './images/content/btn_alberi_off.svg';
      } else {
        this.className = 'active';
        this.querySelector("img").src = './images/content/btn_alberi_on.svg';
        map_due.setLayoutProperty(
          clickedLayer,
          'visibility',
          'visible'
        );
      }
    };

    const layers = document.getElementById('map_second');
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
  },
  'milano': {
    center: [9.1815, 45.4773],
    zoom: 11.3,
    essential: true
  }
}

var map_tre = new mapboxgl.Map({
  container: 'map_third',
  style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
  accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
  center: [7.6868565, 45.070312],
  zoom: zoom_map_three
});


map_tre.scrollZoom.disable();
map_tre.doubleClickZoom.disable();

map_tre.on('load', () => {

  map_tre.addSource('alberi', {
    type: 'geojson',
    data: alberi
  });

  map_tre.addLayer({
    'id': 'albero',
    'type': 'circle',
    'source': 'alberi',
    'paint': {
      'circle-color': "green",
      'circle-radius': 1.5,
    }
  }, "settlement-subdivision-label");


  map_tre.addSource('parchi', {
    type: 'geojson',
    data: parchi
  });

  map_tre.addLayer({
    'id': 'parchi',
    'type': 'line',
    'source': 'parchi',
    'paint': {
    'line-color': 'green',
    'line-width': 1
    }
  }, "settlement-subdivision-label");

  map_tre.addControl(new mapboxgl.NavigationControl());


  let tabs = document.querySelectorAll(".tablinks");

    tabs.forEach((item, i) => {
      item.addEventListener("click", function(e){
        let città = item.getAttribute("city")
        openCity(e, città)
        if(mobile){
          map_tre.jumpTo(chapters[città])
        }else{
          map_tre.flyTo(chapters[città])
        }
      })
    });

});


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
