import OfferList from './OfferList';
import useFetch from './useFetch';
import { Typography } from '@material-ui/core';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
const Home = () => {
    const userId = localStorage.getItem("userId")
    const OFFERS_URI = `http://localhost:8080/soa/api/offers?userId=${userId}`
    const { error, isPending, data: offers } = useFetch(OFFERS_URI)
    return (
        <div>
            <Typography variant="h6" align="center">
                Welcome {userId}, see travels offers below
            </Typography>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { offers && <OfferList offers={offers}/>}
        </div>
    )
}
export default Home;