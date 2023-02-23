import { Box, Button, Paper, styled } from "@mui/material";
import { MaterialUISwitch } from "../modeSwitch";
import Image from 'next/image';
import Link from "../../navigation/Link";
import { useRouter } from "next/router";
import React from "react";
import { CustomThemeContext } from "../../../store/customThemeContext";
import { KeyboardArrowDown, KeyboardArrowRight, Person } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { TextBold14 } from '../../common/styledInputs/styledText/styledText';
import StyledDropdown from "../../common/styledInputs/styledDropdown/styledDropdown";

interface DesktopLayoutProps {
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

const DesktopLayout = ({ children, data }: DesktopLayoutProps) => {
    const { isDark, setTheme } = React.useContext(CustomThemeContext);

    const { data: session, status } = useSession();

    const router = useRouter();

    const imageSrc = isDark ? "/images/logo/logo_transparent_dark.png" : "/images/logo/logo_transparent.png";

    return (
        <Box
            sx={{
                display: "flex",
                marginTop: "61.5px",
            }}
        >
            <Paper
                elevation={1}
                square
                sx={{
                    p: "8px 16px 8px 0",
                    display: "flex",
                    borderRadius: 0,
                    alignItems: "center",
                    justifyContent: "space-between",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    zIndex: 1000,
                    width: "100%",
                }}
            >
                <Box sx={{ textAlign: "center", width: "230px" }}>
                    <MaterialUISwitch onClick={() => setTheme()} sx={{ m: 1 }} checked={isDark} />
                </Box>
                {
                    status === "authenticated" && session.user ?
                        <StyledDropdown
                            buttonId="userButton"
                            startIcon={<Person />}
                            buttonText={session?.user?.first_name + " " + session?.user?.last_name}
                            dropdownId="userDropdown"
                            endIcon={<KeyboardArrowDown />}
                            dropdownMenuItems={[
                                {
                                    text: "Sign Out",
                                    function: () => signOut(),
                                }
                            ]}
                        />
                        :
                        null
                }
            </Paper >
            <Paper
                elevation={2}
                square
                sx={{
                    p: "16px",
                    borderRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: "200px",
                    width: "100%",
                    maxWidth: "230px"
                }}
            >
                <Box textAlign="center" sx={{ mb: "16px" }}>
                    <Image
                        src={imageSrc}
                        alt="logo image of Varela Clinic"
                        width={138}
                        height={93}
                        quality={90}
                    />
                </Box>
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
                            if(router.pathname === "/pages") e.preventDefault();
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
                            if(router.pathname === "/company_info") e.preventDefault();
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
                            if(router.pathname === "/navigation") e.preventDefault();
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
                            if(router.pathname === "/socials") e.preventDefault();
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
                            if(router.pathname === "/services") e.preventDefault();
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
                            if(router.pathname === "/doctors") e.preventDefault();
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
                            if(router.pathname === "/employees") e.preventDefault();
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
                            if(router.pathname === "/faq") e.preventDefault();
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
            </Paper>
            <Paper
                elevation={2}
                square
                sx={{
                    width: "100%",
                    minHeight: '100vh',
                    borderRadius: 0,
                }}
            >
                {children}
            </Paper>
        </Box >
    )
}

export default DesktopLayout