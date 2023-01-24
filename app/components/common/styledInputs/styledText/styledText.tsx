import { Box, styled, SxProps, Theme, Typography, TypographyProps } from '@mui/material';
import React from 'react';
import { ReactElement } from 'react';

const StyledTextBox = styled(Box)`
    font-size: 14px;
    line-height: 17px;
`

export const StyledText = ({text, sx}: {text: string, sx?: SxProps<Theme>}) => {
    return (
        <StyledTextBox sx={sx}>
            <Typography
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 500,
                    color: "text.secondary"
                }}
            >
                {text}
            </Typography>
        </StyledTextBox>
    )
}

interface TextProps {
    text: ReactElement | string | null,
    /** Input font size and line height into the container style so the font size changes on the text with accessibility correctly */
    containerSx?: SxProps<Theme>,
    textProps?: TypographyProps,
    textComponent?: React.ElementType<any>
}

export const TextRegular = ({text, containerSx, textProps, textComponent}: TextProps) => {
    return (
        <Box sx={containerSx}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 400,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextMedium = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={containerSx}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 500,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextBold = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={containerSx}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 700,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextBlack = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={containerSx}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 900,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextRegular14 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "14px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 400,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextMedium12 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "12px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 500,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextMedium14 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "14px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 500,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextMedium16 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "16px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 500,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextMedium18 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "18px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 500,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextBold14 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "14px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 700,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextBold20 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "20px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 700,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextBlack10 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "10px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 900,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextBlack12 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "12px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 900,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextBlack14 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "14px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 900,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}

export const TextBlack18 = ({text, containerSx,textProps, textComponent}: TextProps) => {
    return (
        <Box sx={{
            ...containerSx,
            fontSize: "18px",
        }}>
            <Typography
                component={typeof textComponent !== "undefined" ? textComponent : "span"}
                {...textProps}
                sx={{
                    textTransform: "none",
                    fontSize: "1em",
                    lineHeight: "inherit",
                    fontWeight: 900,
                    ...textProps?.sx
                }}
            >
                {text}
            </Typography>
        </Box>
    )
}