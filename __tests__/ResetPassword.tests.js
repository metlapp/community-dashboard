import "react-native";
import React from "react";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import AuthContext from "../auth/Context";

describe("<ResetPasswordScreen />", () => {
  it("User can change their Email with a valid Email", async () => {
    const setUser = jest.fn();
    const user = { email: "email@email.com" };

    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <ResetPasswordScreen />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByTestId("pass"), "onChangeText", "password12");
    });
    act(() => {
      fireEvent(getByTestId("confirmPass"), "onChangeText", "password12");
    });
    act(() => {
      fireEvent(getByText("Save"), "onPress");
    });
    await waitFor(() => {
      expect(setUser).toHaveBeenCalled();
    });
  });

  it("User can change their Email with a valid Email", async () => {
    const setUser = jest.fn();
    const user = { email: "email@email.com" };

    const { getByText, getByTestId } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <ResetPasswordScreen />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByTestId("pass"), "onChangeText", "password13");
    });
    act(() => {
      fireEvent(getByTestId("confirmPass"), "onChangeText", "password12");
    });
    act(() => {
      fireEvent(getByText("Save"), "onPress");
    });
    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });
});
