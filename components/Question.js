import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View } from "react-native";
import { Surface, TextInput, Button } from "react-native-paper";

const Question = (props) => {
  switch (props.question.question_type) {
    case "YES_NO":
      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => console.log("Pressed")}>
              <Image
                style={styles.image}
                source={require("../images/check.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Pressed")}>
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
            <TouchableOpacity onPress={() => console.log("Pressed")}>
              <Image
                style={styles.image}
                source={require("../images/happy.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Pressed")}>
              <Image
                style={styles.image}
                source={require("../images/sad.png")}
              />
            </TouchableOpacity>
          </View>
        </Surface>
      );

    case "ONE_SENTENCE":
      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Answer"
            multiline={true}
          ></TextInput>
          <Button mode="contained">Submit</Button>
        </Surface>
      );

    case "BLOCK":
      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Answer"
            multiline={true}
          ></TextInput>
          <Button mode="contained">Submit</Button>
        </Surface>
      );

    case "MULTILINE":
      return (
        <Surface>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <View style={styles.container}>
            <TextInput
              style={styles.textInput}
              placeholder="Answer"
              multiline={true}
            ></TextInput>
          </View>
        </Surface>
      );

    case "SCALE":
      return <Text>S</Text>;
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
    margin: 20,
  },
});

export default Question;
