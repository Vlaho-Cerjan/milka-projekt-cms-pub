import { PrismaClient } from '@prisma/client';
import { page_info } from '../../app/interfaces/page_info';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Button, Paper, Divider, Grid } from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { KeyboardArrowLeft } from '@mui/icons-material';
import React from 'react';
import { StyledLabel } from '../../app/components/common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../../app/components/common/styledInputs/styledInput';
import { UploadFileContainer } from '../../app/components/common/styledInputs/styledUploadFormContainer/styledUploadFormContainer';
import { UploadFileFormLabel } from '../../app/components/common/styledInputs/styledUploadFormLabel/styledUploadFormLabel';
import StyledUpload from '../../app/components/common/styledInputs/styledUpload/styledUpload';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { CustomThemeContext } from '../../app/store/customThemeContext';
import { InferGetStaticPropsType } from "next";
import { getLastWordFromHref } from '../../app/utility/getLastWordFromHref';

export const getStaticProps = async ({ params }: { params: { pageId: string } }) => {
    const prisma = new PrismaClient();

    // get pages from database, replace "-" with "/" and replace "naslovna" with "/"
    const page = await prisma.page_info.findFirst({
        where: {
            page_slug: params.pageId === "naslovna" ? "/" : {
                contains: params.pageId,
            }
        }
    });

    if (!page) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            page,
        },
    };

}

export const getStaticPaths = async () => {
    const prisma = new PrismaClient();

    const page_info = await prisma.page_info.findMany();

    // set paths for static pages from database,replace "/" with "naslovna", else remove first "/" from page_slug and replace other "/" with "-"
    const paths = page_info.map((page) => ({
        params: {
            pageId: (page.page_slug === "/" ? "naslovna" : getLastWordFromHref(page.page_slug))
        },
    }));

    console.log(paths)

    return { paths, fallback: false };
}

const Page = ({ page }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter();
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();
    const [title, setTitle] = React.useState(page.title);
    const [page_title, setPage_title] = React.useState(page.page_title);
    const [page_description, setPage_description] = React.useState(page.page_description);
    const [page_slug, setPage_slug] = React.useState(page.page_slug);
    const [image, setImage] = React.useState(page.image);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + 'page_info', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            },
            body: JSON.stringify({
                id: page.id,
                title: title,
                page_title: page_title,
                page_description: page_description,
                page_slug: page_slug,
                image: image.includes("base64") ? image : null,
            })
        })
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Uspješno ste ažurirali podatke", { variant: "success" });
                    router.back();
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
                    page_slug: "/pages" + (page.page_slug === "/" ? "/naslovna" : page.page_slug),
                    page_title: "Stranice | " + page.page_title,
                    page_description: "Stranice | " + page.page_description,
                    image: page.image,
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                {page.title ? page.title : "Naslovna"}
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
                        <Button sx={{
                            paddingLeft: "4px",
                            backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[200],
                            color: isDark ? "#fff" : "#333",
                            '&:hover': {
                                backgroundColor: isDark ? theme.palette.grey[600] : theme.palette.grey[300],
                            }
                        }} variant="contained" href="/pages">
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
                                inputVal={title}
                                inputPlaceholder={"Unesi naslov"}
                                inputChangeFunction={setTitle}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Slug (URL)")}
                            <StyledInput
                                inputVal={page_slug}
                                inputPlaceholder={"Unesi slug (URL)"}
                                inputChangeFunction={setPage_slug}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {StyledLabel("Meta Naslov")}
                            <StyledInput
                                inputVal={page_title}
                                inputPlaceholder={"Unesi meta naslov"}
                                inputChangeFunction={setPage_title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {StyledLabel("Meta Opis")}
                            <StyledInput
                                inputVal={page_description}
                                inputPlaceholder={"Unesi meta opis"}
                                inputChangeFunction={setPage_description}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UploadFileContainer sx={{ paddingBottom: "40px" }}>
                                <UploadFileFormLabel>META SLIKA (1200x630)</UploadFileFormLabel>
                                <StyledUpload aspectRatio={1.91 / 1} type="image" file={image} setFile={setImage} resizeSizes={{ width: 1200, height: 630 }} />
                            </UploadFileContainer>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </StyledContainer>
    )
}

export default Page;