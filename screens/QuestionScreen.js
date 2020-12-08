import React, { useEffect, useContext } from "react";
import { Appbar } from "react-native-paper";
import { SafeAreaView, Text } from "react-native";
import { apiConfig } from "../config/config";
import axios from "axios";
import Question from "../components/Question";
import AuthContext from "../auth/Context";
import { trackClick } from "../components/trackClick";

const QuestionScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const authContext = useContext(AuthContext);

  const postData = async (payLoad) => {
    axios
      .post(apiConfig.baseUrl + "answers/", payLoad, {
        auth: apiConfig.auth,
      })
      .then(() => {
        navigation.navigate("Account");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Recieves Answers from child component and send it to the postData function to save
  const answerCallBack = (answer) => {
    //will need to change these values later to fit specific users and questions
    let payLoad = { user: 1, question: data.id };

    //deteermines what data type was answered
    switch (data.question_type) {
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
  };

  useEffect(() => {
    //Grabs the specific question from api
    const fetchData = async () => {
      axios
        .get(apiConfig.baseUrl + "questions/1/", {
          //This is hard coded until we get a solution later
          auth: apiConfig.auth,
        })
        .then((data) => {
          setData(data.data);
          trackClick(authContext.user.id, data.data.id, "VIEWED", "APP");
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
        <Appbar.Content title="QUESTION" />
      </Appbar.Header>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <Question question={data} answerCallBack={answerCallBack} />
      )}
    </SafeAreaView>
  );
};

export default QuestionScreen;
