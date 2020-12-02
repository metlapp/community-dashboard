import React from "react";
import {Title, Text, TouchableRipple} from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles from "../config/defaultStyles";

export default function ListItemWithHeader({content, header, onPress}) {

    return (
        <TouchableRipple onPress={onPress} style={defaultStyles.ListItemWithHeader} data-testid="touchable-area">
            <Text>
                <Title style={defaultStyles.ListItemHeader}>{header}</Title>
                <Text style={defaultStyles.ListItemContent}>{content}</Text>
            </Text>
        </TouchableRipple>
    );
}

ListItemWithHeader.propTypes = {
    content: PropTypes.string,
    header: PropTypes.string,
    onPress: PropTypes.func,
};
