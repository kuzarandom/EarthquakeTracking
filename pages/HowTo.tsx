import { Box, Button } from '@mui/material';
import * as React from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

function HowTo() {

    const [Tutorial, setTutorial] = React.useState<boolean>(false)

    React.useEffect(() => {
        const cookies = parseCookies()
        if (cookies.PassTutorial == "Pass") {
            setTutorial(false)
        } else {
            setTutorial(true)
        }
    }, [])


    function TutorialCLick() {

        setTutorial(false)
        setCookie(null, 'PassTutorial', 'Pass', {
            // maxAge: 1,
            path: '/',
        })
    }

    function killCookie() {
        destroyCookie(null, 'PassTutorial')

    }
    function check() {
        const cookies = parseCookies()
        console.log(cookies)
        if (cookies.PassTutorial == "Pass") {
            console.log('ผ่าน')
        } else {
            console.log('ไม่ผ่าน')
        }
    }


    return (
        <Box>
            {Tutorial ?
                <Box
                    zIndex={5}
                    onClick={() => TutorialCLick()}
                    sx={{
                        bgcolor: 'rgba(0,0,0,0.5)',
                        width: '100vw',
                        height: '100vh',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
                :
                <Box>
                    <Button onClick={check} >check</Button>
                    <Button onClick={killCookie} >Kill</Button>
                </Box>





            }
        </Box>
    );
}

export default HowTo;