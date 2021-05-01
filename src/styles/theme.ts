import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    styles: {
        global: {
            body:{
                bg: 'white'
            }
        }
    },
    fonts: {
        heading: 'Poppins',
        body: 'Poppins'
    },
    colors: {
        highlight: "#FFBA08",
        dark: {
            100: "#99999980",
            300: "#999999",
            600: "#47585B",    // dark heading text
            900: '#000000',
        },
        light: {
            300: "#DADADA",
            500: "#F5F8FA",    // light heading text
            900: "#FFFFFF"
        }
    }
})