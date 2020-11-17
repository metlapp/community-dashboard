import React, { useContext, useEffect } from "react";
import AccountModal from "../components/AccountModal";
import { Appbar, Button } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { apiConfig } from "../config/config";
import axios from "axios";
import Question from "../components/Question";

const QuestionScreen = () => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(apiConfig.baseUrl + "questions/9", {
          auth: apiConfig.auth,
        })
        .then((data) => {
          setData(data.data);
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
      {loading ? <Text>Loading</Text> : <Question question={data} />}
    </SafeAreaView>
  );
};

export default QuestionScreen;
