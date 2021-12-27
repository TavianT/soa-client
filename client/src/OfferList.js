import { Container, Grid, Card, CardHeader, CardContent, Typography, Button } from "@material-ui/core";
const OfferList = ({offers}) => {
    return (
        <Container className="offer-list">
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
                    title={offer.proposal.location.name + " - " + offer.proposal.tripProposalDate}>
                    </CardHeader>
                    <CardContent>
                        <Typography noWrap>
                            {offer.proposal.location.latitude},{offer.proposal.location.longitude}
                        </Typography>
                        <Typography noWrap>
                            {offer.weather.temp}C | {offer.weather.windSpeed}kmph | {offer.weather.weatherDesc}
                        </Typography>
                        <Button variant="contained">
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