import { Box, styled } from "@mui/material";

export const IconContainerGrey = styled(Box)(({ theme }) => ({
    fontSize: "21px",
    display: "flex",
    alignItems: "center",

    '& svg': {
        fill: (theme.palette.mode === "dark")?theme.palette.text.secondary+" !important":"rgba(0, 0, 32, 0.32) !important",
        fontSize: "1em",
        lineHeight: "inherit",
    },

    '&.light': {
        '& svg': {
            fill: (theme.palette.mode === "dark")?theme.palette.text.secondary+" !important":"rgba(0, 0, 32, 0.08) !important",
        }
    },

    '&.primary': {
        '& svg': {
            fill: theme.palette.text.primary+" !important"
        }
    },

    '&.isFocused': {
        '& svg': {
            fill: (theme.palette.mode === "dark")?theme.palette.text.secondary+" !important":"rgba(0, 0, 32, 0.76) !important",
        }
    },

    '&.darker': {
        '& svg': {
            fill: (theme.palette.mode === "dark")?theme.palette.text.secondary+" !important":"rgba(0, 0, 32, 0.48) !important",
        }
    },

    '&.active': {
        '& svg': {
            fill: theme.palette.primary.main+" !important"
        }
    },

    '&.locked': {
        '& svg': {
            fill: theme.palette.error.main+" !important"
        }
    },

    '&:disabled': {
        '& svg': {
            opacity: 0.48
        }
    }
}))

export const IconContainerWhite = styled(Box)(({ theme }) => ({
    fontSize: "21px",
    display: "flex",

    '& svg': {
        fill: (theme.palette.mode === "dark")?theme.palette.primary.contrastText+" !important":"#fff !important",
        fontSize: "1em",
        lineHeight: "inherit"
    }
}))