import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Button, Paper, Divider, Grid } from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { KeyboardArrowLeft } from '@mui/icons-material';
import React from 'react';
import { StyledLabel } from '../../app/components/common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../../app/components/common/styledInputs/styledInput';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { CustomThemeContext } from '../../app/store/customThemeContext';

const CreateFaqPage = () => {
    const router = useRouter();
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + 'faq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                title: title,
                content: content,
            })
        })
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Uspješno ste stvorili faq", { variant: "success" });
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
                    page_slug: "/faq/create",
                    page_title: "Stranice | Stvori Novo Pitanje",
                    page_description: "Stranice | Stvori Novo Pitanje",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                Stvori Novo Pitanje
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
                            href="/faq"
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
                        <Grid item xs={12} sm={6} md={5}>
                            {StyledLabel("Naslov")}
                            <StyledInput
                                multiline
                                rows={4}
                                required
                                inputVal={title}
                                inputPlaceholder={"Unesi Naslov"}
                                inputChangeFunction={(value) => {
                                    setTitle(value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={7}>
                            {StyledLabel("Sadržaj")}
                            <StyledInput
                                multiline
                                rows={4}
                                required
                                inputVal={content}
                                inputPlaceholder={"Unesi Sadžaj"}
                                inputChangeFunction={(value) => {
                                    setContent(value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </StyledContainer>
    )
}

export default CreateFaqPage;