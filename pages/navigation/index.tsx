import SEO from '../../app/components/common/SEO/SEO';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Grid, Divider, Button } from '@mui/material';
import { PrismaClient, navigation } from '@prisma/client';
import { DndContext, closestCenter, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import React from 'react';
import { SortableItem } from '../../app/components/navPage/sortableItem';
import { useSnackbar } from 'notistack';
import NavChildren from '../../app/components/navPage/navChildren';

export const getStaticProps = async () => {
    const prisma = new PrismaClient();

    const navigations = await prisma.navigation.findMany({
        orderBy: {
            nav_order: 'asc'
        }
    });

    return {
        props: {
            navigations,
        },
    };
}

const Navigation = ({ navigations }: { navigations: navigation[] }) => {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const [nav, setNav] = React.useState(navigations);
    const [mainNav, setMainNav] = React.useState<navigation[] | null>(null);
    const [childrenNav, setChildrenNav] = React.useState<{
        [key: string]: navigation[];
    } | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    const fetchNavigations = async () => {
        fetch(process.env.NEXT_PUBLIC_API_URL + 'navigation', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => res.json())
            .then((data: navigation[]) => {
                setNav(data);
            })
            .catch(err => {
                enqueueSnackbar('Error: ' + err, { variant: 'error' });
            }
            );
    }

    React.useEffect(() => {
        if (nav) {
            setMainNav(nav.filter(navTemp => navTemp.parent_id === null).sort(
                (a, b) => a.nav_order - b.nav_order
            ));
            setChildrenNav(() => {
                const children: { [key: string]: navigation[] } = {};
                nav.filter(navTemp => navTemp.parent_id !== null).forEach(navTemp => {
                    if (navTemp.parent_id) {
                        if (children[navTemp.parent_id.toString()]) {
                            children[navTemp.parent_id.toString()].push(navTemp);
                        } else {
                            children[navTemp.parent_id.toString()] = [navTemp];
                        }
                    }
                });
                return children;
            });
        }

        return () => {
            setMainNav(null);
            setChildrenNav(null);
        }
    }, [nav]);

    function handleDragChildEnd(event: any, childId: number) {
        const { active, over } = event;

        if (active.id !== over.id && childrenNav) {
            const oldChildItemIndex = childrenNav[childId].findIndex(nav => nav.id === active.id);
            const newChildItemIndex = childrenNav[childId].findIndex(nav => nav.id === over.id);
            const orderedItems = arrayMove(childrenNav[childId], oldChildItemIndex, newChildItemIndex);
            setChildrenNav(prevState => {
                return {
                    ...prevState,
                    [childId]: orderedItems
                }
            })
            fetch(process.env.NEXT_PUBLIC_API_URL + 'navigation/order', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderedIds: orderedItems.map(nav => nav.id),
                }),
            })
                .then((res) => res.json())
                .then(async (data) => {
                    if (data.success) {
                        enqueueSnackbar('Navigation order updated', { variant: 'success' });
                    }
                });
        }
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            if (mainNav) {
                const oldItemIndex = mainNav.findIndex((item) => item.id === active.id);
                const newItemIndex = mainNav.findIndex((item) => item.id === over.id);
                setMainNav(arrayMove(mainNav, oldItemIndex, newItemIndex));
                fetch(process.env.NEXT_PUBLIC_API_URL + 'navigation/order', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderedIds: arrayMove(
                            mainNav,
                            oldItemIndex,
                            newItemIndex
                        ).map((item) => item.id),
                    }),
                })
                    .then((res) => {
                        return res.json()
                    })
                    .then(async (data: { success: boolean, nav: navigation[] }) => {
                        if (data.success) {
                            enqueueSnackbar('Navigation order updated', { variant: 'success' });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    }
                    );

            }
        }
    }

    return (
        <StyledContainer>
            <SEO page_info={
                {
                    page_slug: "/navigation",
                    page_title: "Navigacija",
                    page_description: "Navigacija",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Navigacija
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        href="/navigation/create"
                        sx={{
                            fontSize: '1.1rem',
                        }}
                    >
                        DODAJ NAVIGACIJU
                    </Button>
                </Box>
                <Divider sx={{ borderBottomWidth: "2px", my: "32px" }} />
                <Box>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={
                                mainNav ?
                                    mainNav
                                    :
                                    []
                            }
                            strategy={rectSortingStrategy}
                        >
                            <Grid container spacing={2}>
                                {mainNav ? mainNav.map((navigation) => (
                                    <SortableItem navigation={navigation} key={navigation.id} />
                                ))
                                    : null}
                            </Grid>
                        </SortableContext>
                    </DndContext>
                </Box>
                <Box>
                    <NavChildren
                        mainNav={mainNav}
                        childrenNav={childrenNav}
                        handleDragChildEnd={handleDragChildEnd}
                    />
                </Box>
            </Box>
        </StyledContainer>
    )
}

export default Navigation;