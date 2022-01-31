import * as React from 'react';
// import { StyleSheet , ScrollView , ActivityIndicator , View ,Text} from 'react-native'
import firebase from './firebaseDB'
import { ThemeProvider } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';


export default function AddUserScreen() {

    

    return (

        <Container maxWidth="sm" color='green'>
            <Box
                sx={{
                    backgroundColor: 'lightgray',
                    mx: '20px', my: '10px', height: '95vh', textAlign: 'center', pt: '10px'
                }}
                component='form'

            >
                <Stack
                    sx={{
                        pt: '0px'
                    }}
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                >
                    <h2>Add User</h2>
                    <TextField sx={{ bgcolor: 'white' }} id="email" label="email" variant="filled" autoComplete='none' />
                    <TextField sx={{ bgcolor: 'white' }} id="userId" label="user id" variant="filled" />
                    <TextField sx={{ bgcolor: 'white' }} id="password" label="password" variant="filled" />
                    <TextField sx={{ bgcolor: 'white' }} id="tel" label="tel" variant="filled" />
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={1}
                    >
                        <Button sx={{
                            bgcolor: 'white',
                            '&:hover': {
                                backgroundColor: 'black',
                                opacity: [0.9, 0.8, 0.7],
                                color: 'white'
                            },
                            color: 'black',
                            fontWeight: 'bold'
                        }}>Submit</Button>

                        <Button
                            href="/Userscreen"
                            sx={{
                                bgcolor: 'white',
                                '&:hover': {
                                    backgroundColor: 'red',
                                    opacity: [0.9, 0.8, 0.7],
                                    color: 'white'
                                },
                                color: 'black',
                                fontWeight: 'bold'
                            }}>Go to user list</Button>
                    </Stack>
                    <Button
                        href="/Userdetailscreen"
                        sx={{
                            bgcolor: 'white',
                            '&:hover': {
                                backgroundColor: 'black',
                                opacity: [0.9, 0.8, 0.7],
                                color: 'white'
                            },
                            color: 'black',
                            fontWeight: 'bold'
                        }}>User Detail</Button>
                </Stack>
            </Box>

        </Container>


    )




}

