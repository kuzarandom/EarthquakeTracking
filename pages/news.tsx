import React, { Component } from 'react'
import { ThemeProvider } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Paper } from '@mui/material';

export default function News() {

    return (
        <Box
            sx={{
                height: '100vh',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    fontSize: 40,
                    fontWeight: 900,
                    fontFamily: '"Arial Black", Gadget, sans-serif;',
                    letterSpacing: 2.8,
                    width: '100%',
                    wordSpacing: -5,
                    fontVariant: 'snall-caps',
                    color: '#333333',
                    textShadow: '2px 2px 0px #FFFFFF, 5px 4px 0px rgba(0,0,0,0.15)',
                    textAlign: 'center',
                    pt: 10,
                    
                }}
            >
                NEWS
            </Box>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={15}
                pt='25vh'
            >
                <Paper
                    sx={{
                        
                        height: '500px',
                        width: '400px',
                        bgcolor: '#3B425B',
                        p: 2,

                    }}
                >
                    <Box
                        sx={{
                            textShadow: '1px 3px 0 #969696, 1px 13px 5px #aba8a8, 2px 2px 2px rgba(206,89,55,0)',
                            fontFamily: 'Impact, Charcoal, sans-serif',
                            fontSize: 40,
                            letterSpacing: '4px',
                            wordSpacing: 1.6,
                            fontVariant: 'small-caps',
                            color: '#FFFFFF',
                        }}
                    >
                        HEADING1
                    </Box>
                    <Box
                        sx={{
                            pt: 2,
                            color: '#FFF',
                            fontFamily: '"Times New Roman", Times, serif;',
                            letterSpacing: '4px',
                            wordSpacing: -0.4,
                            fontWeight: 400,
                            fontSize: 25
                        }}
                    >
                        Content
                    </Box>

                </Paper>    

                <Paper
                    sx={{
                        
                        height: '500px',
                        width: '400px',
                        bgcolor: '#3B425B',
                        p: 2,

                    }}
                >
                    <Box
                        sx={{
                            textShadow: '1px 3px 0 #969696, 1px 13px 5px #aba8a8, 2px 2px 2px rgba(206,89,55,0)',
                            fontFamily: 'Impact, Charcoal, sans-serif',
                            fontSize: 40,
                            letterSpacing: '4px',
                            wordSpacing: 1.6,
                            fontVariant: 'small-caps',
                            color: '#FFFFFF',
                        }}
                    >
                        HEADING2
                    </Box>
                    <Box
                        sx={{
                            pt: 2,
                            color: '#FFF',
                            fontFamily: '"Times New Roman", Times, serif;',
                            letterSpacing: '4px',
                            wordSpacing: -0.4,
                            fontWeight: 400,
                            fontSize: 25
                        }}
                    >
                        Content
                    </Box>

                </Paper>
                <Paper
                    sx={{
                        
                        height: '500px',
                        width: '400px',
                        bgcolor: '#3B425B',
                        p: 2,

                    }}
                >
                    <Box
                        sx={{
                            textShadow: '1px 3px 0 #969696, 1px 13px 5px #aba8a8, 2px 2px 2px rgba(206,89,55,0)',
                            fontFamily: 'Impact, Charcoal, sans-serif',
                            fontSize: 40,
                            letterSpacing: '4px',
                            wordSpacing: 1.6,
                            fontVariant: 'small-caps',
                            color: '#FFFFFF',
                        }}
                    >
                        HEADING3
                    </Box>
                    <Box
                        sx={{
                            pt: 2,
                            color: '#FFF',
                            fontFamily: '"Times New Roman", Times, serif;',
                            letterSpacing: '4px',
                            wordSpacing: -0.4,
                            fontWeight: 400,
                            fontSize: 25
                        }}
                    >
                        Content
                    </Box>

                </Paper>




            </Stack>


        </Box>
    )
}