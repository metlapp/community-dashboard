import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
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
                title: "Test Quote",
                organization: 1,
                text: "Test Quote",
                static_text_type: "QUOTE",
                author: "Jaycob",
              },
              item_type: "Static",
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
                title: "Test Theme",
                text: "Test Theme",
                organization: 1,
                static_text_type: "GREETING",
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
                title: "Test Greeting",
                text: "Test Greeting",
                organization: 1,
                static_text_type: "GREETING",
              },
              item_type: "Static",
            },
          },
        ],
      },
    });
  });
});

describe("Displpaying different FixedTexts on the <HomeScreen />", () => {
  it("displays a GREETING to the User", async () => {
    user = {
      id: 5,
    };
    const { getAllByText } = render(
      <AuthContext.Provider value={{ user }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    expect(getAllByText("Test Greeting")).toHaveLength(2);
  });
  it("displays a QUOTE to the User", async () => {
    user = {
      id: 5,
    };
    const { getAllByText } = render(
      <AuthContext.Provider value={{ user }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    expect(getAllByText("- Jaycob")).toBeTruthy();
  });
  it("displays a THEME to the User", async () => {
    user = {
      id: 5,
    };
    const { getAllByText } = render(
      <AuthContext.Provider value={{ user }}>
        <HomeScreen />
      </AuthContext.Provider>
    );
    await flushPromises();
    expect(getAllByText("Test Theme")).toHaveLength(2);
  });
});
