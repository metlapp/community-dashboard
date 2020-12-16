import "react-native";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AuthContext from "../auth/Context";
import axios from "../__mocks__/axios";
jest.mock("axios");

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
      fireEvent.press(getByText("Sign In").parent);
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
      fireEvent(getByText("Sign In").parent, "onPress");
    });
    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });

  it("Api will not allow the user into the app with invalid credentials", async () => {
    axios.post.mockImplementationOnce(() => {
      return Promise.reject();
    });
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
      fireEvent(getByText("Sign In").parent, "onPress");
    });
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(setUser).not.toHaveBeenCalled();
    });
  });

  it("Api will allow the user into the app with valid credentials", async () => {
    axios.post.mockImplementationOnce(() => {
      return Promise.resolve({ email: "jerry@gmail.com" });
    });
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
      fireEvent.press(getByText("Sign In").parent);
    });
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(setUser).toHaveBeenCalled();
    });
  });
});
