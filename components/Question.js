import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import {
  HelperText,
  IconButton,
  Text,
  TextInput as BlockText,
} from "react-native-paper";
import Slider from "@react-native-community/slider";
import PropTypes from "prop-types";
import ContentCard from "./ContentCard";
import AppButton from "./AppButton";
import defaultStyles, {
  accentColor,
  mediumGrey,
  theme,
} from "../config/defaultStyles";
import AppTextInput from "./AppTextInput";
import { trackClick } from "./trackClick";
import AuthContext from "../auth/Context";
const sliderLabelContainerWidth = 40;

const Question = (props) => {
  const authContext = useContext(AuthContext);
  const [answer, setAnswer] = useState("");
  const [sliderValue, setSliderValue] = useState(1);
  const [error, setError] = useState(false);

  /** slider label positioning **/
  const [sliderLayout, setSliderLayout] = useState({});
  const [sliderLabelLeft, setSliderLabelLeft] = useState(0);
  useEffect(() => {
    if (sliderLayout.x)
      setSliderLabelLeft(sliderLayout.x - sliderLabelContainerWidth / 2);
  }, [sliderLayout]);
  useEffect(() => {
    if (sliderLayout.x) {
      let sliderWidth = sliderLayout.width - sliderLayout.x * 2;
      setSliderLabelLeft(
        (sliderWidth / 4) * (sliderValue - 1) +
          sliderLayout.x -
          sliderLabelContainerWidth / 2
      );
    }
  }, [sliderValue]);

  function click(questionID) {
    trackClick(authContext.user.id, questionID, "ANSWERED", "APP");
  }
  //Renders the right type of componets depending on question type
  switch (props.question.question_type) {
    case "YES_NO":
      return (
        <ContentCard>
          <View>
            <Text style={styles.questionTitle}>{props.question.title}</Text>
            <View style={styles.container}>
              <IconButton
                onPress={() => {
                  click(props.question.id);
                  props.answerCallBack(true);
                }}
                icon="thumb-up-outline"
                size={50}
              />
              <IconButton
                onPress={() => {
                  click(props.question.id);
                  props.answerCallBack(false);
                }}
                icon="thumb-down-outline"
                size={50}
              />
            </View>
          </View>
        </ContentCard>
      );

    case "HAPPY_SAD":
      return (
        <ContentCard>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <View style={styles.container}>
            <IconButton
              onPress={() => {
                click(props.question.id);
                props.answerCallBack(true);
              }}
              icon="emoticon-happy-outline"
              size={50}
            />
            <IconButton
              onPress={() => {
                click(props.question.id);
                props.answerCallBack(false);
              }}
              icon="emoticon-sad-outline"
              size={50}
            />
          </View>
        </ContentCard>
      );

    case "BLOCK":
      return (
        <ContentCard>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <BlockText
            style={defaultStyles.BlockText}
            error={error}
            placeholder="Answer..."
            placeholderTextColor={theme.colors.placeholder}
            multiline={true}
            numberOfLines={8}
            onChangeText={(value) => {
              setAnswer(value);
            }}
          ></BlockText>
          <HelperText type="error" visible={error}>
            Answer is required
          </HelperText>

          <QuestionSubmitButton
            onPress={() => {
              if (answer == "") {
                setError(true);
              } else {
                click(props.question.id);
                props.answerCallBack(answer);
              }
            }}
          />
        </ContentCard>
      );

    case "MULTILINE":
      let rows = [];
      let input = [];

      for (let i = 0; i < props.question.number_of_lines; i++) {
        rows.push(
          <AppTextInput
            key={i}
            error={error}
            placeholder="Answer"
            onChangeText={(value) => {
              input[i] = value;
            }}
          ></AppTextInput>
        );
      }

      return (
        <ContentCard>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          {rows}
          <HelperText type="error" visible={error}>
            Answer is required
          </HelperText>
          <QuestionSubmitButton
            onPress={() => {
              if (input.length == 0) {
                setError(true);
              } else {
                click(props.question.id);
                input = input.join(" || ");
                props.answerCallBack(input);
              }
            }}
          />
        </ContentCard>
      );

    case "SCALE":
      return (
        <ContentCard>
          <Text style={styles.questionTitle}>{props.question.title}</Text>
          <Text style={[styles.sliderValue, { left: sliderLabelLeft }]}>
            {sliderValue}
          </Text>
          <Slider
            onLayout={(event) => {
              setSliderLayout(event.nativeEvent.layout);
            }}
            style={{ width: "100%", height: 30, marginBottom: 10 }}
            minimumValue={1}
            maximumValue={5}
            step={1}
            thumbTintColor={accentColor}
            minimumTrackTintColor={accentColor}
            maximumTrackTintColor={mediumGrey}
            tapToSeek={true}
            onValueChange={(value) => {
              setSliderValue(value);
            }}
          />
          <QuestionSubmitButton
            onPress={() => {
              click(props.question.id);
              props.answerCallBack(sliderValue);
            }}
          />
        </ContentCard>
      );
  }
};

function QuestionSubmitButton({ onPress }) {
  return (
    <View style={{ alignItems: "center" }}>
      <AppButton title="Submit" compact={true} width="50%" onPress={onPress} />
    </View>
  );
}

QuestionSubmitButton.propTypes = {
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  questionTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
  sliderValue: {
    textAlign: "center",
    width: sliderLabelContainerWidth,
    color: accentColor,
    fontWeight: "bold",
    position: "relative",
  },
});

Question.propTypes = {
  question: PropTypes.object,
  answerCallBack: PropTypes.func,
};

export default Question;
