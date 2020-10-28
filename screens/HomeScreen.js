import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import axios from "axios";
import { apiConfig } from "../config/config";

export default function HomeScreen() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get(apiConfig.baseUrl + "/user/5tVxgsqPCjv2Ul5Rc7gw/post", {
        headers: { "app-id": "5f9897efd637d42b2399ba35" },
      })
      .then(({ data }) => setData(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  console.log(data);
  return (
    <SafeAreaView>
      <Text>
        {loading && "Loading..."}
        {JSON.stringify(data)}
      </Text>
    </SafeAreaView>
  );
}
