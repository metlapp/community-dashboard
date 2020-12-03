import React from "react";
import {List } from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles from "../config/defaultStyles";

export default function ListItem({title, description, onPress, bottom = false, withBorder = true}) {

    let style = [defaultStyles.ListItem];
    if (bottom) style = [style, defaultStyles.ListItemBottom];
    if (!withBorder) style = [style, defaultStyles.ListItemNoBorder];

    let titleStyle = [defaultStyles.ListItemTitle];
    if (description) titleStyle = [titleStyle, defaultStyles.ListItemTitleWithDescription];

    return (
        <List.Item title={title} description={description} onPress={onPress} style={style}
                   titleStyle={titleStyle} descriptionStyle={defaultStyles.ListItemDescription} />
    );
}

ListItem.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onPress: PropTypes.func,
    bottom: PropTypes.bool,
    withBorder: PropTypes.bool,
};
