import "react-native";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AuthContext from "../auth/Context";

describe("<LoginScreen />", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<LoginScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("User can login with valid Email", async () => {
    const setUser = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ setUser }}>
        <LoginScreen />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(
        getByPlaceholderText("Email"),
        "onChangeText",
        "Jerry@gmail.com"
      );
    });
    act(() => {
      fireEvent(getByPlaceholderText("Password"), "onChangeText", "password");
    });
    act(() => {
      fireEvent.press(getByText("Login").parent);
    });
    await waitFor(() => {
      expect(setUser).toHaveBeenCalled();
    });
  });

  it("User can not login with invalid Email", async () => {
    const setUser = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ setUser }}>
        <LoginScreen />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByPlaceholderText("Email"), "onChangeText", "Jerry.com");
    });
    act(() => {
      fireEvent(getByPlaceholderText("Password"), "onChangeText", "password");
    });
    act(() => {
      fireEvent(getByText("Login").parent, "onPress");
    });
    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });
});
