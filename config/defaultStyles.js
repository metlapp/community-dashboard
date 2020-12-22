import {DefaultTheme} from "react-native-paper";
import {DefaultTheme as DefaultNavTheme} from '@react-navigation/native';

/* COLOR CONSTANTS */
export const primaryColor = "#32b1e0"; // light blue
export const accentColor = "#f89232"; // orange
export const mediumGrey = "#ccc";
export const lightGrey = "#eee";
export const textColor = "#606060";
export const backgroundColor = "#fff";
export const feedBackgroundColor = "#e8ecf1";
export const borderColor = "#ddd";
export const linkColor = accentColor;
export const subtleLinkColor = mediumGrey;
export const headerBackgroundColor = primaryColor;
export const headerTextColor = '#fff';
export const headerBackColor = '#ffbb68'; // lighter version of accent color


/* THEME for react-native-paper components */
export const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
        ...DefaultTheme.colors,
        primary: primaryColor,
        accent: accentColor,
        background: backgroundColor,
        surface: DefaultTheme.colors.surface,
        text: textColor,
        disabled: DefaultTheme.colors.disabled,
        placeholder: DefaultTheme.colors.placeholder,
        backdrop: DefaultTheme.colors.backdrop,
    },
};

/* THEME for react-navigation components */
export const navigationTheme = {
    ...DefaultNavTheme,
    colors: {
        primary: primaryColor,
        background: backgroundColor,
        card: DefaultNavTheme.colors.card,
        text: DefaultNavTheme.colors.text,
        border: DefaultNavTheme.colors.border,
        notification: DefaultNavTheme.colors.notification,
    },
};


/* STYLES */

export const commonMargins = {
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 0,
    paddingRight: 0,
};

const headerTextStyle = {
    fontSize: 14,
    fontWeight: 'bold',
};

export default {
  mainContainer: {
    height: "100%",
    alignItems: 'center',
    marginHorizontal: 40,
  },
  formContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 40,
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
  publishDate: {
    fontSize: 12,
    marginVertical: 10,
  },

    button: {
        borderRadius: 6,
        padding: 10,
        marginTop: 20,
    },
    compactButton: {
        borderRadius: 6,
        padding: 2,
        marginTop: 0,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textTransform: "none",
    },

    /* LIST ITEM */
    ListItem: {
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        ...commonMargins,
    },
    ListItemWithHeader: {
        marginTop: 20,
        marginBottom: 20,
        ...commonMargins,
    },
    ListItemBottom: {
        borderTopColor: borderColor,
        borderTopWidth: 1,
        marginTop: 'auto',
    },
    ListItemNoBorder: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    ListItemTitle: {
        // left and position are to reverse the 8px padding on a parent div that we cannot pinpoint using this style of stylesheet
        left: -8,
    },
    ListItemTitleWithDescription: {
        ...headerTextStyle,
    },
    ListItemDescription: {
        // left and position are to reverse the 8px padding on a parent div that we cannot pinpoint using this style of stylesheet
        left: -8,
    },

    /* FORMS */
    formFieldTitle: {
        ...headerTextStyle,
        color: accentColor,
    },
    TextInput: {
        backgroundColor: '#fff',
        height: 45,
        paddingHorizontal: 0,
        marginBottom: 20,
    },
    BlockText: {
        backgroundColor: '#fff',
        borderColor: borderColor,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderRadius: theme.roundness,
    }
};
