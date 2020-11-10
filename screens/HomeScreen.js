import React, { useEffect } from "react";
import { SafeAreaView, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { apiConfig } from "../config/config";
import { Button, Card, Title, Paragraph, Appbar } from "react-native-paper";
import { WebView } from "react-native-webview";
import AuthContext from "../auth/Context";

export default function HomeScreen() {
  const [loading, setloading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const renderVids = ({ item }) => {
    return (
      <Card style={styles.container}>
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

  const fetchData = () => {
    axios
      .get(apiConfig.baseUrl + "content/", {
        auth: apiConfig.auth,
      })
      .then((data) => {
        setData(data.data.results);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [loading]);

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
