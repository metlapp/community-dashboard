import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import axios from "axios";
import { apiConfig } from "../config/config";

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      //
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

  console.log(data);

  return (
    <SafeAreaView>
      <Text></Text>
    </SafeAreaView>
  );
}
