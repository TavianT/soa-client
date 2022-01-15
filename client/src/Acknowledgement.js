import { Typography } from '@material-ui/core'
import useFetch from './useFetch'
import AcknowledgementList from './AcknowledgementList'
const Acknowledgement = () => {
    const { error, isPending, data: acks } = useFetch('http://localhost:8080/soa/api/read-acknowledgements?userId='+localStorage.getItem("userId"))
    return (
        <div className="acknowledgements">
            <Typography variant="h6" align="center">
                Here is a list of users who have acknowledged your travel intentions 
            </Typography>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div> }
            { acks && <AcknowledgementList acknowledgements={acks.acknowledgements.acknowledgement}/>}
        </div>
    )
}
export default Acknowledgement;