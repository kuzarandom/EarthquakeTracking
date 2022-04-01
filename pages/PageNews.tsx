import { Box, Button, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Link from 'next/link'
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#1A2027',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    height: 600
}));

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

function PageNews() {
    var url = 'https://newsapi.org/v2/everything?q=quake&from=2022-02-01&sortBy=publishedAt&apiKey=d3e6ab8d62df4f559318df029ede6ddc'
    var url2 = 'https://newsdata.io/api/1/news?apikey=pub_3836e16cd24eb7eedcb71ff5d55392c96f50&q=quake '
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [data, SetData] = useState<any>(null)
    const [DataTitle0, setDataTitle0] = useState<string>('')
    const [DataTitle1, setDataTitle1] = useState<string>('')
    const [DataTitle2, setDataTitle2] = useState<string>('')
    const [[page, direction], setPage] = useState([0, 0]);
    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };


    useEffect(() => {

        async function fetchMyAPI() {
            let fetchAPI = await fetch('https://newsapi.org/v2/everything?q=earthquake&sortBy=publishedAt&language=en&apiKey=d3e6ab8d62df4f559318df029ede6ddc')
                .then(res => res.json())
                .then(data => {
                    // return  data ? data.articles : []
                    // console.log(data.articles)

                    if (data.articles[0].title.length > 60) {
                        data.articles[0].title = data.articles[0].title.slice(0, 50) + '...'
                        // setDataTitle0(data.articles[0].title)
                    }
                    if (data.articles[1].title.length > 60) {
                        data.articles[1].title = data.articles[1].title.slice(0, 50) + '...'
                        // setDataTitle0(data.articles[1].title)
                    }
                    if (data.articles[2].title.length > 60) {
                        data.articles[2].title = data.articles[2].title.slice(0, 50) + '...'
                        
                    }
                    return data ? data.articles : []

                })
                .catch(error => console.log(error))
            SetData(fetchAPI)

        }
        fetchMyAPI()

    }, [])


    return (
        <Box

            sx={{
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    height: '100vh',
                    width: '100%',
                    // border: 2,
                    bgcolor: '#000000',
                    overflow: 'hidden',
                }}
            >
                <Grid container spacing={2}
                    sx={{
                        mt: 15,
                        mx:'auto',
                        // border:1,
                        color:'#fff',
                        // pl:2,
                        // px:3
                        // pr:2
                    }}
                >
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                // border: 1,
                                color: '#fff',
                                // width: 600
                            }}
                        >

                            <Box
                                sx={{
                                    backgroundImage: data ? `url(${data[0].urlToImage})` : 'url(https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg)',
                                    width: '100%',
                                    height: 300,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    mt: 2,
                                    mb: 2,
                                    mx: 'auto',
                                    backgroundPosition:'center'
                                }}
                            />
                            <Typography
                                variant='subtitle1'
                                sx={{
                                    // pl: 2,
                                    pt: 'auto',
                                    color: '#fff',
                                    // border:1,
                                    width: 'auto',
                                    height: 70,
                                    // display:'flex',
                                    mx: 'auto',
                                    textAlign: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {data ? data[0].title : []}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    width: 500,
                                    color: '#fff',
                                    // textAlign: 'left',
                                    // border:1,
                                    mx: 'auto',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    fontSize: 13,
                                    height:60
                                }}
                            >
                                {data ? data[0].content.slice(0, -16) + '...' : 'text Content'}

                            </Typography>

                            {data ? <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs={3}
                                    sx={{
                                        // border: 1,
                                        mt: 3
                                    }}
                                ><Button href={data[0].url} variant="contained" sx={{ border: 1 , ":hover":{color:'#405cff'}}}>See More</Button>
                                </Grid></Stack>
                                : <div></div>}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                // border: 1,
                                color: '#fff',
                                // width: 600
                            }}
                        >

                            <Box
                                sx={{
                                    backgroundImage: data ? `url(${data[1].urlToImage})` : 'url(https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg)',
                                    width: '100%',
                                    height: 300,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    mt: 2,
                                    mb: 2,
                                    mx: 'auto',
                                    backgroundPosition:'center'
                                }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    // color: 'black',
                                    width: 'auto',
                                    // border:1,   
                                    color: '#Fff',
                                    height: 70,
                                    mx: 'auto',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    pt: 'auto'
                                }}
                            >
                                {data ? data[1].title : []}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{

                                    width: 500,
                                    color: '#fff',
                                    textAlign: 'center',
                                    mx: 'auto',
                                    fontSize: 13,
                                    justifyContent: 'center',
                                    height:60
                                }}
                            >
                                {data ? data[1].content.slice(0, -16) + '...' : 'text Content'}

                            </Typography>
                            {data ? <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs={3}
                                    sx={{
                                        // border: 1,
                                        mt: 3
                                    }}
                                ><Button href={data[1].url} variant="contained" sx={{ border: 1 , ":hover":{color:'#405cff'}}}>See More</Button>
                                </Grid></Stack>
                                : <div></div>}
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box
                            sx={{
                                // border: 1,
                                color: '#fff',
                                // width: 600
                            }}
                        >

                            <Box
                                sx={{
                                    backgroundImage: data ? `url(${data[2].urlToImage})` : 'url(https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg)',
                                    width: '100%',
                                    height: 300,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    mt: 2,
                                    mb: 2,
                                    mx: 'auto',
                                    backgroundPosition:'center'
                                }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    color: '#fff',
                                    width: 'auto',
                                    height: 70,
                                    // border: 1,
                                    mx: 'auto',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    pt: 'auto',
                                }}
                            >
                                {data ? data[2].title : []}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    justifyContent: 'center',
                                    width: 500,
                                    color: '#fff',
                                    textAlign: 'center',
                                    mx: 'auto',
                                    fontSize: 13,
                                    height:60

                                }}
                            >
                                {data ? data[2].content.slice(0, -16) + '...' : 'text Content'}

                            </Typography>
                            {data ? <Stack
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2}
                            >
                                <Grid item xs={3}
                                    sx={{
                                        // border: 1,
                                        mt: 3
                                    }}
                                ><Button href={data[2].url} variant="contained" sx={{ border: 1, ":hover":{color: '#405cff', } }}>See More</Button>
                                </Grid></Stack>
                                : <div></div>}
                        </Box>

                    </Grid>
                    <Grid item xs={12}
                        sx={{
                            // border: 1,

                            mt: 10,
                        }}
                    >
                        <Link href="https://newsdata.io/search-news">
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={0}
                                sx={{
                                    // height: 70,
                                    // mx: 'auto',
                                    // textAlign: 'center',
                                    color: 'white',
                                    transition: 'all 0.5s',
                                    ":hover": {
                                        cursor: 'pointer',
                                        color: '#405cff',
                                        transition: 'all 0.5s',
                                    }
                                }}
                            >
                                <Typography > SEE MORE NEWS </Typography><ArrowRightIcon sx={{ mb: 0.5 }} />

                            </Stack>
                        </Link>
                    </Grid>
                </Grid>




            </Box>


        </Box>

    );
}

export default PageNews;