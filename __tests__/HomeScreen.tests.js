import "react-native";
import React from "react";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import axios from "../__mocks__/axios";
import HomeScreen from "../screens/HomeScreen";
import AuthContext from "../auth/Context";
jest.mock("axios");

function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}
beforeEach(() => {
  axios.get.mockImplementationOnce(() => {
    return Promise.resolve({
      data: {
        results: [
          {
            id: 6,
            publication_date_time: "2020-11-05T21:00:00Z",
            notification_date_time: "2020-11-05T21:00:00Z",
            content: {
              id: 9,
              item_object: {
                id: 3,
                title: "Test Question",
                organization: 1,
                question_type: "SCALE",
                number_of_lines: 3,
              },
              item_type: "Question",
            },
          },
          {
            id: 14,
            publication_date_time: "2020-11-04T00:01:00Z",
            notification_date_time: "2020-11-04T12:00:00Z",
            content: {
              id: 11,
              item_object: {
                id: 7,
                title: "Test Feed",
                link:
                  "https://bowhunting360.com/2017/03/03/field-dress-deer-10-steps/",
                description: "Test Article",
                organization: 1,
                categories: [1, 2, 4, 5],
                content_type: "Article",
              },
              item_type: "Content",
            },
          },
          {
            id: 3,
            publication_date_time: "2020-11-03T00:01:00Z",
            notification_date_time: "2020-11-03T12:00:00Z",
            content: {
              id: 4,
              item_object: {
                id: 3,
                title: "Test Feed",
                link: "https://www.youtube.com/embed/A8a2EosJIbM",
                description:
                  "Sept. 12, 2018 | Bob Boilen -- Hobo Johnson and the Lovemakers accomplished somethinentry.",
                organization: 1,
                categories: [],
                content_type: "Video",
              },
              item_type: "Content",
            },
          },
        ],
      },
    });
  });
});

describe("<HomeScreen />", () => {
  it("displays the userFeed to the User", async () => {
    const user = { id: 1 };
    const { getAllByText } = render(
      <AuthContext.Provider value={{ user }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    const wrapper = getAllByText("Test Feed");
    expect(wrapper).toHaveLength(2);
  });
  it("Question is gone when answered", async () => {
    const user = { id: 1 };
    const { getByText } = render(
      <AuthContext.Provider value={{ user }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    const question = getByText("Test Question");
    expect(question).toBeTruthy();
    await act(() => {
      fireEvent(getByText("Submit"), "onPress");
    });
    expect(axios.post).toHaveBeenCalled();
  });
  it("Article are displayed correctly", async () => {
    const user = { id: 1 };
    const { getByText } = render(
      <AuthContext.Provider value={{ user }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    const Article = getByText("GO TO ARTICLE");
    expect(Article).toBeTruthy();
  });
});
