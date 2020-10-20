import "react-native";
import React from "react";
import { mount, shallow } from "enzyme";
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

  // it("should display error when required fields are missed", () => {
  //   const wrapper = mount(<ChangePasswordScreen />);

  //   wrapper.find("Form").simulate("submit");

  //   wrapper.debug();
  // });

  it("should say the correct value", () => {
    const wrapper = mount(<ChangePasswordScreen />);

    console.log(wrapper.debug());

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

    const currentPassword = wrapper.find("TextInput").find("#currentPassword");
    const newPassword = wrapper.find("TextInput").find("#newPassword");
    const confirmPassword = wrapper.find("TextInput").find("#confirmPassword");

    const errorMessage = wrapper.find(".errorMessage");

    currentPassword.props().value = "password";
    newPassword.props().value = "Peyton22";
    confirmPassword.props().value = "Peyton12";

    expect(errorMessage.props("error")).toEqual(
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

  // it('should say "Password changed successfully" when the password is changed successfully', () => {
  //   const wrapper = shallow(<ChangePasswordScreen />);

  //   const currentPassword = wrapper
  //     .find("#confirmPassword")
  //     .simulate("change", {
  //       value: "password",
  //     });
  //   const newPassword = wrapper.find("#confirmPassword").simulate("change", {
  //     value: "Peyton12",
  //   });
  //   const confirmPassword = wrapper
  //     .find("#confirmPassword")
  //     .simulate("change", {
  //       value: "Peyton12",
  //     });
  //   wrapper.find("Form").simulate("submit");

  //   setTimeout(() => {
  //     const text = wrapper.find("Text").render().text();
  //     expect(text).toEqual("Password changed successfully");
  //   }, 1000);
  // });
});
