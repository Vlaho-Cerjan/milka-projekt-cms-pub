import SEO from '../../app/components/common/SEO/SEO';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Grid, Button } from '@mui/material';
import { PrismaClient, services_list, subservices, services } from '@prisma/client';
import React from 'react';
import { useSnackbar } from 'notistack';
import Subservices from '../../app/components/servicePage/subservices';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { useSensors, useSensor, MouseSensor, TouchSensor, DndContext, closestCenter } from '@dnd-kit/core';
import { ServiceSortableItem } from '../../app/components/servicePage/serviceSortableItem';
import { InferGetStaticPropsType } from "next";

export const getStaticProps = async () => {
    const prisma = new PrismaClient();

    // get services and subservices and store subservices in services
    let services: any = await prisma.services.findMany({
        where: {
            active: 1,
        },
        orderBy: {
            item_order: 'asc',
        }
    });

    const subservices = await prisma.subservices.findMany({
        where: {
            active: 1,
        },
        orderBy: {
            item_order: 'asc',
        }
    });

    const servicesWithSubservices = services.map((service: services) => {
        return {
            ...service,
            subservices: subservices.filter((subservice) => subservice.usluga_id === service.id),
        };
    });

    services = servicesWithSubservices;

    return {
        props: {
            services,
        },
    };
}

interface ServicesWithSubservices extends services {
    subservices: subservices[];
}

const Services = ({ services }: { services: ServicesWithSubservices[] }) => {
    const [servicesState, setServicesState] = React.useState<ServicesWithSubservices[] | null>(null);
    const [subservicesState, setSubservicesState] = React.useState<{
        [key: string]: subservices[];
    } | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const handleDelete = (serviceId: string) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `services/` + serviceId, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then(() => {
                enqueueSnackbar('Uspješno ste izbrisali stranicu!', { variant: 'success' });
                fetch(process.env.NEXT_PUBLIC_API_URL + 'services_with_subservices')
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        setServicesState(data);
                    }
                    );
            })
    }

    const handleDeleteSubservice = (serviceId: string) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `subservices/` + serviceId, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then(() => {
                enqueueSnackbar('Uspješno ste izbrisali podstranicu!', { variant: 'success' });
                fetch(process.env.NEXT_PUBLIC_API_URL + 'services_with_subservices')
                    .then((res) => res.json())
                    .then((data) => {
                        setServicesState(data);
                    }
                    );
            })
    }

    function handleDragChildEnd(event: any, childId: number) {
        const { active, over } = event;

        if (active.id !== over.id && subservicesState) {
            const oldChildItemIndex = subservicesState[childId].findIndex(nav => nav.id === active.id);
            const newChildItemIndex = subservicesState[childId].findIndex(nav => nav.id === over.id);
            const orderedItems = arrayMove(subservicesState[childId], oldChildItemIndex, newChildItemIndex);
            setSubservicesState(prevState => {
                return {
                    ...prevState,
                    [childId]: orderedItems
                }
            })
            fetch(process.env.NEXT_PUBLIC_API_URL + 'subservices/order', {
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
                        enqueueSnackbar('Subservice order updated', { variant: 'success' });
                    }
                });
        }
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            if (servicesState) {
                const oldItemIndex = servicesState.findIndex((item) => item.id === active.id);
                const newItemIndex = servicesState.findIndex((item) => item.id === over.id);
                fetch(process.env.NEXT_PUBLIC_API_URL + 'services/order', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderedIds: arrayMove(
                            servicesState,
                            oldItemIndex,
                            newItemIndex
                        ).map((item) => item.id),
                    }),
                })
                    .then((res) => {
                        return res.json()
                    })
                    .then(async (data: { success: boolean, services: services_list[] }) => {
                        if (data.success) {
                            enqueueSnackbar('Navigation order updated', { variant: 'success' });
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    }
                    );
                setServicesState(arrayMove(servicesState, oldItemIndex, newItemIndex));
            }
        }
    }

    React.useEffect(() => {
        if (services) {
            setServicesState(services);

            const subservices = services.map((service) => {
                return service.subservices;
            });

            const tempSubservices = subservices.flat();

            setSubservicesState(() => {
                const children: { [key: string]: subservices[] } = {};
                tempSubservices.filter(subservice => subservice.usluga_id !== null).forEach(subservice => {
                    if (subservice.usluga_id) {
                        if (children[subservice.usluga_id.toString()]) {
                            children[subservice.usluga_id.toString()].push(subservice);
                        } else {
                            children[subservice.usluga_id.toString()] = [subservice];
                        }
                    }
                });
                return children;
            });
        }
    }, [services]);

    return (
        <StyledContainer>
            <SEO page_info={
                {
                    page_slug: "/services",
                    page_title: "Usluge",
                    page_description: "Usluge",
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
                        mb: "32px"
                    }}
                >
                    <Typography component="h1" variant="h4">
                        Usluge
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            href="/services/create"
                            sx={{
                                fontSize: '1.1rem',
                                mr: '16px'
                            }}
                        >
                            DODAJ USLUGU
                        </Button>
                        <Button
                            variant="contained"
                            color="info"
                            href="/subservices/create"
                            sx={{
                                fontSize: '1.1rem',
                            }}
                        >
                            DODAJ PODUSLUGU
                        </Button>
                    </Box>

                </Box>
                <Box component="form">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={
                                typeof servicesState !== "undefined" && servicesState && servicesState.length > 0 ?
                                    servicesState
                                    :
                                    []
                            }
                            strategy={rectSortingStrategy}
                        >
                            <Grid container spacing={2}>
                                {typeof servicesState !== "undefined" && servicesState && servicesState.length > 0 ? servicesState.map((service) => (
                                    <ServiceSortableItem
                                        key={service.id}
                                        service={service}
                                        handleDelete={handleDelete}
                                    />
                                ))
                                    : null
                                }
                            </Grid>
                        </SortableContext>
                    </DndContext>
                </Box>
                <Box>
                    <Subservices
                        services={servicesState}
                        handleDragChildEnd={handleDragChildEnd}
                        handleDelete={handleDeleteSubservice}
                    />
                </Box>
            </Box>
        </StyledContainer>
    )
}

export default Services;