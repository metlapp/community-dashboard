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

  it("should say the correct value", () => {
    const wrapper = mount(<ChangePasswordScreen />);

    const currentPassword = wrapper.find("TextInput").find("#currentPassword");
    const newPassword = wrapper.find("TextInput").find("#newPassword");
    const confirmPassword = wrapper.find("TextInput").find("#confirmPassword");

    currentPassword.props().value = "Password";
    newPassword.props().value = "Peyton12";
    confirmPassword.props().value = "Peyton12";

    expect(currentPassword.props().value).toEqual("Password");
    expect(newPassword.props().value).toEqual("Peyton12");
    expect(confirmPassword.props().value).toEqual("Peyton12");
  });

  it('should say "Please make sure new passwords match!" when the new passwords dont match', () => {
    const wrapper = mount(<ChangePasswordScreen />);

    const errorMessage = wrapper.find(".errorMessage");

    errorMessage.props().error = "Please make sure new passwords match!";
    errorMessage.props().visible = true;

    // button.simulate("click");

    expect(errorMessage.props().error).toEqual(
      "Please make sure new passwords match!"
    );
  });

  // it('should say "Please make sure new passwords match!" when the new passwords dont match', () => {
  //   const wrapper = shallow(<ChangePasswordScreen />);

  //   const currentPassword = wrapper
  //     .find("#confirmPassword")
  //     .simulate("change", {
  //       value: "password",
  //     });
  //   const newPassword = wrapper.find("#confirmPassword").simulate("change", {
  //     value: "Peyton13",
  //   });
  //   const confirmPassword = wrapper
  //     .find("#confirmPassword")
  //     .simulate("change", {
  //       value: "Peyton12",
  //     });
  //   wrapper.find("Form").simulate("submit");

  //   setTimeout(() => {
  //     const text = wrapper.find("Text").render().text();
  //     expect(text).toEqual("Please make sure new passwords match!");
  //   }, 1000);
  // });

  it("should call handleSubmit after submit", async () => {
    const handlePasswordChange = jest.fn();

    const props = {
      handlePasswordChange,
    };

    const { getByText, getByPlaceholderText } = render(
      <ChangePasswordScreen handlePasswordChange={handlePasswordChange} />
    );

    const currentPassword = getByPlaceholderText("Current Password");
    const newPassword = getByPlaceholderText("New Password");
    const confirmPassword = getByPlaceholderText("Confirm Password");

    await act(async () => {
      await fireEvent(currentPassword, "onChangeText", "password");
      await fireEvent(newPassword, "onChangeText", "Peyton12");
      await fireEvent(confirmPassword, "onChangeText", "Peyton12");

      expect(currentPassword.props.value).toEqual("password");
      expect(newPassword.props.value).toEqual("Peyton12");
      expect(confirmPassword.props.value).toEqual("Peyton12");

      fireEvent(getByText("Save"), "onPress");
    });
    waitFor(() => {
      expect(handlePasswordChange).toHaveBeenCalledTimes(1);
    });
  });
});
