import { Grid, Box, Button, TextField } from '@mui/material';
import React from 'react';
import { validatePhoneNumber } from '../../utility/validatePhone';
import { useSnackbar } from 'notistack';

const SingleContactForm = () => {
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [message, setMessage] = React.useState("");

    const [phoneError, setPhoneError] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validatePhoneNumber(phone)) {
            setPhoneError(true);
            return;
        }

        const res = await fetch("/api/send-mail", {
            body: JSON.stringify({
                email: email,
                name: name,
                lastName: lastName,
                phone: phone,
                message: message,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });

        const { error } = await res.json();
        if (error) {
            console.log(error);
            return;
        } else {
            enqueueSnackbar("Poruka uspješno poslana :)", { variant: "success" });
            setName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setMessage("");
        }
    };

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                            required
                            name="ime"
                            fullWidth
                            label="Ime"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            required
                            name="prezime"
                            fullWidth
                            label="Prezime"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                setPhoneError(false);
                            }}
                            required
                            name="telefon"
                            type="tel"
                            fullWidth
                            label="Telefon"
                            error={phoneError}
                            helperText={phoneError ? "Unesite ispravan broj telefona" : ""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            name="email"
                            fullWidth
                            label="Email"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                            required
                            name="poruka"
                            fullWidth
                            multiline
                            rows={6}
                            label="Poruka"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant='contained' type="submit" sx={{ fontSize: "18px", padding: "12px 0", fontWeight: "700 !important" }} >
                            Pošalji
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default SingleContactForm;