import { Backdrop, Box, Button, Divider, FormControl, Grid, Typography } from '@mui/material';
import React from 'react';
import { TextBold14, TextBlack18, TextMedium14 } from '../common/styledInputs/styledText/styledText';
import { CustomThemeContext } from '../../store/customThemeContext';
import { StyledLabel } from '../common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../common/styledInputs/styledInput';
import { styled } from '@mui/material/styles';
import StyledButtonIconOnly from '../common/styledInputs/styledButtons/styledButtonIconOnly';
import { Delete } from '@mui/icons-material';

const StyledGridItem = styled(Grid)(({ theme }) => ({
    padding: "2px 8px",
}));

interface ServicesPricesProps {
    index: number;
    servicePrices: {
        id?: number;
        title: string;
        description: string;
        value: number;
        discount: number;
    }[][];
    setServicePrices: React.Dispatch<React.SetStateAction<{
        id?: number;
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
    const [disabledTitle, setDisabledTitle] = React.useState<number>(-1);
    const [disabledDescription, setDisabledDescription] = React.useState<number>(-1);
    const [disabledValue, setDisabledValue] = React.useState<number>(-1);
    const [disabledDiscount, setDisabledDiscount] = React.useState<number>(-1);

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
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <StyledInput
                                                        InputProps={{
                                                            readOnly: disabledTitle !== index * 10 + priceIndex,
                                                            sx: {
                                                                zIndex: disabledTitle === index * 10 + priceIndex ? theme.zIndex.drawer + 2 : 0,
                                                                backgroundColor: disabledTitle === index * 10 + priceIndex ? theme.palette.primary.contrastText : "transparent",

                                                                '& fieldset': {
                                                                    borderColor: disabledTitle === index * 10 + priceIndex ? undefined : "transparent",
                                                                },

                                                                '& input': {
                                                                    textAlign: "center"
                                                                }
                                                            }
                                                        }}
                                                        textFieldSx={{
                                                            backgroundColor: disabledTitle === index * 10 + priceIndex ? theme.palette.primary.contrastText : "transparent",
                                                        }}
                                                        inputVal={price.title}
                                                        inputChangeFunction={(e) => {
                                                            const newServicePrices = [...servicePrices];
                                                            if (typeof e === "string") newServicePrices[index][priceIndex].title = e;
                                                            else newServicePrices[index][priceIndex].title = e.target.value;
                                                            setServicePrices(newServicePrices);
                                                        }}
                                                        doubleClickChangeFunction={() => {
                                                            console.log("Double click");
                                                            setDisabledTitle(index * 10 + priceIndex);
                                                        }}

                                                    />
                                                    <Backdrop sx={{ backgroundColor: theme.palette.divider, zIndex: disabledTitle === index * 10 + priceIndex ? theme.zIndex.drawer + 1 : 0 }} open={disabledTitle === index*10+priceIndex} onClick={() => setDisabledTitle(-1)} />
                                                </Box>
                                            </StyledGridItem>
                                            <StyledGridItem item xs={12} sm={6} md={6} lg={4}>
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <StyledInput
                                                        InputProps={{
                                                            readOnly: disabledDescription !== index * 10 + priceIndex,
                                                            sx: {
                                                                zIndex: disabledDescription === index * 10 + priceIndex ? theme.zIndex.drawer + 2 : 0,
                                                                backgroundColor: disabledDescription === index * 10 + priceIndex ? theme.palette.primary.contrastText : "transparent",

                                                                '& fieldset': {
                                                                    borderColor: disabledDescription === index * 10 + priceIndex ? undefined : "transparent",
                                                                },

                                                                '& input': {
                                                                    textAlign: "center"
                                                                }
                                                            }
                                                        }}
                                                        textFieldSx={{
                                                            backgroundColor: disabledDescription === index * 10 + priceIndex ? theme.palette.primary.contrastText : "transparent",
                                                        }}
                                                        inputVal={price.description}
                                                        inputChangeFunction={(e) => {
                                                            const newServicePrices = [...servicePrices];
                                                            if (typeof e === "string") newServicePrices[index][priceIndex].description = e;
                                                            else newServicePrices[index][priceIndex].description = e.target.value;
                                                            setServicePrices(newServicePrices);
                                                        }}
                                                        doubleClickChangeFunction={() => {
                                                            console.log("Double click");
                                                            setDisabledDescription(index * 10 + priceIndex);
                                                        }}

                                                    />
                                                    <Backdrop sx={{ backgroundColor: theme.palette.divider, zIndex: disabledDescription === index * 10 + priceIndex ? theme.zIndex.drawer + 1 : 0 }} open={disabledDescription === index*10+priceIndex} onClick={() => setDisabledDescription(-1)} />
                                                </Box>
                                            </StyledGridItem>
                                            <StyledGridItem item xs={12} sm={6} md={6} lg={2}>
                                                <Box
                                                    sx={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <StyledInput
                                                        InputProps={{
                                                            readOnly: disabledValue !== index * 10 + priceIndex,
                                                            sx: {
                                                                zIndex: disabledValue === index * 10 + priceIndex ? theme.zIndex.drawer + 2 : 0,
                                                                backgroundColor: disabledValue === index * 10 + priceIndex ? theme.palette.primary.contrastText : "transparent",

                                                                '& fieldset': {
                                                                    borderColor: disabledValue === index * 10 + priceIndex ? undefined : "transparent",
                                                                },

                                                                '& input': {
                                                                    textAlign: "center",
                                                                    marginRight: "-32px",
                                                                    '-webkit-appearance': 'textfield',

                                                                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                                                                        '-webkit-appearance': 'none',
                                                                        margin: 0,
                                                                    },
                                                                }
                                                            }
                                                        }}
                                                        type='number'
                                                        textFieldSx={{
                                                            backgroundColor: disabledValue === index * 10 + priceIndex ? theme.palette.primary.contrastText : "transparent",
                                                        }}
                                                        inputVal={price.value}
                                                        inputChangeFunction={(e) => {
                                                            const newServicePrices = [...servicePrices];
                                                            if (typeof e === "string") newServicePrices[index][priceIndex].value = parseFloat(e);
                                                            else newServicePrices[index][priceIndex].value = e.target.value;
                                                            setServicePrices(newServicePrices);
                                                        }}
                                                        doubleClickChangeFunction={() => {
                                                            console.log("Double click");
                                                            setDisabledValue(index * 10 + priceIndex);
                                                        }}
                                                        inputIcon={"€"}


                                                    />
                                                    <Backdrop sx={{ backgroundColor: theme.palette.divider, zIndex: disabledValue === index * 10 + priceIndex ? theme.zIndex.drawer + 1 : 0 }} open={disabledValue === index*10+priceIndex} onClick={() => setDisabledValue(-1)} />
                                                </Box>
                                            </StyledGridItem>
                                            <StyledGridItem item xs={12} sm={6} md={6} lg={2}>
                                            <Box
                                                    sx={{
                                                        position: "relative",
                                                    }}
                                                >
                                                    <StyledInput
                                                        InputProps={{
                                                            readOnly: disabledDiscount !== index * 10 + priceIndex,
                                                            sx: {
                                                                zIndex: disabledDiscount === index * 10 + priceIndex ? theme.zIndex.drawer + 2 : 0,
                                                                backgroundColor: disabledDiscount === index * 10 + priceIndex ? theme.palette.primary.contrastText : "transparent",

                                                                '& fieldset': {
                                                                    borderColor: disabledDiscount === index * 10 + priceIndex ? undefined : "transparent",
                                                                },

                                                                '& input': {
                                                                    textAlign: "center",
                                                                    marginRight: "-32px",
                                                                    '-webkit-appearance': 'textfield',

                                                                    '&::-webkit-inner-spin-button, &::-webkit-outer-spin-button': {
                                                                        '-webkit-appearance': 'none',
                                                                        margin: 0,
                                                                    },
                                                                }
                                                            }
                                                        }}
                                                        textFieldSx={{
                                                            backgroundColor: disabledDiscount === index * 10 + priceIndex ? theme.palette.primary.contrastText : "transparent",
                                                        }}
                                                        inputVal={price.discount}
                                                        inputChangeFunction={(e) => {
                                                            const newServicePrices = [...servicePrices];
                                                            if (typeof e === "string") newServicePrices[index][priceIndex].discount = parseFloat(e);
                                                            else newServicePrices[index][priceIndex].discount = e.target.value;
                                                            setServicePrices(newServicePrices);
                                                        }}
                                                        doubleClickChangeFunction={() => {
                                                            console.log("Double click");
                                                            setDisabledDiscount(index * 10 + priceIndex);
                                                        }}
                                                        type='number'
                                                        inputIcon={"%"}


                                                    />
                                                    <Backdrop sx={{ backgroundColor: theme.palette.divider, zIndex: disabledDiscount === index * 10 + priceIndex ? theme.zIndex.drawer + 1 : 0 }} open={disabledDiscount === index*10+priceIndex} onClick={() => setDisabledDiscount(-1)} />
                                                </Box>
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