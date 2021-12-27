import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Nav from './Nav'

const Appbar = () => {
    const userIdSet = localStorage.getItem("userId")
    return (
        <div className="Appbar">
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h4">
                        Travel Opportunities
                    </Typography>
                    {userIdSet && <Nav/>}
                </Toolbar>
            </AppBar>
        </div> 
        
    );
}
 
export default Appbar;