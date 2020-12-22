import React, { useContext } from "react";
import { Linking } from "react-native";
import { Title, Paragraph, Text } from "react-native-paper";
import PropTypes from "prop-types";
import ContentCard from "./ContentCard";
import { accentColor } from "../config/defaultStyles";
import AuthContext from "../auth/Context";
import { trackClick } from "./TrackClick";
import defaultStyles from "../config/defaultStyles";
import {DateTime} from "luxon";


const Article = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <ContentCard>
      <Title>{props.article.item_object.title}</Title>
      <Text style={defaultStyles.publishDate}>{DateTime.fromISO(props.article.publication_date_time).toLocaleString(DateTime.DATETIME_SHORT)}</Text>
      <Paragraph numberOfLines={2}>
        {props.article.item_object.description}
      </Paragraph>
      <Text
        style={{ color: accentColor, marginTop: 8 }}
        numberOfLines={1}
        onPress={() => {
          trackClick(authContext.user.id, props.article.id, "VIEWED", "APP");
          Linking.openURL(props.article.item_object.link);
        }}
      >
        {props.article.item_object.link}
      </Text>
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
  }),
};

export default Article;
