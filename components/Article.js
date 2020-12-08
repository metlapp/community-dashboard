import React from "react";
import { Linking } from "react-native";
import { Title, Paragraph, Text } from "react-native-paper";
import PropTypes from "prop-types";
import ContentCard from "./ContentCard";
import {accentColor} from "../config/defaultStyles";

const Article = (props) => {
  return (
      <ContentCard>
        <Title>{props.article.item_object.title}</Title>
        <Paragraph numberOfLines={2}>{props.article.item_object.description}</Paragraph>
        <Text style={{color: accentColor, marginTop: 8}}
              numberOfLines={1}
          onPress={() => {
            Linking.openURL(props.article.item_object.link);
          }}
        >{props.article.item_object.link}</Text>
      </ContentCard>
  );
};

Article.propTypes = {
    article: PropTypes.shape({
        item_object: PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            link: PropTypes.string,
        }),
    })
};

export default Article;
