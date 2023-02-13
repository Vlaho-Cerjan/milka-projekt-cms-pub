import { Container, Typography, Grid, Card, CardActions, styled, CardContent, Button} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StyledContainer } from '../common/container/styledContainer';
import Title from '../common/title/title';

const StyledCard = styled(Card)(() => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "16px",
    'img.resImg': {
        border: "1px solid transparent !important",
    }
}))

const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
}))

interface ServicesProps {
    services: {
        id: number,
        name: string,
        description: string,
        img_src: string,
        alt: string,
        slug: string,
        doctors_id: number[],
        create_at: string,
        update_at: string,
        delete_at: string
    }[]
}


const OurServices = ({services}: ServicesProps) => {

    const dataServices = (
        services.map(service => {
            return(
                <Grid key={'service_'+service.id} item xs={12} sm={6} md={4} lg={3}>
                    <StyledCard
                        variant="outlined"
                    >
                        <div>
                            <Image
                                src={service.img_src}
                                alt={service.alt}
                                width={1920}
                                height={1080}
                                quality={90}
                                className="resImg"
                                sizes="(max-width: 600px) 500px,
                                (max-width: 750px) 250px,
                                (max-width: 900px) 400px,
                                (max-width: 1200px) 300px,
                                250px"
                            />
                        </div>
                        <StyledCardContent>
                            <Typography
                                component="h3"
                                variant="h5"
                                textAlign="center"
                                sx={{ pb: "16px", textTransform: "uppercase" }}
                            >
                                {service.name}
                            </Typography>
                            <Typography
                                textAlign="center"
                            >
                                {service.description}
                            </Typography>
                        </StyledCardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button
                                sx={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: "700 !important",
                                    fontSize: "1.1rem",
                                    letterSpacing: "0.5px",
                                }}
                                variant="contained"
                            >
                                <Link href={service.slug.trim()}>
                                    Saznajte Više
                                </Link>
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
            )
        })
    )

    return (
        <StyledContainer>
            <Title title="Naše Usluge" />
            <Grid container spacing={2}>
                {dataServices}
            </Grid>
        </StyledContainer>
    )
}

export default OurServices;