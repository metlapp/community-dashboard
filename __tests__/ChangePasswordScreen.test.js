import "react-native";
import React from "react";
import { mount, shallow } from "enzyme";
import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.

import renderer from "react-test-renderer";

describe("Testing ChangePasswordScreen", () => {
  it("renders correctly, test using Jest", () => {
    renderer.create(<ChangePasswordScreen />);
  });

  it("matches the snapshot", () => {
    const tree = renderer.create(<ChangePasswordScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("text on change password screen", () => {
    const wrapper = shallow(<ChangePasswordScreen />);
    const text = wrapper.find("Text").render().text();
    expect(text).toEqual("Change your password");
  });

  it('should say "Please make sure new passwords match!" when the new passwords dont match', () => {
    const wrapper = mount(<ChangePasswordScreen />);

    const errorMessage = wrapper.find(".errorMessage");

    errorMessage.props().error = "Please make sure new passwords match!";
    errorMessage.props().visible = true;

    expect(errorMessage.props().error).toEqual(
      "Please make sure new passwords match!"
    );
  });

  it("should call handleSubmit after submit", async () => {
    const handlePasswordChange = jest.fn();
    const setUser = jest.fn();

    // const props = {
    //   handlePasswordChange,
    //   setUser
    // };

    const { getByText, getByPlaceholderText } = render(
      <ChangePasswordScreen
        handlePasswordChange={handlePasswordChange}
        setUser={setUser}
      />
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
    act(() => {
      fireEvent(confirmPassword, "onChangeText", "Peyton12");
    });

    act(() => {
      fireEvent(getByText("Save").parent, "press");
    });

    waitFor(() => {
      expect(handlePasswordChange).toHaveBeenCalledTimes(1);
    });
    waitFor(() => {
      expect(setUser).toHaveBeenCalledTimes(1);
    });
  });
});
