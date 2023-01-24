import { Box, Grid, Typography, Divider } from '@mui/material';
import React from 'react';
import { CustomThemeContext } from '../../../store/customThemeContext';
import Image from 'next/image';
import { StyledContainer } from '../../common/container/styledContainer';
import Link from '../../navigation/Link';
import { Email, EmailOutlined, Facebook, FacebookOutlined, Instagram, LocalPhone, LocationCity, LocationCityOutlined, WhatsApp } from '@mui/icons-material';

const Footer = ({ data }: { data: any }) => {
    const { theme, isDark } = React.useContext(CustomThemeContext);
    const imageSrc = "/images/logo/logo_transparent_white.png";

    return (
        <Box component={"footer"}
            sx={{
                backgroundColor: isDark ? "#232323" : theme.palette.primary.main,
                color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                padding: "0 32px",

                [theme.breakpoints.down('md')]: {
                    padding: "0 24px",
                },

                [theme.breakpoints.down('lg')]: {
                    padding: "0 16px",
                }
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "32px 0",

                    [theme.breakpoints.down("md")]: {
                        padding: "24px 0",
                    },

                    [theme.breakpoints.down("sm")]: {
                        padding: "16px 0",
                    }
                }}
            >
                <Box>
                    <Box>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Box sx={{ mb: "24px", '& span': { marginLeft: "-30px !important" } }}>
                                    <Link href="/">
                                        <Image
                                            src={imageSrc}
                                            alt="logo image of Varela Clinic"
                                            width={138}
                                            height={93}
                                            layout="fixed"
                                            quality={90}
                                        />
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography component={"h3"} variant={"h6"} sx={{ fontWeight: "bold", textDecoration: "underline" }}>
                                    O NAMA
                                </Typography>
                                <Box sx={{ mt: "12px", display: "flex", flexDirection: "column" }}>
                                    <Link
                                        href="/faq"
                                        sx={{
                                            color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                                        }}
                                    >
                                        FAQ
                                    </Link>
                                    <Link
                                        href="/kontakt"
                                        sx={{
                                            mt: "4px",
                                            color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                                        }}
                                    >
                                        Kontakt
                                    </Link>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography component={"h3"} variant={"h6"} sx={{ fontWeight: "bold", textDecoration: "underline" }}>
                                    INFORMACIJE I KONTAKT
                                </Typography>
                                {
                                    typeof data !== "undefined" && data !== null ?
                                        <Box sx={{ mt: "12px", display: "flex", flexDirection: "column" }}>
                                            <Link
                                                target="_blank"
                                                href={data.company_info.address_url}
                                                sx={{
                                                    color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <LocationCityOutlined sx={{ mr: "4px", fontSize: "20px" }} />
                                                {data.company_info.address_short}
                                            </Link>
                                            <Link
                                                target="_blank"
                                                href={"mailto:" + data.company_info.email}
                                                sx={{
                                                    mt: "4px",
                                                    color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Email sx={{ mr: "4px", fontSize: "20px" }} />
                                                {data.company_info.email}
                                            </Link>
                                            <Link
                                                target={"_blank"}
                                                href={"https://wa.me/" + (data.company_info?.phone).replace(/[\+\(\)0 ]/g, '')}
                                                sx={{
                                                    mt: "4px",
                                                    color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <WhatsApp sx={{ mr: "4px", fontSize: "20px" }} />
                                                {data.company_info.phone}
                                            </Link>
                                            <Link
                                                target="_blank"
                                                href={data.socials.find((social: any) => social.type === "instagram").href}
                                                sx={{
                                                    color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    mt: "4px"
                                                }}
                                            >
                                                <Instagram sx={{ mr: "4px", fontSize: "20px" }} />
                                                {data.socials.find((social: any) => social.type === "instagram").name}
                                            </Link>
                                            <Link
                                                target="_blank"
                                                href={data.socials.find((social: any) => social.type === "facebook").href}
                                                sx={{
                                                    mt: "4px",
                                                    color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <Facebook sx={{ mr: "4px", fontSize: "20px" }} />
                                                {data.socials.find((social: any) => social.type === "facebook").name}
                                            </Link>
                                        </Box>
                                        :
                                        null
                                }
                            </Grid>
                            <Grid item xs={12} sm={6} md={3} >
                                <Typography component={"h3"} variant={"h6"} sx={{ fontWeight: "bold", textDecoration: "underline" }}>
                                    LEGALNE INFORMACIJE
                                </Typography>
                                <Box sx={{ mt: "12px", display: "flex", flexDirection: "column", '& p': { fontSize: "14px" } }}>
                                    <Typography>
                                        Varela d.o.o.
                                    </Typography>
                                    <Typography>
                                        Put kardinala Alojzija Stepinca 14
                                    </Typography>
                                    <Typography>
                                        20207 Mlini
                                    </Typography>
                                    <Typography>
                                        OIB: 18633554636
                                    </Typography>
                                    <Typography>
                                        Trgovački sud u Dubrovniku
                                    </Typography>
                                    <Typography>
                                        MB: 05070392
                                    </Typography>
                                    <Typography>
                                        IBAN: HR6823900011101074165
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "4px 0",

                [theme.breakpoints.down("sm")]: {
                    justifyContent: "flex-start",
                    flexWrap: "wrap",
                }
            }}>
                <Typography sx={{ fontSize: "14px" }}>
                    © 2022 Auditore, sva prava zadržana.
                </Typography>
                <Box sx={{ display: "flex" }}>
                    <Link
                        href="/politika-privatnosti"
                        sx={{
                            fontSize: "14px",
                            ml: "4px",
                            mr: "4px",
                            color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                        }}
                    >
                        Privatnost
                    </Link>
                    <Divider
                        variant="middle"
                        orientation="vertical"
                        flexItem
                        sx={{
                            margin: "4px",
                            borderColor: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                        }}
                    />
                    <Link
                        href="/odredbe-i-uvjeti"
                        sx={{
                            fontSize: "14px",
                            ml: "4px",
                            color: isDark ? theme.palette.text.primary : theme.palette.primary.contrastText,
                        }}
                    >
                        Uvjeti
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer;