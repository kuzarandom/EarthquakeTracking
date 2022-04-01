/* eslint-disable react/jsx-key */
import type { NextPage } from "next";
import { Button, Box, Stack, Paper, Avatar, makeStyles, ListItem, duration, TextField, Grid } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import Background from './background';
import LandingNext from './PageNews'
import Info from './info'
import Footer from './footer'
import Planet from './planet'
import Link from 'next/link'
const Home: NextPage = () => {

  function scrollHome() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  function scrollAbout() {
    window.scroll({
      top: 950,
      left: 0,
      behavior: 'smooth'
    });
  }

  function scrollNews() {
    window.scroll({
      top: 2000,
      left: 0,
      behavior: 'smooth',
    });
  }

  return (
    <Box
      sx={{
        overflowX: 'hidden',
      }}
    >
      <Box
        sx={{
          overflowX: 'hidden',
        }}
      >
        <Grid
          container
          sx={{
            position: 'fixed',
            height: 85,
            pt: 2.9,
            zIndex: 5,
            color: 'white',
            background: 'rgba( 0, 0, 0, 0.3 )',
            backdropFilter: 'blur(12px)',

          }}
        >

          <Grid item xs={2} sx={{


          }}>

          </Grid>
          <Grid item xs={1} sx={{


          }}>
            <Typography onClick={scrollHome} sx={{ textAlign: 'center',":hover":{cursor:'pointer'} }}>Home</Typography>
          </Grid>
          <Grid item xs={1} sx={{


          }}>

          </Grid>
          <Grid item xs={1} sx={{


          }}>
            <Typography onClick={scrollAbout} sx={{ textAlign: 'center',":hover":{cursor:'pointer'}  }}>About</Typography>
          </Grid>
          <Grid item xs={2} sx={{
            // border:1,
            // color:'magenta',

          }}>
            <Box
              sx={{
                backgroundImage: 'url(/img/earthImg.png)',
                width: 70,
                height: 70,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                mx: 'auto',
                // position:'relative'
                mt: -2,
                boxShadow: '0px 0px 15px rgba(0, 0, 0, 1)',
                bgcolor: '#000',
                borderRadius: '50%'
              }}
            ></Box>
          </Grid>

          <Grid item xs={1} sx={{


          }}>
            <Typography onClick={scrollNews} sx={{ textAlign: 'center',":hover":{cursor:'pointer'} }}>News</Typography>
          </Grid>
          <Grid item xs={1} sx={{


          }}>

          </Grid>
          <Grid item xs={1} sx={{

          }}>
            <Link href="Map">
              <Typography
                sx={{
                  textAlign: 'center',
                  ":hover": {
                    cursor: 'pointer'
                  },

                }} >Map</Typography>
            </Link>
          </Grid>
          <Grid item xs={2} sx={{


          }}>

          </Grid>










        </Grid>
        <Background />
        <Info />
        <LandingNext />
        {/* <Planet/> */}
        <Footer />
      </Box>
    </Box>

  );
};

export default Home;
