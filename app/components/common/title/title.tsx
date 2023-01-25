import { Typography } from '@mui/material';
import React from 'react';

interface TitleProps {
    title: string
}

const Title = ({title}: TitleProps) => {
    return (
        <Typography sx={{ pb: "32px" }} color="primary.main" textAlign="center" variant="h3" component="h2" fontWeight={700}>
            {title}
        </Typography>
    )
}

export default Title;