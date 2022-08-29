import * as React from 'react';
import Box from '@mui/material/Box';
import mapboxgl from 'mapbox-gl'
import maplibregl, { Marker } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Button, TextareaAutosize, TextField, Slider, ButtonGroup } from '@mui/material';

export default function Map() {
  const [state, setState] = React.useState({
    left: false,
  });
  const mapContainerRef = React.useRef(null);
  const [lng, setLng] = React.useState(5);
  const [lat, setLat] = React.useState(34);
  const [zoom, setZoom] = React.useState(1.5);
  const [ApiEq, SetApiEq] = React.useState([])
  const [AboutMap, SetAboutMap] = React.useState(null)

  const key = 'pk.eyJ1Ijoid29uZGVyd2Vpc3M0MiIsImEiOiJja3g5dm5naHUwamplMnhwZnQwZ2ZzMjBxIn0.ro_kqsU5HkpiWWFbkiR7cg'

  React.useEffect(() => {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
      .then(res => res.json())
      .then(data => SetApiEq(data.features))
      .catch(error => console.log(error))


  }, [])


  mapboxgl.accessToken = 'pk.eyJ1Ijoid29uZGVyd2Vpc3M0MiIsImEiOiJja3g5dm5naHUwamplMnhwZnQwZ2ZzMjBxIn0.ro_kqsU5HkpiWWFbkiR7cg'
  React.useEffect(() => {
    const map: any = new maplibregl.Map({
      container: 'map',
      style: 'https://v2k-dev.vallarismaps.com/core/api/styles/1.0-beta/styles/61d659bd82ef1e656bbea2d6?api_key=dGgoQEO9tOQOMCBUVz8h2ug3HjcPP5aZnR34ix94EBjLCfknDIX0QIV7eMLqMbz7',
      center: [6.055737, 46.233226],
      zoom: 5
    });
    SetAboutMap(map);



    map.on('load', async function () {

      const fetchAPI = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
        .then(res => res.json())
        .then(data => {
          return data.features ? data.features : []
        }
        )
        .catch(error => console.log(error))



      map.addSource('earthquake', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features':
            // fetchAPI
            []
        }

      })
      map.addLayer({
        'id': 'earthquake',
        'type': 'circle',
        'source': 'earthquake',
        'paint': {
          'circle-radius': 12,
          'circle-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            'red', 'green'
          ]

        },
        'filter': ['==', '$type', 'Point']

      })

    });

    var popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false
    });




    map.on('mousemove', 'earthquake', function (e: any) {

      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties
      var idcode = e.features[0].properties.code
      while (Math.abs(e.lngLat.lng - description[0]) > 180) {
        description[0] += e.lngLat.lng > description[0] ? 360 : -360;
      }
      popup
        .setLngLat(coordinates)
        .setHTML(`<h1>Magnitude : ${description.mag}</h1> \n <h2>Location : ${description.place}<h2>`)
        .addTo(map);
      map.setFeatureState(
        { source: 'earthquake', id: idcode },
        { hover: false }
      )
    });

    // map.on('idle', () => {
    //   // If these two layers were not added to the map, abort
    //   if (!map.getLayer('earthquake') || !map.getLayer('Ports')) {
    //     return;
    //   }

    //   // Enumerate ids of the layers.
    //   const toggleableLayerIds = ['earthquake', 'Ports'];

    //   // Set up the corresponding toggle button for each layer.
    //   for (const id of toggleableLayerIds) {
    //     // Skip layers that already have a button set up.
    //     if (document.getElementById(id)) {
    //       continue;
    //     }

    //     // Create a link.
    //     const link = document.createElement('a');
    //     link.id = id;
    //     link.href = '#';
    //     link.textContent = id;
    //     link.className = 'active';

    //     // Show or hide layer when the toggle is clicked.
    //     link.onclick = function (e) {
    //       const clickedLayer = this.textContent;
    //       e.preventDefault();
    //       e.stopPropagation();

    //       const visibility = map.getLayoutProperty(
    //         clickedLayer,
    //         'visibility'
    //       );

    //       // Toggle layer visibility by changing the layout object's visibility property.
    //       if (visibility === 'visible') {
    //         map.setLayoutProperty(clickedLayer, 'visibility', 'none');
    //         this.className = '';
    //       } else {
    //         this.className = 'active';
    //         map.setLayoutProperty(
    //           clickedLayer,
    //           'visibility',
    //           'visible'
    //         );
    //       }
    //     };

    //     const layers = document.getElementById('menu');
    //     layers.appendChild(link);
    //   }
    // });





    map.on('mouseenter', 'earthquake' && 'Ports', function () {
      map.getCanvas().style.cursor = 'pointer';

    });


    // map.on('mouseleave', 'earthquake', function () {
    //   map.getCanvas().style.cursor = '';
    // });

    map.on('mouseleave', 'earthquake' && 'Ports', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });

    return () => map.remove();
  }, []);

  const buttons = [
    <Button key="one" sx={{
      height:40,
    }}>+</Button>,
    <Button key="two">-</Button>
  ];


  return (
    <div>
      <div id="menu"></div>
      <Box
        className='map-container'
        id='map'
        sx={{
          visibility: 'visible',
          right: 0,
          height: '100vh',
          width: '100vw',
          position: 'absolute'
        }}
      >
      </Box>
      <Button
        onClick={() => (console.log(AboutMap))}
        sx={{

          bgcolor: 'black',
          color: 'white',
          position: 'absolute',
          top: 0,
          right: 90,
          height: 50,
          width: 'auto',
        }}
      >
        Click
      </Button>
      <Box
        sx={{
          position:'absolute',
          top:0,
          right:0
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical contained button group"
          variant="contained"
      >
          {buttons}
        </ButtonGroup>
      </Box>


    </div >
  );
}