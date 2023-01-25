import { Box, styled, Typography, SxProps } from '@mui/material';
import React from 'react';

const StyledTitleBox = styled(Box)`
    padding: 40px;
    font-size: 20px;
    line-height: 20px;
    text-align: center;
`

export const Title = ({title, sx}: {title: string, sx?: SxProps}) => {
    return (
        <StyledTitleBox>
            <Typography
                component="h2"
                sx={{
                    fontSize: "1em",
                    lineHeight: "inherit",
                    color: "text.primary",
                    fontWeight: "bold",
                    minWidth: "240px",
                    ...sx
                }}
            >
                {title}
            </Typography>
        </StyledTitleBox>
    )
}