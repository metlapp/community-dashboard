import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  TextInput as BlockText,
} from "react-native";
import { Surface, TextInput, Button, HelperText } from "react-native-paper";
import Slider from "@react-native-community/slider";
import PropTypes from "prop-types";

const Question = (props) => {
  const [answer, setAnswer] = useState("");
  const [sliderValue, setSliderValue] = useState(1);
  const [error, setError] = useState(false);

  //Renders the right type of componets depending on question type
  switch (props.question.question_type) {
    case "YES_NO":
      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => props.answerCallBack(true)}>
              <Image
                style={styles.image}
                source={require("../images/check.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.answerCallBack(false)}>
              <Image
                style={styles.image}
                source={require("../images/x_mark.png")}
              />
            </TouchableOpacity>
          </View>
        </Surface>
      );

    case "HAPPY_SAD":
      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => props.answerCallBack(true)}>
              <Image
                style={styles.image}
                source={require("../images/happy.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => props.answerCallBack(false)}>
              <Image
                style={styles.image}
                source={require("../images/sad.png")}
              />
            </TouchableOpacity>
          </View>
        </Surface>
      );

    case "BLOCK":
      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <BlockText
            style={{
              textAlignVertical: "top",
              height: 100,
              borderColor: "gray",
              borderWidth: 1,
            }}
            error={error}
            placeholder="Answer"
            multiline={true}
            onChangeText={(value) => {
              setAnswer(value);
            }}
          ></BlockText>
          <HelperText type="error" visible={error}>
            Answer is required
          </HelperText>

          <Button
            mode="contained"
            onPress={() => {
              if (answer == "") {
                setError(true);
              } else {
                props.answerCallBack(answer);
              }
            }}
          >
            Submit
          </Button>
        </Surface>
      );

    case "MULTILINE":
      let rows = [];
      let input = [];

      for (let i = 0; i < props.question.number_of_lines; i++) {
        rows.push(
          <TextInput
            key={i}
            error={error}
            style={styles.textInput}
            placeholder="Answer"
            onChangeText={(value) => {
              input[i] = value;
            }}
          ></TextInput>
        );
      }

      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          {rows}
          <HelperText type="error" visible={error}>
            Answer is required
          </HelperText>
          <Button
            mode="contained"
            onPress={() => {
              if (input.length == 0) {
                setError(true);
              } else {
                input = input.join(" || ");
                props.answerCallBack(input);
              }
            }}
          >
            Submit
          </Button>
        </Surface>
      );

    case "SCALE":
      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <Text style={styles.sliderValue}>{sliderValue}</Text>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            thumbTintColor="purple"
            onValueChange={(value) => {
              setSliderValue(value);
            }}
          />
          <Button
            mode="contained"
            onPress={() => {
              props.answerCallBack(sliderValue);
            }}
          >
            Submit
          </Button>
        </Surface>
      );
  }
};

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    margin: 10,
  },
  questionTitle: {
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textInput: {
    width: "90%",
    margin: 15,
  },
  sliderValue: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
  },
});

Question.propTypes = {
  question: PropTypes.object,
};

export default Question;
