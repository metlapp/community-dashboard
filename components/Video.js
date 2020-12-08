import React, { useContext } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Title, Paragraph } from "react-native-paper";
import PropTypes from "prop-types";
import ContentCard from "./ContentCard";
import AuthContext from "../auth/Context";
import { trackClick } from "./TrackClick";

const Video = (props) => {
  const authContext = useContext(AuthContext);
  function click() {
    trackClick(authContext.user.id, props.video.id, "VIEWED", "APP");
  }
  return (
    <ContentCard>
      <View style={styles.container}>
        <Title>{props.video.item_object.title}</Title>
        <TouchableOpacity style={styles.container} onPress={click}>
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
    </ContentCard>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
});
export default Video;

Video.propTypes = {
  video: PropTypes.shape({
    item_object: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string,
    }),
  }),
};
