import {DefaultTheme} from "react-native-paper";

/* COLOR CONSTANTS */
export const primaryColor = "#32b1e0"; // light blue
export const accentColor = "#f85f6a"; // coral
export const textColor = "#606060";
export const backgroundColor = "#fff";
export const feedBackgroundColor = "#e8ecf1";
export const borderColor = "#ddd";


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

const commonMargins = {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 0,
    paddingRight: 0,
};

const headerTextStyle = {
    fontSize: 14,
    fontWeight: 'bold',
};

const headerText = {
    ...headerTextStyle,
};

const formHeaderText = {
    ...headerTextStyle,
    color: accentColor,
};


export default {
    contentCard: {
        marginBottom: 5,
        marginTop: 5,
        shadowColor: "transparent",
    },
    video: {
        height: 150,
        flex: 1,
    },
    SafeAreaView: {
        flex: 1,  // this keeps the content inside scrollable
    },

    /* LIST ITEM */
    ListItem: {
        borderBottom: '1px solid ' + borderColor,
        ...commonMargins,
    },
    ListItemWithHeader: {
        marginTop: 20,
        marginBottom: 20,
        ...commonMargins,
    },
    ListItemBottom: {
        borderTop: '1px solid ' + borderColor,
        marginTop: 'auto',
    },
    ListItemTitle: {
        // left and position are to reverse the 8px padding on a parent div that we cannot pinpoint using this style of stylesheet
        left: -8,
        position: 'relative',
    },
    ListItemContent: {
        fontSize: 14,
        color: textColor,
        opacity: 0.87,
    },
    ListItemHeader: {
        paddingBottom: 5,
        // display: 'block',
        ...headerText,
    },

    /* FORMS */
    formFieldTitle: {
        // display: 'block',
        ...formHeaderText,
    },
    TextInput: {
        lineHeight: 25,
        fontSize: 20,
        paddingLeft: 10,
    },
};