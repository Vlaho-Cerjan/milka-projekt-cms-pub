import { PrismaClient } from '@prisma/client';
import { social } from '../../app/interfaces/socials';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Button, Paper, Divider, Grid, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { EditOutlined, KeyboardArrowLeft, DeleteOutlineOutlined, SaveOutlined, CancelOutlined } from '@mui/icons-material';
import React from 'react';
import { StyledLabel } from '../../app/components/common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../../app/components/common/styledInputs/styledInput';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { CustomThemeContext } from '../../app/store/customThemeContext';
import { socialTypes } from '../../app/store/socials';

export const getStaticProps = async ({ params }: { params: { pageId: string } }) => {
    const prisma = new PrismaClient();

    const socialsArray = await prisma.socials.findMany({
        where: {
            active: 1
        }
    });

    return {
        props: {
            socialsArray,
        },
    };

}

const Socials = ({ socialsArray }: { socialsArray: social[] }) => {
    const router = useRouter();
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();

    const [items, setItems] = React.useState<{
        id: number;
        name: string;
        href: string;
        type: string;
        locked: boolean;
    }[]>([]);

    React.useEffect(() => {
        setItems(socialsArray.map((item) => ({
            id: item.id,
            name: item.name,
            href: item.href,
            type: item.type,
            locked: true,
        })));
    }, [socialsArray]);

    const unlockItem = (id: number) => {
        setItems(items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    locked: !item.locked
                }
            }
            return item;
        }));
    }

    const deleteItem = (id: number) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `socials`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
            body: JSON.stringify({
                id: id,
            })
        })
            .then((res) => {
                if (res.ok) {
                    enqueueSnackbar('Uspješno ste izbrisali društvenu mrežu!', { variant: 'success' });
                    setItems(items.filter((item) => item.id !== id));
                }
                else {
                    Promise.reject(res);
                }
            })
            .catch((err) => {
                enqueueSnackbar('Došlo je do greške!', { variant: 'error' });
                console.log(err);
            });
    }

    const handleUpdateItem = (social: {
        id: number;
        name: string;
        href: string;
        type: string;
        locked: boolean;
    }) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `socials`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(social),
        })
            .then((res) => res.json())
            .then((data: social) => {
                enqueueSnackbar('Uspješno ste izmjenili društvenu mrežu!', { variant: 'success' });
                setItems((prev) => prev.map((item) => {
                    if (item.id === data.id) {
                        return {
                            ...item,
                            name: data.name,
                            href: data.href,
                            type: data.type,
                            locked: true,
                        }
                    }
                    return item;
                }));
            });
    }

    const handleTypeChange = (e: SelectChangeEvent<string>, id: number) => {
        setItems((prev) => prev.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    type: e.target.value,
                }
            }
            return item;
        }));
    }

    return (
        <StyledContainer>
            <SEO page_info={
                {
                    page_slug: "/pages/socials",
                    page_title: "Stranice | Društvene mreze",
                    page_description: "Stranice | Društvene mreze",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                Društvene mreže
            </Typography>
            <Paper
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
                        <Button variant='contained' href="/socials/create">
                            <Typography sx={{ fontWeight: "700 !important" }}>
                                Dodaj Novu Mrežu
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ mb: "16px", borderBottomWidth: "2px" }} />
                {items.map((social, index) => (
                    <Box
                        key={index}
                        sx={{
                            p: "16px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {index !== 0 ? <Divider flexItem sx={{ width: "100%", my: "16px", borderBottomWidth: "2px" }} />
                            : null}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={3}>
                                {StyledLabel("Naslov")}
                                <StyledInput
                                    disabled={social.locked}
                                    inputVal={social.name}
                                    inputPlaceholder={"Unesi Ime"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === social.id) {
                                                return {
                                                    ...item,
                                                    name: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                {StyledLabel("Slug (Href)")}
                                <StyledInput
                                    disabled={social.locked}
                                    inputVal={social.href}
                                    inputPlaceholder={"Unesi Slug"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === social.id) {
                                                return {
                                                    ...item,
                                                    href: value
                                                }
                                            }
                                            return item;
                                        }))
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={5} sx={{ display: "flex" }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    {StyledLabel("Tip")}
                                    <Select
                                        disabled={social.locked}
                                        value={social.type}
                                        onChange={(e) => handleTypeChange(e, social.id)}
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
                                </Box>
                                <Divider flexItem orientation='vertical' sx={{ mt: "35px", mx: "16px", borderRightWidth: "2px" }} />
                                <Box sx={{ textAlign: "right" }}>
                                    {StyledLabel("Akcije")}
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        {!social.locked ?
                                            <Button
                                                variant='contained'
                                                sx={{ minWidth: 0, padding: "14px", mr: "12px" }}
                                                color='error'
                                                onClick={() => {
                                                    // lock social
                                                    setItems(items.map((item) => {
                                                        if (item.id === social.id) {
                                                            return {
                                                                ...item,
                                                                locked: true
                                                            }
                                                        }
                                                        return item;
                                                    }));
                                                }}
                                            >
                                                <CancelOutlined />
                                            </Button>
                                            : null}
                                        <Button onClick={() => {
                                            if (social.locked) {
                                                unlockItem(social.id);
                                            } else {
                                                handleUpdateItem(social);
                                            }
                                        }} variant="contained" sx={{ minWidth: 0, padding: "14px", mr: "12px" }}>
                                            {social.locked ? <EditOutlined /> : <SaveOutlined />}
                                        </Button>
                                        <Button onClick={() => deleteItem(social.id)} variant="contained" sx={{ minWidth: 0, padding: "14px" }}>
                                            <DeleteOutlineOutlined />
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                ))}
            </Paper>
        </StyledContainer>
    )
}

export default Socials;