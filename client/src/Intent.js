import { Typography } from '@material-ui/core'
import useFetch from './useFetch'
import IntentList from './IntentList'
const Intent = () => {
    const { error, isPending, data: intents } = useFetch('http://localhost:8080/soa/api/read-intents?userId='+localStorage.getItem("userId"))
    return(
        <div className='intents'>
            <Typography variant="h6" align="center">
                Here is a list of users who shown an intent to Travel
            </Typography>
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div> }
            { intents && <IntentList intents={intents}/>}
        </div>
    )
}
export default Intent;