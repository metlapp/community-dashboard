import "react-native";
import React from "react";
import { shallow } from "enzyme";
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

  it("Test click event", () => {
    const wrapper = shallow(<ChangePasswordScreen />);
    const element = wrapper.find("AppFormField[name='currentPassword']").render();

    element.simulate("change", { target: { value: "password" } });
    expect(element.props.value).toEqual("password");
  });
});
