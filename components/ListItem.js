import React from "react";
import {List} from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles from "../config/defaultStyles";

export default function ListItem({title, onPress, bottom = false}) {

    let style = [defaultStyles.ListItem];
    if (bottom) style = [style, defaultStyles.ListItemBottom]

    return (
        <List.Item title={title} onPress={onPress} style={style} titleStyle={defaultStyles.ListItemTitle}/>
    );
}

ListItem.propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,
    bottom: PropTypes.bool,
};
