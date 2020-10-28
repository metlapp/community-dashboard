import "react-native";
import React from "react";
import ChangeName from "../components/ChangeName";
import { render, fireEvent, cleanup } from "@testing-library/react-native";
import AuthContext from "../auth/Context";
import axios from "../__mocks__/axios";
jest.mock("axios");

describe("<ChangeName />", () => {
  it("SetUser has been called", () => {
    const setUser = jest.fn();
    const hidemodal = jest.fn();
    const user = { name: "Dawson" };
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <ChangeName hidemodal={hidemodal} />
      </AuthContext.Provider>
    );
    fireEvent(getByPlaceholderText("Change Name"), "onChangeText", "Jerry");

    fireEvent(getByText("Save"), "onPress");
    expect(setUser).toHaveBeenCalled();
  });

  it("Calls Api to display name", async () => {
    axios.get.mockImplementationOnce(() => {
      Promise.resolve({
        data: { firstname: "Jerry" },
      });
    });

    expect(axios.get).toHaveBeenCalled();
  });
});
