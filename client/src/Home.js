import OfferList from './OfferList';
import useFetch from './useFetch';
import { Typography } from '@material-ui/core';
const Home = () => {
    const userId = localStorage.getItem("userId")
    const OFFERS_URI = `http://localhost:8080/soa/api/offers?userId=${localStorage.getItem("userId")}`
    const { error, isPending, data: offers } = useFetch(OFFERS_URI)
    return (
        <div>
            <Typography variant="h6" align="center">
                Welcome {localStorage.getItem("userId")}, see travels offers below
            </Typography>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { offers && <OfferList offers={offers}/>}
        </div>
    )
}
export default Home;