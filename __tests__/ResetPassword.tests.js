import "react-native";
import React from "react";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import renderer from "react-test-renderer";
import { render, fireEvent, act, waitFor } from "@testing-library/react-native";
import AuthContext from "../auth/Context";
import axios from "../__mocks__/axios";

jest.mock("axios");

describe("<ResetPasswordScreen />", () => {
  it("matches the snapshot", () => {
    const route = {
      params: { token: "abs239420dnd20" },
    };
    const tree = renderer.create(<ResetPasswordScreen route={route} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Users can reset password after clicking url", async () => {
    const route = {
      params: { token: "abs239420dnd20" },
    };

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
      expect(axios.post).toHaveBeenCalled();
    });
  });

  it("Users can not reset password if new passwords are less than 8 characters long", async () => {
    const route = {
      params: { token: "abs239420dnd20" },
    };

    const { getByTestId, getByText } = render(
      <ResetPasswordScreen route={route} />
    );

    act(() => {
      fireEvent(getByTestId("pass"), "onChangeText", "passwor");
    });
    act(() => {
      fireEvent(getByTestId("confirmPass"), "onChangeText", "passwor");
    });

    act(() => {
      fireEvent(getByText("Save").parent, "onPress");
    });

    await waitFor(() => {
      expect(getByTestId('pass').props.value).toEqual('passwor');
    });
    await waitFor(() => {
      expect(getByTestId('confirmPass').props.value).toEqual('passwor');
    });
  });
  it("Users can not reset password if passwords do not match", async () => {
    const route = {
      params: { token: "abs239420dnd20" },
    };

    const { getByTestId, getByText } = render(
      <ResetPasswordScreen route={route} />
    );

    act(() => {
      fireEvent(getByTestId("pass"), "onChangeText", "password13");
    });
    act(() => {
      fireEvent(getByTestId("confirmPass"), "onChangeText", "password12");
    });

    act(() => {
      fireEvent(getByText("Save").parent, "onPress");
    });

    await waitFor(() => {
      expect(getByTestId('pass').props.value).toEqual('password13');
    });
    await waitFor(() => {
      expect(getByTestId('confirmPass').props.value).toEqual('password12');
    });
  });
});
