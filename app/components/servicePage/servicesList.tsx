import { Backdrop, Box, Button, Divider, FormControl, Grid, Paper, Switch, Typography } from '@mui/material';
import React from 'react';
import { TextBold14, TextBlack18, TextMedium14, TextMedium18 } from '../common/styledInputs/styledText/styledText';
import { CustomThemeContext } from '../../store/customThemeContext';
import { StyledLabel } from '../common/styledInputs/styledLabel/styledLabel';
import StyledInput from '../common/styledInputs/styledInput';
import { styled } from '@mui/material/styles';
import StyledButtonIconOnly from '../common/styledInputs/styledButtons/styledButtonIconOnly';
import StyledDropdownIconOnly from '../common/styledInputs/styledDropdownIconOnly/styledDropdownIconOnly';
import { Delete, Edit, MoreVert } from '@mui/icons-material';
import ServicesPrices from './servicesPrices';

const StyledGridItem = styled(Grid)(({ theme }) => ({
    padding: "2px 8px",
}));

interface ServicesListProps {
    serviceList: {
        name: string;
        description: string;
        highlighted: number;
    }[];
    setServiceList: React.Dispatch<React.SetStateAction<{
        name: string;
        description: string;
        highlighted: number;
    }[]>>;
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

const ServicesList = (
    {
        serviceList,
        setServiceList,
        servicePrices,
        setServicePrices
    }: ServicesListProps
) => {
    const [open, setOpen] = React.useState(false);
    const { theme } = React.useContext(CustomThemeContext);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [highlighted, setHighlighted] = React.useState(0);

    const handleEditClick = (id: number) => {

    }

    const openPriceModal = () => {
        console.log("Open price modal");
        setOpen(true);
    }

    const clearValues = () => {
        setName("");
        setDescription("");
        setHighlighted(0);
    }

    const createPrice = () => {
        setServiceList([
            ...serviceList,
            {
                name,
                description,
                highlighted
            }
        ]);
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
                <Typography component={"h2"} variant="h4">Lista usluga</Typography>
                <Box>
                    {
                        typeof serviceList !== "undefined" && serviceList.length > 0 ?
                            serviceList.map((price, index) => (
                                <Paper
                                    elevation={5}
                                    key={index}
                                    sx={{
                                        mt: "8px",
                                        mb: "18px",
                                        p: "8px",
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
                                        <Grid item xs={12} sm={6} md={6} lg={4}>
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
                                                text={"Istaknuto"}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={6} lg={2}>
                                            <TextBold14
                                                text={"Akcija"}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ my: "8px", borderBottomWidth: "2px" }} />
                                    <Grid
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            textAlign: "center",
                                        }}
                                        container
                                    >
                                        <StyledGridItem item xs={12} sm={6} md={6} lg={4}>
                                            <TextBold14
                                                text={price.name}
                                            />
                                        </StyledGridItem>
                                        <StyledGridItem item xs={12} sm={6} md={6} lg={4}>
                                            <TextBold14
                                                text={price.description}
                                            />
                                        </StyledGridItem>
                                        <StyledGridItem item xs={12} sm={6} md={6} lg={2}>
                                            {
                                                // price in eur
                                                <Switch
                                                    checked={price.highlighted === 1}
                                                    onChange={(e) => {
                                                        const newList = [...serviceList];
                                                        newList[index].highlighted = e.target.checked ? 1 : 0;
                                                        setServiceList(newList);
                                                    }}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                            }
                                        </StyledGridItem>
                                        <StyledGridItem item xs={12} sm={6} md={6} lg={2}>
                                            { // delete button
                                            }
                                            <StyledButtonIconOnly
                                                icon={<Delete />}
                                                buttonFunction={() => {
                                                    const newList = [...serviceList];
                                                    newList.splice(index, 1);
                                                    setServiceList(newList);
                                                    setServicePrices(servicePrices.filter((_, i) => i !== index));
                                                }}
                                                sx={{
                                                    display: "inline-block",

                                                    '& svg': {
                                                        width: "21px",
                                                        height: "21px",
                                                    }
                                                }}
                                            />
                                        </StyledGridItem>
                                    </Grid>
                                    <ServicesPrices
                                        index={index}
                                        servicePrices={servicePrices}
                                        setServicePrices={setServicePrices}
                                    />
                                </Paper>
                            ))
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
                            text={"Dodaj uslugu"}
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
                                    text={"Lista usluga"}
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
                                        {StyledLabel("Naziv usluge")}
                                        <StyledInput
                                            clearInput={!open}
                                            required
                                            inputVal={name}
                                            inputChangeFunction={setName}
                                            inputPlaceholder='Naziv cijene'
                                        />
                                    </FormControl>
                                    <FormControl
                                        sx={{
                                            mb: "16px"
                                        }}
                                        fullWidth
                                    >
                                        {StyledLabel("Opis usluge")}
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
                                        {StyledLabel("Istaknuto")}
                                        <Switch
                                            checked={highlighted === 1}
                                            onChange={(e) => {
                                                setHighlighted(e.target.checked ? 1 : 0);
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
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
                                            text={"Dodaj uslugu"}
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

export default ServicesList;