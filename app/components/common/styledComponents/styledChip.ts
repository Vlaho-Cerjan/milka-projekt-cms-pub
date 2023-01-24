import { styled, Chip } from '@mui/material';

export const StyledChip = styled(Chip)(({ theme }) => ({
    textTransform: "uppercase",
    marginRight: "8px",
    marginBottom: "4px",
    height: "24px",
    border: "transparent",
    backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,0.24)" : "rgba(0,0,32,0.12)",

    '& span': {
        fontSize: "1em",
        fontWeight: 900,
        color: theme.palette.text.secondary,
    },

    '& svg': {
        fontSize: "1.6em !important",
        borderRadius: "50%",
        background: theme.palette.primary.contrastText,
        fill: theme.palette.mode === "dark" ? theme.palette.text.secondary : undefined,
    }
}))