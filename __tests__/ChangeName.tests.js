import "react-native";
import React from "react";
import ChangeName from "../components/ChangeName";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import AuthContext from "../auth/Context";
import axios from "../__mocks__/axios";
jest.mock("axios");

const placeholderText = "New name";
const saveButtonText = "Save";

describe("<ChangeName />", () => {
  it("SetUser has been called", async () => {
    const setUser = jest.fn();
    const hidemodal = jest.fn();
    const user = { name: "Dawson" };
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <ChangeName hidemodal={hidemodal} />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(
        getByPlaceholderText(placeholderText),
        "onChangeText",
        "Jerry"
      );
    });
    act(() => {
      fireEvent.press(getByText(saveButtonText).parent);
    });
    await waitFor(() => {
      expect(setUser).toHaveBeenCalled();
    });
  });

  it("SetUser has not been called due to network Error", async () => {
    const setUser = jest.fn();
    const hidemodal = jest.fn();
    const user = { name: "Dawson" };
    axios.patch.mockImplementationOnce(() => {
      Promise.reject();
    });
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <ChangeName hidemodal={hidemodal} />
      </AuthContext.Provider>
    );
    fireEvent(getByPlaceholderText(placeholderText), "onChangeText", "Jerry");

    fireEvent(getByText(saveButtonText), "onPress");
    await expect(axios.patch).toHaveBeenCalled();
    expect(setUser).not.toHaveBeenCalled();
  });
});
