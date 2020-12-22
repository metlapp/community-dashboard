import React, { useEffect, useContext } from "react";
import { SafeAreaView} from "react-native";
import { apiConfig } from "../config/config";
import axios from "axios";
import Question from "../components/Question";
import AuthContext from "../auth/Context";
import { trackClick } from "../components/TrackClick";
import {Text} from "react-native-paper";


const QuestionScreen = ({ navigation, route }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const [x, setX] = React.useState(0);
  const authContext = useContext(AuthContext);
  const {questions} = route.params

  const postData = async (payLoad) => {
    axios
      .post(apiConfig.baseUrl + "answers/", payLoad, {
        auth: apiConfig.auth,
      })
      .then(() => {
        if(questions.length != x+1){
          setX(x+1)
        }else{
          navigation.navigate("Home")
        }

    
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //Recieves Answers from child component and send it to the postData function to save
  const answerCallBack = (answer) => {
    //will need to change these values later to fit specific users and questions
    let payLoad = { user: authContext.user.id, question: data.id };

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
    const fetchData = async () => {
      axios
        .get(apiConfig.baseUrl + `questions/${questions[x]}/`, {
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
  }, [x]);
  return (
    <SafeAreaView>
      {loading ? (
        <Text>Loading</Text>
      ) : (
        <Question question={data} answerCallBack={answerCallBack} />
      )}
    </SafeAreaView>
  );
};

export default QuestionScreen;
