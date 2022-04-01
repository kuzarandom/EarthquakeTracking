import * as React from 'react';
import Box from '@mui/material/Box';
import mapboxgl from 'mapbox-gl'
import maplibregl, { Marker } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Button, TextareaAutosize, TextField, Slider, ButtonGroup, Typography, Stack, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LayersIcon from '@mui/icons-material/Layers';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FeedIcon from '@mui/icons-material/Feed';
import moment from 'moment';
import addWeeks from 'date-fns/addWeeks';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { DesktopDateTimePicker } from '@mui/lab';
import Legend from './legendCard'
import Divider from '@mui/material/Divider';
import ViewListIcon from '@mui/icons-material/ViewList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';
// import Tutorial from './HowTo'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
const minDistance = 0;
import InfoIcon from '@mui/icons-material/Info';
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} TransitionComponent={Fade} placement='left-start' />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.black,
        fontSize: 18,
        width: 'auto'
    },
}));
const BootstrapTooltipImage = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} TransitionComponent={Fade} placement='top' />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
        // backgroundColor: theme.palette.common.black,
        fontSize: 18,
        width: 300,
        height: 300,
        backgroundImage: 'url(/img/compass.png)',
        backgroundSize: 300
    },
}));


function getWeeksAfter(date: any, amount: any) {
    return date ? addWeeks(date, amount) : undefined;
}

let SortStateValue: boolean = true
function SortValueState(x: boolean) {
    if (x == true) {
        // SortStateTime()
        SortStateValue = true
    } else if (x == false) {
        // SortStateMag()
        SortStateValue = false

    }
    // console.log(SortStateValue)
}
var globalSortStateTime: boolean = true
var globalSortStateMag: boolean = false
// var CheckNearby:boolean = false

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Map() {
    const [state, setState] = React.useState({
        left: false,
    });
    const mapContainerRef = React.useRef(null);
    const [lng, setLng] = React.useState(5);
    const [lat, setLat] = React.useState(34);
    const [zoom, setZoom] = React.useState(1.5);
    const [ApiEq, SetApiEq] = React.useState([])
    const [Maps, SetMaps] = React.useState<any>()
    const [Laytest, SetLaytest] = React.useState()
    const [tableBox, settableBox] = React.useState(true);
    const [OpenLayer, setOpenLayer] = React.useState(false);
    const containerRef = React.useRef(null);
    const [checked, setChecked] = React.useState(false);
    const [TxtButtonPlate, setTxtButtonPlate] = React.useState(false);
    const [TextButton, setTextButton] = React.useState(false);
    const [PropApi, SetPropApi] = React.useState([])
    const Curtime: number = new Date().getTime()
    const timenow: any = new Date(Curtime).toLocaleString()
    const lasthour = Curtime - 3600000
    const [TimeS, setTimeS] = React.useState([lasthour, Curtime])
    const [visibility, SetVisibility] = React.useState('visible')
    const [visibilityEq, SetVisibilityEq] = React.useState('visible')
    const [StyleMap, setStyleMap] = React.useState('https://v2k-dev.vallarismaps.com/core/api/styles/1.0-beta/styles/61d659bd82ef1e656bbea2d6?api_key=dGgoQEO9tOQOMCBUVz8h2ug3HjcPP5aZnR34ix94EBjLCfknDIX0QIV7eMLqMbz7');
    const key = 'pk.eyJ1Ijoid29uZGVyd2Vpc3M0MiIsImEiOiJja3g5dm5naHUwamplMnhwZnQwZ2ZzMjBxIn0.ro_kqsU5HkpiWWFbkiR7cg'
    const [valueReal, setValue] = React.useState('List');
    const [FeatureEq, setFeatureEq] = React.useState([])
    const [Highlight, setHighlight] = React.useState(false)
    const [lengthFeature, setlengthFeature] = React.useState<any>(0)
    var selectID: any = null
    var hourday = Date.now() - 90000000
    const [TimevalueStart, setTimeValueStart] = React.useState(hourday);
    const [TimevalueEnd, setTimeValueEnd] = React.useState(Date.now());
    const [IdpropDtail, setIdpropDtail] = React.useState<any>()
    const [PropDetail, setPropDetail] = React.useState<any>()
    const [DetailDepth, setDetailDepth] = React.useState<any>()
    const [Lattitude, setLattitude] = React.useState<any>()
    const [Longitude, setLongitude] = React.useState<any>()
    const [valueSort, setValueSort] = React.useState<any>('Date/Time')
    const [NearbyCity, setNearbyCity] = React.useState<any>([])
    const [CheckDetail, setCheckDetail] = React.useState<Boolean>(true)
    // const [SortStateValue, setSortStateValue] = React.useState<boolean>(true)
    const [SortMag, setSortMag] = React.useState<boolean>(false)
    const [SortDateTime, setSortDateTime] = React.useState<boolean>(false)
    // let SortDateTime:boolean = false
    var TextHeaderPlace = ""
    //เช็คแถบซ้ายและเลเยอร์

    function showLayer() {
        if (OpenLayer === false) {
            setOpenLayer(true)
            handleChange()
        } else {
            setOpenLayer(false)
            handleChange()
        }
    }

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    // let hoveredStateId: any = null;

    //ดึง api และจัดการเกี่ยวกับmap
    React.useEffect(() => {
        const map: any = new maplibregl.Map({
            container: 'map',
            style: StyleMap,
            center: [6.055737, 46.233226],
            zoom: 2
        });
        SetMaps(map);
        var hoveredStateId: any = null
        // map.doubleClickZoom.disable();
        map.setMinZoom(2);
        map.on('mouseenter', 'Earthquake', function (e: any) {
            // Change the cursor style as a UI indicator.
            map.getCanvas().style.cursor = 'pointer';
            var coordinates = e.features[0].geometry.coordinates.slice();
            var description = e.features[0].properties.title;
            var id = e.features[0].id
            var dateTime = e.features[0].properties.time
            var dateFormat = moment(dateTime).format("DD MMM YYYY hh:mm:ss a")
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        var popup = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        map.on('click', 'Earthquake', function (e: any) {
            // Change the cursor style as a UI indicator.

            var api = e.features[0].properties.detail
            fetch(api)
                .then(response => response.json())
                .then(data => data)
                .then(data => {
                    setDetailDepth(data.geometry.coordinates[2])
                    setLattitude(data.geometry.coordinates[0])
                    setLongitude(data.geometry.coordinates[1])
                    setIdpropDtail(data.properties)
                    setCheckDetail(false)
                    data.properties.products["nearby-cities"] ?
                        fetch(data.properties.products["nearby-cities"][0].contents["nearby-cities.json"].url)
                            .then(res => res.json())
                            .then(data => {
                                setNearbyCity(data)

                            })
                        : setNearbyCity([])

                })


        });

        map.on('click', function (e: any) {
            // console.log(e.features[0].geometry.coordinates[0])
            if (hoveredStateId == hoveredStateId) {
                map.removeFeatureState(
                    { source: '6204edf545cf624a03c9460b', sourceLayer: '6204edf545cf624a03c9460b' },
                    // { Focus: false }
                );
            }
            var center = map.getCenter();
            setCheckDetail(true)
            hoveredStateId = null;
            setValue('List')
            setIdpropDtail(0)
            settableBox(true)
            setNearbyCity([])
        })

        map.on('click', 'Earthquake', function (e: any) {
            // console.log(e.features[0].geometry.coordinates[0])
            const x = e.features[0].geometry.coordinates[0]
            const y = e.features[0].geometry.coordinates[1]
            map.flyTo({
                center: [x, y],
                zoom: 7,
                bearing: 0,
                speed: 1,
                curve: 2,
                easing: function (t: any) {
                    return t;
                },
                essential: true
            });
        })


        map.on('mouseenter', 'Earthquake', function () {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'Earthquake', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });



        map.on('load', function () {

            map.setFilter('Earthquake', ["all", ['>', ['get', 'time'], timeStart], ['<', ['get', 'time'], timeEnd], ['>=', ['get', 'mag'], FilterChangeMin], ['<=', ['get', 'mag'], FilterChangeMax]]);
            map.setLayoutProperty('Earthquake', 'visibility', 'visible');
        });
        map.once('load', 'Earthquake', function (e: any) {
            const features = map.queryRenderedFeatures({ layers: ['Earthquake'] });
            setFeatureEq(features.sort(function (a: any, b: any) { return parseInt(b.properties.time) - parseInt(a.properties.time) }))

        });
        map.on('movestart', () => {
            // reset features filter as the map starts moving
            // map.setFilter('Earthquake', ["all", ['>', ['get', 'time'], timeStart], ['<', ['get', 'time'], timeEnd]]);
            // map.setFilter('Earthquake', ["all", ['>', ['get', 'mag'], FilterChangeMin], ['<', ['get', 'mag'], FilterChangeMax]]);
        });

        map.on('moveend', () => {
            const features = map.queryRenderedFeatures({ layers: ['Earthquake'] });
            if (SortStateValue == true) {
                if (globalSortStateTime == false) {
                    setFeatureEq(features.sort(function (a: any, b: any) { return (a.properties.time) - (b.properties.time) }))
                } else if (globalSortStateTime == true) {
                    setFeatureEq(features.sort(function (a: any, b: any) { return (b.properties.time) - (a.properties.time) }))
                }
            } else if (SortStateValue == false) {
                if (globalSortStateMag == false) {
                    setFeatureEq(features.sort(function (a: any, b: any) { return (a.properties.mag) - (b.properties.mag) }))
                } else if (globalSortStateMag == true) {
                    setFeatureEq(features.sort(function (a: any, b: any) { return (b.properties.mag) - (a.properties.mag) }))
                }

            }
        });

        map.on('click', 'Earthquake', (e: any) => {
            // if (hoveredStateId !== null) {
            map.removeFeatureState(
                { source: e.features[0].source, sourceLayer: e.features[0].sourceLayer },
                // { Focus: false }
            );
            map.setFeatureState(
                { source: '6204edf545cf624a03c9460b', sourceLayer: '6204edf545cf624a03c9460b', id: e.features[0].id },
                { Focus: true }
            );

            hoveredStateId = e.features[0].id;

            setIdpropDtail(e.features[0].id)
            settableBox(false)
            setValue('Detail')

        });




        // map.on('dblclick', function () {
        //     if (hoveredStateId == hoveredStateId) {
        //         map.removeFeatureState(
        //             { source: '6204edf545cf624a03c9460b', sourceLayer: '6204edf545cf624a03c9460b' },
        //             // { Focus: false }
        //         );
        //     }
        //     var center = map.getCenter();
        //     map.flyTo({
        //         center: center,
        //         zoom: 2,
        //         speed: 1,
        //         curve: 2,
        //         easing(t: any) {
        //             return t;
        //         },
        //         essential: true
        //     });
        //     setCheckDetail(true)
        //     hoveredStateId = null;
        //     setValue('List')
        //     setIdpropDtail(0)
        //     settableBox(true)
        //     setNearbyCity([])
        // });




        return () => map.remove();
    }, []);

    const [CheckNearby, setCheckNearby] = React.useState<boolean>(false)


    const Nearby = NearbyCity.map((obj: { distance: any; latitude: any; longitude: any; name: any; direction: any; }) => {
        const distanceNearby = obj.distance
        let check = 1
        const nearbyLat = obj.latitude
        const nearbylng = obj.longitude
        const nearbyName = obj.name
        const directionNearby = obj.direction

        if (check = 1) {
            return <Box
            >

                <Table sx={{ minWidth: 580 }} size="small" aria-label="a dense table">
                    <TableBody>
                        <TableRow
                            key={nearbyName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>
                                {nearbyName}
                            </TableCell>
                            <TableCell align="right">{distanceNearby}</TableCell>
                            <TableCell align="right">{directionNearby}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>


            </Box>
        } else {
            return <Typography> - </Typography>
        }
    })
    React.useEffect(() => {
        if (NearbyCity.length == 0) {
            setCheckNearby(false)

        } else {
            setCheckNearby(true)

        }
    }, [NearbyCity])


    function CheckNearbyfunction() {
        Maps.once('idle', () => {
            if (NearbyCity.length == 0) {
                setCheckNearby(false)

            } else {
                setCheckNearby(true)

            }
        })
    }
    const ShowTxtDetail = (

        <Box>
            {IdpropDtail ?

                <Box
                    sx={{
                        // border:1,
                        // bgcolor: '#FFF',
                        width: '90%',
                        mx: 'auto',
                        mt: 3,
                        // height:1200
                    }}
                >
                    <Box
                        sx={{
                            // border: 1,
                            width: 200,
                            height: 200,
                            borderRadius: '50%',
                            position: 'relative',
                            justifyContent: 'center',
                            textAlign: 'center',
                            mx: 'auto',
                            // pt: 4,
                            backgroundColor: '#f7f7f7',
                            backgroundImage: 'linear-gradient(#f7f7f7, #e7e7e7)',
                            boxShadow: '0 3px 8px #aaa, inset 0 2px 3px #fff',
                        }}
                    >
                        <Typography
                            sx={{
                                position: 'absolute',
                                // border:1,
                                fontSize: 80,
                                top: 30,
                                width: '100%'
                            }}
                        >{IdpropDtail.mag ? IdpropDtail.mag.toFixed(2) : 0}</Typography>
                        <Typography
                            sx={{
                                // border:1,
                                position: 'absolute',
                                // left:'50%'
                                fontSize: 20,
                                // top: 35,
                                width: '100%',
                                bottom: 40,
                            }}
                        >Magnitude</Typography>
                    </Box>
                    <Box
                        sx={{
                            // border:1,
                            mt: 1
                        }}
                    >
                        <Typography sx={{ mb: 1 }}>Depth : {DetailDepth ? DetailDepth.toFixed(3) : 0} Kilometer</Typography>
                        <Typography sx={{ mb: 1 }}>Date / Time : {moment(IdpropDtail.time).format('Do MMMM YYYY, h:mm:ss a')}</Typography>
                        <Typography sx={{ mb: 1 }}>The total number of seismic stations used  : {IdpropDtail.nst ? IdpropDtail.nst : '-'}</Typography>
                        <Typography sx={{ mb: 1 }}>Lattitude : {Lattitude ? Lattitude.toFixed(10) : 0}</Typography>
                        <Typography sx={{ mb: 1 }}>Longitude : {Longitude ? Longitude.toFixed(10) : 0}</Typography>
                        <Stack
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="center"
                            spacing={0}
                        >
                            {CheckNearby ? <div>
                                <Typography sx={{ mb: 1 }}>Nearby Cities :</Typography>
                                <Table sx={{ minWidth: 580 }} size="small" aria-label="a dense table">
                                    <TableHead >
                                        <TableRow >
                                            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                                            <TableCell sx={{ fontWeight: 700 }} align="right">Distance (Km)</TableCell>
                                            <TableCell sx={{ fontWeight: 700 }} align="right">
                                                Direction
                                                <BootstrapTooltipImage title='  '>
                                                    <InfoIcon
                                                        sx={{
                                                            position: 'absolute',
                                                            width: 20,
                                                            height: 20,
                                                            mt: 0.7,
                                                            ":hover": {
                                                                cursor: 'pointer'
                                                            }
                                                        }}
                                                    />
                                                </BootstrapTooltipImage>
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {NearbyCity.map((row: { distance: any; latitude: any; longitude: any; name: any; direction: any; }) => (
                                            <TableRow
                                                key={row.name}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.distance}</TableCell>
                                                <TableCell align="right">{row.direction}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>


                                : <div> </div>}


                            <Box
                                sx={{
                                    // border: 1,
                                    // position: 'absolute',
                                    // right: 20,
                                    // top:450
                                }}
                            >
                                {/* {Nearby ? Nearby : <Typography> ไม่มี </Typography>} */}
                            </Box>
                        </Stack>
                    </Box>
                </Box>

                :
                <Box
                    sx={{
                        // border:1,
                        // bgcolor: '#FFF',
                        width: '90%',
                        mx: 'auto',
                        mt: 3
                    }}
                >

                </Box>
            }
        </Box>
    )

    //zoom control
    function zoomin() {
        Maps.zoomIn();


    }
    function zoomout() {
        Maps.zoomOut({ duration: 1000 });


    }
    function showTableTab() {
        if (tableBox === false) {
            settableBox(true)
        } else {
            settableBox(false)
        }


    }

    //รับข้อมูลlayerแผ่นดินไหว
    function getlayerEarthquake() {
        Maps.getLayer('Earthquake');
        if (visibilityEq === 'visible') {
            Maps.setLayoutProperty('Earthquake', 'visibility', 'none');
            SetVisibilityEq('none')
        } else {
            Maps.setLayoutProperty('Earthquake', 'visibility', 'visible');
            SetVisibilityEq('visible')
        };
        TxtBot();

    }
    const [FocusPlate, setFocusPlate] = React.useState(false);
    function getlayerPlate() {
        Maps.getLayer('Plate');
        Maps.getLayer('LabelPlate')
        if (visibility === 'visible') {
            Maps.setLayoutProperty('Plate', 'visibility', 'none');
            Maps.setLayoutProperty('LabelPlate', 'visibility', 'none');
            SetVisibility('none')
        } else {
            Maps.setLayoutProperty('Plate', 'visibility', 'visible');
            Maps.setLayoutProperty('LabelPlate', 'visibility', 'visible');
            SetVisibility('visible')
        };
        if (FocusPlate === false) {
            setFocusPlate(true)
        } else {
            setFocusPlate(false)
        }

    }
    //ปุ่ม zoom
    const buttons = [
        <Button
            key="plus"
            onClick={zoomin}
            sx={{
                height: 60,
                width: 30.1,
                fontSize: 30,
                color: 'black',
                bgcolor: 'white',
                ":hover": {
                    color: 'white',
                    bgcolor: 'black',
                    cursor: 'pointer'
                }
            }}>+</Button>,
        <Button
            key="minus"
            onClick={zoomout}
            sx={{
                height: 60,
                width: 30,
                fontSize: 30,
                color: 'black',
                bgcolor: 'white',
                ":hover": {
                    color: 'white',
                    bgcolor: 'black',
                    cursor: 'pointer'
                }
            }}>-</Button>,
    ];

    function TxtBot() {
        if (TextButton === false) {
            setTextButton(true)
        } else {
            setTextButton(false)
        }
    }

    //แสดงข้อมูลจุดดใจ map ล่าสุด

    // console.log(FeatureEq)
    const timeStart: any = TimevalueStart * 1
    const timeEnd: any = TimevalueEnd * 1
    const FeatureEqLastDisplay = FeatureEq.map((obj: { properties: any; id: any; geometry: any; }) => {
        const datenow: any = Date.now()
        const dayAgo: any = 0
        const propTime: any = obj.properties.time
        const propTitle: any = obj.properties.title
        const propID: any = obj.id
        const coordinateLng: any = obj.geometry.coordinates[0]
        const coordinateLat: any = obj.geometry.coordinates[1]
        const conTime = moment(propTime).format();
        const Detailapi: any = obj.properties.detail


        var day = moment(propTime).format("DD MMM YYYY hh:mm:ss a")
        // console.log(day)
        var StartDay = moment(propTime).startOf('minute').fromNow()
        if (propTime >= timeStart && propTime <= timeEnd) {

            return <Stack
                onClick={() => clickToget(coordinateLng, coordinateLat, propID, Detailapi)}
                justifyContent="center"
                alignItems="center"
                sx={{
                    fontFamily: ['Prompt', 'sans-serif'].join(','),
                    fontSize: 17,
                    height: 80,
                    pt: 1.1,
                    pl: 2,
                    cursor: 'pointer',
                    ":hover": {
                        bgcolor: 'primary.light',
                        color: '#FFF'
                    },
                    display: 'grid',
                    gridAutoColumns: '1fr',
                    gap: 1,
                    boxShadow: 'inset 0px 0px 12px -8px #000000',
                }}
            >
                <Box
                    sx={{
                        gridRow: '1', gridColumn: 'span 3'
                    }}
                >{propTitle}</Box>
                <Box
                    sx={{ gridRow: '1', gridColumn: '4 / 5' }}
                >{StartDay}</Box>
            </Stack>
        } else {
            return <div></div>
        }

    })


    function clickToget(x: any, y: any, id: any, apiDetail: any) {
        let source = '6204edf545cf624a03c9460b'
        let sourceLayer = '6204edf545cf624a03c9460b'
        Maps.removeFeatureState(
            { source: '6204edf545cf624a03c9460b', sourceLayer: '6204edf545cf624a03c9460b' },
        );

        Maps.flyTo({
            center: [x, y],
            zoom: 7,
            bearing: 0,
            speed: 1,
            curve: 2,
            easing: function (t: any) {
                return t;
            },
            essential: true
        });
        selectID = id;
        Maps.setFeatureState(
            { source: '6204edf545cf624a03c9460b', sourceLayer: '6204edf545cf624a03c9460b', id: selectID },
            { Focus: true }
        );
        // console.log(apiDetail)
        DetailFromPanel(selectID, apiDetail)
        setCheckDetail(false)

    }
    function DetailFromPanel(id: any, api: any) {
        fetch(api)
            .then(response => response.json())
            .then(data => data)
            .then(data => {
                setDetailDepth(data.geometry.coordinates[2])
                setLattitude(data.geometry.coordinates[0])
                setLongitude(data.geometry.coordinates[1])
                console.log(data.properties)
            })
        fetch(api)
            .then(response => response.json())
            .then(data => data.properties)
            .then(data => {
                setIdpropDtail(data)
                data.products["nearby-cities"] ?
                    fetch(data.products["nearby-cities"][0].contents["nearby-cities.json"].url)
                        .then(res => res.json())
                        .then(data => {
                            setNearbyCity(data)
                        })
                    : setNearbyCity([])
            })
        setValue('Detail')
        if (NearbyCity.length == 0) {
            setCheckNearby(false)

        } else {
            setCheckNearby(true)

        }
    }
    const [valueState, setvalueState] = React.useState<any>(false);
    // const [FilterChangeMax, setFilterChangeMax] = React.useState(8);
    const [maxFilter, setMaxFilter] = React.useState(8);
    const [minFilter, setMinFilter] = React.useState(0);
    var FilterChangeMax = maxFilter
    var FilterChangeMin = minFilter
    // const [FilterChangeMin, setFilterChangeMin] = React.useState(0);

    const [ValueMinMax, setValueMinMax] = React.useState<number[]>([0, 10]);
    const FilterMinMax = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
        }
        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 10 - minDistance);
                setValueMinMax([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValueMinMax([clamped - minDistance, clamped]);
            }
        } else {
            setValueMinMax(newValue as number[]);
        }
        filterOnChange()
    };

    function filterOnChange() {

        Maps.setFilter('Earthquake', ["all", ['>', ['get', 'time'], timeStart], ['<', ['get', 'time'], timeEnd], ['>=', ['get', 'mag'], ValueMinMax[0]], ['<=', ['get', 'mag'], ValueMinMax[1]]]);
        Maps.once('idle', () => {
            const features = Maps.queryRenderedFeatures({ layers: ['Earthquake'] });
            if (SortStateValue == true) {
                if (globalSortStateTime == false) {
                    setFeatureEq(features.sort(function (a: any, b: any) { return (a.properties.time) - (b.properties.time) }))
                } else if (globalSortStateTime == true) {
                    setFeatureEq(features.sort(function (a: any, b: any) { return (b.properties.time) - (a.properties.time) }))
                }
            } else if (SortStateValue == false) {
                if (globalSortStateMag == false) {
                    setFeatureEq(features.sort(function (a: any, b: any) { return (a.properties.mag) - (b.properties.mag) }))
                } else if (globalSortStateMag == true) {
                    setFeatureEq(features.sort(function (a: any, b: any) { return (b.properties.mag) - (a.properties.mag) }))
                }

            }
        })



    }

    function getMag() {
        Maps.setFilter('Earthquake', ["all", ['>', ['get', 'time'], timeStart], ['<', ['get', 'time'], timeEnd], ['>=', ['get', 'mag'], FilterChangeMin], ['<=', ['get', 'mag'], FilterChangeMax]]); 
    }
    const filterTime = (
        <Box
            sx={{

                mt: 2,
                mb: 2,

            }}
        >

            <Box
                sx={{
                    transition: 'all 0.7s',
                    // opacity: valueState ? 1 : 0,
                    // visibility: valueState ? 'visible' : 'hidden',
                }}
            >


                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Divider><Typography>Date / Time</Typography></Divider>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            mx: 3,
                            mb: 1
                            // fontSize:15
                        }}
                    >
                        <Box><Typography sx={{ fontSize: 15, width: 37 }}>From</Typography></Box>
                        <DateTimePicker
                            disableFuture
                            renderInput={(params) => <TextField {...params} size="small" color='secondary' sx={{ fontSize: 15, textAlign: 'center' }} />}
                            // label="Start date"
                            value={TimevalueStart}
                            onChange={(newValue: any) => {
                                setTimeValueStart(newValue), getTime()
                            }}
                            minDateTime={new Date(1644685200000)}

                        />

                        {/* <Typography> From 22/02/2029 09:55 pm To 23/02/2029 09:55 pm Magnitude: 0 - 10</Typography> */}
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            mx: 3,
                            mb: 1
                            // fontSize:15
                        }}
                    >
                        <Box><Typography sx={{ fontSize: 15, width: 37 }}>To</Typography></Box>
                        <DateTimePicker
                            disableFuture
                            renderInput={(params) => <TextField {...params} size="small" color='secondary' />}
                            value={TimevalueEnd}
                            // maxDate={getWeeksAfter(TimevalueStart, 1)}
                            onChange={(newValue: any) => {
                                setTimeValueEnd(newValue), getTime()
                            }}
                            minDateTime={new Date(1644685200000)}
                        />
                    </Stack>
                </LocalizationProvider>
                <Box
                    sx={{
                        mx: 'auto',
                        width: '93%',
                        // border:1,
                        position: 'relative',
                        top: -15,
                        mt: 3
                    }}
                >
                    <Divider><Typography>Magnitude</Typography></Divider>

                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            // border:1

                        }}
                    >
                        <Typography variant='overline' >Min : {ValueMinMax[0]}</Typography>

                        <Typography variant='overline'>Max : {ValueMinMax[1]}</Typography>

                    </Stack>
                    {/* <Box
                    sx={{
                        border:1,
                        width:'95%'
                    }}
                    > */}
                    <Slider
                        getAriaLabel={() => 'Minimum distance shift'}
                        value={ValueMinMax}
                        onChange={FilterMinMax}
                        step={0.1}
                        min={0.0}
                        max={10.0}
                        disableSwap
                        sx={{
                            position: 'relative',
                            top: -10,
                            // border:1,
                            width: '90%',
                            mx: 2
                        }}
                    />
                    {/* </Box> */}
                </Box>
                <Divider></Divider>
            </Box>

        </Box>

    )


    function CheckStateFilterLastest() {
        const getFilter = Maps.getFilter('Earthquake')
        const datenow: any = Date.now()
        const dayAgo: any = datenow - 90000000
        // Maps.setFilter('Earthquake', ['>', ['get', 'time'], dayAgo]);
    }

    let tabletask = null
    // เช็ค navigation ที่กด


    if (valueReal == 'List') {
        tabletask = (<Box
            sx={{
                height: 700,
                overflowX: 'hidden',
                overflowY: 'auto',
                // mt: 0,
                position: 'relative',
                // borderTop: 1,
                // borderTopWidth: 2,
                top: 54,
                boxShadow: 'inset 0px 0px 14px -6px #000000',
            }}
        >
            {FeatureEqLastDisplay}

        </Box>)
    } else {
        tabletask = (<Box
            sx={{
                height: 720,
                overflowX: 'hidden',
                overflowY: 'auto',
                // mt: 0,
                position: 'relative',
                // border: 1,
                // borderTopWidth: 2,
                top: 100,
                boxShadow: 'inset 0px 0px 14px -6px #000000',
            }}
        >{ShowTxtDetail}</Box>)
    }


    function getTime() {
        Maps.setFilter('Earthquake', ["all", ['>', ['get', 'time'], timeStart], ['<', ['get', 'time'], timeEnd], ['>=', ['get', 'mag'], FilterChangeMin], ['<=', ['get', 'mag'], FilterChangeMax]]);

    }

    function getWeeksAfter(date: any, amount: any) {
        return date ? addWeeks(date, amount) : undefined;
    }
    let headerTopPage = null
    const [valueSelect, setvalueSelect] = React.useState<any>('Date/Time');
    // const [valueState, setvalueState] = React.useState<any>(true);
    function SelectChange(event: any) {
        // Maps.setFilter('Earthquake', ["all", ['>', ['get', 'time'], timeStart], ['<', ['get', 'time'], timeEnd]]);
        setvalueSelect(event.target.value);
        if (event.target.value == 'Date/Time') {
            setvalueState(false)
        } else if (event.target.value == 'Magnitude') {
            setvalueState(true)
        }
    }

    function SortValueSelect(event: any) {
        setValueSort(event.target.value)
        // console.log('target ' + event.target.value)
        SortingValue()
    }

    function SortingValue() {
        const features = Maps.queryRenderedFeatures({ layers: ['Earthquake'] });
        if (valueSort == 'Magnitude') {
            setFeatureEq(features.sort(function (a: any, b: any) { return (b.properties.time) - (a.properties.time) }))
        } else if (valueSort == 'Date/Time') {
            setFeatureEq(features.sort(function (a: any, b: any) { return (a.properties.mag) - (b.properties.mag) }))
        }
    }

    function SortStateTime() {
        const features = Maps.queryRenderedFeatures({ layers: ['Earthquake'] });
        if (SortDateTime == false) {
            setSortDateTime(true)
            globalSortStateTime = false

            setFeatureEq(features.sort(function (a: any, b: any) { return (a.properties.time) - (b.properties.time) }))
        } else if (SortDateTime == true) {
            setSortDateTime(false)
            globalSortStateTime = true
            setFeatureEq(features.sort(function (a: any, b: any) { return (b.properties.time) - (a.properties.time) }))
        }
        setSortMag(false)
        SortValueState(true)
        setHideCheckTime(true)
        setHideCheckMag(false)
    }

    function SortStateMag() {
        const features = Maps.queryRenderedFeatures({ layers: ['Earthquake'] });
        if (SortMag == false) {
            setSortMag(true)
            globalSortStateMag = false
            setFeatureEq(features.sort(function (a: any, b: any) { return (a.properties.mag) - (b.properties.mag) }))
        } else if (SortMag == true) {
            setSortMag(false)
            globalSortStateMag = true
            setFeatureEq(features.sort(function (a: any, b: any) { return (b.properties.mag) - (a.properties.mag) }))
        }
        setSortDateTime(false)
        SortValueState(false)
        setHideCheckMag(true)
        setHideCheckTime(false)
    }
    const [hideCheckTime, setHideCheckTime] = React.useState<boolean>(false)

    const ArrowDate = (
        <Box>{SortDateTime ? <ArrowUpwardIcon sx={{ visibility: hideCheckTime ? 'visible' : 'hidden', width: 20, height: 20, mt: 0.5 }} /> : <ArrowDownwardIcon sx={{ visibility: hideCheckTime ? 'visible' : 'hidden', width: 20, height: 20, mt: 0.5 }} />}</Box>
    )

    const [hideCheckMag, setHideCheckMag] = React.useState<boolean>(false)

    const ArrowMag = (
        <Box>{globalSortStateMag ? <ArrowUpwardIcon sx={{ visibility: hideCheckMag ? 'visible' : 'hidden', width: 20, height: 20, mt: 0.5 }} /> : <ArrowDownwardIcon sx={{ visibility: hideCheckMag ? 'visible' : 'hidden', width: 20, height: 20, mt: 0.5 }} />}</Box>
    )
    const [ShowFilterDialog, setShowFilterDialog] = React.useState<boolean>(false)

    function SwitchFilterDialog() {
        if (ShowFilterDialog == false) {
            setShowFilterDialog(true)
            setvalueState(true)
        } else if (ShowFilterDialog == true) {
            setShowFilterDialog(false)
            setvalueState(false)
        }
    }
    const filterDialog = (
        <Box>
            <Box
                sx={{
                    // border: 1,
                    // color:'white',
                    // bgcolor:'white',
                    width: 350,
                    height: 300,
                    ml: ShowFilterDialog ? 86 : 84,
                    position: 'absolute',
                    top: -1,
                    visibility: ShowFilterDialog ? 'visible' : 'hidden',
                    transition: 'all 0.5s',
                    opacity: ShowFilterDialog ? 1 : 0,
                    background: 'rgba(255, 255, 255, 0.67)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(7.3px)',
                    border: '1px solid rgba(255, 255, 255, 0.66)',
                    borderRadius: 1
                    // left: 683,
                }}
            >
                {filterTime}


            </Box>
        </Box >
    )

    if (valueReal == 'List') {
        headerTopPage = (
            <Box
                sx={{
                    height: 50,
                    mt: 2,
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        ml: 3,
                        position: 'relative',
                        mr: 3
                    }}
                >
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            backgroundImage: 'url(/img/LogoEarth.png)',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 50
                        }}
                    />
                    <Typography
                        variant='h5'
                        sx={{
                            // border:1,
                            position: 'relative',
                            letterSpacing: 3,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            strokeWidth: 1,

                        }}
                    >Earthquakes</Typography>
                    <BootstrapTooltip title="Filter the display of points on the map.">
                        <Button onClick={SwitchFilterDialog} variant='outlined'><FilterAltSharpIcon sx={{ position: 'relative', width: 30, height: 30 }} /></Button>
                    </BootstrapTooltip>
                </Stack>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        // border:1,
                        ml: 3,
                        position: 'relative',
                        mr: 3
                    }}
                >

                </Stack>
                {/* {filterTime} */}
                {/* Sorting */}
                <Box
                    onClick={SortStateMag}
                    sx={{
                        width: '70%',
                        height: 'auto',
                        // border: 1,
                        position: 'absolute',
                        top: 80,
                        color: '#FFF',
                        bgcolor: 'primary.light',
                        translate: 'all 0.5s',
                        ":hover": {
                            bgcolor: 'secondary.main',
                            cursor: 'pointer',
                            translate: 'all 0.5s',
                        },
                        ":active": {
                            // top:130
                            bgcolor: '#000',
                            // translate:'all 0.5s'
                        }

                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            // border:1,
                            height: 40,
                            ml: 2
                        }}
                    >
                        <Typography>Magnitude / Center Earthquake</Typography>{ArrowMag}
                    </Stack>
                </Box>
                <Box
                    onClick={SortStateTime}
                    sx={{
                        width: '30%',
                        height: 'auto',
                        // border: 1,
                        position: 'absolute',
                        top: 80,
                        right: 0,
                        color: '#FFF',
                        bgcolor: 'primary.light',
                        translate: 'all 0.5s',
                        ":hover": {
                            bgcolor: 'secondary.main',
                            cursor: 'pointer',
                            translate: 'all 0.5s',
                        },
                        ":active": {
                            // top:130
                            bgcolor: '#000',
                            // translate:'all 0.5s'
                        }
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                        sx={{
                            // border:1,
                            height: 40
                        }}
                    >
                        <Typography>Date/Time</Typography>{ArrowDate}
                    </Stack>
                </Box>
            </Box>
        )
    } else {
        headerTopPage = (
            <Box>
                {IdpropDtail ?

                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            // border: 1,
                            height: 101,
                            position: 'absolute',
                            // justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                            // mx:'auto',
                            my: 0,
                        }}
                    >
                        <Typography
                            variant="h5"
                        >{IdpropDtail.place}</Typography>

                    </Stack>
                    :
                    <Box
                        sx={{
                            // border: 1,
                            // height: 83,
                            position: 'absolute',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                            // mx:'auto',
                            my: 2,
                        }}
                    >


                    </Box>
                }

            </Box>
        )
    }

    return (
        <Box
            sx={{
                overflowX: 'hidden',
                overflowY: 'hidden',
            }}
        >

            <Box
                className='map-container'
                id='map'
                sx={{
                    visibility: 'visible',
                    right: 0,
                    height: '100vh',
                    width: '100vw',
                    position: 'absolute',
                    overflow: 'hidden',
                }}
            >
            </Box>

            {/* แถบข้าง */}
            <Box
                sx={{
                    position: 'absolute',
                    top: '2.5%',
                    left: tableBox ? -600 : 25,
                    height: '95%',
                    width: '650px',
                    opacity: tableBox ? 0 : 1,
                    transition: 'all 0.8s',
                    // backdropFilter: 'blur(18px) saturate(180%)',
                    borderRadius: 1,
                    background: 'rgba(255, 255, 255, 0.67)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(7.3px)',
                    border: '1px solid rgba(255, 255, 255, 0.66)',
                }}
            >
                {headerTopPage}
                <Box>
                    {tabletask}

                </Box>
                {filterDialog}


                <BottomNavigation
                    showLabels
                    value={valueReal}
                    onChange={(event, newValue) => {
                        setValue(newValue)
                    }}
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        // border:2,
                        width: '100%',
                        height: 93,
                        bgcolor: 'rgba(255,255,255,0.0)',
                        color: 'black',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        // visibility:'hidden'
                    }}
                >
                    <BottomNavigationAction onClick={CheckStateFilterLastest} value="List" label="View List" icon={<ViewListIcon sx={{ width: 45, height: 45 }} />} sx={{
                        ":focus": {
                            color: '#000',
                            opacity: 1
                        },

                    }} />
                    {CheckDetail ? <BottomNavigationAction disabled value="Detail" label="Detail" icon={<FeedIcon sx={{ width: 45, height: 45, ":hover": { cursor: 'not-allowed' } }} />} sx={{
                        ":hover": { cursor: 'not-allowed' },
                    }} /> :
                        <BottomNavigationAction value="Detail" label="Detail" icon={<FeedIcon sx={{ width: 45, height: 45, }} />} sx={{
                        }} />
                    }

                </BottomNavigation>
            </Box>

            <IconButton
                onClick={showTableTab}
                sx={{
                    // border: 2,
                    position: 'absolute',
                    // marginLeft: tableBox ? 5 : 90,
                    display: 'flex',
                    left: tableBox ? 24 : 700,
                    top: '45%',
                    transition: 'all 1.2s',
                    // bgcolor: '#C1E4FF',
                    color: 'primary.dark',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(7.3px)',
                    border: '1px solid rgba(255, 255, 255, 0.66)',
                    background: 'rgba(255, 255, 255, 0.67)',
                    ":hover": {
                        color: '#FFF',
                        bgcolor: 'primary.dark',
                        borderColor: '#FFF',
                        boxShadow: '0px 0px 50px 7px',
                        transition: 'all 0.8s'
                    },
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                }}
            >
                {tableBox ?
                    <KeyboardDoubleArrowRightIcon

                    /> :
                    <KeyboardDoubleArrowLeftIcon />
                }
            </IconButton>
            {/* layer tab */}
            {/* {OpenLayer ? <Box
                sx={{
                    position: 'absolute',
                    transition: 'all 0.5s',
                    top: 159,
                    right: 24,
                    width: 220,
                    height: 154,
                    // border: 0,
                    borderRadius: 1,
                    fontFamily: ['Prompt', 'sans-serif'].join(','),
                    // fontWeight: 500,
                    fontSize: 20,
                    // bgcolor: 'white',
                    // boxShadow: '1px 10px 15px 4px rgba(0,0,0,0.2)',
                    background: 'rgba(255, 255, 255, 0.67)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(7.3px)',
                    border: '1px solid rgba(255, 255, 255, 0.66)',
                }}
            >

                <CloseIcon
                    onClick={showLayer}
                    sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        width: 30,
                        height: 30,
                        ":hover": {
                            cursor: 'pointer',
                            color: '#E53935',
                            transition: 'color 0.5s',
                        },

                    }}
                />
                <Fade in={checked} timeout={1700}>
                    <Typography
                        sx={{
                            // border:1,
                            width: 150,
                            position: 'absolute',
                            height: 30,
                            right: 35,
                            opacity: OpenLayer ? 1 : 0,
                            // transition: 'all 0.8s',  
                            textAlign: 'center',
                            // justifyItems: 'center',
                            px: 'auto',
                            mt: 1,
                            top: 0,
                            // fontSize: 25,
                        }}
                    >
                        Layers
                    </Typography>
                </Fade>
                <Fade in={checked} timeout={2000}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={0}
                        onClick={getlayerEarthquake}
                        sx={{
                            color: 'primary.dark',
                            border: 1,
                            position: 'absolute',
                            width: 190,
                            height: 40,
                            textAlign: 'center',
                            ":hover": {
                                cursor: 'pointer',
                            },
                            borderRadius: 1,
                            // bgcolor: TextButton ? 'white' : 'rgb(1, 42, 74)',
                            top: 50,
                            right: 15,
                            pt: '0.1rem',
                            borderColor: 'rgb(0, 0, 0)',
                            px: 1,
                            // ":active":{
                            //     boxShadow: 'inset 0px 0px 25px -10px rgba(0,0,0,0.75)',
                            //     border:0
                            // }
                        }}
                    >
                        <Typography
                            // variant='body2'
                            sx={{
                                fontSize: 15,
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing={1}
                            >
                                <Box
                                    sx={{
                                        width: 30
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: 18,
                                            height: 18,
                                            borderRadius: '50%',
                                            position: 'relative',
                                            mt: 0.2,
                                            backgroundColor: '#FFFFFF',
                                            animationName: 'changeCOlor',
                                            animationDuration: '10s',
                                            animationIterationCount: 'infinite',
                                            mx: 'auto'
                                        }}
                                    />

                                </Box>
                                <Box>
                                    Earthquakes
                                </Box>
                            </Stack>
                        </Typography>
                        {TextButton ? <VisibilityOffOutlinedIcon sx={{ width: 20, height: 20 }} /> : <VisibilityOutlinedIcon sx={{ width: 20, height: 20 }} />}
                    </Stack>
                </Fade>

                <Fade in={checked} timeout={2000}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={0}
                        onClick={getlayerPlate}
                        sx={{
                            color: 'primary.dark',
                            border: 1,
                            position: 'absolute',
                            width: 190,
                            height: 40,
                            textAlign: 'center',
                            ":hover": {
                                cursor: 'pointer',
                            },
                            borderRadius: 1,
                            // bgcolor: FocusPlate ? 'white' : 'rgb(1, 42, 74)',
                            top: 100,
                            right: 15,
                            pt: '0.1rem',
                            borderColor: 'primary.dark',
                            px: 1,

                            // ":active":{
                            //     boxShadow: 'inset 0px 0px 25px -10px rgba(0,0,0,0.75)',
                            //     border:0
                            // }
                        }}
                    >

                        <Typography
                            // variant='body2'
                            sx={{
                                fontSize: 15,
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                spacing={1}
                            >
                                <Box
                                    sx={{
                                        width: 30,
                                        height: 2,
                                        // border: 1,
                                        position: 'relative',
                                        mt: 1,
                                        bgcolor: 'white'
                                    }}
                                ></Box>
                                <Box>
                                    Plate
                                </Box>
                            </Stack>
                        </Typography>
                        {FocusPlate ? <VisibilityOffOutlinedIcon sx={{ width: 20, height: 20 }} /> : <VisibilityOutlinedIcon sx={{ width: 20, height: 20 }} />}
                    </Stack>
                </Fade>

            </Box>
                :
                <Box

                    sx={{
                        // border: 2,
                        position: 'absolute',
                        top: 150,
                        right: 24,
                        transition: 'height 0.5s',
                        width: 40,
                        height: 40,
                        justifyItems: 'center',
                        alignItems: 'center',
                        bgcolor: 'white',
                        borderRadius: 1,
                        boxShadow: '1px 10px 15px 4px rgba(0,0,0,0.2)',
                        ":hover": {
                            color: 'common.white',
                            cursor: 'pointer',
                            bgcolor: 'primary.dark',
                            transition: 'all 0.5s',
                        }
                    }}
                >
                    <LayersIcon
                        onClick={showLayer}
                        sx={{
                            width: 30,
                            height: 30,
                            position: 'absolute',
                            right: 5,
                            top: 5,
                            ":hover": {
                                cursor: 'pointer',

                            }
                        }}
                    />
                </Box>
            } */}

            {/* ปุ่มซูม */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 24,
                    right: 24,
                    transition: 'all 0.5s'
                }}
            >
                <ButtonGroup
                    orientation="vertical"
                    aria-label="vertical contained button group"
                    variant="contained"
                    color='secondary'
                >
                    {buttons}
                </ButtonGroup>
            </Box>
            <Legend />

        </Box >
    );
}