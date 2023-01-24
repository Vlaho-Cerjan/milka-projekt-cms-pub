import SEO from '../../app/components/common/SEO/SEO';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Card, Typography, Grid, CardActionArea, CardContent, CardMedia } from '@mui/material';
import { PrismaClient, page_info } from '@prisma/client';
import React from 'react';
import { useSnackbar } from 'notistack';

export const getStaticProps = async () => {
    const prisma = new PrismaClient();

    const page_info = await prisma.page_info.findMany();

    return {
        props: {
            page_info,
        },
    };
}

const Pages = ({ page_info }: { page_info: page_info[] }) => {
    const [pages, setPages] = React.useState<page_info[] | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const handleDelete = (pageId: string) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `pages/${pageId}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => {
                enqueueSnackbar('Uspješno ste izbrisali stranicu!', { variant: 'success' });
                fetch(process.env.NEXT_PUBLIC_API_URL + 'pages')
                    .then((res) => res.json())
                    .then((data) => {
                        setPages(data);
                    }
                    );
            })
    }

    React.useEffect(() => {
        if (page_info) {
            setPages(page_info);
        }
    }, [page_info]);

    return (
        <StyledContainer>
            <SEO page_info={
                {
                    page_slug: "/pages",
                    page_title: "Stranice",
                    page_description: "Stranice",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Box>
                <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                    Stranice
                </Typography>
                <Box component="form">
                    <Grid container spacing={2}>
                        {pages ? pages.map((page) => (
                            <Grid sx={{ borderRadius: "12px", }} item xs={12} sm={6} md={4} key={page.id}>
                                <Card sx={{ borderRadius: "12px", height: "100%", position: "relative" }}>
                                    <CardActionArea sx={{ height: "100%" }} href={'/pages' + (page.page_slug === "/" ? "/naslovna" : page.page_slug)}>
                                        {page.image ?
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={page.image}
                                                alt={page.page_description}
                                            />
                                            : null}
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {!page.title ? "Naslovna" : page.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    {
                                    /*
                                        <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: "4px",
                                            right: "4px",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            zIndex: "100",
                                        }}
                                    >
                                        <StyledDropdownIconOnly
                                            id={page.id.toString()}
                                            buttonId={"button_" + page.id.toString()}
                                            icon={<MoreVert />}
                                            dropdownId={"dropdown_" + page.id.toString()}
                                            dropdownMenuItems={[
                                                {
                                                    icon: <EditOutlined />,
                                                    text: "Uredi",
                                                    href: "/pages/" + (page.page_slug !== "/" ? page.page_slug : "naslovna"),
                                                },
                                                {
                                                    icon: <DeleteOutlineOutlined />,
                                                    text: "Obriši",
                                                    function: (id: string) => {handleDelete(id)},
                                                    addFunctionId: true,
                                                },
                                            ]}
                                        />
                                    </Box>
                                    */
                                    }
                                </Card>
                            </Grid>
                        ))
                            : null
                        }
                    </Grid>
                </Box>
            </Box>
        </StyledContainer>
    )
}

export default Pages;