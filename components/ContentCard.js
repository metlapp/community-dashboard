import React from "react";
import {Card, Title, Paragraph} from "react-native-paper";
import PropTypes from "prop-types";
import defaultStyles from "../config/defaultStyles";
import {WebView} from "react-native-webview";

export default function ContentCard({item, contentType}) {

    let testId = "card";
    if (contentType === "video") testId = "video";

    return (
        <>
            {contentType === "video" && <Card style={defaultStyles.contentCard} data-testid={testId}>
                <Card.Content>
                    <Title>{item.title}</Title>
                    <WebView
                        javaScriptEnabled={true}
                        scrollEnabled={false}
                        allowsFullscreenVideo={true}
                        source={{
                            uri: item.link,
                        }}
                        style={defaultStyles.video}
                    />
                    <Paragraph>{item.description}</Paragraph>
                </Card.Content>
            </Card>
            }

        </>
    );
}

ContentCard.propTypes = {
    item: PropTypes.object,
    contentType: PropTypes.string,
};
