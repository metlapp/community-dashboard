import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { Card, Title, Paragraph } from "react-native-paper";

const Video = (props) => {
  return (
    <Card>
      <Card.Content>
        <View style={styles.container}>
          <Title>{props.video.item_object.title}</Title>
          <WebView
            javaScriptEnabled={true}
            scrollEnabled={false}
            allowsFullscreenVideo={true}
            source={{
              uri: props.video.item_object.link,
            }}
          />
          <Paragraph>{props.video.item_object.description}</Paragraph>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
});
export default Video;
