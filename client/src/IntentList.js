import { Container, Grid, Card, CardContent, Typography, Button } from "@material-ui/core";
import { AlertTitle, Alert } from '@mui/material';
import { useState } from "react";

const IntentList = ({intents}) => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    
    for (const intent of intents) {
        let travel_intents = JSON.parse(localStorage.getItem("intents"))
        if(travel_intents === null) {
            console.log("creating new travel intent storage");
            travel_intents = [intent]
            localStorage.setItem("intents", JSON.stringify(travel_intents))
            continue
        } else {
            console.log("adding to travel intent storage");
            travel_intents.push(intent)
            localStorage.setItem("intents", JSON.stringify(travel_intents))
            continue
        }
    }

    const submitAcknowledgement = (intent) => {
        console.log(intent)
        const userId = localStorage.getItem("userId")
        const intentUserId = intent.userId
        const msgId = intent.msgId

        let doc = document.implementation.createDocument("", "", null);
        let ackElem = doc.createElement("acknowledgement")
        let userIdElem = doc.createElement("userId")
        let intentUserIdElem = doc.createElement("intentUserId")
        let msgIdElem = doc.createElement("msgId")
        userIdElem.textContent = userId
        intentUserIdElem.textContent = intentUserId
        msgIdElem.textContent = msgId
        ackElem.appendChild(userIdElem)
        ackElem.appendChild(intentUserIdElem)
        ackElem.appendChild(msgIdElem)
        doc.appendChild(ackElem)
        const acknowledgement = new XMLSerializer().serializeToString(doc)
        console.log(acknowledgement);
        fetch('http://localhost:8080/soa/api/create-acknowledgement', {
            method: 'POST',
            headers: { "Content-Type": "application/xml" },
            body: acknowledgement
        }).then((res) => {
            const content_type = res.headers.get("Content-Type")
            if(content_type === "application/xml") {
                setSuccess(`Successfully acknowledged ${intentUserId}'s travel intent`)
            } else {
                return res.json()
            }
        }).then((data) => {
            if("errorCode" in data) {
                setError(data.message)
            }
        })
    }

    return (
        <Container className="intent-list">
            <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}>
                {error && <div><Alert severity="error" onClose={() => {setError('')}} variant="filled">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                </Alert></div>}
                {success && <div><Alert severity="success" onClose={() => setSuccess('')} variant="filled">
                    <AlertTitle>Success</AlertTitle>
                    {success}
                </Alert></div>}
                {intents.map(intent => (
                    <Grid item className="intent-item">
                        <Card>
                            <CardContent>
                                <Typography noWrap>
                                    User {intent.userId} has shown intent in the trip with msgId: {intent.msgId}
                                </Typography>
                                <Button variant="contained" color="primary" onClick={() => submitAcknowledgement(intent)}>
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