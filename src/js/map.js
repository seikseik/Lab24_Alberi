import mapboxgl from '!mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/lucagorini/cl2t3c0k1000314npzj6k6lgj',
    accessToken: 'pk.eyJ1IjoibHVjYWdvcmluaSIsImEiOiJja28yd2tzdjQxM3NqMnFwZ3BremZ2Y3hrIn0.TOK_D8r2LULbVb-3ULVf8Q',
    center:[8.533621, 47.119] ,
    zoom: 4
});

map.scrollZoom.disable();
