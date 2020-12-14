import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";

import { apiConfig } from "../config/config";
import { HOST_WITH_PORT } from "../environment";
import FixedText from "../components/FixedText";
import Notification from "../components/Notification";
import QuestionScreen from "./QuestionScreen";

export default function NotificationScreen({ navigation, route }) {
  const [data, setData] = useState();
  const { notification, body, title } = route.params;

  contentType =
    notification.notification.request.content.data.extra.content_type;
  const staticId = notification.notification.request.content.data.extra.item_id;

  useEffect(() => {
    getContentInfo();
  }, []);

  const getContentInfo = async () => {
    if (contentType === "Static") {
      const contentInfo = await axios
        .get(HOST_WITH_PORT + `${apiConfig.urls.static}/${staticId}/`, {
          auth: apiConfig.auth,
        })
        .catch((err) => {
          console.log(err);
        });
      setData(contentInfo);
    }
  };

  // console.log(contentType);
  if (contentType === "Static") {
    return (
      <View>
        {data ? <FixedText data={data.data} /> : <Text>Spinner</Text>}
      </View>
    );
  } else {
    return (
      <View>
        <Text>else</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

// if (contentType === "Question") {
//   return (
//     // <QuestionScreen  />
//     <View>
//       <Text>Hi</Text>
//     </View>
//   );
// } else
