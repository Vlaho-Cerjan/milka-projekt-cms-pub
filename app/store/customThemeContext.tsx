import { ThemeProvider } from '@emotion/react'
import React, { useState, useEffect } from 'react'
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import darkThemeOptions from '../styles/theme/darkThemeOptions';
import { createTheme, Theme } from '@mui/material';

const light = createTheme(lightThemeOptions);
const dark = createTheme(darkThemeOptions);

const themes: { [x: string]: Theme } = {
    light: light,
    dark: dark,
}

const getTheme = (theme: string) => {
    return themes[theme];
}

// eslint-disable-next-line no-unused-vars
export const CustomThemeContext = React.createContext(
    {
        currentTheme: 'light',
        theme: light,
        setTheme: (theme?: string) => {},
        isDark: false,
    },
)

const CustomThemeProvider = (props: { children: any }) => {
    // eslint-disable-next-line react/prop-types
    const { children } = props

    const [mode, setMode] = useState<string>('light');

    useEffect(() => {
        const storageMode = localStorage.getItem('mode');
        if(storageMode) setMode(storageMode)
    }, [])

    // Retrieve the theme object by theme name
    const theme = getTheme(mode);

    const isDark = mode === "dark";

    // Wrap _setThemeName to store new theme names in localStorage
    const setThemeName = (theme?: string) => {
        let tempTheme = "";
        if(mode !== "light"){
            tempTheme = "light";
        }else{
            tempTheme = "dark";
        }
        if(theme) tempTheme = theme;
        localStorage.setItem('mode', tempTheme);
        setMode(tempTheme)
    }

    const contextValue = {
        currentTheme: mode,
        theme: theme,
        setTheme: setThemeName,
        isDark: isDark,
    }

    useEffect(() => {
        if(mode === "dark" && !document.body.classList.contains("dark")) document.body.classList.add("dark");
        else if(document.body.classList.contains("dark")) document.body.classList.remove("dark");
    }, [mode])

    return (
        <CustomThemeContext.Provider value={contextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CustomThemeContext.Provider>
    )
}

export default CustomThemeProvider