import "react-native";
import React from "react";
import ChangeName from "../components/ChangeName";
import { render, fireEvent } from "@testing-library/react-native";

describe("<ChangeName />", () => {
  it("SetUser has been called", () => {
    const setUser = jest.fn();
    const hidemodal = jest.fn();
    const user = { name: "Dawson" };
    const { getByText, getByPlaceholderText } = render(
      // MyComponent renders TextInput which has a placeholder 'Enter details'
      // and with `onChangeText` bound to handleChangeText
      <ChangeName setUser={setUser} user={user} hidemodal={hidemodal} />
    );
    fireEvent(getByPlaceholderText("Change Name"), "onChangeText", "Jerry");

    fireEvent(getByText("Save"), "onPress");
    expect(setUser).toHaveBeenCalled();
  });
});
