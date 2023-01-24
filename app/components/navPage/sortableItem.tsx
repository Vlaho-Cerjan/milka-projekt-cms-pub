import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, Button } from '@mui/material';
import { DragHandle } from '@mui/icons-material';
import { navigation } from '@prisma/client';

export function SortableItem({ navigation }: { navigation: navigation }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: navigation.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Grid sx={{ borderRadius: "12px" }} ref={setNodeRef} style={style} {...attributes} item xs={12} sm={6} md={4} id={navigation.id.toString()} key={navigation.id}>
            <Card sx={{ borderRadius: "12px", height: "100%", position: "relative", opacity: navigation.active === 0 ? 0.5 : 1 }}>
                <CardActionArea
                    sx={{ height: "100%" }}
                    href={'/navigation' + (navigation.href === "/" ? "/naslovna" : (navigation.href.includes("#")) ? "/" + navigation.name.toLowerCase().replaceAll(" ", "_") : navigation.href)}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {!navigation.name ? "Naslovna" : navigation.name}
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
            </Card>
        </Grid>
    );
}