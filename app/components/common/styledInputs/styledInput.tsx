import {
    Box,
    TextField,
    InputAdornment,
    Button,
    styled,
    ButtonProps,
    InputLabelProps,
    InputProps,
    SxProps,
    Theme,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { CustomThemeContext } from '../../../store/customThemeContext';

const StyledBox = styled(Box)`
    display: inline-flex;
    line-height: 24px;
    font-size: 1rem;
    width: 100%;
`

interface InputComponentProps {
    inputLabel?: string,
    inputPlaceholder?: string,
    inputChangeFunction?: (value: any) => void,
    doubleClickChangeFunction?: (value?: any) => void,
    inputIcon?: any,
    inputIconFunction?: (value: string) => void,
    required?: boolean,
    inputVal?: string | number | null,
    clearInput?: boolean,
    disabled?: boolean,
    error?: boolean,
    id?: string,
    name?: string,
    type?: string,
    autoComplete?: string,
    helperText?: any,
    InputProps?: Partial<InputProps>,
    InputLabelProps?: Partial<InputLabelProps>,
    rows?: number,
    multiline?: boolean,
    maxRows?: number,
    minRows?: number,
    boxSx?: SxProps<Theme>,
    textFieldSx?: SxProps<Theme>,
}

const StyledInput = ({ textFieldSx, boxSx, rows, multiline, maxRows, minRows, helperText, error, id, name, type, autoComplete, inputLabel, inputPlaceholder, doubleClickChangeFunction, inputChangeFunction, inputIcon, inputIconFunction, required, inputVal, clearInput, disabled, InputProps, InputLabelProps }: InputComponentProps) => {
    const IconFunction = (props: ButtonProps) => (
        <Button
            onClick={() => {
                if (typeof inputIconFunction !== "undefined" && typeof inputRef !== "undefined" && inputRef.current) inputIconFunction(inputRef.current.value);
            }
            }
            variant="text"
            disableRipple
            sx={{ p: 0, minWidth: "24px", minHeight: "24px", cursor: "default", backgroundColor: "transparent !important" }}
            {...props}
        />
    )

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = React.useState(inputVal);
    const { theme } = React.useContext(CustomThemeContext);

    React.useEffect((): void => {
        if (typeof inputVal !== "undefined" || inputVal !== null) setInputValue(inputVal);
        else setInputValue("");
    }, [inputVal])

    React.useEffect(() => {
        if (clearInput) {
            setInputValue("");
            if (typeof inputRef.current !== "undefined" && inputRef.current) inputRef.current.value = "";
        }
    }, [clearInput])

    React.useEffect(() => {
        if (inputRef.current && typeof inputIconFunction !== "undefined") inputIconFunction(inputRef.current.value);
    }, [])

    return (
        <StyledBox
            sx={{
                ...boxSx,
            }}
        >
            <TextField
                error={error}
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                disabled={disabled}
                required={required}
                fullWidth
                helperText={helperText}
                rows={rows ? rows : undefined}
                maxRows={maxRows ? maxRows : undefined}
                minRows={minRows ? minRows : undefined}
                multiline={multiline ? multiline : undefined}
                sx={{
                    borderRadius: "12px",
                    backgroundColor: disabled ? theme.palette.action.disabledBackground : theme.palette.background.paper,
                    ...textFieldSx,
                }}
                FormHelperTextProps={{
                    sx: {
                        fontSize: "10px",
                        fontWeight: 900,
                    }
                }}
                label={inputLabel}
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                    //if(typeof inputIconFunction !== "undefined") inputIconFunction(e.target.value);
                    if (typeof inputChangeFunction !== "undefined") inputChangeFunction(e.target.value);
                }
                }
                onDoubleClick={() => {
                    if (typeof doubleClickChangeFunction !== "undefined") doubleClickChangeFunction(inputValue);
                }}
                inputRef={inputRef}
                inputProps={{
                    style: {
                        fontSize: "1em",
                        fontWeight: 500,
                    }
                }}
                InputProps={InputProps ?
                    {
                        sx: {
                            fontSize: "14px",
                            borderRadius: "12px",
                            //backgroundColor: disabled ? theme.palette.action.disabledBackground : theme.palette.background.paper,

                            '& fieldset': {
                                borderRadius: "12px",
                                borderWidth: "2px",
                            },

                            ...InputProps.sx
                        },
                        endAdornment: (typeof inputIcon === "undefined") ? null :
                            <InputAdornment sx={{ boxShadow: "none !important", fontSize: "21px", '& svg': { cursor: (typeof inputIconFunction !== "undefined") ? "pointer" : null, fontSize: "1em", lineHeight: "inherit" } }} component={IconFunction} position="end">
                                {inputIcon}
                            </InputAdornment>,
                        ...InputProps,
                    }
                    :
                    {
                        sx: {
                            fontSize: "14px",
                            borderRadius: "12px",
                            //backgroundColor: disabled ? theme.palette.action.disabledBackground : theme.palette.background.paper,

                            '& fieldset': {
                                borderRadius: "12px",
                                borderWidth: "2px",
                            },
                        },
                        endAdornment: (typeof inputIcon === "undefined") ? null :
                            <InputAdornment sx={{ boxShadow: "none !important", fontSize: "21px", '& svg': { cursor: (typeof inputIconFunction !== "undefined") ? "pointer" : null, fontSize: "1em", lineHeight: "inherit" } }} component={IconFunction} position="end">
                                {inputIcon}
                            </InputAdornment>,
                    }
                }
                placeholder={inputPlaceholder === "" ? "Search..." : inputPlaceholder}
            />
        </StyledBox>
    )
}

export default StyledInput;