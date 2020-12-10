import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";

export default function FixedText({ data }) {
  return (
    <Card>
      <Card.Content>
        <View style={styles.container}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.text}>{data.text}</Text>
          <Text style={styles.author}>{data.author && `- ${data.author}`}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  author: {
    fontSize: 20,
    left: 250,
  },
  container: {
    width: "95%",
  },
  text: {
    alignSelf: "center",
    fontSize: 23,
    justifyContent: "center",
  },
  title: {
    color: "#606060",
    marginTop: 5,
    bottom: 15,
    left: 5,
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "600",
  },
});
