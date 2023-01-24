import { SxProps, Theme } from "@mui/material"
import { StyledText } from "../styledText/styledText"

export  const StyledLabel = (label: any, sx?: SxProps<Theme>) => {
    return (
        <StyledText
            sx={{
                fontSize: "12px",
                lineHeight: "20px",
                marginLeft: "16px",
                marginBottom: "14px",
                ...sx,

                '& p': {
                    fontSize: "1em",
                    fontWeight: 900,
                    textTransform: "uppercase"
                }
            }}
            text={label}
        />
    )
}