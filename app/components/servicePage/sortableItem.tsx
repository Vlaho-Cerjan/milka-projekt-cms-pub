import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, Button, CardMedia } from '@mui/material';
import { DeleteOutlineOutlined, DragHandle, EditOutlined, MoreVert } from '@mui/icons-material';
import { subservices } from '@prisma/client';
import StyledDropdownIconOnly from '../common/styledInputs/styledDropdownIconOnly/styledDropdownIconOnly';
import { useSnackbar } from 'notistack';

export function SortableItem({ subservice, handleDelete }: { subservice: subservices, handleDelete: (servicesId: string) => void }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: subservice.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // get last slug word from url
    const lastSlugWord = subservice.slug && subservice.slug.split("/").pop();

    return (
        <Grid sx={{ borderRadius: "12px" }} ref={setNodeRef} style={style} {...attributes} item xs={12} sm={6} md={4} id={subservice.id.toString()} key={subservice.id}>
            <Card sx={{ borderRadius: "12px", height: "100%", position: "relative", opacity: subservice.active === 0 ? 0.5 : 1 }}>
                <CardActionArea
                    sx={{ height: "100%" }}
                    href={'/subservices' + (subservice.slug === "/" ? "/naslovna" : (subservice.slug && subservice.slug.includes("#")) ? "/" + subservice.name.toLowerCase().replaceAll(" ", "_") : lastSlugWord ? "/" + lastSlugWord : "/" + subservice.slug)}
                >
                    {subservice.img_src ?
                        <CardMedia
                            component="img"
                            height="140"
                            image={subservice.img_src}
                            alt={subservice.description ? subservice.description : subservice.name}
                        />
                        : null}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {!subservice.name ? "Naslovna" : subservice.name}
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
                        }}
                        {...listeners}
                    >
                        <DragHandle />
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
                            id={subservice.id.toString()}
                            buttonId={"button_" + subservice.id.toString()}
                            icon={<MoreVert />}
                            dropdownId={"dropdown_" + subservice.id.toString()}
                            dropdownMenuItems={[
                                {
                                    icon: <EditOutlined />,
                                    text: "Uredi",
                                    href: '/subservices' + (subservice.slug === "/" ? "/naslovna" : subservice.slug)
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