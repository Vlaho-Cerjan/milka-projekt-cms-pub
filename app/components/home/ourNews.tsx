import { Container, Typography, Grid, Card, CardActions, styled, CardContent, Button, Box} from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import limit from '../../utility/limit';
import { StyledContainer } from '../common/container/styledContainer';

const StyledCard = styled(Card)(() => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "16px",
}))

const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
}))

interface NewsProps {
    news: {
        id: number,
        title: string,
        short_description: string,
        content: string,
        img_src: string,
        alt: string,
        slug: string,
        categories: number[],
        tags: number[],
        doctors_id: number[],
        create_at: string,
        update_at: string,
        delete_at: string
    }[]
}


const OurNews = ({news}: NewsProps) => {

    const dataNews = (
        news.map(item => {
            return(
                <Grid key={'item_'+item.id} item xs={12} sm={6} md={4} lg={3}>
                    <StyledCard variant="outlined">
                            <div>
                                <Image
                                    src={item.img_src?item.img_src:'/images/blog/blog.jpg'}
                                    alt={item.alt}
                                    width={item.img_src?1920:1280}
                                    height={item.img_src?1080:783}
                                    quality={90}
                                    sizes="(max-width: 600px) 600px,
                                    (max-width: 750px) 342px,
                                    (max-width: 900px) 417px,
                                    (max-width: 1200px) 373px,
                                    276px"
                                />
                            </div>
                        <StyledCardContent>
                            <Typography
                                component="h3"
                                variant="h5"
                                textAlign="center"
                                sx={{ pb: "16px", textTransform: "capitalize", flexGrow: 2 }}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                textAlign="center"
                                sx={{ flexGrow: 1 }}
                            >
                                {limit(item.short_description, 115)+"..."}
                            </Typography>
                        </StyledCardContent>
                        <CardActions sx={{ justifyContent: "center" }}>
                            <Button sx={{ fontWeight: 600 }} variant="contained">
                                <Link href={item.slug.trim()}>
                                    Pročitajte Više
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
            <Typography sx={{ pb: "32px" }} color="primary.main" textAlign="center" variant="h3" component="h2">
                Novosti
            </Typography>
            <Grid container spacing={2}>
                {dataNews}
            </Grid>
            <Box
                sx={{
                    pt: "32px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Button sx={{ fontSize: "1.3rem" }} variant="outlined">
                    <Link href="/novosti">
                        Pogledajte Sve Novosti
                    </Link>
                </Button>
            </Box>
        </StyledContainer>
    )
}

export default OurNews;