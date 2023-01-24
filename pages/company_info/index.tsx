import { PrismaClient } from '@prisma/client';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Button, Paper, Divider, Grid } from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { KeyboardArrowLeft } from '@mui/icons-material';
import React from 'react';
import { StyledLabel } from '../../app/components/common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../../app/components/common/styledInputs/styledInput';
import { useSnackbar } from 'notistack';
import { company_info } from '../../app/interfaces/company_info';

export const getStaticProps = async ({ params }: { params: { pageId: string } }) => {
    const prisma = new PrismaClient();

    const companyInfo = await prisma.company_info.findFirst({
        where: {
            id: 1
        }
    });

    return {
        props: {
            companyInfo,
        },
    };

}

const CompanyInfo = ({ companyInfo }: { companyInfo: company_info }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [company_info, setCompany_info] = React.useState<company_info | null>(null);
    const [name, setName] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [working_hours, setWorking_hours] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [address_short, setAddress_short] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [coords, setCoords] = React.useState("");

    React.useEffect(() => {
        setCompany_info(companyInfo);
        setName(companyInfo.name);
        if(companyInfo.title) setTitle(companyInfo.title);
        if(companyInfo.email) setEmail(companyInfo.email);
        if(companyInfo.url) setUrl(companyInfo.url);
        setWorking_hours(companyInfo.working_hours);
        if(companyInfo.address) setAddress(companyInfo.address);
        setAddress_short(companyInfo.address_short);
        if(companyInfo.phone) setPhone(companyInfo.phone);
        setCoords(companyInfo.coords);
    }, [companyInfo]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + 'company_info', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: 1,
                name,
                title,
                email,
                url,
                working_hours,
                address,
                address_short,
                phone,
                coords
            })
        })
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Uspješno ste ažurirali podatke", { variant: "success" });
                    fetch(process.env.NEXT_PUBLIC_API_URL+'company_info', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            setCompany_info(data);
                        })
                } else if (res.status === 400) {
                    enqueueSnackbar("Greška prilikom ažuriranja podataka", { variant: "error" });
                }
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar("Došlo je do greške", { variant: "error" });
            }
            );
    }

    return (
        <StyledContainer>
            <SEO page_info={
                {
                    page_slug: "/company_info",
                    page_title: "Stranice | Uredi podatke o tvrtki",
                    page_description: "Stranice | Uredi podatke o tvrtki",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                {company_info && company_info.title ? company_info.title : "Uredi podatke o tvrtki"}
            </Typography>
            <Paper
                component={"form"}
                onSubmit={handleSubmit}
                elevation={3}
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: "16px",
                    }}
                >
                    <Box>
                        <Button sx={{ paddingLeft: "4px" }} color="inherit" variant="contained" href="/pages">
                            <KeyboardArrowLeft sx={{ fontSize: "24px" }} /> Nazad
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' type='submit'>
                            <Typography sx={{ fontWeight: "700 !important" }}>
                                Spremi
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ mb: "16px", borderBottomWidth: "2px" }} />
                {company_info ?
                <Box
                    sx={{
                        p: "16px",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Ime")}
                            <StyledInput
                                inputVal={name}
                                inputPlaceholder={"Unesi ime tvrtke"}
                                inputChangeFunction={setName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Naslov")}
                            <StyledInput
                                inputVal={title}
                                inputPlaceholder={"Unesi naslov"}
                                inputChangeFunction={setTitle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Email")}
                            <StyledInput
                                inputVal={email}
                                inputPlaceholder={"Unesi email"}
                                inputChangeFunction={setEmail}
                                type="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("URL")}
                            <StyledInput
                                inputVal={url}
                                inputPlaceholder={"Unesi url"}
                                inputChangeFunction={setUrl}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Radno vrijeme")}
                            <StyledInput
                                inputVal={working_hours}
                                inputPlaceholder={"Unesi radno vrijeme"}
                                inputChangeFunction={setWorking_hours}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Adresa")}
                            <StyledInput
                                inputVal={address}
                                inputPlaceholder={"Unesi adresu"}
                                inputChangeFunction={setAddress}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Adresa (kratko)")}
                            <StyledInput
                                inputVal={address_short}
                                inputPlaceholder={"Unesi adresu (kratko)"}
                                inputChangeFunction={setAddress_short}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Telefon")}
                            <StyledInput
                                inputVal={phone}
                                inputPlaceholder={"Unesi telefon"}
                                inputChangeFunction={setPhone}
                                type="tel"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Koordinate")}
                            <StyledInput
                                inputVal={coords}
                                inputPlaceholder={"Unesi koordinate"}
                                inputChangeFunction={setCoords}
                            />
                        </Grid>
                    </Grid>
                </Box>
                :
                null
                }
            </Paper>
        </StyledContainer>
    )
}

export default CompanyInfo;