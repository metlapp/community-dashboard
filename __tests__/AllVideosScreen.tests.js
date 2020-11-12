import "react-native";
import { shallow } from "enzyme";
import React from "react";
import AllVideosScreen from "../screens/AllVideosScreen";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import axios from "../__mocks__/axios";
jest.mock("axios");

describe("<AllVideosScreen />", () => {
  it("Renders the video to the screen ", async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          results: {
            id: 1,
            title: "developer",
            link: "https://www.youtube.com/embed/JTOJsU3FSD8",
            description: "Presidential Results throughout history",
            organization: 1,
            categories: [],
            content_type: "Video",
          },
        },
      });
    });

    const { getByTestId } = await render(<AllVideosScreen />);

    const wrapper = getByTestId("video");
    expect(wrapper).toExist();
  });
});
