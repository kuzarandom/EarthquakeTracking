/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";

import { Box, Button, Paper, Typography } from "@mui/material";
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

const scene = new THREE.Scene()
// var width  = window.innerWidth;
// var height = window.innerHeight;


function planet() {


  React.useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1.375, 0.01, 100);
    // camera.position.z = 1.5;
    const renderer = new THREE.WebGLRenderer();
    camera.position.set(0, 0, -4);
    camera.lookAt(new THREE.Vector3())

    const controls = new OrbitControls( camera, renderer.domElement );

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    // const material = new THREE.MeshBasicMaterial({
    //   // color: 0xffff00,
    //   // wireframe: true,
    //   map: new THREE.TextureLoader().load('/img/global.jpg')
    // });

    const material = new THREE.MeshPhysicalMaterial({
      // wireframe: true,
      // color: 0xffff00,
      map: new THREE.TextureLoader().load('https://www.solarsystemscope.com/textures/download/8k_mars.jpg')
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
    document.body.appendChild(renderer.domElement);
    controls.update();
    // animation

    function render() {
      // sphere.rotation.y += 0.00000;
      // requestAnimationFrame(render);
      renderer.render(scene, camera);
    }

  }, []);



  return (
    <Box>
      <canvas id="c"></canvas>
      
    </Box>
  );
}

export default planet;