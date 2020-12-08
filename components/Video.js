import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Card, Title, Paragraph } from "react-native-paper";
import AuthContext from "../auth/Context";
import { trackClick } from "./trackClick";

const Video = (props) => {
  const authContext = useContext(AuthContext);
  function click() {
    trackClick(authContext.user.id, props.video.id, "VIEWED", "APP");
  }
  return (
    <Card>
      <Card.Content>
        <View>
          <Title>{props.video.item_object.title}</Title>
          <TouchableOpacity
            style={styles.container}
            onPress={click}
            testID="video"
          >
            <WebView
              javaScriptEnabled={true}
              scrollEnabled={false}
              allowsFullscreenVideo={true}
              source={{
                uri: props.video.item_object.link,
              }}
            />
          </TouchableOpacity>
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
