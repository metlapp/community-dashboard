import React from "react";
import { StyleSheet } from "react-native";
import { Text, Title } from "react-native-paper";
import PropTypes from "prop-types";
import { openURL } from "expo-linking";

import ContentCard from "./ContentCard";

export default function ZoomLink({ data }) {
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
        Click here to join your Zoom call!
      </Text>
    </ContentCard>
  );
}

const styles = StyleSheet.create({
  text: {
    alignSelf: "center",
    fontSize: 23,
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
