import { Box, Typography, Paper, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
import { motion, Variants } from "framer-motion";
import Link from 'next/link'
function background() {

    const cardVariants: Variants = {
        offscreen: {
            y: 300,
            opacity: 0,
        },
        onscreen: {
            y: 10,
            opacity: 1,
            // rotate: -10,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
            }
        }
    };

    return (

        <motion.div
            className="card-container"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
        >

            <Box
                sx={{
                    backgroundImage: 'url("https://wallpaperaccess.com/full/2142375.jpg")',
                    height: '100vh',
                    width: '100%',
                    backgroundRepeat: "no-repeat",
                    // border:2,
                    backgroundSize: 'cover',
                    overflow: 'hidden',
                    boxShadow: '1px -30px 250px 70px rgba(0,0,0,0.92) inset',
                }}
            >
                
                <motion.div className="card" variants={cardVariants}>
                    <Grid container
                        sx={{
                            // border: 1,
                            pt: 50,
                            // borderColor: 'blueviolet'
                        }}
                    >
                        <Grid item xs={3} sx={{
                        }}>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h2"
                                sx={{

                                    color: 'rgba(255, 255, 255, 1)',
                                    letterSpacing: 2,
                                    // border: 1,
                                    textAlign: 'center',
                                    ":hover": {
                                        animation: 'shake 0.6s',
                                        animationIterationCount: 'infinite',
                                        cursor: 'context-menu'
                                    },
                                    textShadow: '0px 0px 15px rgba(0, 0, 0, 1)',

                                }}
                            >
                                EARTHQUAKES
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>

                        <Grid item xs={3}>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                variant="h5"
                                sx={{

                                    color: 'rgba(255, 255, 255, 1)',
                                    letterSpacing: 2,
                                    // border: 1,
                                    textAlign: 'center',
                                    ":hover": {
                                        animation: 'shake 0.6s',
                                        animationIterationCount: 'infinite',
                                        cursor: 'context-menu'
                                    },
                                    textShadow: '0px 0px 15px rgba(0, 0, 0, 1)',
                                }}
                            >
                                TRACKING
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                        </Grid>
                    </Grid>
                </motion.div>
            </Box>

        </motion.div>
    );
}

export default background;