import React, { useContext, useEffect } from "react";
import AccountModal from "../components/AccountModal";
import { Appbar, Button } from "react-native-paper";
import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

const QuestionScreen = () => {
  return (
    <SafeAreaView>
      <Text>Question Screen</Text>
    </SafeAreaView>
  );
};

export default QuestionScreen;
