import {Button, Typography} from '@material-ui/core'
import useFetch from "./useFetch";
const Generateid = () => {

    const getId = () => {
        fetch('http://localhost:8080/soa/api/user')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("userId", data.id)
            window.location.replace("/")
        });
    }
    return (
        <div className='Generateid'>
            <Typography variant="h6" align="center">
                Click the button below to generate a userId
            </Typography>
            <Button variant="outlined" fullWidth={true} onClick={getId}>
                Generate ID
            </Button>
        </div>
    )
}

export default Generateid;