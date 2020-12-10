import React from "react";
import { StyleSheet } from "react-native";
import { Text, Title } from "react-native-paper";
import ContentCard from "./ContentCard";

export default function FixedText({ data }) {
  return (
    <ContentCard>
      {!!data.title && <Title>{data.title}</Title>}
      <Text style={styles.text}>{data.text}</Text>
      {!!data.author && <Text style={styles.author}>- {data.author}</Text>}
    </ContentCard>
  );
}

const styles = StyleSheet.create({
  author: {
    alignSelf: "flex-end",
    fontSize: 20,
  },
  text: {
    alignSelf: "center",
    fontSize: 23,
    justifyContent: "center",
  },
});
