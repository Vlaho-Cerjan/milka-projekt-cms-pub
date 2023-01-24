import { Box, Container, Divider, Paper, Typography, styled } from '@mui/material';
import React, { useContext } from 'react';
import Title from '../common/title/title';
import Image from 'next/image';
import { CustomThemeContext } from '../../store/customThemeContext';
import useWindowSize from '../../utility/windowSize';
import { StyledContainer } from '../common/container/styledContainer';

const MissionAndVision = () => {
    const { theme } = useContext(CustomThemeContext);
    const { width } = useWindowSize();

    return (
        <StyledContainer>
            <Title title="Misija I Vizija" />
            <Box>
                {(width < theme.breakpoints.values.md)?
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    <Container
                        disableGutters
                        sx={{
                            'img.resImg': {
                                border: "1px solid transparent !important",
                            }
                        }}
                    >
                        <Image
                            src="/images/home/misija-i-vizija.jpg"
                            alt="slika doktora kako operiraju pacijenta"
                            width={1601}
                            height={632}
                            quality={90}
                            layout="responsive"
                            objectFit="cover"
                            className="resImg"
                            sizes="80vw"
                        />
                    </Container>
                    <Container
                        disableGutters
                        sx={{
                            p: "24px 12px 16px",
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="h2"
                            textAlign="center"
                            pb="20px"
                            color="primary.main"
                            fontWeight="600"
                        >
                            Dobrodošli u dermatološku kliniku Varela
                        </Typography>
                        <Typography
                            textAlign="center"
                        >
                            Želimo prvenstveno služiti pacijentima koji nas trebaju.
                            Zbog toga smo odlučili približiti usluge stanovništvu koje
                            inače za njih mora putovati u Dubrovnik ili u Split.
                            <br /><br />
                            Bavimo se kliničkom i estetskom medicinom te terapeutskom
                            kozmetologijom, a u sklopu toga donosimo nove oblike
                            dijagnostike i terapije.
                            <br /><br />
                            Posebnu pozornost, pak,
                            želimo posvetiti melanomima, tj. raku kože, koji
                            je zabrinjavajuće dominantan na obalnom i otočnom
                            području Dubrovačko - neretvanske županije.
                            <br /><br />
                            Otvaranjem ambulante nastojimo stvoriti i više
                            radnih mjesta, pogotovo pružajući prilike za rad
                            i rast mladima koji žele raditi i napredovati u ovoj zemlji.
                            <br /><br />
                            Uz ambulantu u Pločama, želimo eventualno otvoriti i podružnicu
                            na otoku Korčuli. Ciljamo dovoditi gostujuće doktore kako bismo
                            stanovništvu pružili što je moguće više različitih kvalitetnih
                            usluga na što kraćoj relaciji.
                        </Typography>
                    </Container>
                </Box>
                :
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    <Container
                        disableGutters
                        sx={{
                            alignSelf: "stretch",
                            '> span': {
                                height: "100% !important",
                            },
                            'img.resImg': {
                                border: "1px solid transparent !important",
                            }
                        }}
                    >
                        <Image
                            src="/images/home/misija-i-vizija.jpg"
                            alt="slika doktora kako operiraju pacijenta"
                            width={1601}
                            height={1264}
                            quality={90}
                            layout="responsive"
                            objectFit="cover"
                            className="resImg"
                            sizes="600px"
                        />
                    </Container>
                    <Container
                        disableGutters
                        sx={{
                            alignSelf: "stretch",
                            p: "0 0 0 32px",
                            flexShrink: 1.5,
                        }}
                    >
                        <Typography
                            pb="16px"
                            variant="h6"
                            fontSize="1.1rem"
                            color="primary.main"
                            fontWeight="600"
                        >
                            Tko Smo MI?
                        </Typography>
                        <Typography
                            variant="h4"
                            component="h2"
                            pb="10px"
                            color="primary.main"
                            fontWeight="600"
                        >
                            Dobrodošli u dermatološku kliniku Varela
                        </Typography>
                        <Typography>
                            Želimo prvenstveno služiti pacijentima koji nas trebaju.
                            Zbog toga smo odlučili približiti usluge stanovništvu koje
                            inače za njih mora putovati u Dubrovnik ili u Split.
                            <br />
                            Bavimo se kliničkom i estetskom medicinom te terapeutskom
                            kozmetologijom, a u sklopu toga donosimo nove oblike
                            dijagnostike i terapije.
                            <br />
                            Posebnu pozornost, pak,
                            želimo posvetiti melanomima, tj. raku kože, koji
                            je zabrinjavajuće dominantan na obalnom i otočnom
                            području Dubrovačko - neretvanske županije.
                            <br />
                            Otvaranjem ambulante nastojimo stvoriti i više
                            radnih mjesta, pogotovo pružajući prilike za rad
                            i rast mladima koji žele raditi i napredovati u ovoj zemlji.
                            <br />
                            Uz ambulantu u Pločama, želimo eventualno otvoriti i podružnicu
                            na otoku Korčuli. Ciljamo dovoditi gostujuće doktore kako bismo
                            stanovništvu pružili što je moguće više različitih kvalitetnih
                            usluga na što kraćoj relaciji.
                        </Typography>
                    </Container>
                </Box>
            }
            </Box>
        </StyledContainer>
    )
}

export default MissionAndVision;