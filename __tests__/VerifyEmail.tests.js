import "react-native";
import React from "react";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import renderer from "react-test-renderer";
import AuthContext from "../auth/Context";
import axios from "../__mocks__/axios";
jest.mock("axios");

describe("<VerifyEmailScreen />", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<VerifyEmailScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Api will send email to registered emails", async () => {
    axios.post.mockImplementationOnce(() => {
      return Promise.resolve({ email: "user67311@example.com" });
    });
    const { getByText, getByTestId } = render(
      <AuthContext.Provider>
        <VerifyEmailScreen />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByTestId("email"), "onChangeText", "user67311@example.com");
    });
    expect(getByTestId("email").props.value).toEqual("user67311@example.com");

    act(() => {
      fireEvent(getByText("Continue").parent, "onPress");
    });
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(getByTestId("email").props.value).toEqual("");
    });
  });
  it("Can not request pass reset with invalid email", async () => {
    const { getByText, getByTestId } = render(
      <AuthContext.Provider>
        <VerifyEmailScreen />
      </AuthContext.Provider>
    );

    act(() => {
      fireEvent(getByTestId("email"), "onChangeText", "Jerry.com");
    });
    act(() => {
      fireEvent(getByText("Continue"), "onPress");
    });
    await waitFor(() => {
      expect(getByTestId("email").props.value).toEqual("Jerry.com");
    });
  });
});
