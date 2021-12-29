import { Container, Grid, Card, CardHeader, CardContent, Typography, Button } from "@material-ui/core";
import { AlertTitle, Alert } from '@mui/material';
import { useState } from "react";
const OfferList = ({offers}) => {

    const [error, setError] = useState('')

    const submitIntent = (offer) => {
        const userId = localStorage.getItem("userId")
        const proposalUserId = offer.proposal.userId
        const msgId = offer.proposal.msgId

        const intent = {userId, proposalUserId, msgId}
        fetch('http://localhost:8080/soa/api/create-intent', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(intent)
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if("errorCode" in data) {
                setError(data.message)
            }
        })
    }
    return (
        <Container className="offer-list">
            {error && <div><Alert severity="error" onClose={() => {setError('')}} variant="filled">
                <AlertTitle>Error</AlertTitle>
                {error}
                </Alert></div>}
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>

            {offers.map(offer=> (
                <Grid item className="offer-item">
                    <Card>
                    <CardHeader
                    title={offer.proposal.location.name + " | " + offer.proposal.tripProposalDate}>
                    </CardHeader>
                    <CardContent>
                        <Typography noWrap>
                            {offer.proposal.location.latitude},{offer.proposal.location.longitude}
                        </Typography>
                        <Typography noWrap>
                            {offer.weather.temp}C | {offer.weather.windSpeed}kmph | {offer.weather.weatherDesc}
                        </Typography>
                        <Button variant="contained" onClick={() => submitIntent(offer)}>
                            SUBMIT INTENT
                        </Button>
                    </CardContent>
                    </Card>
                </Grid>
                ))}
        </Grid>
        </Container>
    );
}

export default OfferList;