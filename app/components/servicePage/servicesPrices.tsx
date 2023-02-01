import { Backdrop, Box, Button, Divider, FormControl, Grid, Typography } from '@mui/material';
import { services_price_list } from '@prisma/client';
import Title from "../common/title/title";
import React from 'react';
import { TextBold14, TextBlack14, TextBlack18, TextMedium14 } from '../common/styledInputs/styledText/styledText';
import { CustomThemeContext } from '../../store/customThemeContext';
import { StyledLabel } from '../common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../common/styledInputs/styledInput';
import { borderRadius } from '@mui/system';
import { styled } from '@mui/material/styles';
import StyledButtonIconOnly from '../common/styledInputs/styledButtons/styledButtonIconOnly';
import { Delete } from '@mui/icons-material';

const StyledGridItem = styled(Grid)(({ theme }) => ({
    padding: "2px 8px",
}));

interface ServicesPricesProps {
    index: number;
    servicePrices: {
        title: string;
        description: string;
        value: number;
        discount: number;
    }[][];
    setServicePrices: React.Dispatch<React.SetStateAction<{
        title: string;
        description: string;
        value: number;
        discount: number;
    }[][]>>;
}

const ServicesPrices = (
    {
        index,
        servicePrices,
        setServicePrices
    }: ServicesPricesProps
) => {
    const [open, setOpen] = React.useState(false);
    const { theme } = React.useContext(CustomThemeContext);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [value, setValue] = React.useState(0);
    const [discount, setDiscount] = React.useState(0);

    const openPriceModal = () => {
        console.log("Open price modal");
        setOpen(true);
    }

    const clearValues = () => {
        setTitle("");
        setDescription("");
        setValue(0);
        setDiscount(0);
    }

    const createPrice = () => {
        setServicePrices((prevState) => {
            const newState = [...prevState];
            if (typeof newState[index] === "undefined") {
                newState[index] = [];
            }
            newState[index].push({
                title,
                description,
                value,
                discount
            });
            return newState;
        });
        setOpen(false);
        clearValues();
    }

    return (
        <Box
            sx={{
                p: "16px"
            }}
        >
            <Box>
                <Typography component={"h2"} variant="h5">Cijene usluge</Typography>
                <Box>
                    {
                        typeof servicePrices !== "undefined" && servicePrices.length > 0 ?
                            <Box
                                sx={{
                                    my: "8px",
                                    p: "8px",
                                    border: "2px solid " + theme.palette.divider,
                                    borderRadius: "8px",
                                }}
                            >
                                <Grid
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        textAlign: "center",
                                    }}
                                    container
                                >
                                    <Grid item xs={12} sm={6} md={6} lg={3}>
                                        <TextBold14
                                            text={"Naziv"}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={4}>
                                        <TextBold14
                                            text={"Opis"}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={2}>
                                        <TextBold14
                                            text={"Cijena"}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={2}>
                                        <TextBold14
                                            text={"Popust"}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={6} lg={1}>
                                        <TextBold14
                                            text={"Akcija"}
                                        />
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: "16px", borderBottomWidth: "2px" }} />
                                {typeof servicePrices !== "undefined" && servicePrices[index] ? servicePrices[index].map((price, priceIndex) => (
                                    <Box key={priceIndex + "_servicePrice_" + index}>
                                        <Grid
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                textAlign: "center",
                                            }}
                                            container
                                        >
                                            <StyledGridItem item xs={12} sm={6} md={6} lg={3}>
                                                <TextMedium14
                                                    text={price.title}
                                                />
                                            </StyledGridItem>
                                            <StyledGridItem item xs={12} sm={6} md={6} lg={4}>
                                                <TextMedium14
                                                    text={price.description}
                                                />
                                            </StyledGridItem>
                                            <StyledGridItem item xs={12} sm={6} md={6} lg={2}>
                                                {
                                                    // price in eur
                                                    <TextMedium14
                                                        text={price.value + " €"}
                                                    />
                                                }
                                            </StyledGridItem>
                                            <StyledGridItem item xs={12} sm={6} md={6} lg={2}>
                                                <TextMedium14
                                                    text={(price.discount) ? price.discount + " %" : "0 %"}
                                                />
                                            </StyledGridItem>
                                            <StyledGridItem item xs={12} sm={6} md={6} lg={1}>
                                                <StyledButtonIconOnly
                                                    icon={<Delete />}
                                                    buttonFunction={() => {
                                                        setServicePrices((prevState) => {
                                                            const newState = [...prevState];
                                                            newState[index].splice(priceIndex, 1);
                                                            return newState;
                                                        });
                                                    }}
                                                    sx={{
                                                        display: "inline-block",

                                                        '& svg': {
                                                            width: "24px",
                                                            height: "24px",
                                                        }
                                                    }}
                                                />
                                            </StyledGridItem>
                                        </Grid>
                                        <Divider sx={{ my: "8px" }} />
                                    </Box>
                                ))
                                    :
                                    null
                                }
                            </Box>
                            :
                            null
                    }
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <Button variant='contained' onClick={openPriceModal} sx={{ mt: "16px" }}>
                        <TextBold14
                            text={"Dodaj cijenu"}
                            textProps={{
                                sx: {
                                    textTransform: "uppercase"
                                }
                            }}
                        />
                    </Button>
                </Box>
            </Box>
            {
                open ?
                    <Box
                        sx={{
                            position: "fixed",
                            top: "0",
                            left: "0",
                            width: "100%",
                            height: "100%",
                            maxHeight: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                    >
                        <Box
                            sx={{
                                zIndex: (theme) => theme.zIndex.drawer + 3,
                                position: "relative",
                                width: "100%",
                                maxWidth: "400px",
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: "8px",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    p: "16px",
                                    borderRadius: "8px 8px 0 0",
                                    backgroundColor: theme.palette.primary.main,
                                }}
                            >
                                <TextBlack18
                                    text={"Dodaj cijenu"}
                                    textProps={{
                                        sx: {
                                            color: theme.palette.primary.contrastText,
                                            textTransform: "uppercase"
                                        }
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    p: "16px",
                                    borderRadius: "0 0 8px 8px"
                                }}
                                component={"form"}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    createPrice();
                                }}
                            >
                                <Box>
                                    <FormControl
                                        sx={{
                                            mb: "16px"
                                        }}
                                        fullWidth
                                    >
                                        {StyledLabel("Naziv cijene")}
                                        <StyledInput
                                            clearInput={!open}
                                            inputVal={title}
                                            inputChangeFunction={setTitle}
                                            inputPlaceholder='Naziv cijene'
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            mb: "16px"
                                        }}
                                        fullWidth
                                    >
                                        {StyledLabel("Opis cijene")}
                                        <StyledInput
                                            clearInput={!open}
                                            inputVal={description}
                                            inputChangeFunction={setDescription}
                                            inputPlaceholder='Opis cijene'
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            mb: "16px"
                                        }}
                                        fullWidth
                                    >
                                        {StyledLabel("Cijena")}
                                        <StyledInput
                                            clearInput={!open}
                                            required
                                            type='number'
                                            inputVal={value}
                                            inputChangeFunction={setValue}
                                            inputPlaceholder='Cijena'
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            mb: "16px"
                                        }}
                                        fullWidth
                                    >
                                        {StyledLabel("Popust")}
                                        <StyledInput
                                            clearInput={!open}
                                            type='number'
                                            inputVal={discount}
                                            inputChangeFunction={setDiscount}
                                            inputPlaceholder='Popust'
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <Button
                                        variant='contained'
                                        type='submit'
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        <TextBold14
                                            text={"Dodaj cijenu"}
                                            textProps={{
                                                sx: {
                                                    textTransform: "uppercase"
                                                }

                                            }}
                                        />
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Backdrop
                            open={open}
                            sx={{ zIndex: (theme) => theme.zIndex.drawer + 2, maxHeight: "100vh" }}
                            onClick={() => {
                                setOpen(false);
                                clearValues();
                            }}
                        />
                    </Box>
                    : null
            }
        </Box>
    );
}

export default ServicesPrices;