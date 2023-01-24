import { Box, Button, Menu, MenuItem, styled, Typography } from "@mui/material";
import React, { useRef } from "react";
import Link from "../../../navigation/Link";
import { IconContainerGrey } from "../../styledComponents/styledIconContainer";
import { TextBold14 } from '../styledText/styledText';
import { CustomThemeContext } from '../../../../store/customThemeContext';

interface DropdownProps {
    id: string;
    buttonId: string;
    icon: React.ReactNode;
    dropdownId: string;
    dropdownMenuItems: {
        text: string;
        icon?: React.ReactNode;
        disabled?: boolean;
        href?: string;
        function?: any;
        addFunctionId?: boolean;
    }[];
}

const StyledLink = styled(Link)(({ theme }) => ({
    display: "flex",
    color: theme.palette.text.secondary,
    textDecoration: "none",
    padding: "10px 25px",
    maxWidth: "100%",
    width: "230px",
    fontSize: "14px !important",

    '& p': {
        fontSize: "1em",
        lineHeight: "inherit",
        fontWeight: "bold",
    },

    '&:hover': {
        color: theme.palette.primary.contrastText, backgroundColor: theme.palette.primary.main,
        '& svg': {
            transition: "none",
            fill: theme.palette.primary.contrastText + "!important",
            '&:hover': {
                fill: theme.palette.primary.contrastText + "!important",
            }
        }
    },

    '& svg': {
        transition: "none",
        fontSize: "1em",
        lineHeight: "inherit"
    }
}))

const StyledDropdownIconOnly = ({ id, buttonId, icon, dropdownId, dropdownMenuItems }: DropdownProps) => {
    const dropdownButtonRef = useRef<HTMLButtonElement>(null);
    const { theme } = React.useContext(CustomThemeContext);
    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button
                id={buttonId}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                ref={dropdownButtonRef}
                sx={{
                    boxShadow: "none !important",
                    backgroundColor: "transparent",
                    minWidth: "0px",
                }}
            >
                <IconContainerGrey sx={{ fontSize: "24px" }} className="darker">
                    {icon}
                </IconContainerGrey>
            </Button>
            <Menu
                id={dropdownId}
                anchorEl={anchorEl}
                open={open}
                onClose={(event) => handleClose(event)}
                PaperProps={{
                    sx: {
                        minWidth: "230px",
                    }
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                MenuListProps={{
                    'aria-labelledby': buttonId,
                }}
            >
                {
                    dropdownMenuItems.map((item, index) => {
                        return (
                            <Box key={index}>
                                {
                                    item.href ?
                                        <StyledLink aria-disabled={item.disabled} href={item.href}>
                                            <IconContainerGrey className="darker" sx={{ fontSize: "24px" }}>
                                                {item.icon}
                                            </IconContainerGrey>
                                            <TextBold14
                                                text={item.text}
                                                containerSx={{
                                                    ml: "12px",
                                                }}
                                            />
                                        </StyledLink>
                                        :
                                        <MenuItem
                                            sx={{
                                                width: "100%",
                                                padding: "10px 25px",
                                                '&:hover': {
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: theme.palette.primary.contrastText,

                                                    '& svg': {
                                                        fill: theme.palette.primary.contrastText + "!important",
                                                        transition: "none",
                                                    }
                                                },

                                                '& svg': {
                                                    transition: "none",
                                                }
                                            }}
                                            disabled={item.disabled}
                                            onClick={(e) => {
                                                if (typeof item.function !== "undefined") {
                                                    if (item.addFunctionId) item.function(id);
                                                    else item.function();
                                                }
                                                handleClose(e);
                                            }}
                                        >
                                            <IconContainerGrey className="darker" sx={{ fontSize: "24px" }}>
                                                {item.icon}
                                            </IconContainerGrey>
                                            <TextBold14
                                                text={item.text}
                                                containerSx={{
                                                    ml: "12px",
                                                }}
                                            />
                                        </MenuItem>
                                }
                            </Box>
                        )
                    })
                }
            </Menu>
        </Box>
    );
}

export default StyledDropdownIconOnly;