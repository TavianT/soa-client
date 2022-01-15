import { Container, Grid, Card, CardContent, Typography } from "@material-ui/core";

const AcknowledgementList = ({acknowledgements}) => {
    console.log(`acknowledgement list ${acknowledgements}`);
    return (
        <Container className="acknowledgement-list">
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}></Grid>

            {acknowledgements.map(ack => (
                <Grid item className="acknowledgement-item">
                    <Card>
                        <CardContent>
                            <Typography>
                                User {ack.userId} has acknowledged your travel intent to the trip with msgId: {ack.msgId}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Container>
    )
}

export default AcknowledgementList