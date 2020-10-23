import "react-native";
import React from "react";
import ChangeName from "../components/ChangeName";
import { render, fireEvent } from "@testing-library/react-native";
import AuthContext from "../auth/Context";

describe("<ChangeName />", () => {
  //Gotta change this to call async storage
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
});
