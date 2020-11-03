import "react-native";
import React from "react";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import AuthContext from "../auth/Context";

describe("<VerifyEmailScreen />", () => {
  it("User can change their Email with a valid Email", async () => {
    const setUser = jest.fn();
    const user = { email: "email@email.com" };
    const setSuccessVisible = jest.fn();
    const route = {}

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <AuthContext.Provider value={{ user, setUser, setSuccessVisible, route  }}>
        <VerifyEmailScreen />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByTestId("email"), "onChangeText", "Jerry@gmail.com");
    });
    act(() => {
      fireEvent(getByText("Submit"), "onPress");
    });
    await waitFor(() => {
      expect(getByTestId("email").props.value).toEqual("");
    });
  });

  it("User cannot change Email with an invalid Email", async () => {
    const setUser = jest.fn();
    const user = { email: "email@email.com" };
    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <VerifyEmailScreen />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByTestId("email"), "onChangeText", "Jerry.com");
    });
    act(() => {
      fireEvent(getByText("Submit"), "onPress");
    });
    await waitFor(() => {
      expect(getByTestId("email").props.value).toEqual("Jerry.com");
    });
  });
});
