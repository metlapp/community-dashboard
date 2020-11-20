import React, { useState, useEffect } from "react";
import { SafeAreaView, Linking } from "react-native";
import axios from "axios";
import { apiConfig } from "../config/config";
import { Card, Title, Paragraph, Button } from "react-native-paper";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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
      <Card>
        <Card.Content>
          <Title>{loading ? "Loading" : data[0].title}</Title>
          <Paragraph></Paragraph>
        </Card.Content>
      </Card>
      <Button
        onPress={() => {
          Linking.openURL(data[0].link);
        }}
      >
        heloooooo
      </Button>
    </SafeAreaView>
  );
}
