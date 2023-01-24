import { doctors, PrismaClient, services, services_list, services_price_list, subservices } from '@prisma/client';
import { StyledContainer } from '../../app/components/common/container/styledContainer';
import {
    Box,
    Typography,
    Button,
    Paper,
    Divider,
    Grid,
    FormControl,
    MenuItem,
    Select,
    styled,
} from '@mui/material';
import SEO from '../../app/components/common/SEO/SEO';
import { KeyboardArrowLeft } from '@mui/icons-material';
import React from 'react';
import { StyledLabel } from '../../app/components/common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../../app/components/common/styledInputs/styledInput';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { CustomThemeContext } from '../../app/store/customThemeContext';
import StyledUpload from '../../app/components/common/styledInputs/styledUpload/styledUpload';
import { UploadFileContainer } from '../../app/components/common/styledInputs/styledUploadFormContainer/styledUploadFormContainer';
import { UploadFileFormLabel } from '../../app/components/common/styledInputs/styledUploadFormLabel/styledUploadFormLabel';
import StyledSearchAutoComplete from '../../app/components/common/styledInputs/styledSearchAutocomplete/styledSearchAutocomplete';

const StyledGrid = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
}));

export const getStaticProps = async ({ params }: { params: { serviceHref: string } }) => {
    const prisma = new PrismaClient();

    const services = await prisma.services.findMany();

    let service = await prisma.services.findFirst({
        where: {
            slug: params.serviceHref === "naslovna" ? "/" : "/" + params.serviceHref,
            active: 1
        }
    });

    const subservices = await prisma.subservices.findMany({
        where: {
            active: 1
        }
    });

    const doctors = await prisma.doctors.findMany();

    if (service) {
        const tempService = {
            ...service,
            subservices: subservices.filter((subservice) => subservice.usluga_id === (service ? service.id : 0)),
        };

        service = tempService

        return {
            props: {
                service,
                services,
                doctors
            },
        };
    }

    return {
        props: {
            service: null,
            services,
            doctors
        },
    };

}

export const getStaticPaths = async () => {
    const prisma = new PrismaClient();

    const services = await prisma.services.findMany();

    const getLastWord = (str: string) => {
        const last = str.trim().split("/").pop();
        if (last) {
            return last;
        }
        return "";
    }

    const paths = services.map((service) => ({
        params: { serviceHref: service.slug === "/" ? "naslovna" : service.slug ? getLastWord(service.slug) : "" },
    }));

    return { paths, fallback: false };
}

interface service_with_subservices extends services {
    subservices: subservices[];
}

interface NavPageProps {
    service: service_with_subservices | null;
    services: services[];
    doctors: doctors[];
}

const NavPage = ({ service, services, doctors }: NavPageProps) => {
    const router = useRouter();
    const { isDark, theme } = React.useContext(CustomThemeContext);
    const { enqueueSnackbar } = useSnackbar();
    const [name, setName] = React.useState(service?.name);
    const [description, setDescription] = React.useState(service?.description);
    const [alt, setAlt] = React.useState(service?.alt);
    const [img_src, setImgSrc] = React.useState(service?.img_src ? service?.img_src : "");
    const [slug, setSlug] = React.useState(service?.slug);
    const [active, setActive] = React.useState(service?.active);
    const [currentDoctors, setCurrentDoctors] = React.useState<{ id: number, name: string, label: string }[]>([]);
    const [selectedDoctors, setSelectedDoctors] = React.useState<{ id: number, name: string, label: string }[]>([]);

    const fetchFilteredDoctors = (searchVal: string, selItems: any[] | null, setCurrentItems: React.Dispatch<React.SetStateAction<any[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, signal?: AbortSignal) => {
        setLoading(true);
        if(searchVal === "") {
            if(selItems) {
                const filteredDoctors = doctors.filter((doctor) => {
                    return !selItems.find((selItem) => selItem.id === doctor.id);
                }
                ).map((doctor) => {
                    return {
                        id: doctor.id,
                        name: doctor.first_name + " " + doctor.last_name,
                        label: doctor.first_name + " " + doctor.last_name,
                    }
                }
                );
                setCurrentItems(filteredDoctors);
            }else{
                const filteredDoctors = doctors.map((doctor) => {
                    return {
                        id: doctor.id,
                        name: doctor.first_name + " " + doctor.last_name,
                        label: doctor.first_name + " " + doctor.last_name,
                    }
                }
                );
                setCurrentItems(filteredDoctors);
            }
            setLoading(false);
            return;
        }
        fetch(process.env.NEXT_PUBLIC_API_URL + "doctors/filter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                filter: searchVal,
            }),
        })
            .then((res) => res.json())
            .then((res: { success: boolean, doctors: doctors[] }) => {
                if (res.success) {
                    const filteredDoctors = res.doctors.filter((doctor) => {
                        if (selItems) {
                            return !selItems.find((selItem) => selItem.id === doctor.id);
                        }
                        return true;
                    }).map((doctor) => {
                        return {
                            id: doctor.id,
                            name: doctor.first_name + " " + doctor.last_name,
                            label: doctor.first_name + " " + doctor.last_name
                        }
                    });
                    setCurrentItems(filteredDoctors);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    React.useEffect(() => {
        if (doctors && service) {
            const dbDoctors = doctors.filter((doctor) => {
                if (service.doctors_id) {
                    return service.doctors_id.split(",").includes(doctor.id.toString());
                }
                return false;
            }).map((doctor) => {
                return {
                    id: doctor.id,
                    name: doctor.first_name + " " + doctor.last_name,
                    label: doctor.first_name + " " + doctor.last_name
                }
            });
            const doctors_list: { id: number, name: string, label: string }[] = [];
            doctors.forEach((doctor) => {
                if (!dbDoctors.find((dbDoctor) => dbDoctor.id === doctor.id)) {
                    doctors_list.push({
                        id: doctor.id,
                        name: doctor.first_name + " " + doctor.last_name,
                        label: doctor.first_name + " " + doctor.last_name
                    });
                }
            });

            //console.log(dbDoctors, doctors_list, 'doctors');

            setCurrentDoctors(doctors_list);
            setSelectedDoctors(dbDoctors);
        }
    }, [doctors]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        fetch(process.env.NEXT_PUBLIC_API_URL + 'services', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: service?.id,
                name: name,
                slug: slug,
                description: description,
                alt: alt,
                img_src: img_src,
                active: active,
                doctors_id: selectedDoctors.map((doctor) => doctor.id).join(",")
            })
        })
            .then(res => {
                if (res.status === 200) {
                    enqueueSnackbar("Uspješno ste ažurirali podatke", { variant: "success" });
                    router.back();
                } else if (res.status === 400) {
                    enqueueSnackbar("Greška prilikom ažuriranja podataka", { variant: "error" });
                }
            })
            .catch(err => {
                console.log(err);
                enqueueSnackbar("Došlo je do greške", { variant: "error" });
            }
            );
    }

    return (
        <StyledContainer>
            <SEO page_info={
                {
                    page_slug: "/services/" + service?.id,
                    page_title: "Stranice | " + service?.name,
                    page_description: "Stranice | " + service?.name,
                    image: "",
                    openGraphType: "website"
                }
            } />
            <Typography component="h1" variant="h4" sx={{ mb: "32px" }}>
                {service?.name ? service?.name : "Navigacija"}
            </Typography>
            <Paper
                component={"form"}
                onSubmit={handleSubmit}
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
                        <Button
                            sx={{
                                paddingLeft: "4px",
                                backgroundColor: isDark ? theme.palette.grey[700] : theme.palette.grey[200],
                                color: isDark ? "#fff" : "#333",
                                '&:hover': {
                                    backgroundColor: isDark ? theme.palette.grey[600] : theme.palette.grey[300],
                                }
                            }}
                            variant="contained"
                            href="/services"
                        >
                            <KeyboardArrowLeft sx={{ fontSize: "24px" }} /> Nazad
                        </Button>
                    </Box>
                    <Box>
                        <Button variant='contained' type='submit'>
                            <Typography sx={{ fontWeight: "700 !important" }}>
                                Spremi
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ mb: "16px", borderBottomWidth: "2px" }} />
                <Box
                    sx={{
                        p: "16px",
                    }}
                >
                    <Grid container spacing={2}>
                        <StyledGrid item xs={12} sm={6} md={6} lg={3}>
                            {StyledLabel("Ime")}
                            <StyledInput
                                inputVal={name}
                                inputPlaceholder={"Unesi ime"}
                                inputChangeFunction={setName}
                                required
                            />
                        </StyledGrid>
                        <StyledGrid item xs={12} sm={6} md={6} lg={3}>
                            {StyledLabel("Slug - unesite # za uslugu koja nema slug")}
                            <StyledInput
                                inputVal={slug}
                                inputPlaceholder={"Unesi slug (URL)"}
                                inputChangeFunction={setSlug}
                                required
                            />
                        </StyledGrid>
                        <StyledGrid item xs={12} sm={6} md={6} lg={3}>
                            {StyledLabel("Aktivan")}
                            <FormControl fullWidth>
                                <Select
                                    id="demo-simple-select"
                                    value={active}
                                    onChange={(e) => setActive(e.target.value as number)}
                                    sx={{
                                        fontSize: "14px",

                                        '& fieldset': {
                                            borderRadius: "12px",
                                            borderWidth: "2px",
                                        },

                                        '& .MuiSelect-select': {
                                            fontSize: "1em",
                                            fontWeight: 500,
                                        },
                                    }}
                                >
                                    <MenuItem value={1}>Da</MenuItem>
                                    <MenuItem value={0}>Ne</MenuItem>
                                </Select>
                            </FormControl>
                        </StyledGrid>
                        <StyledGrid item xs={12} sm={6} md={6} lg={3}>
                            {StyledLabel("Alt")}
                            <StyledInput
                                inputVal={alt}
                                inputPlaceholder={"Unesi alt za sliku"}
                                inputChangeFunction={setAlt}
                            />
                        </StyledGrid>
                        <StyledGrid
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                            }}
                            item xs={12} sm={6} md={6} lg={3}>
                            {StyledLabel("Doktori")}
                            <StyledSearchAutoComplete
                                fetchItems={fetchFilteredDoctors}
                                currentItems={currentDoctors}
                                setCurrentItems={setCurrentDoctors}
                                selectedItems={selectedDoctors}
                                setSelectedItems={setSelectedDoctors}
                                title="Doktori"
                                searchPlaceholder="Pretraži doktore"
                            />
                        </StyledGrid>
                        <StyledGrid item xs={12} sm={6} md={6} lg={3}>
                            {StyledLabel("Opis")}
                            <StyledInput
                                inputVal={description}
                                inputPlaceholder={"Unesi ime"}
                                inputChangeFunction={setDescription}
                                multiline
                                minRows={6}
                                boxSx={{
                                    height: "100%"
                                }}
                                InputProps={{
                                    sx: {
                                        height: "100%",
                                        minHeight: "150px",

                                        '.MuiInputBase-input': {
                                            height: "100% !important",
                                        }
                                    }
                                }}
                            />
                        </StyledGrid>
                        <StyledGrid item xs={12} sm={12} md={12} lg={6}>
                            <UploadFileContainer>
                                <UploadFileFormLabel>META SLIKA</UploadFileFormLabel>
                                <StyledUpload aspectRatio={1.91 / 1} type="image" file={img_src} setFile={setImgSrc} resizeSizes={{ width: 720, height: 480 }} />
                            </UploadFileContainer>
                        </StyledGrid>
                    </Grid>
                </Box>
            </Paper>
        </StyledContainer>
    )
}

export default NavPage;