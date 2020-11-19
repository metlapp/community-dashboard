import React, { useEffect } from "react";
import { SafeAreaView, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { apiConfig } from "../config/config";
import { Card, Title, Paragraph, Appbar } from "react-native-paper";
import { WebView } from "react-native-webview";

export default function AllVideosScreen() {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  // Here we render the videos for the flatlist to diplay on the screen
  const renderVids = ({ item }) => {
    //Article types will not be displayed
    if (item.content_type == "Article") {
      return;
    }
    return (
      <Card style={styles.container} data-testid="video">
        <Card.Content>
          <Title>{item.title}</Title>
          <WebView
            javaScriptEnabled={true}
            scrollEnabled={false}
            allowsFullscreenVideo={true}
            source={{
              uri: item.link,
            }}
            style={styles.video}
          />
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  //Fetch's data from the Api

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(apiConfig.baseUrl + "content/", {
          auth: apiConfig.auth,
        })
        .then((data) => {
          setData(data.data.results);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Appbar.Header>
        <Appbar.Content title="All Videos" />
      </Appbar.Header>
      {loading ? (
        <Text>loading</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={renderVids}
          keyExtractor={(item) => item.link}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  video: {
    height: 150,
    flex: 1,
  },
});
