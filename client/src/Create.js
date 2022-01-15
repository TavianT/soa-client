import { TextField, Button, Typography } from "@material-ui/core";
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { AlertTitle, Alert } from '@mui/material';
import DateAdapter from '@mui/lab/AdapterDayjs';
import dayjs from 'dayjs'
import { useState } from "react";
const Create = () => {
    const [name, setName] = useState('')
    const [date, setDate] = useState(dayjs().add(1,'day'))
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [latitudeError, setLatitudeError] = useState(false)
    const [longitudeError, setLongitudeError] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const numberRegex = /^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$/

    const handleSubmitProposal = (e) => {
        e.preventDefault()
        const msgId = "" //msgId provided in backend
        const userId = localStorage.getItem("userId")
        const tripProposalDate = date.format('DD/MM/YYYY').toString()
        const location = {name, latitude, longitude}
        const proposal = {userId, msgId, tripProposalDate, location}
        fetch('http://localhost:8080/soa/api/proposal/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(proposal)
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if ("errorCode" in data) {
                setError(data.message)
            } else {
                setSuccess(`Proposal submitted successfully with an id of ${data.msgId}`)
                const proposal_storage_name = `${name}_${tripProposalDate}`
                localStorage.setItem(proposal_storage_name, JSON.stringify(proposal))

            }
        })

    }

    const handleLatitudeChange = (value) => {
       setLatitude(value)
       if(!numberRegex.test(value) || parseFloat(value) > 90 || parseFloat(value) < -90) {
           setLatitudeError(true)
       } else {
           setLatitudeError(false)
       }
    }

    const handleLongitudeChange = (value) => {
        setLongitude(value)
        if(!numberRegex.test(value) || parseFloat(value) > 180 || parseFloat(value) < -180) {
            setLongitudeError(true)
        } else {
            setLongitudeError(false)
        }
     }

    return(
        <div className="create">
            <Typography variant='h4' >
                Create a new travel proposal
            </Typography>
            {error && <div><Alert severity="error" onClose={() => setError('')} variant="filled">
                <AlertTitle>Error</AlertTitle>
                {error}
                </Alert></div>}
            {success && <div><Alert severity="success" onClose={() => setSuccess('')} variant="filled">
            <AlertTitle>Success</AlertTitle>
            {success}
            </Alert></div>}
            <form onSubmit={handleSubmitProposal}>
                <div>
                    <TextField
                    required
                    margin="normal"
                    label="Location name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                    </TextField>
                </div>
                <div>
                    <LocalizationProvider dateAdapter={DateAdapter}>
                        <DesktopDatePicker
                        label="Trip date"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        minDate={dayjs().add(1,'day')}
                        onChange={(newDate) => {
                            setDate(newDate)
                        }}
                        renderInput={(params) => <TextField {...params} />}>
                        </DesktopDatePicker>
                    </LocalizationProvider>
                </div>
                <div>
                    <TextField
                    error={latitudeError}
                    required
                    margin="normal"
                    inputProps={{inputMode: "numeric", pattern:"^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$"}}
                    label="Latitude"
                    value={latitude}
                    helperText="Latitude must be between -90 and 90"
                    onChange={(e) => handleLatitudeChange(e.target.value)}>
                    </TextField>
                </div>
                <div>
                    <TextField
                    error={longitudeError}
                    required
                    margin="normal"
                    inputProps={{inputMode: "numeric", pattern:"^[+-]?([0-9]+.?[0-9]*|.[0-9]+)$"}}
                    label="Longitude"
                    value={longitude}
                    helperText="Longitude must be between -180 and 180"
                    onChange={(e) => handleLongitudeChange(e.target.value)}>
                    </TextField>
                </div>
                <div>
                    <Button variant="contained" color="primary" onClick={handleSubmitProposal}>
                            SUBMIT
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Create;