import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, Button, CardMedia } from '@mui/material';
import { DeleteOutlineOutlined, DragHandle, EditOutlined, MoreVert } from '@mui/icons-material';
import { services } from '@prisma/client';
import StyledDropdownIconOnly from '../common/styledInputs/styledDropdownIconOnly/styledDropdownIconOnly';
import { CustomThemeContext } from '../../store/customThemeContext';
import React from 'react';

export function ServiceSortableItem({ service, handleDelete }: { service: services, handleDelete: (servicesId: string) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: service.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const { theme } = React.useContext(CustomThemeContext);

    // get last slug word from url
    const lastSlugWord = service.slug && service.slug.split("/").pop();

    return (
        <Grid sx={{ borderRadius: "12px" }} ref={setNodeRef} style={style} {...attributes} item xs={12} sm={6} md={4} id={service.id.toString()} key={service.id}>
            <Card sx={{ borderRadius: "12px", height: "100%", position: "relative", opacity: service.active === 0 ? 0.5 : 1 }}>
                <CardActionArea
                    sx={{ height: "100%" }}
                    href={'/services' + (service.slug === "/" ? "/naslovna" : (service.slug && service.slug.includes("#")) ? "/" + service.name.toLowerCase().replaceAll(" ", "_") : lastSlugWord ? "/" + lastSlugWord : "/" + service.slug)}
                >
                    {service.img_src ?
                        <CardMedia
                            component="img"
                            height="140"
                            image={service.img_src}
                            alt={service.description ? service.description : service.name}
                        />
                        : null}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {!service.name ? "Naslovna" : service.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Box
                    sx={{
                        position: "absolute",
                        top: "4px",
                        right: "4px",
                        display: "flex",
                        justifyContent: "flex-end",
                        zIndex: "100",
                    }}
                >
                    <Button
                        onClick={(e) => e.preventDefault()}
                        className="dragHandle"
                        sx={{
                            minWidth: "0",
                            background: theme.palette.action.active,

                            '&:hover': {
                                background: theme.palette.text.primary,
                            }
                        }}
                        {...listeners}
                    >
                        <DragHandle
                            sx={{
                                fill: theme.palette.primary.contrastText
                            }}
                        />
                    </Button>
                </Box>
                {

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
                            id={service.id.toString()}
                            buttonId={"button_" + service.id.toString()}
                            icon={<MoreVert />}
                            dropdownId={"dropdown_" + service.id.toString()}
                            dropdownMenuItems={[
                                {
                                    icon: <EditOutlined />,
                                    text: "Uredi",
                                    href: '/services' + (service.slug === "/" ? "/naslovna" : service.slug)
                                },
                                {
                                    icon: <DeleteOutlineOutlined />,
                                    text: "Obriši",
                                    function: (id: string) => { handleDelete(id) },
                                    addFunctionId: true,
                                },
                            ]}
                        />
                    </Box>
                }
            </Card>
        </Grid>
    );
}