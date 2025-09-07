import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({children}) {

    const [theme, setTheme] = useState('light');

    const themeLight = {
        backgroundColor: '#ffffff',
        color: '#000000',
        backgroundImage: "url('./Asset/nature.jpg')"
    }

    const themeDark = {
        backgroundColor: '#000000',
        color: '#ffffff'
    }

    return (
        <ThemeContext.Provider value={{theme, setTheme, themeLight, themeDark}}>
            {children}
        </ThemeContext.Provider>

    )
}