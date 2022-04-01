import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, TextareaAutosize, TextField, Slider, ButtonGroup, Typography, Stack, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function LegendCard() {


    const [OpenLayer, setOpenLayer] = React.useState<boolean>(false)
    const [checked, setChecked] = React.useState(false);

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



    return (
        <Box>
            <Box
                sx={{
                    position: 'absolute',
                    right: 24,
                    borderRadius: 1,
                    bottom: 24,
                    height: 100,
                    width: 400,
                    background: 'rgba(255, 255, 255, 0.67)',
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(7.3px)',
                    border: '1px solid rgba(255, 255, 255, 0.66)',
                    px: 2,
                    py: 1
                }}
            >

                <Typography

                    sx={{
                        color: 'primary.main',
                        // border: 1,   
                        width: 162,
                        mx: 'auto'
                    }}
                >Magnitude (RM)</Typography>

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Box sx={{ bgcolor: '#fffafa',borderRadius:1, width: 60, height: 30, }} />
                    <Box sx={{ bgcolor: '#ffe150',borderRadius:1, width: 60, height: 30, }} />
                    <Box sx={{ bgcolor: '#ffc545',borderRadius:1, width: 60, height: 30, }} />
                    <Box sx={{ bgcolor: '#ffaa3c',borderRadius:1, width: 60, height: 30, }} />
                    <Box sx={{ bgcolor: '#ff7818',borderRadius:1, width: 60, height: 30, }} />
                    <Box sx={{ bgcolor: '#ff0000',borderRadius:1, width: 60, height: 30, }} />
                </Stack>
                <Typography sx={{ color: '#fff', fontSize: 14 }}>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Box sx={{ color: 'primary.main',width: 60, height: 30, mx: 'auto', textAlign: 'center' }} >0.0-2.9 </Box>
                        <Box sx={{ color: 'primary.main',width: 60, height: 30, mx: 'auto', textAlign: 'center' }} >3.0-3.9</Box>
                        <Box sx={{ color: 'primary.main',width: 60, height: 30, mx: 'auto', textAlign: 'center' }} >4.0-4.9</Box>
                        <Box sx={{ color: 'primary.main',width: 60, height: 30, mx: 'auto', textAlign: 'center' }} >5.0-5.9</Box>
                        <Box sx={{ color: 'primary.main',width: 60, height: 30, mx: 'auto', textAlign: 'center' }} >6.0-6.9</Box>
                        <Box sx={{ color: 'primary.main',width: 60, height: 30, mx: 'auto', textAlign: 'center' }} >7.0 +</Box>
                    </Stack>


                </Typography>
            </Box>

        </Box>
    );
}

{/* <Box sx={{ bgcolor: 'red', width: 50, height: 30 }}></Box> */ }