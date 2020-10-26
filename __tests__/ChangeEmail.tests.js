import "react-native";
import React from "react";
import ChangeEmail from "../components/ChangeEmail";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AuthContext from "../auth/Context";

describe("<ChangeEmail />", () => {
  it("User can change their Email with a valid Email", async () => {
    const setUser = jest.fn();
    const hidemodal = jest.fn();
    const user = { email: "email@email.com" };
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <ChangeEmail hidemodal={hidemodal} />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(
        getByPlaceholderText("New Email"),
        "onChangeText",
        "Jerry@gmail.com"
      );
    });
    act(() => {
      fireEvent.press(getByText("Change Email").parent);
    });
    await waitFor(() => {
      expect(setUser).toHaveBeenCalled();
    });
  });

  it("User cannot change Email with an invalid Email", async () => {
    const setUser = jest.fn();
    const hidemodal = jest.fn();
    const user = { email: "email@email.com" };
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <ChangeEmail hidemodal={hidemodal} />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByPlaceholderText("New Email"), "onChangeText", "Jerry.com");
    });
    act(() => {
      fireEvent(getByText("Change Email").parent, "onPress");
    });
    await waitFor(() => {
      expect(setUser).not.toHaveBeenCalled();
    });
  });
});
