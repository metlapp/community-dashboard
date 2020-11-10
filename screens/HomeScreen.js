import React, { useEffect } from "react";
import { SafeAreaView, Text, FlatList } from "react-native";
import axios from "axios";
import { apiConfig } from "../config/config";
import { Button, Card, Title, Paragraph } from "react-native-paper";

export default function HomeScreen() {
  const [loading, setloading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const renderVids = ({ item }) => {
    return (
      <Card>
        <Card.Content>
          <Title>{item.title}</Title>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions>
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
