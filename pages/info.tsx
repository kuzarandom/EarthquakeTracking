import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import { Stack, Grid, Typography } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import { OrbitControls } from 'three-orbitcontrols-ts';
import * as THREE from 'three';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function info() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {

        const camera = new THREE.PerspectiveCamera(30, 1.375, 0.01, 100);
        camera.position.set(0, 0, -4);
        const scene = new THREE.Scene();
        camera.lookAt(new THREE.Vector3())
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhysicalMaterial({
            // color: 'white',
            // wireframe: true,
            map: new THREE.TextureLoader().load('/img/global2k.jpg')
        })
        const sphere = new THREE.Mesh(geometry, material);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        

        renderer.setSize(1100, 800);
        renderer.setAnimationLoop(render);
        scene.add(new THREE.AmbientLight(0xcccccc, 0.5));

        let light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(5, 0, -4);
        scene.add(light);
        document.getElementById("Planet")!.appendChild(renderer.domElement)


        // animation

        function render() {
            sphere.rotation.y += 0.000002;
            requestAnimationFrame(render);
            renderer.render(scene, camera);
        }

    }, []);

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100%',
                // border: 2,
                bgcolor: '#000000',
                overflow: 'hidden',

            }}>
            <div style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Grid
                    container
                    spacing={2}

                >
                    <Grid item xs={7}
                        sx={{
                            // bgcolor: '#fff'
                        }}
                    >
                        <Box
                            id="Planet"
                            sx={{
                                height: 800,
                                width: 1100,
                                // backgroundImage: 'url(/img/planet.png)',
                                // backgroundSize: 'contain',
                                // backgroundRepeat: 'no-repeat',
                                // backgroundPosition: 'center'
                            }}>

                        </Box>

                    </Grid>
                    <Grid item xs={5}
                        sx={{
                            // bgcolor: '#fff'
                        }}
                    >
                        <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', }}>
                            <Paper
                                sx={{
                                    width: 700,
                                    height: 250,
                                    zIndex: 1,
                                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                                    bgcolor:'rgba( 248, 244, 244, 0.3 )',
                                    boxShadow:' 0 8px 32px 0 rgba( 255, 255, 255, 0.37 )',
                                    backdropFilter: 'blur( 11px )',
                                }}
                            >
                                <Typography
                                    variant='h5'
                                    sx={{
                                        pl: 2,
                                        pt: 1,
                                        color: '#fff',
                                        // border:1,
                                        width: 680,
                                        // display:'flex',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        
                                    }}
                                >Earthquake ?</Typography>
                                <Typography variant='body2'
                                    sx={{
                                        pl: 2,
                                        width: 680,
                                        color: '#fff',
                                        // border:1,
                                        fontWeight: 400,
                                        textAlign: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    Earthquakes is the shaking of the surface of the Earth resulting from a sudden release of energy in the Earth lithosphere that creates seismic waves. Earthquakes can range in size from those that are so weak that they cannot be felt to those violent enough to propel objects and people into the air, and wreak destruction across entire cities.
                                    Earthquakes often occur in volcanic regions and are caused there, both by tectonic faults and the movement of magma in volcanoes.
                                </Typography>

                            </Paper>
                            <Paper
                                sx={{
                                    width: 700,
                                    height: 250,
                                    // zIndex: -1,
                                    bgcolor: 'secondary.main',
                                    position: 'absolute',
                                    transform: 'rotate(7.5deg)',
                                    opacity: 0.7
                                }}
                            >
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </Box >
    );
}