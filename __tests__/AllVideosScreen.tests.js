import "react-native"
import React from "react";
import AllVideosScreen from "../screens/AllVideosScreen";
import { render} from "@testing-library/react-native";
import axios from "../__mocks__/axios";
jest.mock("axios");

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

/* THESE TESTS ARE CURRENTLY BEING SKIPPED, AS THIS SCREEN IS NOT CURRENTLY BEING USED */

describe.skip("<AllVideosScreen />", () => {
  it("Renders two videos to the screen ", async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          results: [{
            id: 1,
            title: "Test Video",
            link: "https://www.youtube.com/embed/JTOJsU3FSD8",
            description: "Presidential Results throughout history",
            organization: 1,
            categories: [],
            content_type: "Video",
          },
          {
            id: 2,
            title: "Test Video",
            link: "https://www.youtube.com/embed/JTOJsU3FSD8",
            description: "Presidential Results throughout history",
            organization: 1,
            categories: [],
            content_type: "Video",
          }],
        },
      });
    });

   
      const {getAllByText} = render(<AllVideosScreen />)
      await flushPromises()
      const wrapper = getAllByText("Test Video")
      expect(wrapper).toHaveLength(2);
      
  });

  it("Renders only Videos ", async () => {
    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        data: {
          results: [{
            id: 1,
            title: "Test Video",
            link: "https://www.youtube.com/embed/JTOJsU3FSD8",
            description: "Presidential Results throughout history",
            organization: 1,
            categories: [],
            content_type: "Video",
          },
          {
            id: 2,
            title: "Test Video",
            link: "https://www.youtube.com/embed/JTOJsU3FSD8",
            description: "Presidential Results throughout history",
            organization: 1,
            categories: [],
            content_type: "Article",
          }],
        },
      });
    });

   
      const {getAllByText} = render(<AllVideosScreen />)
      await flushPromises()
      const wrapper = getAllByText("Test Video")
      expect(wrapper).toHaveLength(1);

  });


});
