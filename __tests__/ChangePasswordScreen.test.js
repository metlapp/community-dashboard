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

    const currentPassword = wrapper.find(".currentPassword").get();
    currentPassword.simulate("change", {
      target: {
        name: "currentPassword",
        value: "Password",
      },
    });

    // newPassword.value = "Peyton12";

    // const confirmPassword = wrapper.find("AppTextInput").get(2);

    // confirmPassword.value = "Peyton12";

    // wrapper.find(".submit").simulate("click");
    // const text = wrapper.find(".errorMessage").render().text();
    // expect(currentPassword.prop("value")).toEqual("Password");
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
