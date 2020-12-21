import "react-native";
import React from "react";
import { render } from "@testing-library/react-native";
import ZoomLink from "../components/ZoomLink";
import AuthContext from "../auth/Context";
jest.mock("axios");

describe("Displaying the correct content for Zoom calls", () => {
  it("displays a Zoom meeting to the User", async () => {
    user = {
      id: 8,
    };

    const content = {
      id: 26,
      item_object: {
        id: 3,
        title: "Zoom",
        link:
          "https://zoom.us/j/92639612311?pwd=bWliWHVzQndOMENJblhtajV2WkZBZz09",
        description: "Zoom Team Meeting!",
        organization: 1,
        categories: [],
        content_type: "Zoom",
      },
    };

    const { getAllByText } = render(
      <AuthContext.Provider value={{ user }}>
        <ZoomLink data={content} />
      </AuthContext.Provider>
    );
    expect(getAllByText("Zoom Team Meeting!")).toHaveLength(1);
    expect(getAllByText("Click here to join your Zoom call!")).toHaveLength(1);
  });
});
