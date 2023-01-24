import { Box, Button, styled, Typography, SxProps, Theme } from '@mui/material';
import React from "react";
import Link from '../../../navigation/Link';


const StyledButton = styled(Button)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: "2px",
    minWidth: 0,
}))

const IconContainer = styled(Box)(({ theme }) => ({
    backgroundColor: "transparent",
    fontSize: "16px",
    display: "inline-flex",

    '& svg': {
        fill: theme.palette.text.secondary,
        fontSize: "1em",
        lineHeight: "inherit"
    }
}))

interface DropdownProps {
    icon: React.ReactNode;
    buttonFunction?: () => void;
    buttonHref?: string;
    sx?: SxProps<Theme>;
}

const StyledButtonIconOnly = ({icon, buttonFunction, buttonHref, sx}: DropdownProps) => {
    return (
        <Box>
            <StyledButton
                onClick={buttonFunction}
                href={buttonHref}
                LinkComponent={Link}
                sx={sx}
            >
                <IconContainer>
                        {icon}
                </IconContainer>
            </StyledButton>
        </Box>
    );
}

export default StyledButtonIconOnly;