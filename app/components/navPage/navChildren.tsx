import { DndContext, closestCenter, useSensors, MouseSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Divider, Typography, Grid, Box } from "@mui/material";
import { SortableItem } from "./sortableItem";
import { navigation } from '@prisma/client';

interface NavChildrenProps {
    mainNav: navigation[] | null;
    childrenNav: {
        [key: string]: navigation[];
    } | null;
    handleDragChildEnd: (e: any, id: number) => void;
}

const NavChildren = ({
    mainNav,
    childrenNav,
    handleDragChildEnd,
}: NavChildrenProps) => {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    return (
        <Box>
            {mainNav && mainNav.map((navigation) => (
                childrenNav && childrenNav[navigation.id] ?
                    <Box key={navigation.id}>
                        <Divider sx={{ my: "32px", borderBottomWidth: "2px" }} />
                        <Typography component="h2" variant="h5" sx={{ mb: "32px" }}>
                            {navigation.name}
                        </Typography>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(e) => handleDragChildEnd(e, navigation.id)}
                        >
                            <SortableContext
                                items={
                                    childrenNav[navigation.id] ?
                                        childrenNav[navigation.id]
                                        :
                                        []
                                }
                                strategy={rectSortingStrategy}
                            >
                                <Grid container spacing={2}>
                                    {childrenNav ? childrenNav[navigation.id].map((subnav) => (
                                        <SortableItem navigation={subnav} key={subnav.id} />
                                    ))
                                        : null
                                    }
                                </Grid>
                            </SortableContext>
                        </DndContext>
                    </Box>
                    : null
            ))
            }
        </Box>
    )
}

export default NavChildren;