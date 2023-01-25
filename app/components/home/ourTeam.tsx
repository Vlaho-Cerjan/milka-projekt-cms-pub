import { Box, Button, Card, CardActions, CardContent, Container, Grid, styled, Typography } from '@mui/material';
import React, {useContext} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CustomThemeContext } from '../../store/customThemeContext';
import { StyledContainer } from '../common/container/styledContainer';
import { Title } from '../common/title/title';

interface OurTeamProps {
    employes: {
        id: number,
        first_name: string,
        aditional_names: string | null,
        last_name: string,
        title: string | null,
        bio: string | null,
        email: string | null,
        phone: string | null,
        img_src: string | null,
        slug: string | null,
        alt: string | null,
        employe_title: string | null,
        create_at: string,
        update_at: string | null,
        delete_at: string | null,
    }[]
}

const StyledCard = styled(Card)(() => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign:"center",
    padding: "16px",
    'img.resImg': {
        border: "1px solid transparent !important",
    }
}))

const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
}))

const OurTeam = ({employes}: OurTeamProps) => {
    const { theme } = useContext(CustomThemeContext);

    const dataEmployes = (
        employes.map(employe => {
            return(
                <Grid key={'employe_'+employe.id} item xs={12} sm={6} md={4} lg={3}>
                    <StyledCard
                        variant="outlined"
                    >
                        <Box sx={{ 
                            'img.resImg': {
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: "50%"
                            }
                        }}>
                            <Image
                                src={employe.img_src?employe.img_src:""}
                                alt={employe.alt?employe.alt:""}
                                width={270}
                                height={273}
                                quality={90}
                                layout="responsive"
                                className="resImg"
                                objectFit="cover"
                                sizes="250px"
                            />
                        </Box>
                        <StyledCardContent>
                            <Box>
                                <Typography
                                    component="h3"
                                    variant="h5"
                                    textAlign="center"
                                    sx={{ pb: "16px", textTransform: "capitalize" }}
                                >
                                    {(employe.title?employe.title:"")+" "+employe.first_name+" "+(employe.aditional_names?employe.aditional_names:"")+" "+employe.last_name}
                                </Typography>
                                {employe.employe_title?
                                <Typography
                                    textAlign="center"
                                >
                                    {employe.employe_title}
                                </Typography>
                                :null
                                }
                            </Box>
                            {employe.bio?
                            <Typography
                                textAlign="center"
                            >
                                {employe.bio}
                            </Typography>
                            :null
                            }
                        </StyledCardContent>
                        {/*<CardActions sx={{ justifyContent: "center" }}>
                            <Button
                                sx={{
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: "700 !important",
                                    fontSize: "1.1rem",
                                    letterSpacing: "0.5px",
                                }}
                                variant="contained"
                            >
                                <Link href={employe.slug?employe.slug.trim():"/"}>
                                    Saznajte Više
                                </Link>
                            </Button>
                        </CardActions>
                        */}
                    </StyledCard>
                </Grid>
            )
        })
    )

    return(
        <StyledContainer>
            <Title title="Naš Tim" />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ maxWidth: { sm: "100%", md: "60%" } }} textAlign="center" pb="16px">
                    U Varela dermatološkoj klinici imamo dermatologinju koja je inovator u kozmetičkom i dermatološkom području, kao i vrsnoga kirurga i gostujuće doktore.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {dataEmployes}
            </Grid>
        </StyledContainer>
    )
}

export default OurTeam;