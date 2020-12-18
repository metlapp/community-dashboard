import "react-native";
import React from "react";
import { act, fireEvent, render } from "@testing-library/react-native";
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
            id: 19,
            publication_date_time: "2020-11-04T00:01:00Z",
            notification_date_time: "2020-11-04T12:00:00Z",
            content: {
              id: 25,
              item_object: {
                id: 17,
                title: "Test Feed",
                text: "Test Static",
                organization: 1,
              },
              item_type: "Static",
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
          {
            id: 20,
            publication_date_time: "2020-11-03T00:01:00Z",
            notification_date_time: "2020-11-03T12:00:00Z",
            content: {
              id: 26,
              item_object: {
                id: 3,
                title: "Zoom",
                link: "https://zoom.us/j/92639612311?pwd=bWliWHVzQndOMENJblhtajV2WkZBZz09",
                description:
                  "Zoom Team Meeting!",
                organization: 1,
                categories: [],
                content_type: "Zoom",
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
    const user = { id: 3 };
    const setUser = jest.fn();
    const { getAllByText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    const wrapper = getAllByText("Test Feed");
    expect(wrapper).toHaveLength(3);
  });
  it("Question is gone when answered", async () => {
    const user = { id: 3 };
    const setUser = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
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
    const user = { id: 3 };
    const setUser = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    const Article = getByText("Test Article");
    expect(Article).toBeTruthy();
  });
  it("Zoom Links are displayed correctly", async () => {
    const user = { id: 3 };
    const setUser = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    const Zoom = getByText("Zoom");
    expect(Zoom).toBeTruthy();
  });
  it("Statics are displayed correctly", async () => {
    const user = { id: 3 };
    const setUser = jest.fn();
    const { getByText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    const Static = getByText("Test Static");
    expect(Static).toBeTruthy();
  });
});
