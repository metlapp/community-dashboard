import "react-native";
import React from "react";
import { shallow } from "enzyme";

// Note: this is just for use with Jest snapshot testing
// and comes packaged with react-native init project.
// You do not need this if using Enzyme 'toMatchSnapshot' etc.
import renderer from "react-test-renderer";
import AccountScreen from "../screens/AccountScreen";

// This test just uses Jest snapshot testing
it("renders correctly, test using Jest", () => {
  renderer.create(<AccountScreen />);
});

// Using Jest + Enzyme
describe("<AccountScreen />", () => {
  it("renders correctly, test using Jest + Enzyme", () => {
    expect(shallow(<AccountScreen />)).toMatchSnapshot();
  });
  it("matches the snapshot", () => {
    const tree = renderer.create(<AccountScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Test click event", () => {
    const component = shallow(<AccountScreen />);
    const wrapper = component.find(".changeNameButton");
    expect(wrapper.length).toEqual(1);
  });
});
