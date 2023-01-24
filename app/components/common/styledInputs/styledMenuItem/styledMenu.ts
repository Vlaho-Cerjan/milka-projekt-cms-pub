import { MenuItem, styled } from "@mui/material";

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: theme.palette.text.primary + " !important",
    display: "flex",
    padding: "10px 25px",
    maxWidth: "230px",
    width: "100%",

    '& svg': {
        transition: "none",
    },

    '&:hover': {
        backgroundColor: theme.palette.primary.main,

        '& p, & span': {
            color: theme.palette.primary.contrastText + " !important",
        },

        '& svg': {
            transition: "none",
            fill: theme.palette.primary.contrastText + "!important",
            '&:hover': {
                fill: theme.palette.primary.contrastText + "!important",
            }
        }
    },

    '&.Mui-selected': {
        backgroundColor: theme.palette.success.main,
        
        '& p, & span': {
            color: theme.palette.success.contrastText + " !important",
        },

        '&:hover': {
            backgroundColor: theme.palette.success.main,
            
            '& p, & span': {
                color: theme.palette.success.contrastText + " !important",
            }
        }
    }
}))