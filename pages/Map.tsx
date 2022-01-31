import * as React from 'react';
import Box from '@mui/material/Box';
import mapboxgl from 'mapbox-gl'
import maplibregl, { Marker } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'



export default function Map() {
  const [state, setState] = React.useState({
    left: false,
  });
  const mapContainerRef = React.useRef(null);
  const [lng, setLng] = React.useState(5);
  const [lat, setLat] = React.useState(34);
  const [zoom, setZoom] = React.useState(1.5);
  const [ApiEq, SetApiEq] = React.useState([])

  const key = 'pk.eyJ1Ijoid29uZGVyd2Vpc3M0MiIsImEiOiJja3g5dm5naHUwamplMnhwZnQwZ2ZzMjBxIn0.ro_kqsU5HkpiWWFbkiR7cg'

  // React.useEffect(() => {
  //  fetch('https://api.idemc.org/tsunami/v1/',{
  //  method:'POST' ,

  // }).then(response => response.json())
  // .then(data => {
  //   console.log('Success:', data);
  // })
  // }, [])

  React.useEffect(() => {
    fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
      .then(res => res.json())
      .then(data => SetApiEq(data.features))
      .catch(error => console.log(error))


  }, [])

  
  // React.useEffect(() => {
  //   const step = ApiEq
  //   for(const i of step){
  //   console.log(step);
  // }
  // }, [])

  mapboxgl.accessToken = 'pk.eyJ1Ijoid29uZGVyd2Vpc3M0MiIsImEiOiJja3g5dm5naHUwamplMnhwZnQwZ2ZzMjBxIn0.ro_kqsU5HkpiWWFbkiR7cg'
  React.useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://v2k-dev.vallarismaps.com/core/api/styles/1.0-beta/styles/61d659bd82ef1e656bbea2d6?api_key=dGgoQEO9tOQOMCBUVz8h2ug3HjcPP5aZnR34ix94EBjLCfknDIX0QIV7eMLqMbz7',
      center: [-121.403732, 40.492392],
      zoom: 1
    });


    // fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
    //   .then(res => res.json())
    //   .then(data => SetApiEq(data.features))
    //   .catch(error => console.log(error))



    //   fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson')
    //   .then(res => res.json())
    //   .then(data => {console.log('success' ,data); 
    //   })
    //   .catch(error => console.log(error))



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
            fetchAPI


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
       


    map.on('mousemove', 'earthquake', function (e) {


      // var coordinates = ApiEq
      // var description = ApiEq[0].geometry.coordinates.slice();
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties
      var idcode = e.features[0].properties.code
      
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

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



    map.on('click', 'earthquake', function () {

    })


    map.on('mouseenter', 'earthquake', function () {
      map.getCanvas().style.cursor = 'pointer';

    });

    // map.on('mouseleave', 'earthquake', function () {
    //   map.getCanvas().style.cursor = '';
    // });

    map.on('mouseleave', 'earthquake', function () {
      map.getCanvas().style.cursor = '';
      popup.remove();
      });

    return () => map.remove();
  }, []);

  return (
    <div>


      <Box
        className='map-container'
        ref={mapContainerRef}
        sx={{
          visibility: 'visible',
          right: 0,
          height: '100vh',
          width: '100vw',
          position: 'absolute'
        }}
      >
      </Box>


    </div>
  );
}