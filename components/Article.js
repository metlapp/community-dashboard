import React from "react";
import { Linking } from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";

const Article = (props) => {
  return (
    <Card>
      <Card.Content>
        <Title>{props.article.item_object.title}</Title>
        <Paragraph>{props.article.item_object.description}</Paragraph>
        <Button
          mode="outlined"
          onPress={() => {
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
