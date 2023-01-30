import { PrismaClient, doctors, services_list, services_price_list } from '@prisma/client';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Button, Paper, Divider, Grid, FormControl, MenuItem, Select, styled, SelectChangeEvent, Checkbox } from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { KeyboardArrowLeft } from '@mui/icons-material';
import React from 'react';
import { StyledLabel } from '../../app/components/common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../../app/components/common/styledInputs/styledInput';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { CustomThemeContext } from '../../app/store/customThemeContext';
import { UploadFileContainer } from '../../app/components/common/styledInputs/styledUploadFormContainer/styledUploadFormContainer';
import { UploadFileFormLabel } from '../../app/components/common/styledInputs/styledUploadFormLabel/styledUploadFormLabel';
import StyledUpload from '../../app/components/common/styledInputs/styledUpload/styledUpload';
import { InferGetStaticPropsType } from "next";
import ServicesPrices from '../../app/components/servicePage/servicesPrices';

export const getStaticProps = async () => {
    const prisma = new PrismaClient();

    const db_doctors = await prisma.doctors.findMany({
        where: {
            active: 1
        }
    });

    return {
        props: {
            db_doctors
        },
    };

}


const CreateServicePage = ({ db_doctors }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [doctors, setDoctors] = React.useState<number[]>([]);
    const [active, setActive] = React.useState(1);
    const [image, setImage] = React.useState("");
    const [slug, setSlug] = React.useState("");
    const [alt, setAlt] = React.useState("");
    const [servicePrices, setServicePrices] = React.useState<{
        title: string;
        description: string;
        value: number;
        discount: number;
    }[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + 'services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                description: description,
                doctors_id: doctors,
                img_src: image,
                slug: slug,
                alt: alt,
                active: active,
            })
        })
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Uspješno ste stvorili uslugu", { variant: "success" });
                    router.back();
                } else if (res.status === 400) {
                    enqueueSnackbar("Greška prilikom stvaranja", { variant: "error" });
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
                    page_slug: "/services/create",
                    page_title: "Stranice | Stvori Novu Uslugu",
                    page_description: "Stranice | Stvori Novu Uslugu",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                Stvori Novu Uslugu
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
                        <Button
                            sx={{
                                paddingLeft: "4px",
                                backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[200],
                                color: isDark ? "#fff" : "#333",
                                '&:hover': {
                                    backgroundColor: isDark ? theme.palette.grey[600] : theme.palette.grey[300],
                                }
                            }}
                            variant="contained"
                            href="/services"
                        >
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
                <Box
                    sx={{
                        p: "16px",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {StyledLabel("Ime")}
                            <StyledInput
                                inputVal={name}
                                inputPlaceholder={"Unesi ime"}
                                inputChangeFunction={setName}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {StyledLabel("Opis")}
                            <StyledInput
                                inputVal={description}
                                multiline
                                minRows={5}
                                inputPlaceholder={"Unesi opis"}
                                inputChangeFunction={setDescription}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {StyledLabel("Slug")}
                            <StyledInput
                                inputVal={slug}
                                inputPlaceholder={"Unesi slug/href (npr. 'ime-usluge')"}
                                inputChangeFunction={setSlug}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {StyledLabel("Aktivan")}
                            <FormControl fullWidth>
                                <Select
                                    id="active-select"
                                    value={active}
                                    onChange={(e) => setActive(e.target.value as number)}
                                    sx={{
                                        fontSize: "14px",

                                        '& fieldset': {
                                            borderRadius: "12px",
                                            borderWidth: "2px",
                                        },

                                        '& .MuiSelect-select': {
                                            fontSize: "1em",
                                            fontWeight: 500,
                                        },
                                    }}
                                >
                                    <MenuItem value={1}>Da</MenuItem>
                                    <MenuItem value={0}>Ne</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {StyledLabel("Doktori")}
                            <FormControl fullWidth>
                                <Select
                                    multiple
                                    id="doctors-select"
                                    placeholder='Odaberi doktore'
                                    aria-placeholder='Odaberi doktore'
                                    value={doctors}
                                    onChange={(e) => setDoctors(e.target.value as number[])}
                                    sx={{
                                        fontSize: "14px",

                                        '& fieldset': {
                                            borderRadius: "12px",
                                            borderWidth: "2px",
                                        },

                                        '& .MuiSelect-select': {
                                            fontSize: "1em",
                                            fontWeight: 500,
                                        },
                                    }}
                                >
                                    {db_doctors.map((doctor) => (
                                        <MenuItem sx={{ display: "flex", alignItems: "center" }} key={doctor.id} value={doctor.id}>
                                            <Checkbox sx={{ padding: "0 4px 0 0" }} checked={doctors.indexOf(doctor.id) > -1} />
                                            {doctor.first_name + " " + (doctor.aditional_names ? doctor.aditional_names + " " : "") + doctor.last_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {StyledLabel("Opis slike (alt)")}
                            <StyledInput
                                inputVal={alt}
                                multiline
                                minRows={5}
                                inputPlaceholder={"Unesi opis slike (alt)"}
                                inputChangeFunction={setAlt}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <UploadFileContainer>
                                <UploadFileFormLabel>SLIKA (600x337.5)</UploadFileFormLabel>
                                <StyledUpload aspectRatio={16 / 9} type="image" file={image} setFile={setImage} resizeSizes={{ width: 600, height: 337.5 }} />
                            </UploadFileContainer>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Divider sx={{ my: "16px", borderBottomWidth: "2px" }} />
            <Paper
                elevation={3}
            >
                <ServicesPrices
                    servicePrices={servicePrices}
                    setServicePrices={setServicePrices}
                />
            </Paper>
        </StyledContainer>
    )
}

export default CreateServicePage;