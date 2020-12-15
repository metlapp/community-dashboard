import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import axios from "axios";

import AuthContext from "../auth/Context";
import { apiConfig } from "../config/config";
import { HOST_WITH_PORT } from "../environment";
import FixedText from "../components/FixedText";
import Question from "../components/Question";

export default function NotificationScreen({ navigation, route }) {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState();

  const contentType =
    notification.notification.request.content.data.extra.content_type;
  const itemId = notification.notification.request.content.data.extra.item_id;

  useEffect(() => {
    getContentInfo();
  }, []);

  const getContentInfo = async () => {
    if (contentType === "Static") {
      const contentInfo = await axios
        .get(HOST_WITH_PORT + `${apiConfig.urls.static}/${itemId}/`, {
          auth: apiConfig.auth,
        })
        .catch((err) => {
          console.log(err);
        });
      setData(contentInfo);
    } else if (contentType === "Question") {
      const contentInfo = await axios
        .get(HOST_WITH_PORT + `${apiConfig.urls.question}/${itemId}/`, {
          auth: apiConfig.auth,
        })
        .catch((err) => {
          console.log(err);
        });
      setData(contentInfo);
    }
  };

  //Posts the answer to the API
  const postData = async (payLoad) => {
    axios
      .post(HOST_WITH_PORT + "answers/", payLoad, {
        auth: apiConfig.auth,
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const answerCallBack = (answer) => {
    //will need to change these values later to fit specific users and questions
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

  // console.log(contentType);
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
  } else {
    // Will leave else here until we define Surveys
    return (
      <View>
        <Text>else</Text>
      </View>
    );
  }
}
