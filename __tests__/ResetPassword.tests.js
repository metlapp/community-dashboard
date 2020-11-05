import "react-native";
import React from "react";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import AuthContext from "../auth/Context";
import axios from "../__mocks__/axios";

jest.mock("axios");

describe("<ResetPasswordScreen />", () => {
  it("Users can reset password after clicking url", async () => {
    axios.post.mockImplementationOnce(() => {
      return Promise.resolve({
        token: "abs239420dnd20",
        password: "password12"
      });
    });
    const route = {
      params: { token: "abs239420dnd20" },
    };

    const { token } = route.params;
    console.log(token);
    const { getByTestId, getByText } = render(
      <AuthContext.Provider>
        <ResetPasswordScreen route={route} />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByTestId("pass"), "onChangeText", "password12");
    });
    act(() => {
      fireEvent(getByTestId("confirmPass"), "onChangeText", "password12");
    });

    act(() => {
      fireEvent(getByText("Save").parent, "onPress");
    });

    await waitFor(() => {
      expect(getByTestId("pass").props.value).toEqual("");
    });
  });
  it("Users can not reset password after clicking invalid url", async () => {
    axios.post.mockImplementationOnce(() => {
      return Promise.reject({
        token: "abs239420dnd20",
      });
    });
    const route = {
      params: { token: "abs239420dnd20" },
    };

    const { token } = route.params;
    console.log(token);
    const { getByTestId, getByText } = render(
      <AuthContext.Provider>
        <ResetPasswordScreen route={route} />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByTestId("pass"), "onChangeText", "password12");
    });
    act(() => {
      fireEvent(getByTestId("confirmPass"), "onChangeText", "password12");
    });

    act(() => {
      fireEvent(getByText("Save").parent, "onPress");
    });

    await waitFor(() => {
      expect(getByTestId("pass").props.value).toEqual("password12");
    });
  });
});
