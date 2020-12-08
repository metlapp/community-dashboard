import React from "react";
import {Card} from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles from "../config/defaultStyles";

function ContentCard({ children }) {

    return (
        <Card style={defaultStyles.contentCard}>
            <Card.Content>
                <>{children}</>
            </Card.Content>
        </Card>
    );
}

ContentCard.propTypes = {
    item: PropTypes.object,
    contentType: PropTypes.string,
};

export default ContentCard;