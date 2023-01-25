import { DndContext, closestCenter, useSensors, MouseSensor, TouchSensor, useSensor } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { Divider, Typography, Grid, Box } from "@mui/material";
import { services, subservices } from '@prisma/client';
import { SortableItem } from "./sortableItem";

interface ServicesWithSubservices extends services {
    subservices: subservices[];
}

interface SubservicesProps {
    services: ServicesWithSubservices[] | null;
    handleDragChildEnd: (e: any, id: number) => void;
    handleDelete: (serviceId: string) => void;
}

const Subservices = ({
    services,
    handleDragChildEnd,
    handleDelete
}: SubservicesProps) => {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    return (
        <Box>
            {typeof services !== "undefined" && services && services.length > 0 && services.map((serviceItem) => (
                serviceItem.subservices && serviceItem.subservices.length > 0 ?
                    <Box key={serviceItem.id}>
                        <Divider sx={{ my: "32px", borderBottomWidth: "2px" }} />
                        <Typography component="h2" variant="h5" sx={{ mb: "32px" }}>
                            {serviceItem.name}
                        </Typography>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={(e) => handleDragChildEnd(e, serviceItem.id)}
                        >
                            <SortableContext
                                items={
                                    serviceItem.subservices ?
                                        serviceItem.subservices
                                        :
                                        []
                                }
                                strategy={rectSortingStrategy}
                            >
                                <Grid container spacing={2}>
                                    {serviceItem.subservices ? serviceItem.subservices.map((subserviceItem) => (
                                        <SortableItem handleDelete={handleDelete} subservice={subserviceItem} key={subserviceItem.id} />
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

export default Subservices;