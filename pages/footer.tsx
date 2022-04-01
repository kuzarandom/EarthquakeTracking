import { Box, Typography } from "@mui/material";

export default function footer() {
    return (
        <Box
            sx={{
                width:'100%',
                height:60,
                bgcolor:'#2E2E2E',
                color:'#FFF'
            }}
        >
            <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center',justifyContent:'center' }}>
            <Typography variant="caption"> Copyright &copy; 2021 Earthquakes tracking | Home News About Map</Typography>
            </div>
            	
        </Box>
    );
}