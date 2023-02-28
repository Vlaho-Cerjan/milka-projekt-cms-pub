import { PrismaClient, employees } from '@prisma/client';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import { Box, Typography, Button, Paper, Divider, Grid } from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { EditOutlined, DeleteOutlineOutlined, SaveOutlined, CancelOutlined } from '@mui/icons-material';
import React from 'react';
import { StyledLabel } from '../../app/components/common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../../app/components/common/styledInputs/styledInput';
import { useSnackbar } from 'notistack';
import StyledUpload from '../../app/components/common/styledInputs/styledUpload/styledUpload';
import { UploadFileContainer } from '../../app/components/common/styledInputs/styledUploadFormContainer/styledUploadFormContainer';
import { UploadFileFormLabel } from '../../app/components/common/styledInputs/styledUploadFormLabel/styledUploadFormLabel';

interface items extends employees {
    locked: boolean;
}

const Employees = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [image, setImage] = React.useState<string>("");

    // item is type of employees and has locked property
    const [items, setItems] = React.useState<items[]>([]);

    React.useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `employees`)
            .then((res) => res.json())
            .then((employees: employees[]) => {
                setItems(employees.map((item) => ({ ...item, locked: true })));
            })
            .catch((err) => {
                enqueueSnackbar('Error: ' + err, { variant: 'error' });
            });

        return () => {
            setItems([]);
        }
    }, []);

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
        fetch(process.env.NEXT_PUBLIC_API_URL + `employees`, {
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
                    enqueueSnackbar('Uspješno ste izbrisali doktora!', { variant: 'success' });
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

    const handleUpdateItem = (employee: employees) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `employees`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employee),
        })
            .then((res) => res.json())
            .then((data: employees) => {
                enqueueSnackbar('Uspješno ste izmjenili doktora!', { variant: 'success' });
                setItems((prev) => prev.map((item) => {
                    if (item.id === data.id) {
                        return {
                            ...item,
                            locked: true,
                        }
                    }
                    return item;
                }));
            });
    }

    return (
        <StyledContainer>
            <SEO page_info={
                {
                    page_slug: "/pages/employees",
                    page_title: "Stranice | Zaposlenici",
                    page_description: "Stranice | Zaposlenici",
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                Zaposlenici
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
                    </Box>
                    <Box>
                        <Button variant='contained' href="/employees/create">
                            <Typography sx={{ fontWeight: "700 !important" }}>
                                Dodaj Novog Zaposlenika
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ mb: "16px", borderBottomWidth: "2px" }} />
                {items.map((employee, index) => (
                    <Box
                        key={index}
                        sx={{
                            p: "16px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        {index !== 0 ? <Divider flexItem sx={{ width: "100%", my: "16px", borderBottomWidth: "2px" }} />
                            : null}
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Box sx={{ textAlign: "right" }}>
                                    {StyledLabel("Akcije")}
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        {!employee.locked ?
                                            <Button
                                                variant='contained'
                                                sx={{ minWidth: 0, padding: "14px", mr: "12px" }}
                                                color='error'
                                                onClick={() => {
                                                    // lock employee
                                                    setItems(items.map((item) => {
                                                        if (item.id === employee.id) {
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
                                            if (employee.locked) {
                                                unlockItem(employee.id);
                                            } else {
                                                handleUpdateItem(employee);
                                            }
                                        }} variant="contained" sx={{ minWidth: 0, padding: "14px", mr: "12px" }}>
                                            {employee.locked ? <EditOutlined /> : <SaveOutlined />}
                                        </Button>
                                        <Button onClick={() => deleteItem(employee.id)} variant="contained" sx={{ minWidth: 0, padding: "14px" }}>
                                            <DeleteOutlineOutlined />
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} >
                                {StyledLabel("Ime")}
                                <StyledInput
                                    required
                                    disabled={employee.locked}
                                    inputVal={employee.first_name}
                                    inputPlaceholder={"Unesi Ime"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    first_name: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} >
                                {StyledLabel("Srednje ime")}
                                <StyledInput
                                    disabled={employee.locked}
                                    inputVal={employee.aditional_names}
                                    inputPlaceholder={"Unesi Srednje Ime"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    aditional_names: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} >
                                {StyledLabel("Prezime")}
                                <StyledInput
                                    disabled={employee.locked}
                                    inputVal={employee.last_name}
                                    inputPlaceholder={"Unesi Prezime"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    last_name: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} >
                                {StyledLabel("Titula")}
                                <StyledInput
                                    disabled={employee.locked}
                                    inputVal={employee.title}
                                    inputPlaceholder={"Unesi Titulu"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
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
                            <Grid item xs={12} sm={6} md={6} lg={4} >
                                {StyledLabel("Titula zaposlenika")}
                                <StyledInput
                                    disabled={employee.locked}
                                    inputVal={employee.employe_title}
                                    inputPlaceholder={"Unesi Titulu Zaposlenika"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    employe_title: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} >
                                {StyledLabel("Biografija")}
                                <StyledInput
                                    multiline
                                    rows={4}
                                    disabled={employee.locked}
                                    inputVal={employee.bio}
                                    inputPlaceholder={"Unesi Biografiju"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    bio: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} >
                                {StyledLabel("Email")}
                                <StyledInput
                                    type='email'
                                    disabled={employee.locked}
                                    inputVal={employee.email}
                                    inputPlaceholder={"Unesi Email"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    email: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4} >
                                {StyledLabel("Telefon")}
                                <StyledInput
                                    disabled={employee.locked}
                                    inputVal={employee.phone}
                                    inputPlaceholder={"Unesi Telefon"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    phone: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={4}>
                                {StyledLabel("Slug (Href)")}
                                <StyledInput
                                    disabled={employee.locked}
                                    inputVal={employee.slug}
                                    inputPlaceholder={"Unesi Slug"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    slug: value
                                                }
                                            }
                                            return item;
                                        }))
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                {StyledLabel("Opis Slike")}
                                <StyledInput
                                    multiline
                                    rows={4}
                                    disabled={employee.locked}
                                    inputVal={employee.alt}
                                    inputPlaceholder={"Unesi Opis Slike"}
                                    inputChangeFunction={(value) => {
                                        setItems(items.map((item) => {
                                            if (item.id === employee.id) {
                                                return {
                                                    ...item,
                                                    alt: value
                                                }
                                            }
                                            return item;
                                        }));
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <UploadFileContainer>
                                    <UploadFileFormLabel>SLIKA</UploadFileFormLabel>
                                    <StyledUpload aspectRatio={1 / 1} type="image" file={employee.img_src ? employee.img_src : ""} setFile={
                                        (file) => {
                                            setItems(items.map((item) => {
                                                if (item.id === employee.id) {
                                                    return {
                                                        ...item,
                                                        img_src: file
                                                    }
                                                }
                                                return item;
                                            }));
                                        }
                                    } />
                                </UploadFileContainer>
                            </Grid>

                        </Grid>
                    </Box>
                ))}
            </Paper>
        </StyledContainer>
    )
}

export default Employees;