import { Box, Paper, Grid, styled, SwipeableDrawer, Button, Container, Menu, MenuItem, useScrollTrigger, Slide, AppBar } from '@mui/material';
import { MaterialUISwitch } from "../modeSwitch";
import Image from 'next/image';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import React, { useRef } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from "../../navigation/Link";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NextBreadcrumbs from "../breadcrumbs/breadcrumbs";
import { useRouter } from 'next/router';
import ScrollProps from "../../../interfaces/ScrollProps";
import { CustomThemeContext } from '../../../store/customThemeContext';
import Footer from '../footer/footer';
import { KeyboardArrowRight } from '@mui/icons-material';

interface MobileLayoutProps {
    children: React.ReactNode,
    data: any
}

const StyledLink = styled(Link)(({ theme }) => ({
    padding: "4px 12px",
    margin: "4px 0",
    width: "100%",
    textAlign: "start",
    fontWeight: 600,
    fontSize: "1.2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    '&:hover': { backgroundColor: theme.palette.action.hover, borderRadius: "5px" },
    '&.active': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: "5px",

        '&:hover': { backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }
    }
}))

const MobileLayout = ({ children, data }: MobileLayoutProps) => {
    const [state, setState] = React.useState({
        drawer: false
    });

    const [anchorItemEl, setAnchorItemEl] = React.useState<any | null>(null);
    const handleItemClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAnchorItemEl((prevState: any) => ({
            ...prevState,
            [event.currentTarget.id]: event.currentTarget
        }));
    }

    const handleItemClose = () => {
        setAnchorItemEl(null);
    }

    const { isDark, setTheme } = React.useContext(CustomThemeContext);

    const HideOnScroll = (props: ScrollProps) => {
        const { children } = props;
        let trigger = useScrollTrigger();
        return (
            <Slide appear={false} direction="down" in={!trigger}>
                {children}
            </Slide>
        );
    }

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown') {
            if ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') return;
        }

        setState({ ...state, drawer: open });
    };

    const router = useRouter();

    const TopItem = styled(Box)(() => ({
        display: "flex",
        justifyContent: "start",
        alignItems: "start"
    }))
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const imageSrc = isDark ? "/images/logo/logo_transparent_dark.png" : "/images/logo/logo_transparent.png";

    const headerRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const breadcrumbsRef = useRef<HTMLDivElement>(null);

    const [minContentHeight, setMinContentHeight] = React.useState<number>(0);

    React.useEffect(() => {
        if (headerRef && footerRef && breadcrumbsRef && headerRef.current && footerRef.current && breadcrumbsRef.current) setMinContentHeight(headerRef.current.clientHeight + footerRef.current.clientHeight + breadcrumbsRef.current.clientHeight);
    }, [headerRef.current?.clientHeight, footerRef.current?.clientHeight, breadcrumbsRef.current?.clientHeight])


    return (
        <>
            <HideOnScroll>
                <AppBar ref={headerRef} position="sticky">
                    <Paper
                        variant="outlined"
                        square
                    >
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Grid item xs={4} md={2}>
                                <Button
                                    onClick={toggleDrawer(true)}
                                >
                                    <MenuIcon fontSize="large" />
                                </Button>
                            </Grid>
                            {typeof data !== 'undefined' && data !== null ?
                                <Grid item xs={4} md={8} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <Link sx={{ lineHeight: 0 }} target="_blank" href={data.socials.find((social: any) => social.type === "instagram").href}>
                                        <InstagramIcon sx={{ mr: "4px", fontSize: "30px", color: isDark ? "#f50f56" : "#E4405F" }} />
                                    </Link>
                                    <Link sx={{ lineHeight: 0 }} target="_blank" href={data.socials.find((social: any) => social.type === "facebook").href}>
                                        <FacebookIcon sx={{ fontSize: "30px", color: isDark ? "#2374E1" : "#1877F2" }} />
                                    </Link>
                                </Grid>
                                :
                                <Grid item xs={4} md={8} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <></>
                                </Grid>
                            }
                            <Grid item xs={4} md={2} sx={{ textAlign: "end" }}>
                                <MaterialUISwitch onClick={() => setTheme()} sx={{ m: 1 }} checked={isDark} />
                            </Grid>
                        </Grid>
                    </Paper>
                </AppBar>
            </HideOnScroll>
            <Paper
                elevation={2}
                square
                ref={breadcrumbsRef}
                sx={{ '& .MuiBreadcrumbs-ol': { justifyContent: "center" } }}
            >
                <NextBreadcrumbs
                    omitRootLabel={router.pathname === "/"}
                    replaceCharacterList={[{ from: '.', to: ' ' }]}
                    transformLabel={(title: string) => {
                        return title.charAt(0).toUpperCase() + title.slice(1).replace(/\-[a-z]/g, match => match.replace("-", " ").toUpperCase())
                    }}
                />
            </Paper>
            <SwipeableDrawer
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                anchor={"left"}
                open={state.drawer}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                PaperProps={{
                    sx: {
                        width: "100vw"
                    }
                }}
            >
                <Paper
                    square
                    variant="outlined"
                    sx={{
                        padding: "8px",
                    }}
                >
                    {typeof data !== 'undefined' && data !== null ?
                        <Grid
                            sx={{
                                mt: [0, 0, 0, "-16px"],
                                borderRadius: 0,
                                justifyContent: "start",
                                alignItems: "start",
                                flexWrap: "nowrap",
                                flexDirection: "column",
                                position: "relative",
                                fontWeight: 500,
                            }}
                            container
                            spacing={2}
                        >
                            <Grid item xs={12}>
                                <TopItem>
                                    <Link target="_blank" href={data.company_info.address_url} sx={{ display: "flex" }}>
                                        <LocationCityIcon sx={{ mr: "8px" }} />
                                        {data.company_info.address_short}
                                    </Link>
                                </TopItem>
                            </Grid>
                            <Grid item xs={12}>
                                <TopItem>
                                    <Link href={"mailto:" + data.company_info.email} sx={{ display: "flex" }}>
                                        <EmailIcon sx={{ mr: "8px" }} />
                                        {data.company_info.email}
                                    </Link>
                                </TopItem>
                            </Grid>
                            <Grid item xs={12}>
                                <TopItem>
                                    <Link href={"tel:" + (data.company_info.phone).replace(/[\(\)0 ]/g, '')} sx={{ display: "flex" }}>
                                        <LocalPhoneIcon sx={{ mr: "8px" }} />
                                        {data.company_info.phone}
                                    </Link>
                                </TopItem>
                            </Grid>
                            <Grid item xs={12} >
                                <TopItem sx={{
                                    width: "100vw",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                    <Container sx={{ pl: 0, lineHeight: 0 }}>
                                        <Link sx={{ lineHeight: 0 }} target="_blank" href={data.socials.find((social: any) => social.type === "instagram").href}>
                                            <InstagramIcon sx={{ mr: "4px", fontSize: "30px", color: isDark ? "#f50f56" : "#E4405F" }} />
                                        </Link>
                                        <Link sx={{ lineHeight: 0 }} target="_blank" href={data.socials.find((social: any) => social.type === "facebook").href}>
                                            <FacebookIcon sx={{ fontSize: "30px", color: isDark ? "#2374E1" : "#1877F2" }} />
                                        </Link>
                                    </Container>
                                    <MaterialUISwitch onClick={() => setTheme()} sx={{ m: "0 1rem 0 1rem" }} checked={isDark} />
                                </TopItem>
                            </Grid>
                            <Grid
                                item
                                sx={
                                    {
                                        position: "absolute",
                                        top: "8px",
                                        right: "0",
                                        padding: "0 !important",
                                    }
                                }
                                xs={12}
                            >
                                <Button
                                    sx={{ p: 0 }}
                                    onClick={toggleDrawer(false)}
                                >
                                    <CloseIcon fontSize="large" />
                                </Button>
                            </Grid>
                        </Grid>
                        :
                        null
                    }
                </Paper>
                <Paper
                    elevation={2}
                    sx={{ height: "100%" }}
                    square
                >
                    <Grid
                        sx={
                            {
                                pt: "8px",
                                pb: "8px",
                                borderRadius: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                minHeight: "103px",
                                flexDirection: "column-reverse",
                            }
                        }
                        container
                        spacing={2}
                    >
                        <Grid item xs={12}>
                            <Box textAlign="left">
                                <Image
                                    src={imageSrc}
                                    alt="logo image of Varela Clinic"
                                    width={138}
                                    height={93}
                                    quality={"100"}
                                //objectFit="cover"
                                >

                                </Image>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ width: "100%" }}>
                            <Box
                                textAlign="center"
                                component={"nav"}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <StyledLink
                                    className={(router.pathname.includes("/pages")) ? "active" : undefined}
                                    href={"/pages"}
                                    key={"navLink_pages"}
                                    onClick={(e) => {
                                        if (router.pathname === "/pages") e.preventDefault();
                                    }}
                                >
                                    Stranice
                                    <KeyboardArrowRight />
                                </StyledLink>
                                <StyledLink
                                    className={(router.pathname.includes("/company_info")) ? "active" : undefined}
                                    href={"/company_info"}
                                    key={"navLink_company_info"}
                                    onClick={(e) => {
                                        if (router.pathname === "/company_info") e.preventDefault();
                                    }}
                                >
                                    Info o Firmi
                                    <KeyboardArrowRight />
                                </StyledLink>
                                <StyledLink
                                    className={(router.pathname.includes("/navigation")) ? "active" : undefined}
                                    href={"/navigation"}
                                    key={"navLink_navigation"}
                                    onClick={(e) => {
                                        if (router.pathname === "/navigation") e.preventDefault();
                                    }}
                                >
                                    Navigacija
                                    <KeyboardArrowRight />
                                </StyledLink>
                                <StyledLink
                                    className={(router.pathname.includes("/socials")) ? "active" : undefined}
                                    href={"/socials"}
                                    key={"navLink_socials"}
                                    onClick={(e) => {
                                        if (router.pathname === "/socials") e.preventDefault();
                                    }}
                                >
                                    Društvene Mreže
                                    <KeyboardArrowRight />
                                </StyledLink>
                                <StyledLink
                                    className={(router.pathname.includes("/services")) ? "active" : undefined}
                                    href={"/services"}
                                    key={"navLink_services"}
                                    onClick={(e) => {
                                        if (router.pathname === "/services") e.preventDefault();
                                    }}
                                >
                                    Usluge
                                    <KeyboardArrowRight />
                                </StyledLink>
                                <StyledLink
                                    className={(router.pathname.includes("/doctors")) ? "active" : undefined}
                                    href={"/doctors"}
                                    key={"navLink_doctors"}
                                    onClick={(e) => {
                                        if (router.pathname === "/doctors") e.preventDefault();
                                    }}
                                >
                                    Doktori
                                    <KeyboardArrowRight />
                                </StyledLink>
                                <StyledLink
                                    className={(router.pathname.includes("/employees")) ? "active" : undefined}
                                    href={"/employees"}
                                    key={"navLink_employees"}
                                    onClick={(e) => {
                                        if (router.pathname === "/employees") e.preventDefault();
                                    }}
                                >
                                    Zaposlenici
                                    <KeyboardArrowRight />
                                </StyledLink>
                                {/*
                    <StyledLink
                        className={(router.pathname.includes("/categories")) ? "active" : undefined}
                        href={"/categories"}
                        key={"navLink_categories"}
                        onClick={(e) => {
                            if(router.pathname === "/categories") e.preventDefault();
                        }}
                    >
                        Kategorije
                        <KeyboardArrowRight />
                    </StyledLink>
                    */}
                                <StyledLink
                                    className={(router.pathname.includes("/faq")) ? "active" : undefined}
                                    href={"/faq"}
                                    key={"navLink_faq"}
                                    onClick={(e) => {
                                        if (router.pathname === "/faq") e.preventDefault();
                                    }}
                                >
                                    FAQ
                                    <KeyboardArrowRight />
                                </StyledLink>
                                {/*
                    <StyledLink
                        className={(router.pathname.includes("/tags")) ? "active" : undefined}
                        href={"/tags"}
                        key={"navLink_tags"}
                        onClick={(e) => {
                            if(router.pathname === "/tags") e.preventDefault();
                        }}
                    >
                        Oznake
                        <KeyboardArrowRight />
                    </StyledLink>
                    */}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </SwipeableDrawer>
            <Paper
                elevation={2}
                square
                sx={{
                    minHeight: 'calc(100vh - ' + (minContentHeight + 1) + 'px)'
                }}
            >
                {children}
            </Paper>
            <Box ref={footerRef}>
                <Footer data={data} />
            </Box>
        </>
    )
}

export default MobileLayout;