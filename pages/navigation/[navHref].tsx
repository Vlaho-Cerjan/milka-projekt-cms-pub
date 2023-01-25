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

export const getStaticProps = async ({ params }: { params: { navHref: string } }) => {
    const prisma = new PrismaClient();

    const navs = await prisma.navigation.findMany();

    const nav = await prisma.navigation.findFirst({
        where: {
            href: params.navHref === "naslovna" ? "/" : "/" + params.navHref
        }
    });

    if (!nav) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            nav,
            navs
        },
    };

}

export const getStaticPaths = async () => {
    const prisma = new PrismaClient();

    // exclude routes that are # or / or /# or /#
    const navigation = await prisma.navigation.findMany({
        where: {
            href: {
                not: {
                    in: ["#", "/", "/#", "/#"]
                }
            },
            active: 1
        }
    });

    const getLastWord = (str: string) => {
        const last = str.trim().split("/").pop();
        if (last) {
            return last;
        }
        return "";
    }

    const paths = navigation.map((nav) => ({
        params: { navHref: nav.href === "/" ? "naslovna" : getLastWord(nav.href) },
    }));

    return { paths, fallback: false };
}

const NavPage = ({ nav, navs }: { nav: navigation, navs: navigation[] }) => {
    const router = useRouter();
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = React.useState(nav.name);
    const [href, setHref] = React.useState(nav.href);
    const [parent, setParent] = React.useState<number | null>(-1);
    const [active, setActive] = React.useState(nav.active);

    React.useEffect(() => {
        if (navs) {
            const tempNavParent = navs.find(navTemp => navTemp.id === nav.parent_id);
            if (tempNavParent) {
                setParent(tempNavParent.id);
                setParentSelectValue(tempNavParent.id);
            }
        }
    }, [navs]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + 'navigation', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: nav.id,
                name: name,
                href: href,
                parent_id: parent,
                active: active,
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

    const [parentSelectValue, setParentSelectValue] = React.useState(parent);

    const handleChange = (e: SelectChangeEvent<number | null>) => {
        if (typeof e.target.value === "number") {
            setParent(e.target.value);
            setParentSelectValue(e.target.value);
        }
    }

    return (
        <StyledContainer>
            <SEO page_info={
                {
                    page_slug: "/navigation/" + nav.id,
                    page_title: "Stranice | " + nav.name,
                    page_description: "Stranice | " + nav.name,
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                {nav.name ? nav.name : "Navigacija"}
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
                        }} variant="contained" href="/navigation">
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
                            {StyledLabel("Slug - unesite # za dropdown")}
                            <StyledInput
                                inputVal={href}
                                inputPlaceholder={"Unesi slug (URL)"}
                                inputChangeFunction={setHref}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {StyledLabel("Roditelj")}
                            <FormControl fullWidth>
                                <Select
                                    id="demo-simple-select"
                                    value={parentSelectValue}
                                    onChange={handleChange}
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
                                    <MenuItem value={-1}>Nema Roditelja</MenuItem>
                                    {navs.filter((navTemp) => navTemp.id !== nav.id && navTemp.href === "#").map(
                                        (navTemp) => (
                                            <MenuItem key={navTemp.id} value={navTemp.id}>
                                                {navTemp.name}
                                            </MenuItem>
                                        )
                                    )
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            {StyledLabel("Aktivan")}
                            <FormControl fullWidth>
                                <Select
                                    id="demo-simple-select"
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
                    </Grid>
                </Box>
            </Paper>
        </StyledContainer>
    )
}

export default NavPage;