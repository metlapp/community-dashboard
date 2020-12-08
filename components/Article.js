import React, { useContext } from "react";
import { Linking } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import AuthContext from "../auth/Context";
import { trackClick } from "./TrackClick";

const Article = (props) => {
  const authContext = useContext(AuthContext);
  return (
    <Card>
      <Card.Content>
        <Title>{props.article.item_object.title}</Title>
        <Paragraph>{props.article.item_object.description}</Paragraph>
        <Button
          mode="outlined"
          onPress={() => {
            trackClick(authContext.user.id, props.article.id, "VIEWED", "APP");
            Linking.openURL(props.article.item_object.link);
          }}
        >
          GO TO ARTICLE
        </Button>
      </Card.Content>
    </Card>
  );
};

export default Article;
