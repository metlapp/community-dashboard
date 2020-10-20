import "react-native";
import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import AccountScreen from "../screens/AccountScreen";
import ChangeName from "../components/ChangeName";
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

  it("Should have three buttons", () => {
    const component = shallow(<AccountScreen />);
    const wrapper = component.find(".button");
    expect(wrapper.getElements()).toHaveLength(3);
  });
  it("Saves users name", () => {
    const wrapper = shallow(<ChangeName />);
    const input = wrapper.find(".newNameInput");
    input.simulate("change", {
      currentTarget: { value: "Jerry" },
    });
    wrapper.find(".save").simulate("click");
    expect();
  });
});
