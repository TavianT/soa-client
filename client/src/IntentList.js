import { Container, Grid, Card, CardHeader, CardContent, Typography, Button } from "@material-ui/core";

const IntentList = ({intents}) => {
    return (
        <Container className="intent-list">
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
                {intents.map(offer => (
                    <Grid item className="intent-item">
                        <Card>
                            <CardContent>
                                <Typography noWrap>
                                    User {offer.userId} has shown intent in the trip with msgId: {offer.msgId}
                                </Typography>
                                <Button variant="contained" color="primary">
                                    ACKNOWLEDGE TRAVEL INTENT
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
export default IntentList;