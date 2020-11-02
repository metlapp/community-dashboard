import "react-native";
import React from "react";
import { mount, shallow } from "enzyme";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import ChangePassword from "../components/ChangePassword";
import AuthContext from "../auth/Context";
import axios from "../__mocks__/axios";
jest.mock("axios");

// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.

import renderer from "react-test-renderer";

describe("Testing ChangePassword", () => {
  it("renders correctly, test using Jest", () => {
    renderer.create(<ChangePassword />);
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<ChangePassword />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("text on change password screen", () => {
    const wrapper = shallow(<ChangePassword />);
    const text = wrapper.find("Text").render().text();
    expect(text).toEqual("Change your password");
  });

  it('should say "Please make sure new passwords match!" when the new passwords dont match', () => {
    const wrapper = mount(<ChangePassword />);

    const errorMessage = wrapper.find(".errorMessage");

    errorMessage.props().error = "Please make sure new passwords match!";
    errorMessage.props().visible = true;

    expect(errorMessage.props().error).toEqual(
      "Please make sure new passwords match!"
    );
  });

  it("should call handleSubmit after submit", async () => {
    const user = { id: 2 };
    const { getByText, getByPlaceholderText } = render(
      <AuthContext.Provider value={{ user }}>
        <ChangePassword />
      </AuthContext.Provider>
    );
    const currentPassword = getByPlaceholderText("Current Password");
    const newPassword = getByPlaceholderText("New Password");
    const confirmPassword = getByPlaceholderText("Confirm Password");

    act(() => {
      fireEvent(currentPassword, "onChangeText", "password");
    });

    act(() => {
      fireEvent(newPassword, "onChangeText", "Peyton12");
    });
    expect(newPassword.props.value).toEqual("Peyton12");
    act(() => {
      fireEvent(confirmPassword, "onChangeText", "Peyton12");
    });
    expect(newPassword.props.value).toEqual("Peyton12");

    act(() => {
      fireEvent(getByText("Save").parent, "press");
    });

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalled();
    });
  });
});
