import React, { useState, useEffect } from "react";
import { SafeAreaView, Linking, Text, View } from "react-native";
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
      {loading ? (
        <Text>Loading..</Text>
      ) : (
        <View>
          <Card>
            <Card.Content>
              <Title>{data[0].title}</Title>
              <Paragraph>{data[0].description}</Paragraph>
            </Card.Content>
            <Button
              mode="outlined"
              onPress={() => {
                Linking.openURL(data[0].link);
              }}
            >
              GO TO ARTICLE
            </Button>
          </Card>
        </View>
      )}
    </SafeAreaView>
  );
}
