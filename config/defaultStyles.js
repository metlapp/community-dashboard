import { DefaultTheme } from "react-native-paper";

/* COLOR CONSTANTS */
export const primaryColor = "#32b1e0"; // light blue
export const accentColor = "#f85f6a"; // coral
export const textColor = "#606060";
export const backgroundColor = "#e8ecf1";

/* THEME for react-native-paper and react-navigation components */
export const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
        ...DefaultTheme.colors,
        primary: primaryColor,
        accent: accentColor,
        text: textColor,
        background: backgroundColor,
    },
};

/* STYLES */
export default {
    TextInput: {
        lineHeight: 25,
        fontSize: 20,
        paddingLeft: 10,
    },
    contentCard: {
        marginBottom: 5,
        marginTop: 5,
        shadowColor: "transparent",
    },
    video: {
        height: 150,
        flex: 1,
    },
};