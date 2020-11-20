import "react-native";
import React from "react";
import Articles from "../screens/Articles";
import { fireEvent, render } from "@testing-library/react-native";
import axios from "../__mocks__/axios";
jest.mock("axios");

let mockOpenURL = jest.fn();
jest.mock("react-native/Libraries/Linking/Linking", () => ({
  openURL: mockOpenURL,
}));

function flushPromises() {
  return new Promise((resolve) => setImmediate(resolve));
}

describe("<Articles/>", () => {
  it("renders one article", async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          results: [
            {
              id: 1,
              title: "Test Article",
              link: "https://www.google.com/",
              description: "Google Homepage",
              organization: 1,
              categories: [],
              content_type: "Article",
            },
          ],
        },
      });
    });
    const { getAllByText } = render(<Articles />);
    await flushPromises();
    expect(getAllByText("Test Article")).toHaveLength(1);
  });

  it("opens the article in the users default browser", async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          results: [
            {
              id: 1,
              title: "Test Article",
              link: "https://www.google.com/",
              description: "Google Homepage",
              organization: 1,
              categories: [],
              content_type: "Article",
            },
          ],
        },
      });
    });
    const { getByText } = render(<Articles />);
    await flushPromises();
    fireEvent(getByText("GO TO ARTICLE"), "onPress");
    expect(mockOpenURL).toHaveBeenCalled();
    expect(mockOpenURL).toHaveBeenCalledTimes(1);
    expect(mockOpenURL).toHaveBeenCalledWith("https://www.google.com/");
  });
});
