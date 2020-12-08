import "react-native";
import React from "react";
import { fireEvent, render } from "@testing-library/react-native";

import Article from "../components/Article";
import Video from "../components/Video";
import AuthContext from "../auth/Context";
import QuestionScreen from "../screens/QuestionScreen";
import Question from "../components/Question";

const TrackClick = require("../components/TrackClick");
TrackClick.trackClick = jest.fn();

function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

describe("Tracking Clicks", () => {
  it("<Article> Calls TrackClick when article is clicked", () => {
    const data = {
      id: 1,
      item_object: {
        title: "article",
        link: "http://asdf.com",
        description: "description",
      },
    };
    const user = { id: 1 };
    const { getByText } = render(
      <AuthContext.Provider value={{ user }}>
        <Article article={data} />
      </AuthContext.Provider>
    );
    fireEvent(getByText("http://asdf.com"), "onPress");
    expect(TrackClick.trackClick).toBeCalled();
    expect(TrackClick.trackClick).toBeCalledWith(1, 1, "VIEWED", "APP");
  });

  it("<Video> Calls TrackClick when Video is clicked", () => {
    const data = {
      id: 1,
      item_object: {
        title: "Video",
        link: "link",
        description: "description",
      },
    };
    const user = { id: 1 };
    const { getByTestId } = render(
      <AuthContext.Provider value={{ user }}>
        <Video video={data} />
      </AuthContext.Provider>
    );
    fireEvent(getByTestId("video"), "onPress");
    expect(TrackClick.trackClick).toBeCalled();
    expect(TrackClick.trackClick).toBeCalledWith(1, 1, "VIEWED", "APP");
  });
  it("<Question> Calls TrackClick when question is answered", () => {
    const data = {
      id: 1,
      question_type: "SCALE",
      title: "question",
    };
    const user = { id: 1 };
    const answerCallBack = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider value={{ user }}>
        <Question question={data} answerCallBack={answerCallBack} />
      </AuthContext.Provider>
    );
    fireEvent(getByText("Submit"), "onPress");
    expect(TrackClick.trackClick).toBeCalled();
    expect(TrackClick.trackClick).toBeCalledWith(1, 1, "ANSWERED", "APP");
  });
  it("<QuestionScreen> Calls TrackClick when Question is viewed", async () => {
    const user = { id: 1 };

    const { getByTestId } = render(
      <AuthContext.Provider value={{ user }}>
        <QuestionScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    expect(TrackClick.trackClick).toBeCalled();
    expect(TrackClick.trackClick).toBeCalledWith(1, 1, "VIEWED", "APP");
  });
});
