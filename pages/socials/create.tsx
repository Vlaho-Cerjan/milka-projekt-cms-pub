import { PrismaClient } from '@prisma/client';
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
import { social } from '../../app/interfaces/socials';
import { socialTypes } from '../../app/store/socials';

export const getStaticProps = async () => {
    const prisma = new PrismaClient();

    const socs = await prisma.socials.findMany();

    return {
        props: {
            socs
        },
    };

}

const CreateNavPage = ({ socs }: { socs: social[] }) => {
    const router = useRouter();
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = React.useState("");
    const [href, setHref] = React.useState("");
    const [type, setType] = React.useState("");

    const handleTypeChange = (e: SelectChangeEvent<string>) => {
        setType(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + 'socials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                name: name,
                href: href,
                type: type,
            })
        })
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Uspješno ste stvorili društvenu mrežu", { variant: "success" });
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
                    page_slug: "/socials/create",
                    page_title: "Stranice | Stvori Novu Društvenu Mrežu",
                    page_description: "Stranice | Stvori Društvenu Mrežu",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                Stvori Novu Društvenu Mrežu
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
                            href="/socials"
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
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Naslov")}
                            <StyledInput
                                required
                                inputVal={name}
                                inputPlaceholder={"Unesi Ime"}
                                inputChangeFunction={(value) => {
                                    setName(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Slug (Href)")}
                            <StyledInput
                                required
                                inputVal={href}
                                inputPlaceholder={"Unesi Slug"}
                                inputChangeFunction={(value) => {
                                    setHref(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Tip")}
                            <Select
                                required
                                aria-required={true}
                                value={type}
                                onChange={handleTypeChange}
                                sx={{
                                    width: "100%",
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
                                {socialTypes.map((type, index) => (
                                    <MenuItem key={index} value={type.id}>{type.name}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </StyledContainer>
    )
}

export default CreateNavPage;