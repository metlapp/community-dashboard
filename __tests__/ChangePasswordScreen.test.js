import "react-native";
import React from "react";
import { shallow } from "enzyme";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.
import renderer from "react-test-renderer";

it("Text on change password screen", () => {
  const wrapper = shallow(<ChangePasswordScreen />);
  const text = wrapper.find();
});
