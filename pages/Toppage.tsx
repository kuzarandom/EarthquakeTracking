import React, { Component } from 'react'
import { ThemeProvider } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';

export default function Toppage() {

    return (
        <Box
            sx={{
                
                background: '#556677',
                height: '92.8vh'
            }}
        >
            {/* <Box
      sx={{
        height:'50px',
        width:'50px',
        position:'absolute',
        top: '15em',
        left: '50%',
        
      }}
      >
      </Box> */}
            <Box
                sx={{
                    height: '700px',
                    width: '1780px',
                    top: '120px',
                    left: '120px',
                    backgroundImage: 'url(/img/mountain.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 1800,
                    position: 'absolute',
                }}
            >
            </Box>
           {/* 

position: absolute;
width: 1724px;
height: 520px;
left: 1582px;
top: 904px;

background: #C4C4C4;
transform: rotate(-180deg); */}


            <Box
                sx={{
                    position: 'absolute',
                    top: '15rem',
                    left: '23%',
                    fontSize: 40,   
                    color:'#e0dfdc',
                    fontWeight: 900,
                    textShadow: '0 -1px 0 #fff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212, 0 22px 30px rgba(0,0,0,0.9)',
                    fontFamily: '"Arial Black", Gadget, sans-serif;',
                    letterSpacing:'.1em',
                    
                }}
            >
                Earhquake and
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: '18rem',
                    left: '20%',
                    fontSize: 40,
                    color:'#e0dfdc',
                    fontWeight: 900,
                    textShadow: '0 -1px 0 #fff, 0 1px 0 #2e2e2e, 0 2px 0 #2c2c2c, 0 3px 0 #2a2a2a, 0 4px 0 #282828, 0 5px 0 #262626, 0 6px 0 #242424, 0 7px 0 #222, 0 8px 0 #202020, 0 9px 0 #1e1e1e, 0 10px 0 #1c1c1c, 0 11px 0 #1a1a1a, 0 12px 0 #181818, 0 13px 0 #161616, 0 14px 0 #141414, 0 15px 0 #121212, 0 22px 30px rgba(0,0,0,0.9)',
                    fontFamily: '"Arial Black", Gadget, sans-serif;',
                    letterSpacing:'.1em',
                }}
            >
                Tsunami Warning
            </Box>



        </Box>
    )
}