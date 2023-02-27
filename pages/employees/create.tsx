import { PrismaClient, employees } from '@prisma/client';
import { navigation } from '../../app/interfaces/navigation';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Button, Paper, Divider, Grid, FormControl, MenuItem, Select, styled, SelectChangeEvent } from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { KeyboardArrowLeft } from '@mui/icons-material';
import React from 'react';
import { StyledLabel } from '../../app/components/common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../../app/components/common/styledInputs/styledInput';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { CustomThemeContext } from '../../app/store/customThemeContext';
import StyledUpload from '../../app/components/common/styledInputs/styledUpload/styledUpload';
import { UploadFileContainer } from '../../app/components/common/styledInputs/styledUploadFormContainer/styledUploadFormContainer';
import { UploadFileFormLabel } from '../../app/components/common/styledInputs/styledUploadFormLabel/styledUploadFormLabel';

export const getStaticProps = async () => {
    const prisma = new PrismaClient();

    const employees = await prisma.employees.findMany({
        where: {
            active: 1
        }
    });

    return {
        props: {
            employees
        },
    };

}

const CreateEmployeePage = ({ employees }: { employees: employees[] }) => {
    const router = useRouter();
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();
    const [first_name, setFirstName] = React.useState("");
    const [aditional_names, setAditionalNames] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [employe_title, setEmployeTitle] = React.useState("");
    const [bio, setBio] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [image, setImage] = React.useState("");
    const [slug, setSlug] = React.useState("");
    const [alt, setAlt] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + 'employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                first_name,
                aditional_names,
                last_name,
                title,
                bio,
                email,
                phone,
                employe_title,
                img_src: image,
                slug,
                alt
            })
        })
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Uspješno ste stvorili doktora", { variant: "success" });
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
                    page_slug: "/employees/create",
                    page_title: "Stranice | Stvori Novog Zaposlenika",
                    page_description: "Stranice | Stvori Novog Zaposlenika",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                Stvori Novog Zaposlenika
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
                            href="/employees"
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
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            {StyledLabel("Ime")}
                            <StyledInput
                                required

                                inputVal={first_name}
                                inputPlaceholder={"Unesi Ime"}
                                inputChangeFunction={(value) => {
                                    setFirstName(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            {StyledLabel("Srednje ime")}
                            <StyledInput

                                inputVal={aditional_names}
                                inputPlaceholder={"Unesi Srednje Ime"}
                                inputChangeFunction={(value) => {
                                    setAditionalNames(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            {StyledLabel("Prezime")}
                            <StyledInput

                                inputVal={last_name}
                                inputPlaceholder={"Unesi Prezime"}
                                inputChangeFunction={(value) => {
                                    setLastName(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            {StyledLabel("Titula")}
                            <StyledInput

                                inputVal={title}
                                inputPlaceholder={"Unesi Titulu"}
                                inputChangeFunction={(value) => {
                                    setTitle(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            {StyledLabel("Titula Zaposlenika")}
                            <StyledInput

                                inputVal={employe_title}
                                inputPlaceholder={"Unesi Titulu Zaposlenika"}
                                inputChangeFunction={(value) => {
                                    setEmployeTitle(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            {StyledLabel("Biografija")}
                            <StyledInput
                                multiline
                                rows={4}

                                inputVal={bio}
                                inputPlaceholder={"Unesi Biografiju"}
                                inputChangeFunction={(value) => {
                                    setBio(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            {StyledLabel("Email")}
                            <StyledInput
                                type='email'

                                inputVal={email}
                                inputPlaceholder={"Unesi Email"}
                                inputChangeFunction={(value) => {
                                    setEmail(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} >
                            {StyledLabel("Telefon")}
                            <StyledInput

                                inputVal={phone}
                                inputPlaceholder={"Unesi Telefon"}
                                inputChangeFunction={(value) => {
                                    setPhone(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            {StyledLabel("Slug (Href)")}
                            <StyledInput

                                inputVal={slug}
                                inputPlaceholder={"Unesi Slug"}
                                inputChangeFunction={(value) => {
                                    setSlug(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                            {StyledLabel("Opis Slike")}
                            <StyledInput
                                multiline
                                rows={4}

                                inputVal={alt}
                                inputPlaceholder={"Unesi Opis Slike"}
                                inputChangeFunction={(value) => {
                                    setAlt(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <UploadFileContainer>
                                <UploadFileFormLabel>SLIKA</UploadFileFormLabel>
                                <StyledUpload aspectRatio={1/1} type="image" file={image} setFile={setImage} />
                            </UploadFileContainer>
                        </Grid>

                    </Grid>
                </Box>
            </Paper>
        </StyledContainer>
    )
}

export default CreateEmployeePage;