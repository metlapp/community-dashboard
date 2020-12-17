import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, Title } from "react-native-paper";
import PropTypes from "prop-types";
import { openURL } from "expo-linking";

import ContentCard from "./ContentCard";

export default function ZoomLink({ data }) {
  console.log(data);
  return (
    <ContentCard>
      <Title>{data.item_object.title}</Title>
      {!!data.item_object.description && (
        <Text style={[styles.text, { marginVertical: 10 }]}>
          {data.item_object.description}
        </Text>
      )}
      <Text
        onPress={() => {
          openURL(data.item_object.link);
        }}
        style={styles.text}
      >
        Click here to join your Zoom meeting!
      </Text>
    </ContentCard>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    fontSize: 23,
    justifyContent: "center",
  },
});

ZoomLink.propTypes = {
  zoomLink: PropTypes.shape({
    item_object: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string,
    }),
  }),
};
