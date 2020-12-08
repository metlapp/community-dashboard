import "react-native";
import React from "react";
import Question from "../components/Question";
import { fireEvent, render } from "@testing-library/react-native";
import AuthContext from "../auth/Context";

describe("<Question />", () => {
  it("Question will render and Call the parent when answer is submitted", () => {
    let data = {
      id: 1,
      number_of_lines: 4,
      organization: 1,
      question_type: "SCALE",
      title: "What is your top 2 advice for young CEO'S?",
    };
    const answerCallBack = jest.fn();
    const user = { id: 1 };
    const { getByText } = render(
      <AuthContext.Provider value={{ user }}>
        <Question question={data} answerCallBack={answerCallBack} />
      </AuthContext.Provider>
    );
    const button = getByText("Submit");

    fireEvent(button, "onPress");
    expect(answerCallBack).toHaveBeenCalled();
    expect(answerCallBack).toHaveBeenCalledWith(1);
  });

  it("Can't callback to the parent due to nothing in text input", () => {
    let data = {
      id: 1,
      number_of_lines: 4,
      organization: 1,
      question_type: "BLOCK",
      title: "What is your top 2 advice for young CEO'S?",
    };

    const answerCallBack = jest.fn();
    const { getByText } = render(
      <Question question={data} answerCallBack={answerCallBack} />
    );
    const button = getByText("Submit");

    fireEvent(button, "onPress");
    expect(answerCallBack).not.toHaveBeenCalled();
  });

  it("Question doesn't have a submit button when not needed", () => {
    let data = {
      id: 1,
      number_of_lines: 4,
      organization: 1,
      question_type: "YES_NO",
      title: "What is your top 2 advice for young CEO'S?",
    };

    const answerCallBack = jest.fn();
    const component = shallow(
      <Question question={data} answerCallBack={answerCallBack} />
    );

    expect(component.find("submit")).not.toExist();
  });
});
