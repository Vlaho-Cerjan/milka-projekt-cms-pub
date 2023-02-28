import { faq } from '@prisma/client';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { KeyboardArrowLeft } from '@mui/icons-material';
import React from 'react';
import { useSnackbar } from 'notistack';
import { CustomThemeContext } from '../../app/store/customThemeContext';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableItem } from '../../app/components/faq/sortableItem';

interface items extends faq {
    locked: boolean;
}

const FAQ = () => {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();

    const [items, setItems] = React.useState<items[]>([]);

    React.useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + 'faq', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return res.json()
            })
            .then((faqs: faq[]) => {
                setItems(faqs.map((item) => ({
                    ...item,
                    locked: true
                })));
            })
            .catch((err) => {
                enqueueSnackbar('Error: ' + err, { variant: 'error' });
            });

        return () => {
            setItems([]);
        }
    }, []);

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            if (items) {
                const oldItemIndex = items.findIndex((item) => item.id === active.id);
                const newItemIndex = items.findIndex((item) => item.id === over.id);
                setItems(arrayMove(items, oldItemIndex, newItemIndex));
                fetch(process.env.NEXT_PUBLIC_API_URL + 'faq/order', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        orderedIds: arrayMove(
                            items,
                            oldItemIndex,
                            newItemIndex
                        ).map((item) => item.id),
                    }),
                })
                    .then((res) => {
                        return res.json()
                    })
                    .then(async (data: { success: boolean, faq: faq[] }) => {
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
                    page_slug: "/pages/faqs",
                    page_title: "Stranice | Često Postavljena Pitanja",
                    page_description: "Stranice | Često Postavljena Pitanja",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                Često Postavljena Pitanja
            </Typography>
            <Paper
                elevation={3}
                sx={{
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: "16px",
                    }}
                >
                    <Box>
                        <Button sx={{
                            paddingLeft: "4px",
                            backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[200],
                            color: isDark ? "#fff" : "#333",
                            '&:hover': {
                                backgroundColor: isDark ? theme.palette.grey[600] : theme.palette.grey[300],
                            }
                        }} variant="contained" href="/pages">
                            <KeyboardArrowLeft sx={{ fontSize: "24px" }} /> Nazad
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' href="/faq/create">
                            <Typography sx={{ fontWeight: "700 !important" }}>
                                Dodaj Novo Pitanje
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ mb: "16px", borderBottomWidth: "2px" }} />
                <Box>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={
                                items ?
                                    items
                                    :
                                    []
                            }
                            strategy={rectSortingStrategy}
                        >
                            {items.map((faq, index) => (
                                <SortableItem
                                    key={faq.id}
                                    index={index}
                                    faq={faq}
                                    items={items}
                                    setItems={setItems}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                </Box>
            </Paper>
        </StyledContainer>
    )
}

export default FAQ;