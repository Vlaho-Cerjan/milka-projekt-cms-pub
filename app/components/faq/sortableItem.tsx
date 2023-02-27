import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, Button, Divider } from '@mui/material';
import { CancelOutlined, DeleteOutlineOutlined, DragHandle, EditOutlined, SaveOutlined } from '@mui/icons-material';
import { faq } from '@prisma/client';
import StyledInput from '../common/styledInputs/styledInput';
import { StyledLabel } from '../common/styledInputs/styledLabel/styledLabel';
import { useSnackbar } from 'notistack';

interface items extends faq {
    locked: boolean
}

export function SortableItem({ faq, index, items, setItems }: { faq: items, index: number, items: items[], setItems: React.Dispatch<React.SetStateAction<items[]>> }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: faq.id });

    const { enqueueSnackbar } = useSnackbar();

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };


    const unlockItem = (id: number) => {
        setItems(items.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    locked: !item.locked
                }
            }
            return item;
        }));
    }

    const deleteItem = (id: number) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `faq`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                },
            body: JSON.stringify({
                id: id,
            })
        })
            .then((res) => {
                if (res.ok) {
                    enqueueSnackbar('Uspješno ste izbrisali faq!', { variant: 'success' });
                    setItems(items.filter((item) => item.id !== id));
                }
                else {
                    Promise.reject(res);
                }
            })
            .catch((err) => {
                enqueueSnackbar('Došlo je do greške!', { variant: 'error' });
                console.log(err);
            });
    }

    const handleUpdateItem = (faq: items) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `faq`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(faq),
        })
            .then((res) => res.json())
            .then((data: faq) => {
                enqueueSnackbar('Uspješno ste izmjenili društvenu mrežu!', { variant: 'success' });
                setItems((prev) => prev.map((item) => {
                    if (item.id === data.id) {
                        return {
                            ...data,
                            locked: true,
                        }
                    }
                    return item;
                }));
            });
    }

    return (
        <Box
            ref={setNodeRef} style={style} {...attributes}
            key={index}
            sx={{
                p: "16px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
            }}
        >
            <Divider flexItem sx={{ width: "100%", my: "0", pb: "16px", borderTopWidth: "2px", borderBottomWidth: 0 }} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                    {StyledLabel("Naslov")}
                    <StyledInput
                        multiline
                        rows={4}
                        required
                        disabled={faq.locked}
                        inputVal={faq.title}
                        inputPlaceholder={"Unesi Naslov"}
                        inputChangeFunction={(value) => {
                            setItems(items.map((item) => {
                                if (item.id === faq.id) {
                                    return {
                                        ...item,
                                        title: value
                                    }
                                }
                                return item;
                            }));
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    {StyledLabel("Sadržaj")}
                    <StyledInput
                        multiline
                        rows={4}
                        required
                        disabled={faq.locked}
                        inputVal={faq.content}
                        inputPlaceholder={"Unesi Sadžaj"}
                        inputChangeFunction={(value) => {
                            setItems(items.map((item) => {
                                if (item.id === faq.id) {
                                    return {
                                        ...item,
                                        content: value
                                    }
                                }
                                return item;
                            }))
                        }}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box sx={{ textAlign: "right" }}>
                        {StyledLabel("Akcije")}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {!faq.locked ?
                                <Button
                                    variant='contained'
                                    sx={{ minWidth: 0, padding: "14px", mr: "12px" }}
                                    color='error'
                                    onClick={() => {
                                        // lock faq
                                        setItems(items.map((item) => {
                                            if (item.id === faq.id) {
                                                return {
                                                    ...item,
                                                    locked: true
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                >
                                    <CancelOutlined />
                                </Button>
                                : null}
                            <Button onClick={() => {
                                if (faq.locked) {
                                    unlockItem(faq.id);
                                } else {
                                    handleUpdateItem(faq);
                                }
                            }} variant="contained" sx={{ minWidth: 0, padding: "14px", mr: "12px" }}>
                                {faq.locked ? <EditOutlined /> : <SaveOutlined />}
                            </Button>
                            <Button onClick={() => deleteItem(faq.id)} variant="contained" sx={{ minWidth: 0, padding: "14px" }}>
                                <DeleteOutlineOutlined />
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box
                sx={{
                    position: "absolute",
                    top: "16px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    justifyContent: "flex-end",
                    zIndex: "100",
                }}
            >
                <Button
                    onClick={(e) => e.preventDefault()}
                    className="dragHandle"
                    sx={{
                        minWidth: "64px",
                    }}
                    {...listeners}
                >
                    <DragHandle />
                </Button>
            </Box>
        </Box>
    );
}