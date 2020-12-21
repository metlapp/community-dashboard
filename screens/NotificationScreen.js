import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";
import { openURL } from "expo-linking";

import AuthContext from "../auth/Context";
import { apiConfig } from "../config/config";
import FixedText from "../components/FixedText";
import Question from "../components/Question";
import LoadingScreen from "./LoadingScreen";

export default function NotificationScreen({ navigation, route }) {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState();
  const { notification } = route.params;

  const contentType =
    notification.notification.request.content.data.content_type;
  const itemId = notification.notification.request.content.data.item_id;

  useEffect(() => {
    getContentInfo();
  }, []);

  const getContentInfo = async () => {
    if (contentType === "Static") {
      const contentInfo = await axios
        .get(apiConfig.baseUrl + `${apiConfig.urls.static}/${itemId}/`, {
          auth: apiConfig.auth,
        })
        .catch((err) => {
          console.log(err);
        });
      setData(contentInfo);
    } else if (contentType === "Question") {
      const contentInfo = await axios
        .get(apiConfig.baseUrl + `${apiConfig.urls.question}/${itemId}/`, {
          auth: apiConfig.auth,
        })
        .catch((err) => {
          console.log(err);
        });
      setData(contentInfo);
    } else if (contentType === "Content") {
      const contentInfo = await axios
        .get(apiConfig.baseUrl + `${apiConfig.urls.content}/${itemId}/`, {
          auth: apiConfig.auth,
        })
        .catch((err) => {
          console.log(err);
        });
      if (contentInfo.data.content_type === "Zoom") {
        navigation.navigate("Home");
        openURL(contentInfo.data.link);
      } else {
        navigation.navigate("Home");
      }
    }
  };

  //Posts the answer to the API
  const postData = async (payLoad) => {
    axios
      .post(apiConfig.baseUrl + "answers/", payLoad, {
        auth: apiConfig.auth,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const answerCallBack = (answer) => {
    let payLoad = { user: authContext.user.id, question: itemId };

    //detrmines what data type was answered
    switch (data.data.question_type) {
      case "YES_NO":
        payLoad = { ...payLoad, bool_answer: answer };
        break;
      case "HAPPY_SAD":
        payLoad = { ...payLoad, bool_answer: answer };
        break;
      case "BLOCK":
        payLoad = { ...payLoad, string_answer: answer };
        break;
      case "MULTILINE":
        payLoad = { ...payLoad, string_answer: answer };
        break;
      case "SCALE":
        payLoad = { ...payLoad, number_answer: answer };
        break;
    }
    postData(payLoad);
    navigation.navigate("Home");
  };

  if (contentType === "Static") {
    return <View>{!!data && <FixedText data={data.data} />}</View>;
  }
  if (contentType === "Question") {
    return (
      <View>
        {!!data && (
          <Question question={data.data} answerCallBack={answerCallBack} />
        )}
      </View>
    );
  }
  if (contentType === "Content") {
    return <LoadingScreen />;
  } else {
    // Will leave else here until we define Surveys
    return <Text>Else...</Text>;
  }
}
