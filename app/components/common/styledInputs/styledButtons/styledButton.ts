import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.mode==="dark"?theme.palette.grey[800]:theme.palette.background.paper,
    padding: "4px",
    borderRadius: "4px !important",
    minWidth: 0,
    fontSize: "24px",
    boxShadow: "0 2px 4px 0 rgba(0,0,32,0.12) !important",

    '&:hover': {
        backgroundColor: theme.palette.mode==="dark"?theme.palette.grey[700]:theme.palette.background.default,
    },

    '&:disabled': {
        backgroundColor: theme.palette.mode==="dark"?theme.palette.grey[600]:theme.palette.grey[100],
    }
}))

export const StyledButtonDefault = styled(Button)(() => ({
    padding: "10px 16px",
    minWidth: 0,
    fontSize: "14px",
    lineHeight: "17px",
}))